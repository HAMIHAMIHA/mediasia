import { useEffect, useState } from 'react'
import moment from 'moment'
import Head from 'next/head'
import Link from 'next/link'
import get from 'lodash.get'
import trim from 'lodash.trim'
import { useRouter } from 'next/router'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query'
import type { Container, Content, Slug } from '@prisma/client'
import { Space, Button, Table, Popconfirm, Input, Breadcrumb, Badge, message } from 'antd'

import useDebounce from '../../../hooks/useDebounce'
import { deleteContent, getContents } from '../../../network/contents'
import CustomSelect from '@components/CustomSelect'

const AdminElements = () => {
    const router = useRouter()
    const [q, setQ] = useState<string | undefined>()
    const [type, setType] = useState<string | undefined>((router.query.container as string) || undefined)
    const debouncedQ = useDebounce<string | undefined>(q, 750)
    const contents: UseQueryResult<Content[], Error> = useQuery<Content[], Error>(
        ['contents', { q: trim(debouncedQ)?.toLocaleLowerCase() || undefined, type }],
        () => getContents(type, trim(debouncedQ)?.toLocaleLowerCase())
    )

    useEffect(() => {
        setType((router.query.container as string) || undefined)
    }, [router.query.container])

    useEffect(() => {
        const search = []

        if (debouncedQ) {
            search.push(`q=${debouncedQ}`)
        }

        if (type) {
            search.push(`container=${type || ''}`)
        }

        router.replace(!!search.length ? `?${search.join('&')}` : '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQ, type])

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
                            prefix={<SearchOutlined />}
                            style={{ width: 180 }}
                            onChange={(e) => setQ(e.target.value)}
                        />

                        <CustomSelect.ListContainers width={180} value={type} onChange={setType} />
                    </Space>
                    <Link href={`/admin/contents/create${!!type ? `?container=${type}` : ''}`}>
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
                    loading={contents.isLoading}
                    dataSource={get(contents, 'data', [])}
                    columns={columns}
                    size="small"
                    scroll={{ y: 'calc(100vh - 155px)' }}
                    pagination={{
                        hideOnSinglePage: true,
                        pageSize: get(contents, 'data', []).length,
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
        render: (e: Content) =>
            e.id === 'notfound' || e.id === 'signin' ? <Badge color="geekblue" text={e.title} /> : e.title,
    },
    {
        title: 'Container',
        dataIndex: 'container',
        render: (e: Container) => e.title,
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
        width: 200,
        render: (e: Content) => (
            <Space>
                <Link href={`/admin/contents/${e.id}`}>
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
    const mutation = useMutation(() => deleteContent(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('containers')
            message.success('Content successfully removed')
        },
        onError: (err) => {
            message.error('Error removing content')
        },
    })

    return (
        <Popconfirm
            disabled={id === 'notfound' || id === 'signin'}
            placement="topRight"
            title={'Are you sur to delete this container?'}
            onConfirm={() => mutation.mutate()}
            okText="Delete"
            cancelText="Cancel"
        >
            <Button
                danger
                disabled={id === 'notfound' || id === 'signin'}
                icon={<DeleteOutlined />}
                loading={mutation.isLoading}
            >
                Delete
            </Button>
        </Popconfirm>
    )
}

AdminElements.requireAuth = true

export default AdminElements
