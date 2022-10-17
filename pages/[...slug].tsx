import moment from 'moment'
import get from 'lodash.get'
import Link from 'next/link'
import type { GetStaticPathsContext } from 'next'

import { prisma } from '../utils/prisma'
import CustomImage from '../components/CustomImage'
import PageDisplay from '../components/PageDisplay'
import { ContentFields, PageProps } from '../types'
import getPagePropsFromUrl from '../utils/getPagePropsFromUrl'
import { ContainerFieldType, Status } from '@prisma/client'
import { Button, Card, Space, Typography, Image, Tag, List, Descriptions } from 'antd'
import { Fragment } from 'react'
import { CaretLeftOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const Pages = (props: PageProps) => (
    <PageDisplay pageProps={props} onEmpty={<DefaultSectionsHome {...props} />} noTitle />
)

const DefaultSectionsHome = (props: PageProps) => {
    const { type, title, contents, fields, linkedContents, container } = props

    if (type === 'CONTAINER') {
        return (
            <Space direction="vertical" style={{ padding: 8, width: '100%' }}>
                <Title>{title}</Title>
                <div style={{ backgroundColor: '#fff' }}>
                    <List
                        size="small"
                        header={<Text strong>Contents</Text>}
                        bordered
                        dataSource={contents}
                        renderItem={(content) => (
                            <List.Item>
                                <Link href={get(content, 'slug.full', '')}>
                                    <a>
                                        <Button type="link">{content.title}</Button>
                                    </a>
                                </Link>
                            </List.Item>
                        )}
                    />
                </div>
            </Space>
        )
    }

    const DisplayField = ({ field }: { field: ContentFields }) => {
        switch (field.type) {
            case ContainerFieldType.STRING:
            case ContainerFieldType.OPTION:
                return <Text>{field.textValue}</Text>

            case ContainerFieldType.DATE:
                return <Text>{moment(field.dateValue).format('MMMM Do YYYY')}</Text>

            case ContainerFieldType.BOOLEAN:
                return <Text>{field.boolValue ? 'Yes' : 'No'}</Text>

            case ContainerFieldType.NUMBER:
                return <Text>{field.numberValue}</Text>

            case ContainerFieldType.LINK:
                return (
                    <Link href={field.textValue || '#'}>
                        <a>
                            <Button type="link">{field.textValue || '#'}</Button>
                        </a>
                    </Link>
                )

            case ContainerFieldType.PARAGRAPH:
                return <p>{field.textValue}</p>

            case ContainerFieldType.IMAGE:
                return (
                    <Image
                        width={200}
                        src={`/api/uploads/images/${field?.media?.uri}`}
                        alt={field?.media?.alt || ''}
                    />
                )

            case ContainerFieldType.FILE:
                return (
                    <Link href={`/api/uploads/files/${field?.media?.uri}`} target="_blank">
                        <a>
                            <Button type="link">{field?.media?.name}</Button>
                        </a>
                    </Link>
                )

            case ContainerFieldType.VIDEO:
                return (
                    <video width="400" controls>
                        <source
                            src={`/api/uploads/videos/${field?.media?.uri}`}
                            type={field?.media?.mimeType}
                        />
                        Your browser does not support HTML video.
                    </video>
                )

            case ContainerFieldType.CONTENT:
                return (
                    <Link href={field.contentValue?.slug?.full || '#'}>
                        <a>
                            <Button type="link">{field.contentValue?.title}</Button>
                        </a>
                    </Link>
                )

            case ContainerFieldType.RICHTEXT:
                return <div dangerouslySetInnerHTML={{ __html: field.textValue || '' }} />
            case ContainerFieldType.COLOR:
                return <Tag color={field.textValue || ''}>{field.textValue}</Tag>

            case ContainerFieldType.LOCATION:
                return <div />
        }
    }

    return (
        <Space direction="vertical" style={{ padding: 8, width: '100%' }}>
            <Link href={container?.slug?.full || '/'}>
                <a>
                    <Button
                        type="dashed"
                        icon={<CaretLeftOutlined />}
                    >{`Back to ${container?.title}`}</Button>
                </a>
            </Link>
            <Title>{title}</Title>

            <div style={{ backgroundColor: '#fff' }}>
                <Descriptions bordered>
                    {fields?.map((field: ContentFields) => (
                        <Descriptions.Item key={field.id} label={`${field.name}:`}>
                            {field.multiple ? (
                                <Space style={{ width: '100%' }}>
                                    {field.childs.map((child) => (
                                        <DisplayField key={child.id} field={child as ContentFields} />
                                    ))}
                                </Space>
                            ) : (
                                <DisplayField field={field} />
                            )}
                        </Descriptions.Item>
                    ))}
                </Descriptions>
            </div>

            {/* <Space direction="vertical" style={{ width: '100%' }}>
                {fields?.map((field: ContentFields) => (
                    <Space key={field.id} style={{ width: '100%' }} align="start">
                        <Text strong>{`${field.name}:`}</Text>
                        {field.multiple ? (
                            <Space style={{ width: '100%' }}>
                                {field.childs.map((child) => (
                                    <DisplayField key={child.id} field={child as ContentFields} />
                                ))}
                            </Space>
                        ) : (
                            <DisplayField field={field} />
                        )}
                    </Space>
                ))}
            </Space> */}
            {!!(linkedContents && Object.keys(linkedContents).length) && (
                <>
                    <Title level={3}>Linked content</Title>
                    {Object.keys(linkedContents).map((key, idx) => {
                        return (
                            <div key={key} style={{ backgroundColor: '#fff' }}>
                                <List
                                    size="small"
                                    header={<Text strong>{key}</Text>}
                                    bordered
                                    dataSource={linkedContents[key]}
                                    renderItem={(content: any) => (
                                        <List.Item>
                                            <Link key={content.id} href={content.slug.full}>
                                                <a>
                                                    <Button type="link">{content.title}</Button>
                                                </a>
                                            </Link>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        )
                    })}
                </>
            )}
        </Space>
    )
}

interface NewGetStaticPathsContext extends GetStaticPathsContext {
    params: {
        slug: string[]
    }
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
export async function getStaticProps(context: NewGetStaticPathsContext) {
    const { slug } = context.params

    return await getPagePropsFromUrl(slug.join('/'))
}

export async function getStaticPaths(context: GetStaticPathsContext) {
    const slugs = await prisma.slug.findMany({
        where: {
            published: true,
            OR: [{ container: { status: Status.AVAILABLE } }, { content: { status: Status.AVAILABLE } }],
            AND: [{ NOT: { full: '' } }, { NOT: { full: 'sign-in' } }],
        },
    })

    const paths = slugs.map((slug) => ({
        params: { slug: slug.full.split('/') },
    }))

    return {
        paths,
        fallback: true, // false or 'blocking'
    }
}

export default Pages
