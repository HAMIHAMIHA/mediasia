import type { Container, Element, Slug } from '@prisma/client'
import { Space, Button, Table, Popconfirm, Input, Breadcrumb, Badge, message } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, UnorderedListOutlined } from '@ant-design/icons'
import Link from 'next/link'
import moment from 'moment'
import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query'
import get from 'lodash.get'
import trim from 'lodash.trim'
import useDebounce from '../../../hooks/useDebounce'
import { useState } from 'react'
import Head from 'next/head'
import { deleteContainer, getContainers } from '../../../network/containers'

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
        title: 'Last updated',
        dataIndex: 'published',
        render: (published: boolean) => (
            <Badge
                status={published ? 'success' : 'error'}
                text={published ? 'Published' : 'Not published'}
            />
        ),
    },
    {
        width: 320,
        render: (e: Element) => (
            <Space>
                <Link href={`/admin/contents?container=${e.id}`}>
                    <a>
                        <Button type="dashed" icon={<UnorderedListOutlined />}>
                            Contents
                        </Button>
                    </a>
                </Link>

                <Link href={`/admin/containers/${e.id}`}>
                    <a>
                        <Button type="primary" icon={<EditOutlined />}>
                            Edit
                        </Button>
                    </a>
                </Link>

                <DeleteButton id={e.id} />
            </Space>
        ),
    },
]

const DeleteButton = ({ id }: { id: string }) => {
    const queryClient = useQueryClient()
    const mutation = useMutation(() => deleteContainer(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('containers')
            message.success('Container successfully removed')
        },
        onError: (err) => {
            message.error('Error removing container')
        },
    })

    return (
        <Popconfirm
            disabled={id === 'page'}
            placement="topRight"
            title={'Are you sur to delete this container?'}
            onConfirm={() => mutation.mutate()}
            okText="Delete"
            cancelText="Cancel"
        >
            <Button danger disabled={id === 'page'} icon={<DeleteOutlined />} loading={mutation.isLoading}>
                Delete
            </Button>
        </Popconfirm>
    )
}

AdminElements.requireAuth = true

export default AdminElements
