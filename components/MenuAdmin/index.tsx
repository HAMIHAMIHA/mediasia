import { Affix, Divider, Dropdown, Menu, message, Space, Typography } from 'antd'
import {
    SettingOutlined,
    HomeOutlined,
    LogoutOutlined,
    LayoutOutlined,
    PicCenterOutlined,
    PictureOutlined,
    UserOutlined,
    PlusCircleOutlined,
    FileTextOutlined,
    TeamOutlined,
    IdcardOutlined,
    LoadingOutlined,
    ReloadOutlined,
    MailOutlined,
    FormOutlined,
    ContainerOutlined,
    FileOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons'

import { useAuth } from '@hooks/useAuth'
import { revalidateAll } from '@network/api'
import Link from 'next/link'
import { useMutation, useQuery, UseQueryResult } from 'react-query'
import { Container, RightType } from '@prisma/client'
import { getContainers } from '@network/containers'
import get from 'lodash.get'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { useMemo } from 'react'

const { Text } = Typography

function MenuAdmin() {
    const { isAuth, signOut, me } = useAuth()
    const isDisplayed = isAuth && !!me?.rights.length

    const containers: UseQueryResult<Container[], Error> = useQuery<Container[], Error>(
        ['containers', {}],
        () => getContainers(),
        {
            enabled: isDisplayed,
        }
    )

    const mutation = useMutation(() => revalidateAll(), {
        onSuccess: () => {
            message.success('Pages successfully revalidated')
        },
        onError: (err) => {
            message.error('Error Revalidating pages')
        },
    })

    const FormsMenuItems = useMemo(() => {
        const items: ItemType[] = []

        if (me?.rights.includes(RightType.CREATE_FORM)) {
            items.push({
                key: '1',
                label: (
                    <Link href="/admin/forms/create">
                        <a>Create an form</a>
                    </Link>
                ),
                icon: <PlusCircleOutlined />,
            })
        }

        if (me?.rights.includes(RightType.CREATE_FORM) && me?.rights.includes(RightType.VIEW_MESSAGE)) {
            items.push({
                type: 'divider',
            })
        }

        if (me?.rights.includes(RightType.VIEW_MESSAGE)) {
            items?.push({
                key: '2',
                label: (
                    <Link href="/admin/messages">
                        <a>Messages</a>
                    </Link>
                ),
                icon: <MailOutlined />,
            })
        }

        return items
    }, [me?.rights])

    const OptionsMenuItems = useMemo(() => {
        const items: ItemType[] = []

        if (me?.rights.includes(RightType.ACCESS_SETTINGS)) {
            items.push({
                key: '1',
                label: (
                    <Link href="/admin">
                        <a>Settings</a>
                    </Link>
                ),
                icon: <SettingOutlined />,
            })
        }

        if (me?.rights.includes(RightType.REVALIDATION)) {
            items?.push({
                key: '2',
                label: 'Revalidate all',
                icon: mutation.isLoading ? <LoadingOutlined /> : <ReloadOutlined />,
                onClick: () => mutation.mutate(),
            })
        }

        if (me?.rights.includes(RightType.ACCESS_SETTINGS) || me?.rights.includes(RightType.REVALIDATION)) {
            items.push({
                type: 'divider',
            })
        }

        items.push({
            key: '3',
            label: 'Disconnect',
            icon: <LogoutOutlined />,
            onClick: signOut,
            danger: true,
        })

        return items
    }, [me?.rights])

    const UsersMenuItems = useMemo(() => {
        const items: ItemType[] = []

        if (me?.rights.includes(RightType.CREATE_USER)) {
            items.push({
                key: '1',
                label: (
                    <Link href="/admin/users/create">
                        <a>Create an user</a>
                    </Link>
                ),
                icon: <PlusCircleOutlined />,
            })
        }

        if (me?.rights.includes(RightType.VIEW_ROLE)) {
            items?.push({
                key: '2',
                label: (
                    <Link href="/admin/users/roles">
                        <a>Roles</a>
                    </Link>
                ),
                icon: <IdcardOutlined />,
            })
        }

        return items
    }, [me?.rights])

    const ContainerMenuItems = useMemo(() => {
        const items: ItemType[] = []

        if (me?.rights.includes(RightType.CREATE_CONTAINER)) {
            items.push({
                key: '1',
                label: (
                    <Link href="/admin/containers/create">
                        <a>Create a container</a>
                    </Link>
                ),
                icon: <PlusCircleOutlined />,
            })
        }

        if (me?.rights.includes(RightType.CREATE_CONTAINER) && me?.rights.includes(RightType.VIEW_CONTENT)) {
            items.push({
                type: 'divider',
            })
        }

        if (me?.rights.includes(RightType.VIEW_CONTENT)) {
            items.push({
                key: '2',
                label: (
                    <Link href="/admin/contents">
                        <a>All contents</a>
                    </Link>
                ),
                icon: <UnorderedListOutlined />,
            })
        }

        if (
            me?.rights.includes(RightType.VIEW_CONTENT) ||
            me?.rights.includes(RightType.CREATE_CONTENT) ||
            me?.rights.includes(RightType.UPDATE_CONTAINER)
        ) {
            items.push({
                type: 'divider',
            })
            items.push({
                key: '3',
                type: 'group',
                label: 'Contents',
                children: get(containers, 'data', [])
                    .filter((e, idx) => idx < 15)
                    .map((container: Container, idx: number) => {
                        const items: ItemType[] = []

                        if (me?.rights.includes(RightType.VIEW_CONTENT)) {
                            items.push({
                                key: `3-${container.id}-1`,
                                label: (
                                    <Link
                                        href={{
                                            pathname: '/admin/contents',
                                            query: { container: container.id },
                                        }}
                                    >
                                        <a>All {container.title}</a>
                                    </Link>
                                ),
                                icon: <FileOutlined />,
                            })
                        }

                        if (me?.rights.includes(RightType.CREATE_CONTENT)) {
                            items.push({
                                key: `3-${container.id}-2`,
                                label: (
                                    <Link
                                        href={{
                                            pathname: '/admin/contents/create',
                                            query: { container: container.id },
                                        }}
                                    >
                                        <a>Create a {container.title.toLocaleLowerCase()}</a>
                                    </Link>
                                ),
                                icon: <PlusCircleOutlined />,
                            })
                        }

                        return {
                            key: `3-${container.id}`,
                            label: me?.rights.includes(RightType.UPDATE_CONTAINER) ? (
                                <Link href={`/admin/containers/${container.id}`}>
                                    <a>{container.title}</a>
                                </Link>
                            ) : (
                                container.title
                            ),
                            icon: <FileTextOutlined />,
                            children: !items.length ? undefined : items,
                        }
                    }),
            })
        }

        return items
    }, [me?.rights])

    if (!isDisplayed) return null

    const homeMenu = <Menu items={OptionsMenuItems} />
    const containersMenu = <Menu mode="inline" items={ContainerMenuItems} />

    const elementsMenu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Link href="/admin/elements/create">
                            <a>Create an element</a>
                        </Link>
                    ),
                    icon: <PlusCircleOutlined />,
                },
            ]}
        />
    )

    const usersMenu = <Menu items={UsersMenuItems} />
    const FormsMenu = <Menu items={FormsMenuItems} />

    return (
        <Affix>
            <div
                style={{
                    borderBottom: '1px solid #f0f0f0',
                    width: '100%',
                    padding: '3px 12px',
                    backgroundColor: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Space size="small">
                    <Link href="/">
                        <a>
                            <Text>
                                <HomeOutlined style={{ marginRight: 4 }} />
                                Home
                            </Text>
                        </a>
                    </Link>

                    {me?.rights.includes(RightType.VIEW_CONTAINER) && (
                        <>
                            <Divider type="vertical" />
                            <Dropdown
                                overlay={containersMenu}
                                disabled={
                                    !me?.rights.includes(RightType.VIEW_CONTENT) &&
                                    !me?.rights.includes(RightType.CREATE_CONTENT) &&
                                    !me?.rights.includes(RightType.UPDATE_CONTAINER) &&
                                    !me?.rights.includes(RightType.CREATE_CONTAINER)
                                }
                            >
                                <Space>
                                    <Link href="/admin/containers">
                                        <a>
                                            <Text>
                                                <ContainerOutlined style={{ marginRight: 4 }} />
                                                Containers
                                            </Text>
                                        </a>
                                    </Link>
                                </Space>
                            </Dropdown>
                        </>
                    )}

                    {me?.rights.includes(RightType.VIEW_ELEMENT) && (
                        <>
                            <Divider type="vertical" />
                            <Dropdown
                                overlay={elementsMenu}
                                disabled={!me?.rights.includes(RightType.CREATE_ELEMENT)}
                            >
                                <Space>
                                    <Link href="/admin/elements">
                                        <a>
                                            <Text>
                                                <PicCenterOutlined style={{ marginRight: 4 }} />
                                                Elements
                                            </Text>
                                        </a>
                                    </Link>
                                </Space>
                            </Dropdown>
                        </>
                    )}

                    {me?.rights.includes(RightType.VIEW_USER) && (
                        <>
                            <Divider type="vertical" />
                            <Dropdown overlay={usersMenu}>
                                <Space>
                                    <Link href="/admin/users">
                                        <a>
                                            <Text>
                                                <TeamOutlined style={{ marginRight: 4 }} />
                                                Users
                                            </Text>
                                        </a>
                                    </Link>
                                </Space>
                            </Dropdown>
                        </>
                    )}

                    {!me.rights.includes(RightType.VIEW_USER) && me.rights.includes(RightType.VIEW_ROLE) && (
                        <>
                            <Divider type="vertical" />
                            <Link href="/admin/users/roles">
                                <a>
                                    <Text>
                                        <IdcardOutlined style={{ marginRight: 4 }} />
                                        Roles
                                    </Text>
                                </a>
                            </Link>
                        </>
                    )}

                    {!me.rights.includes(RightType.VIEW_FORM) && me.rights.includes(RightType.VIEW_MESSAGE) && (
                        <>
                            <Divider type="vertical" />
                            <Link href="/admin/messages">
                                <a>
                                    <Text>
                                        <MailOutlined style={{ marginRight: 4 }} />
                                        Messages
                                    </Text>
                                </a>
                            </Link>
                        </>
                    )}

                    {me.rights.includes(RightType.VIEW_FORM) && (
                        <>
                            <Divider type="vertical" />
                            <Dropdown
                                overlay={FormsMenu}
                                disabled={
                                    !me.rights.includes(RightType.CREATE_FORM) &&
                                    !me.rights.includes(RightType.VIEW_MESSAGE)
                                }
                            >
                                <Space>
                                    <Link href="/admin/forms">
                                        <a>
                                            <Text>
                                                <FormOutlined style={{ marginRight: 4 }} />
                                                Forms
                                            </Text>
                                        </a>
                                    </Link>
                                </Space>
                            </Dropdown>
                        </>
                    )}

                    {me.rights.includes(RightType.VIEW_MEDIA) && (
                        <>
                            <Divider type="vertical" />
                            <Link href="/admin/medias">
                                <a>
                                    <Text>
                                        <PictureOutlined style={{ marginRight: 4 }} />
                                        Medias
                                    </Text>
                                </a>
                            </Link>
                        </>
                    )}

                    {me.rights.includes(RightType.VIEW_LAYOUT) && (
                        <>
                            <Divider type="vertical" />
                            <Link href="/admin/layout">
                                <a>
                                    <Text>
                                        <LayoutOutlined style={{ marginRight: 4 }} />
                                        Layout
                                    </Text>
                                </a>
                            </Link>
                        </>
                    )}
                </Space>

                <Dropdown overlay={homeMenu}>
                    <Space style={{ cursor: 'default' }}>
                        <Text className="logged-username">
                            <UserOutlined style={{ marginRight: 4 }} />
                            {`${me?.name}`}
                        </Text>
                    </Space>
                </Dropdown>
            </div>
        </Affix>
    )
}

export default MenuAdmin
