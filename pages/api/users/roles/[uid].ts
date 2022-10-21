import { RightType } from '@prisma/client'
import checkAuth from '@utils/checkAuth'
import type { NextApiRequest, NextApiResponse } from 'next'
// import type { Page, Metadata, Section, Article } from '@prisma/client'
// import get from 'lodash.get'

import { prisma } from '../../../../utils/prisma'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.uid as string

    const role = await prisma.role.findUnique({
        where: { id },
        include: { rights: true },
    })

    if (!role) return res.status(404).json({ error: 'Role not found' })

    return res.status(200).json(role)
}

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.uid as string
    const name = req.body.name as string
    const rights = req.body.rights as RightType[]

    await prisma.right.deleteMany({
        where: { roleId: id },
    })

    const article = await prisma.role.update({
        where: { id },
        data: {
            name,
            rights: {
                create: rights.map((rightType) => ({ rightType })),
            },
        },
    })

    return res.status(200).json(article)
}

const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.uid as string

    const role = await prisma.role.delete({ where: { id } })

    return res.status(200).json(role)
}

const ERROR = async (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(405).json({ error: 'Method not allowed' })
}

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
    const isAuth = await checkAuth(req.headers)

    if (!isAuth) {
        return res.status(403).json({ error: 'Forbidden' })
    }

    switch (req.method) {
        case 'GET': {
            return await GET(req, res)
        }

        case 'PUT': {
            return await PUT(req, res)
        }

        case 'DELETE': {
            return await DELETE(req, res)
        }

        default: {
            return await ERROR(req, res)
        }
    }
}

export default pages
