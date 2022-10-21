import { RightType, Status } from '@prisma/client'
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

const elements = async (req: NextApiRequest, res: NextApiResponse) => {
    const isAuth = await checkAuth(req.headers)

    if (!isAuth) {
        return res.status(403).json({ error: 'Forbidden' })
    }

    switch (req.method) {
        case 'GET': {
            if (isAuth.user.rights.includes(RightType.VIEW_ELEMENT)) {
                return await GET(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        case 'POST': {
            if (isAuth.user.rights.includes(RightType.CREATE_ELEMENT)) {
                return await POST(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        default: {
            return res.status(404).json({ error: 'Not found' })
        }
    }
}

export default elements
