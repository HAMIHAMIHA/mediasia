import { Status } from '@prisma/client'
import checkAuth from '@utils/checkAuth'
import type { NextApiRequest, NextApiResponse } from 'next'
// import type { Page, Metadata, Section, element } from '@prisma/client'
// import get from 'lodash.get'

import { prisma } from '../../../utils/prisma'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const block = req.query.block as string | undefined
    const q = req.query.q as string | undefined

    let search: any = { where: { status: Status.AVAILABLE } }

    if (!!block) {
        search.where.block = block
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

    const element = await prisma.element.findMany(search)

    return res.status(200).json(element)
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const element = await prisma.element.create({
        data: { ...req.body },
    })

    return res.status(200).json(element)
}

const ERROR = async (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(405).json({ error: 'Method not allowed' })
}

const elements = async (req: NextApiRequest, res: NextApiResponse) => {
    const isAuth = await checkAuth(req.headers)

    if (!isAuth) {
        return res.status(403).json({ error: 'Forbidden' })
    }

    switch (req.method) {
        case 'GET': {
            return await GET(req, res)
        }

        case 'POST': {
            return await POST(req, res)
        }

        default: {
            return await ERROR(req, res)
        }
    }
}

export default elements
