import { Metadata, Prisma, RightType, Section, SectionType, Status } from '@prisma/client'
import { FullContainerEdit } from '@types'
import checkAuth from '@utils/checkAuth'
import get from 'lodash.get'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../utils/prisma'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.uid as string

    const container = await prisma.container.findUnique({
        where: { id },
        include: {
            metadatas: true,
            accesses: true,
            sections: true,
            contentSections: true,
            fields: true,
            slug: true,
        },
    })

    if (!container) {
        return res.status(404).json({ error: 'Container not found' })
    }

    return res.status(200).json(container)
}

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.uid as string

    const newContainerContent: FullContainerEdit = req.body

    // delete existing fields
    await prisma.containerField.deleteMany({
        where: { containerId: id },
    })

    // put the fields separately
    const newFields = get(req, 'body.fields', [])
    delete newContainerContent.fields

    for (const field of newFields) {
        await prisma.containerField.create({
            data: {
                containerId: id,
                ...field,
                options: field?.options || undefined,
            },
        })
    }

    // delete existing metadatas
    await prisma.metadata.deleteMany({
        where: { containerId: id },
    })

    // put the metadatas separately
    const newMetadatas: Metadata[] = get(req, 'body.metadatas', [])
    delete newContainerContent.metadatas

    for (const metadata of newMetadatas) {
        await prisma.metadata.create({
            data: {
                containerId: id,
                name: metadata.name,
                content: metadata.content,
            },
        })
    }

    // delete existing sections
    await prisma.section.deleteMany({
        where: { containerId: id },
    })

    // create new sections
    const newSections: Section[] = get(req, 'body.sections', [])
    delete newContainerContent.sections

    for (const section of newSections) {
        await prisma.section.create({
            data: {
                containerId: id,
                formId: section.formId,
                type: SectionType.PAGE,
                block: section.block,
                elementId: section.elementId,
                position: section.position,
                content: section?.content || undefined,
            },
        })
    }

    // delete existing sections
    await prisma.section.deleteMany({
        where: { containerContentId: id },
    })

    // create new sections
    const newContentSections: Section[] = get(req, 'body.contentSections', [])

    for (const section of newContentSections) {
        await prisma.section.create({
            data: {
                containerContentId: id,
                formId: section.formId,
                type: SectionType.PAGE,
                block: section.block,
                elementId: section.elementId,
                position: section.position,
                content: section?.content || undefined,
            },
        })
    }
    delete newContainerContent.contentSections

    // delete existing access
    await prisma.access.deleteMany({
        where: { containerId: id },
    })

    // create new access
    const newAccesses: string[] = get(req, 'body.accesses', [])
    delete newContainerContent.accesses

    for (const roleId of newAccesses) {
        await prisma.access.create({
            data: {
                containerId: id,
                roleId,
            },
        })
    }

    const newSlug = encodeURI(newContainerContent.slugEdit?.join('/') || '')
    delete newContainerContent.slug
    delete newContainerContent.slugEdit

    // update the page
    const container = await prisma.container.update({
        where: { id },
        data: newContainerContent as Prisma.ContainerCreateInput,
        include: {
            metadatas: true,
            accesses: true,
            sections: true,
            contentSections: true,
            fields: true,
            contents: true,
            slug: true,
        },
    })

    if (container.slug?.full === newSlug) {
        res.status(200).json(container)

        return res.revalidate(`/${container.slug?.full}`)
    }

    const slugs = await prisma.slug.findUnique({
        where: { containerId: id },
        include: { childs: true },
    })

    await prisma.slug.update({
        where: { id: slugs?.id },
        data: {
            full: newSlug,
            basic: newSlug,
        },
    })

    await res.revalidate(`/${newSlug}`)

    for (const child of slugs!.childs) {
        const full = `${newSlug}/${child.basic}`

        await prisma.slug.update({
            where: { id: child.id },
            data: { full },
        })

        await res.revalidate(`/${full}`)
    }

    res.status(200).json(container)
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
            if (isAuth.user.rights.includes(RightType.VIEW_CONTAINER)) {
                return await GET(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        case 'PUT': {
            if (isAuth.user.rights.includes(RightType.UPDATE_CONTAINER)) {
                return await PUT(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        case 'DELETE': {
            if (isAuth.user.rights.includes(RightType.DELETE_CONTAINER)) {
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
