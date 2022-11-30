import type { NextApiRequest, NextApiResponse } from 'next'
import { Status } from '@prisma/client'

import { prisma } from '../../../utils/prisma'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const container = req.query.container as string | undefined
    const q = req.query.q as string | undefined

    let search: any = {
        where: { status: Status.AVAILABLE },
        include: {
            metadatas: true,
            accesses: true,
            sections: true,
            slug: true,
            fields: { include: { media: true, childs: { include: { media: true } } } },
        },
        orderBy: {
            updatedAt: 'desc',
        },
    }

    if (!!container) {
        search.where.containerId = container
    }

    if (!!q) {
        const sliptedQ = q.split(' ')

        if (sliptedQ.length === 1) {
            search.where.title = {
                contains: q,
            }
        } else {
            let OR = sliptedQ.map((word) => ({
                title: {
                    contains: word,
                },
            }))

            search.where.OR = OR
        }
    }

    const contents = await prisma.content.findMany(search)

    return res.status(200).json(contents)
}

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET': {
            return await GET(req, res)
        }

        default: {
            return res.status(404).json({ error: 'Not found' })
        }
    }
}

export default pages
