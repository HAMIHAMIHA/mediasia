import { useState } from 'react'
import { Space, Button, Table, Popconfirm, Input, message } from 'antd'
import Link from 'next/link'
import moment from 'moment'
import get from 'lodash.get'
import trim from 'lodash.trim'
import type { Form } from '@prisma/client'
import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'

import useDebounce from '../../../hooks/useDebounce'
import { getForms, deleteForm } from '../../../network/forms'
import Head from 'next/head'

const AdminPages = () => {
    const [q, setQ] = useState<string | undefined>()
    const debouncedQ = useDebounce<string | undefined>(q, 750)
    const forms: UseQueryResult<Form[], Error> = useQuery<Form[], Error>(
        ['forms', { q: trim(debouncedQ)?.toLocaleLowerCase() || undefined }],
        () => getForms(trim(debouncedQ)?.toLocaleLowerCase())
    )

    return (
        <>
            <Head>
                <title>Admin - Forms</title>
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
                            id="search"
                            placeholder="Search by title"
                            prefix={<SearchOutlined />}
                            style={{ width: 180 }}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </Space>
                    <Link href="/admin/forms/create">
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
                    loading={forms.isLoading}
                    dataSource={get(forms, 'data', [])}
                    columns={columns}
                    size="small"
                    scroll={{ y: 'calc(100vh - 155px)' }}
                    pagination={{
                        hideOnSinglePage: true,
                        pageSize: get(forms, 'data', []).length,
                    }}
                />
            </Space>
        </>
    )
}

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Send Email To',
        dataIndex: 'sendTo',
    },
    {
        title: 'Nb of fields',
        dataIndex: '_count',
        render: (count: any) => get(count, 'fields', 0),
    },
    {
        title: 'Last updated',
        dataIndex: 'updatedAt',
        render: (e: Date) => moment(e).fromNow(),
    },
    {
        width: 200,
        render: (e: Form) => (
            <Space>
                <Link href={`/admin/forms/${e.id}`}>
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
    const mutation = useMutation(() => deleteForm(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('forms')
            message.success('Form successfully removed')
        },
        onError: (err) => {
            message.error('Error removing form')
        },
    })

    return (
        <Popconfirm
            placement="topRight"
            title={'Are you sur to delete this form?'}
            onConfirm={() => mutation.mutate()}
            okText="Delete"
            cancelText="Cancel"
        >
            <Button danger loading={mutation.isLoading} icon={<DeleteOutlined />}>
                Delete
            </Button>
        </Popconfirm>
    )
}

AdminPages.requireAuth = true

export default AdminPages
