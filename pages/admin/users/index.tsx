import { useState } from 'react'
import type { User, Login, Role } from '@prisma/client'
import { Tag, Space, Input, Table, Button, Popconfirm } from 'antd'
import Link from 'next/link'
import Head from 'next/head'
import get from 'lodash.get'
import trim from 'lodash.trim'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useQuery, UseQueryResult } from 'react-query'

import { getUsers } from '../../../network/users'
import type { FullUser } from '../../../types'
import useDebounce from '../../../hooks/useDebounce'
import CustomSelect from '../../../components/CustomSelect'

const AdminUsers = () => {
    // const router = useRouter()
    // const { search, role } = router.query
    const [q, setQ] = useState<string | undefined>()
    const [roleId, setTypeId] = useState<string | undefined>()
    const debouncedQ = useDebounce<string | undefined>(q, 750)
    const users: UseQueryResult<User[], Error> = useQuery<User[], Error>(
        ['users', { q: trim(debouncedQ)?.toLocaleLowerCase() || undefined, roleId }],
        () => getUsers(roleId, trim(debouncedQ)?.toLocaleLowerCase())
    )

    return (
        <>
            <Head>
                <title>Admin - Users</title>
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
                            placeholder="Search by name"
                            prefix={<SearchOutlined />}
                            style={{ width: 180 }}
                            onChange={(e) => setQ(e.target.value)}
                        />

                        <CustomSelect.ListRoles width={180} value={roleId} onChange={setTypeId} />
                        {/* <Select
                        allowClear
                        value={type}
                        onChange={setType}
                        placeholder="Role"
                        style={{ width: 180 }}
                    >
                        <Option value="admin">Admin</Option>
                        <Option value="user">User</Option>
                    </Select> */}
                    </Space>
                    <Link href="/admin/users/create">
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
                    loading={users.isLoading}
                    dataSource={get(users, 'data', [])}
                    columns={columns}
                    size="small"
                    scroll={{ y: 'calc(100vh - 155px)' }}
                    pagination={{
                        hideOnSinglePage: true,
                        pageSize: get(users, 'data', []).length,
                    }}
                />
            </Space>
        </>
    )
}

const columns = [
    {
        title: 'Role',
        dataIndex: 'login',
        render: (e: Login & { role: Role }) => e.role.name,
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'login',
        render: (e: Login) => e?.email,
    },
    {
        width: 200,
        render: (e: FullUser) => (
            <Space>
                <Link href={`/admin/elements/${e.id}`}>
                    <a>
                        <Button type="primary" icon={<EditOutlined />}>
                            Edit
                        </Button>
                    </a>
                </Link>

                <DeleteButton id={e.id} disabled={e.login.role.id === 'super-admin'} />
            </Space>
        ),
    },
]

const DeleteButton = ({ id, disabled }: { id: string; disabled?: boolean }) => {
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
            disabled={disabled}
            // onConfirm={() => mutation.mutate()}
            okText="Delete"
            cancelText="Cancel"
        >
            <Button
                danger
                disabled={disabled}
                icon={<DeleteOutlined />}
                //loading={mutation.isLoading}
            >
                Delete
            </Button>
        </Popconfirm>
    )
}

AdminUsers.requireAuth = true

export default AdminUsers
