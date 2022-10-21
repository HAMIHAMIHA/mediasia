import { Container, Element, RightType, Slug } from '@prisma/client'
import { Space, Button, Table, Popconfirm, Input, Breadcrumb, Badge, message, Tooltip } from 'antd'
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import moment from 'moment'
import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query'
import get from 'lodash.get'
import trim from 'lodash.trim'
import useDebounce from '../../../hooks/useDebounce'
import { useState } from 'react'
import Head from 'next/head'
import { deleteContainer, getContainers } from '../../../network/containers'
import { useAuth } from '@hooks/useAuth'

const AdminElements = () => {
    const [q, setQ] = useState<string | undefined>()
    const debouncedQ = useDebounce<string | undefined>(q, 750)
    const containers: UseQueryResult<Container[], Error> = useQuery<Container[], Error>(
        ['containers', { q: trim(debouncedQ)?.toLocaleLowerCase() || undefined }],
        () => getContainers(trim(debouncedQ)?.toLocaleLowerCase())
    )

    return (
        <>
            <Head>
                <title>Admin - Elements</title>
            </Head>

            <Space
                direction="vertical"
                size="middle"
                style={{
                    width: '100%',
                    padding: 15,
                    backgroundColor: '#f0f2f5',
                    minHeight: 'calc(100vh - 29px)',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Space>
                        <Input
                            value={q}
                            allowClear
                            prefix={<SearchOutlined />}
                            placeholder="Search by title"
                            style={{ width: 180 }}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </Space>
                    <Link href="/admin/containers/create">
                        <a>
                            <Button type="primary" icon={<PlusOutlined />}>
                                Create
                            </Button>
                        </a>
                    </Link>
                </div>
                <Table
                    rowKey={(record) => record.id}
                    bordered={false}
                    loading={containers.isLoading}
                    dataSource={get(containers, 'data', [])}
                    columns={columns}
                    size="small"
                    scroll={{ y: 'calc(100vh - 155px)' }}
                    pagination={{
                        hideOnSinglePage: true,
                        pageSize: get(containers, 'data', []).length,
                    }}
                />
            </Space>
        </>
    )
}

const columns = [
    {
        title: 'Title',
        // dataIndex: 'title',
        render: (e: Container) => (e.id === 'page' ? <Badge color="geekblue" text={e.title} /> : e.title),
    },
    {
        title: 'URL',
        dataIndex: 'slug',
        render: (e: Slug[]) => {
            const full = get(e, 'full', '')

            return (
                <Link href={`/${full}`}>
                    <a>
                        <Breadcrumb>
                            <Breadcrumb.Item>&#8203;</Breadcrumb.Item>
                            {full.split('/').map((s: string, idx: number) => (
                                <Breadcrumb.Item key={idx}>{s || <>&#8203;</>}</Breadcrumb.Item>
                            ))}
                        </Breadcrumb>
                    </a>
                </Link>
            )
        },
    },
    {
        title: 'Last updated',
        dataIndex: 'updatedAt',
        render: (e: Date) => moment(e).fromNow(),
    },
    {
        title: 'Publication',
        dataIndex: 'published',
        render: (published: boolean) => (
            <Badge
                status={published ? 'success' : 'error'}
                text={published ? 'Published' : 'Not published'}
            />
        ),
    },
    {
        width: 280,
        render: (e: Element) => <Actions element={e} />,
    },
]

const Actions = ({ element }: { element: Element }) => {
    const queryClient = useQueryClient()
    const { me } = useAuth()
    const mutation = useMutation(() => deleteContainer(element.id), {
        onSuccess: () => {
            queryClient.invalidateQueries('containers')
            message.success('Container successfully removed')
        },
        onError: (err) => {
            message.error('Error removing container')
        },
    })

    return (
        <Space style={{ justifyContent: 'end', width: '100%' }}>
            {me?.rights.includes(RightType.CREATE_CONTENT) && (
                <Link href={`/admin/contents/create?container=${element.id}`}>
                    <a>
                        <Tooltip placement="topRight" title={`Create a ${element.title.toLocaleLowerCase()}`}>
                            <Button type="default" shape="circle" icon={<PlusOutlined />} />
                        </Tooltip>
                    </a>
                </Link>
            )}

            {me?.rights.includes(RightType.VIEW_CONTENT) && (
                <Link href={`/admin/contents?container=${element.id}`}>
                    <a>
                        <Tooltip placement="topRight" title={`See all ${element.title.toLocaleLowerCase()}`}>
                            <Button type="default" shape="circle" icon={<UnorderedListOutlined />} />
                        </Tooltip>
                    </a>
                </Link>
            )}

            {me?.rights.includes(RightType.UPDATE_CONTAINER) && (
                <Link href={`/admin/containers/${element.id}`}>
                    <a>
                        <Button type="primary" icon={<EditOutlined />}>
                            Edit
                        </Button>
                    </a>
                </Link>
            )}

            {me?.rights.includes(RightType.DELETE_CONTAINER) && (
                <Popconfirm
                    disabled={element.id === 'page'}
                    placement="topRight"
                    title={'Are you sur to delete this container?'}
                    onConfirm={() => mutation.mutate()}
                    okText="Delete"
                    cancelText="Cancel"
                >
                    <Button
                        danger
                        disabled={element.id === 'page'}
                        icon={<DeleteOutlined />}
                        loading={mutation.isLoading}
                    >
                        Delete
                    </Button>
                </Popconfirm>
            )}
        </Space>
    )
}

AdminElements.requireAuth = true

export default AdminElements
