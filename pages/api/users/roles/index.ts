import { RightType } from '@prisma/client'
import checkAuth from '@utils/checkAuth'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../utils/prisma'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const q = req.query.q as string | undefined

    let search: any = { where: {} }

    if (!!q) {
        const sliptedQ = q.split(' ')

        if (sliptedQ.length === 1) {
            search.where.title = {
                contains: q,
            }
        } else {
            let OR = sliptedQ.map((word) => ({
                name: {
                    contains: word,
                },
            }))

            search.where.OR = OR
        }
    }

    const roles = await prisma.role.findMany(search)

    return res.status(200).json(roles)
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const name = req.body.name as string
    const rights = req.body.rights as RightType[]

    const role = await prisma.role.create({
        data: {
            name,
            rights: {
                create: rights.map((rightType) => ({ rightType })),
            },
        },
    })

    return res.status(200).json(role)
}

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
    const isAuth = await checkAuth(req.headers)

    if (!isAuth) {
        return res.status(403).json({ error: 'Forbidden' })
    }

    switch (req.method) {
        case 'GET': {
            if (isAuth.user.rights.includes(RightType.VIEW_ROLE)) {
                return await GET(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        case 'POST': {
            if (isAuth.user.rights.includes(RightType.CREATE_ROLE)) {
                return await POST(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        default: {
            return res.status(404).json({ error: 'Not found' })
        }
    }
}

export default pages
