import { RightType, SectionType } from '@prisma/client'
import checkAuth from '@utils/checkAuth'
import type { NextApiRequest, NextApiResponse } from 'next'
// import get from 'lodash.get'

import { prisma } from '../../utils/prisma'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const header = await prisma.section.findMany({
        where: { type: SectionType.HEADER },
    })

    const topBody = await prisma.section.findMany({
        where: { type: SectionType.TOP_BODY },
    })

    const bottomBody = await prisma.section.findMany({
        where: { type: SectionType.BOTTOM_BODY },
    })

    const footer = await prisma.section.findMany({
        where: { type: SectionType.FOOTER },
    })

    return res.status(200).json({ header, topBody, bottomBody, footer })
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const { header, topBody, bottomBody, footer } = req.body

    // delete existing sections
    await prisma.section.deleteMany({
        where: { type: SectionType.HEADER },
    })

    // create new sections
    for (const section of header) {
        await prisma.section.create({
            data: {
                formId: section.formId,
                type: SectionType.HEADER,
                block: section.block,
                elementId: section.elementId,
                position: section.position,
                content: section.content || undefined,
            },
        })
    }

    // delete existing sections
    await prisma.section.deleteMany({
        where: { type: SectionType.TOP_BODY },
    })

    // create new sections
    for (const section of topBody) {
        await prisma.section.create({
            data: {
                formId: section.formId,
                type: SectionType.TOP_BODY,
                block: section.block,
                elementId: section.elementId,
                position: section.position,
                content: section.content || undefined,
            },
        })
    }

    // delete existing sections
    await prisma.section.deleteMany({
        where: { type: SectionType.BOTTOM_BODY },
    })

    // create new sections
    for (const section of bottomBody) {
        await prisma.section.create({
            data: {
                formId: section.formId,
                type: SectionType.BOTTOM_BODY,
                block: section.block,
                elementId: section.elementId,
                position: section.position,
                content: section.content || undefined,
            },
        })
    }

    // delete existing sections
    await prisma.section.deleteMany({
        where: { type: SectionType.FOOTER },
    })

    // create new sections
    for (const section of footer) {
        await prisma.section.create({
            data: {
                formId: section.formId,
                type: SectionType.FOOTER,
                block: section.block,
                elementId: section.elementId,
                position: section.position,
                content: section.content || undefined,
            },
        })
    }

    return res.status(200).json({ message: 'Updated !' })
}

const users = async (req: NextApiRequest, res: NextApiResponse) => {
    const isAuth = await checkAuth(req.headers)

    if (!isAuth) {
        return res.status(403).json({ error: 'Forbidden' })
    }

    switch (req.method) {
        case 'GET': {
            if (isAuth.user.rights.includes(RightType.VIEW_LAYOUT)) {
                return await GET(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        case 'POST': {
            if (isAuth.user.rights.includes(RightType.UPDATE_LAYOUT)) {
                return await POST(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        default: {
            return res.status(404).json({ error: 'Not found' })
        }
    }
}

export default users
