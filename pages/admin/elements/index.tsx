import type { Element } from '@prisma/client'
import { Space, Button, Table, Popconfirm, Input, Select, message } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import Link from 'next/link'
import moment from 'moment'
import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { getElements, deleteElement } from '../../../network/elements'
import get from 'lodash.get'
import trim from 'lodash.trim'
import useDebounce from '../../../hooks/useDebounce'
import { useState } from 'react'
import Blocks from '../../../blocks'
import Head from 'next/head'

const { Option } = Select

const AdminElements = () => {
    const [q, setQ] = useState<string | undefined>()
    const [block, setBlock] = useState<string | undefined>()
    const debouncedQ = useDebounce<string | undefined>(q, 750)
    const elements: UseQueryResult<Element[], Error> = useQuery<Element[], Error>(
        ['elements', { q: trim(debouncedQ)?.toLocaleLowerCase() || undefined, block }],
        () => getElements(block, trim(debouncedQ)?.toLocaleLowerCase())
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
                        <Select
                            allowClear
                            value={block}
                            onChange={setBlock}
                            placeholder="Select a block"
                            style={{ width: 180 }}
                        >
                            {Object.keys(Blocks).map((key) => (
                                <Option key={key} value={key}>
                                    {get(Blocks, `${key}.name`, '')}
                                </Option>
                            ))}
                        </Select>
                    </Space>
                    <Link href="/admin/elements/create">
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
                    loading={elements.isLoading}
                    dataSource={get(elements, 'data', [])}
                    columns={columns}
                    size="small"
                    scroll={{ y: 'calc(100vh - 155px)' }}
                    pagination={{
                        hideOnSinglePage: true,
                        pageSize: get(elements, 'data', []).length,
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
    { title: 'Block', dataIndex: 'block' },
    {
        title: 'Last updated',
        dataIndex: 'updatedAt',
        render: (e: Date) => moment(e).fromNow(),
    },
    {
        width: 200,
        render: (e: Element) => (
            <Space>
                <Link href={`/admin/elements/${e.id}`}>
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
    const mutation = useMutation(() => deleteElement(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('elements')
            message.success('Element successfully removed')
        },
        onError: (err) => {
            message.error('Error removing element')
        },
    })

    return (
        <Popconfirm
            placement="topRight"
            title={'Are you sur to delete this element?'}
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
