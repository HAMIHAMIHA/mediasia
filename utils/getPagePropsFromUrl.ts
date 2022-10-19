import { ContainerFieldType, SectionType, Status } from '@prisma/client'
import moment from 'moment'
import { prisma } from '../utils/prisma'
// import getNameFieldFromType from './getNameFieldFromType'
import { ContainerPageContents, ContentFields, PageProps, PageSection } from '../types'

const sanitizeDate = (date: Date | string | undefined | null) => (!!date ? moment(date).valueOf() : null)

const formSelect = {
    select: {
        id: true,
        title: true,
        fields: {
            select: {
                id: true,
                name: true,
                type: true,
                label: true,
                placeholder: true,
                position: true,
                required: true,

                options: true,
                min: true,
                max: true,
                defaultText: true,
                defaultNumber: true,
                defaultMultiple: true,
            },
        },
    },
}

const sectionSelect = {
    select: {
        id: true,
        block: true,
        position: true,
        content: true,
        element: {
            select: {
                id: true,
                block: true,
                content: true,
                form: formSelect,
            },
        },
        form: formSelect,
    },
}

const contentFieldsSelect = {
    id: true,
    name: true,
    type: true,
    media: {
        select: {
            id: true,
            uri: true,
            alt: true,
            name: true,
            mimeType: true,
        },
    },
    textValue: true,
    numberValue: true,
    boolValue: true,
    dateValue: true,
    contentValue: {
        select: {
            id: true,
            title: true,
            slug: {
                select: {
                    id: true,
                    full: true,
                },
            },
        },
    },
    multiple: true,
}

const basicSelect = {
    id: true,
    title: true,
    updatedAt: true,
    published: true,
    status: true,
    metadatas: {
        select: {
            id: true,
            name: true,
            content: true,
        },
    },
    accesses: {
        select: {
            id: true,
            roleId: true,
        },
    },
}

const getPagePropsFromUrl = async (slug: string) => {
    const notFound = { notFound: true }

    const releatedSlug = await prisma.slug.findFirst({
        where: { full: slug, published: true },
        select: {
            published: true,
            container: {
                select: {
                    ...basicSelect,
                    sections: sectionSelect,
                    contents: {
                        where: { published: true, status: Status.AVAILABLE },
                        select: {
                            id: true,
                            title: true,
                            slug: {
                                select: {
                                    id: true,
                                    full: true,
                                },
                            },
                            fields: {
                                select: {
                                    ...contentFieldsSelect,
                                    childs: {
                                        select: {
                                            ...contentFieldsSelect,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            content: {
                select: {
                    ...basicSelect,
                    fields: {
                        select: {
                            ...contentFieldsSelect,
                            childs: {
                                select: {
                                    ...contentFieldsSelect,
                                },
                            },
                        },
                    },
                    sections: sectionSelect,
                    container: {
                        select: {
                            id: true,
                            title: true,
                            slug: {
                                select: {
                                    id: true,
                                    full: true,
                                },
                            },
                            accesses: {
                                select: {
                                    id: true,
                                    roleId: true,
                                },
                            },
                            contentSections: sectionSelect,
                        },
                    },
                },
            },
        },
    })

    if (!releatedSlug) {
        return notFound
    }

    const type = !!releatedSlug?.container ? 'CONTAINER' : 'CONTENT'

    let title: string | undefined = ''
    let id: string | undefined = ''
    let metadatas: any[] = []
    let sections: any[] = []
    let updatedAt: number | null = null
    let contents: ContainerPageContents[] = []
    let fields: ContentFields[] = []
    let linkedContents: any | null = null
    let container: any | null = null

    if (type === 'CONTAINER') {
        const { container } = releatedSlug

        if (!container || !container.published || container.status === Status.DISCONTINUED) {
            return notFound
        }

        id = container.id
        title = container.title

        contents = container.contents.map((content) => ({
            ...content,
            fields: content.fields.map((field) => ({
                ...field,
                dateValue: !!field.dateValue ? sanitizeDate(field.dateValue) : null,
                childs: field.childs.map((child) => ({
                    ...child,
                    dateValue: !!field.dateValue ? sanitizeDate(field.dateValue) : null,
                })),
            })),
        }))

        sections = container.sections.sort((a, b) => a.position - b.position)
        metadatas = container.metadatas

        updatedAt = sanitizeDate(container.updatedAt)
    } else {
        const { content } = releatedSlug

        if (!content || !content.published || content.status === Status.DISCONTINUED) {
            return notFound
        }

        id = content.id
        title = content.title

        container = {
            id: content.container.id,
            title: content.container.title,
            slug: content.container.slug,
        }

        fields = content.fields.map((field) => ({
            ...field,
            dateValue: !!field.dateValue ? sanitizeDate(field.dateValue) : null,
            childs: field.childs.map((child) => ({
                ...child,
                dateValue: !!field.dateValue ? sanitizeDate(field.dateValue) : null,
            })),
        }))

        sections = [
            ...content.container.contentSections.sort((a, b) => a.position - b.position),
            ...content.sections.sort((a, b) => a.position - b.position),
        ]
        metadatas = content.metadatas

        updatedAt = sanitizeDate(content.updatedAt)

        const releatedContents = await prisma.content.findMany({
            where: {
                OR: [
                    { fields: { some: { contentValueId: content.id } } },
                    { fields: { some: { childs: { some: { contentValueId: content.id } } } } },
                ],
                status: Status.AVAILABLE,
                published: true,
            },
            select: {
                id: true,
                title: true,
                container: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                fields: {
                    select: {
                        ...contentFieldsSelect,
                        childs: {
                            select: {
                                ...contentFieldsSelect,
                            },
                        },
                    },
                },
                slug: {
                    select: {
                        id: true,
                        full: true,
                    },
                },
            },
            orderBy: { containerId: 'asc' },
        })

        linkedContents = {}
        for (const releatedContent of releatedContents) {
            const fields = releatedContent.fields.map((field) => {
                if (field.type !== ContainerFieldType.DATE) return field

                let childs: any = []
                let dateValue: any = null
                if (field.multiple) {
                    childs = field.childs.map((child) => ({
                        ...child,
                        dateValue: sanitizeDate(child.dateValue),
                    }))
                } else {
                    dateValue = sanitizeDate(field.dateValue)
                }

                return {
                    ...field,
                    dateValue,
                    childs,
                }
            })

            if (!linkedContents?.[releatedContent.container.id]) {
                linkedContents[releatedContent.container.title] = [{ ...releatedContent, fields }]
            } else {
                linkedContents[releatedContent.container.title].push({ ...releatedContent, fields })
            }
        }
    }

    const appName = await prisma.setting.findUnique({
        where: { name: 'app_name' },
    })

    const background_color = await prisma.setting.findUnique({
        where: { name: 'background_color' },
    })

    const primary_color = await prisma.setting.findUnique({
        where: { name: 'primary_color' },
    })

    const secondary_color = await prisma.setting.findUnique({
        where: { name: 'secondary_color' },
    })

    const theme = {
        background: background_color?.value || null,
        primary: primary_color?.value || null,
        secondary: secondary_color?.value || null,
    }

    const headerSections: PageSection[] = await prisma.section.findMany({
        where: { type: SectionType.HEADER },
        ...sectionSelect,
    })

    const topBody = await prisma.section.findMany({
        where: { type: SectionType.TOP_BODY },
        ...sectionSelect,
    })

    const bottomBody = await prisma.section.findMany({
        where: { type: SectionType.BOTTOM_BODY },
        ...sectionSelect,
    })

    const footerSections = await prisma.section.findMany({
        where: { type: SectionType.FOOTER },
        ...sectionSelect,
    })

    const props: PageProps = {
        id,
        appName: appName?.value,
        metadatas,
        theme,
        title,
        type,
        fields,
        contents,
        headerSections: headerSections.sort((a, b) => a.position - b.position),
        topSections: topBody.sort((a, b) => a.position - b.position),
        sections: sections,
        bottomSections: bottomBody.sort((a, b) => a.position - b.position),
        footerSections: footerSections.sort((a, b) => a.position - b.position),
        linkedContents,
        container,
        updatedAt,
    }

    const revalidate = await prisma.setting.findUnique({
        where: { name: 'revalidate' },
    })

    return {
        props,
        revalidate: revalidate ? parseInt(revalidate.value) : 60,
    }
}

export default getPagePropsFromUrl
