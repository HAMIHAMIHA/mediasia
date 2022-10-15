import moment from 'moment'
import get from 'lodash.get'
import Link from 'next/link'
import type { GetStaticPathsContext } from 'next'

import { prisma } from '../utils/prisma'
import CustomImage from '../components/CustomImage'
import PageDisplay from '../components/PageDisplay'
import { ContentFields, PageProps } from '../types'
import getPagePropsFromUrl from '../utils/getPagePropsFromUrl'
import { ContainerFieldType } from '@prisma/client'
import { Space } from 'antd'
import { Fragment } from 'react'

const Pages = (props: PageProps) => (
    <PageDisplay pageProps={props} onEmpty={<DefaultSectionsHome {...props} />} noTitle />
)

const DefaultSectionsHome = (props: PageProps) => {
    console.log('props', props)
    const { type, title, contents, fields, linkedContents, container } = props

    if (type === 'CONTAINER') {
        return (
            <>
                <h1>{title}</h1>
                <ul>
                    {contents?.map((content) => (
                        <li key={content.id}>
                            <Link href={get(content, 'slug.full', '')}>
                                <a>{content.title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </>
        )
    }

    const DisplayField = ({ field }: { field: ContentFields }) => {
        switch (field.type) {
            case ContainerFieldType.STRING:
            case ContainerFieldType.OPTION:
                return <span>{field.textValue}</span>

            case ContainerFieldType.DATE:
                return <span>{moment(field.dateValue).format('MMMM Do YYYY')}</span>

            case ContainerFieldType.BOOLEAN:
                return <span>{field.boolValue ? 'Yes' : 'No'}</span>

            case ContainerFieldType.NUMBER:
                return <span>{field.numberValue}</span>

            case ContainerFieldType.LINK:
                return (
                    <Link href={field.textValue || '#'}>
                        <a>{field.textValue || '#'}</a>
                    </Link>
                )

            case ContainerFieldType.PARAGRAPH:
                return <p>{field.textValue}</p>

            case ContainerFieldType.IMAGE:
                return (
                    <CustomImage
                        img={field?.media}
                        style={{ maxHeight: '15rem', maxWidth: '15rem', objectFit: 'contain' }}
                    />
                )

            case ContainerFieldType.FILE:
                return (
                    <Link href={`/api/uploads/files/${field?.media?.uri}`} target="_blank">
                        <a>{field?.media?.name}</a>
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
                        <a>{field.contentValue?.title}</a>
                    </Link>
                )

            case ContainerFieldType.RICHTEXT:
                return <div dangerouslySetInnerHTML={{ __html: field.textValue || '' }} />

            case ContainerFieldType.COLOR:
                return (
                    <div
                        style={{
                            height: '2rem',
                            width: '2rem',
                            borderRadius: '1rem',
                            border: 'solid 1px #000',
                            backgroundColor: field.textValue || undefined,
                        }}
                    />
                )

            case ContainerFieldType.LOCATION:
                return <div />
        }
    }

    return (
        <>
            <Link href={container?.slug?.full || '/'}>
                <a>Back to {container?.title}</a>
            </Link>
            <h1>{title}</h1>
            <Space direction="vertical">
                {fields?.map((field: ContentFields) => (
                    <Space key={field.id}>
                        {field.multiple ? (
                            <Space>
                                {field.childs.map((child) => (
                                    <DisplayField key={child.id} field={child as ContentFields} />
                                ))}
                            </Space>
                        ) : (
                            <DisplayField field={field} />
                        )}
                    </Space>
                ))}
            </Space>
            <h2>Linked content</h2>
            {linkedContents &&
                Object.keys(linkedContents).map((key, idx) => {
                    return (
                        <Fragment key={key}>
                            <h3>{key}</h3>
                            {linkedContents[key].map((cont: any) => (
                                <Link key={cont.id} href={cont.slug.full}>
                                    <a>{cont.title}</a>
                                </Link>
                            ))}
                        </Fragment>
                    )
                })}
        </>
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

    console.log('kkkk -1', slug)

    return await getPagePropsFromUrl(slug.join('/'))
}

export async function getStaticPaths(context: GetStaticPathsContext) {
    const slugs = await prisma.slug.findMany({
        where: { published: true, AND: [{ NOT: { full: '' } }, { NOT: { full: 'sign-in' } }] },
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
