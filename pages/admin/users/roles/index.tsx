// import { useState, useEffect } from 'react'
import type { Role } from '@prisma/client'
import {
    Space,
    Button,
    Table,
    // Breadcrumb,
    // Badge,
    // Typography,
    Popconfirm,
    Input,
} from 'antd'
import Link from 'next/link'
// import moment from 'moment'
import { useQuery, UseQueryResult } from 'react-query'
import { getRoles } from '../../../../network/roles'
import get from 'lodash.get'
import trim from 'lodash.trim'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import useDebounce from '../../../../hooks/useDebounce'
import moment from 'moment'
import Head from 'next/head'

const AdminRoles = () => {
    const [q, setQ] = useState<string | undefined>()
    const debouncedQ = useDebounce<string | undefined>(q, 750)
    const roles: UseQueryResult<Role[], Error> = useQuery<Role[], Error>(
        ['roles', { q: trim(debouncedQ)?.toLocaleLowerCase() || undefined }],
        () => getRoles(trim(debouncedQ)?.toLocaleLowerCase())
    )

    return (
        <>
            <Head>
                <title>Admin - User Types</title>
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
                    <Input
                        value={q}
                        allowClear
                        placeholder="Search by name"
                        prefix={<SearchOutlined />}
                        style={{ width: 180 }}
                        onChange={(e) => setQ(e.target.value)}
                    />
                    <Link href="/admin/users/roles/create">
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
                    loading={roles.isLoading}
                    dataSource={get(roles, 'data', [])}
                    columns={columns}
                    size="small"
                    scroll={{ y: 'calc(100vh - 155px)' }}
                    pagination={{
                        hideOnSinglePage: true,
                        pageSize: get(roles, 'data', []).length,
                    }}
                />
            </Space>
        </>
    )
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        width: 150,
        title: 'Last updated',
        dataIndex: 'updatedAt',
        render: (e: Date) => moment(e).fromNow(),
    },
    {
        width: 200,
        render: (e: Role) => (
            <Space>
                <Link href={`/admin/users/roles/${e.id}`}>
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
    // const queryClient = useQueryClient()
    // const mutation = useMutation(() => {}, {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries('elements')
    //         message.success('Element successfully removed')
    //     },
    //     onError: (err) => {
    //         message.error('Error removing element')
    //     },
    // })

    return (
        <Popconfirm
            placement="topRight"
            title={'Are you sur to delete this element?'}
            disabled={id === 'super-admin' || id === 'admin' || id === 'user'}
            // onConfirm={() => mutation.mutate()}
            okText="Delete"
            cancelText="Cancel"
        >
            <Button
                danger
                disabled={id === 'super-admin' || id === 'admin' || id === 'user'}
                icon={<DeleteOutlined />}
                //loading={mutation.isLoading}
            >
                Delete
            </Button>
        </Popconfirm>
    )
}

AdminRoles.requireAuth = true

export default AdminRoles
