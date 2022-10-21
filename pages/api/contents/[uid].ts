import get from 'lodash.get'
import checkAuth from '@utils/checkAuth'
import { FullContainerEdit } from '../../../types'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
    ContainerFieldType,
    ContentField,
    Metadata,
    Prisma,
    RightType,
    Section,
    SectionType,
    Status,
} from '@prisma/client'

import { prisma } from '../../../utils/prisma'
import getNameFieldFromType from '@utils/getNameFieldFromType'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.uid as string

    const container = await prisma.content.findUnique({
        where: { id },
        include: {
            metadatas: true,
            accesses: true,
            sections: true,
            slug: true,
            fields: { include: { media: true, childs: { include: { media: true } } } },
        },
    })

    if (!container) {
        return res.status(404).json({ error: 'Container not found' })
    }

    return res.status(200).json(container)
}

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.uid as string

    const newContentContent: FullContainerEdit = req.body

    // delete existing fields
    await prisma.contentField.deleteMany({
        where: {
            OR: [{ contentId: id }, { parent: { contentId: id } }],
            contentId: id,
        },
    })

    // put the fields separately
    const fields: ContentField[] = get(req, 'body.fields', [])
    delete newContentContent.fields

    const withMultiFields = fields.map((field, idx) => {
        if (field.multiple) {
            let valueName = getNameFieldFromType(field.type)

            if (
                field.type === ContainerFieldType.IMAGE ||
                field.type === ContainerFieldType.VIDEO ||
                field.type === ContainerFieldType.FILE
            ) {
                valueName = 'mediaId'
            }

            const values = get(field, valueName, [])

            return {
                ...field,
                contentId: id,
                childs: {
                    create: values?.map((e: any, i: number) => ({
                        name: field.name,
                        type: field.type,
                        [valueName]: e,
                    })),
                },
                [valueName]: undefined,
            }
        }

        return { ...field, contentId: id }
    })

    for (const field of withMultiFields) {
        await prisma.contentField.create({ data: field })
    }

    // delete existing metadatas
    await prisma.metadata.deleteMany({ where: { contentId: id } })

    // put the metadatas separately
    const newMetadatas: Metadata[] = get(req, 'body.metadatas', [])
    delete newContentContent.metadatas

    for (const metadata of newMetadatas) {
        await prisma.metadata.create({
            data: {
                contentId: id,
                name: metadata.name,
                content: metadata.content,
            },
        })
    }

    // delete existing sections
    await prisma.section.deleteMany({
        where: { contentId: id },
    })

    // create new sections
    const newSections: Section[] = get(req, 'body.sections', [])
    delete newContentContent.sections

    for (const section of newSections) {
        await prisma.section.create({
            data: {
                contentId: id,
                formId: section.formId,
                type: SectionType.PAGE,
                block: section.block,
                elementId: section.elementId,
                position: section.position,
                content: section.content as Prisma.InputJsonValue,
            },
        })
    }

    const newSlug = encodeURI(get(newContentContent, 'slug', '') as string)
    delete newContentContent.slug

    // create new access
    const newAccesses: string[] = get(req, 'body.accesses', [])
    delete newContentContent.accesses

    for (const roleId of newAccesses) {
        await prisma.access.create({
            data: {
                contentId: id,
                roleId,
            },
        })
    }

    // update the page
    const content = await prisma.content.update({
        where: { id },
        data: newContentContent,
        include: {
            metadatas: true,
            accesses: true,
            sections: true,
            fields: true,
            slug: { include: { parent: true } },
        },
    })

    if (content.slug?.basic !== newSlug) {
        await prisma.slug.update({
            where: { id: content.id || '' },
            data: { full: `${content.slug?.parent?.full}/${newSlug}`, basic: newSlug },
        })
    }

    res.status(200).json(content)

    return res.revalidate(`/${content.slug?.full}`) //`/${page.slug}`)
}

const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.uid as string

    const container = await prisma.container.update({
        where: {
            id,
        },
        data: {
            status: Status.DISCONTINUED,
        },
    })

    return res.status(200).json(container)
}

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
    const isAuth = await checkAuth(req.headers)

    if (!isAuth) {
        return res.status(403).json({ error: 'Forbidden' })
    }

    switch (req.method) {
        case 'GET': {
            if (isAuth.user.rights.includes(RightType.VIEW_CONTENT)) {
                return await GET(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        case 'PUT': {
            if (isAuth.user.rights.includes(RightType.UPDATE_CONTENT)) {
                return await PUT(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        case 'DELETE': {
            if (isAuth.user.rights.includes(RightType.DELETE_CONTENT)) {
                return await DELETE(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        default: {
            return res.status(404).json({ error: 'Not found' })
        }
    }
}

export default pages
