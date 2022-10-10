import moment from 'moment'
import get from 'lodash.get'
import Link from 'next/link'
import type { GetStaticPathsContext } from 'next'

import { prisma } from '../utils/prisma'
import CustomImage from '../components/CustomImage'
import PageDisplay from '../components/PageDisplay'
import { FullContentField, PageProps } from '../types'
import getPagePropsFromUrl from '../utils/getPagePropsFromUrl'
import { ContainerFieldType } from '@prisma/client'

const Pages = (props: PageProps) => (
    <PageDisplay pageProps={props} onEmpty={<DefaultSectionsHome {...props} />} noTitle />
)

const DefaultSectionsHome = (props: PageProps) => {
    const { type, title, contents, fields } = props

    if (type === 'container') {
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

    return (
        <>
            <h1>{title}</h1>
            {fields?.map((field: FullContentField, idx: number) => {
                switch (field.type) {
                    case ContainerFieldType.STRING:
                        return (
                            <>
                                <span key={idx}>{field.textValue}</span>
                                <br />
                            </>
                        )
                    case ContainerFieldType.PARAGRAPH:
                        return (
                            <>
                                <p key={idx}>{field.textValue}</p>
                                <br />
                            </>
                        )
                    case ContainerFieldType.NUMBER:
                        return (
                            <>
                                <p key={idx}>{field.numberValue}</p>
                                <br />
                            </>
                        )
                    case ContainerFieldType.BOOLEAN:
                        return (
                            <>
                                <p key={idx}>{field.textValue ? 'Yes' : 'No'}</p>
                                <br />
                            </>
                        )
                    case ContainerFieldType.IMAGE:
                        return (
                            <>
                                <CustomImage key={idx} img={field?.media} />
                                <br />
                            </>
                        )
                    case ContainerFieldType.DATE:
                        return (
                            <>
                                <span key={idx}>{moment(field.dateValue).format('MMMM Do YYYY')}</span>
                                <br />
                            </>
                        )
                    case ContainerFieldType.LINK:
                        return (
                            <>
                                <Link key={idx} href={field.textValue || '#'}>
                                    <a>Link</a>
                                </Link>
                                <br />
                            </>
                        )

                    default:
                        return null
                }
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

    return await getPagePropsFromUrl(slug.join('/'))
}

export async function getStaticPaths(context: GetStaticPathsContext) {
    const slugs = await prisma.slug.findMany({
        where: {
            AND: [{ published: true }, { NOT: { full: '' } }, { NOT: { full: 'sign-in' } }],
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
