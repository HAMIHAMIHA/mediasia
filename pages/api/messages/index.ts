import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../utils/prisma'
import checkAuth from '../../../utils/checkAuth'
import { MESSAGE_PAGE_SIZE } from '../../../utils/contants'
import { RightType } from '@prisma/client'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    let page = 0
    const formId = req.query.formId as string
    const read = req.query.read as string

    let where: any = {}

    if (!!req.query.page) {
        page = parseInt(req.query.page as string)
    }

    if (read !== undefined) {
        where.read = read === 'true'
    }

    if (!!formId) {
        where.formId = formId
    }

    const count = await prisma.message.count({ where })

    const messages = await prisma.message.findMany({
        skip: MESSAGE_PAGE_SIZE * page,
        take: MESSAGE_PAGE_SIZE,
        where,
        orderBy: {
            createdAt: 'desc',
        },
        include: { form: { include: { fields: true } } },
    })
    return res.status(200).json({ messages, count })
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const { formId, content } = req.body

    const message = await prisma.message.create({
        data: {
            formId: formId as string,
            value: content as string,
        },
    })

    return res.status(200).json(message)
}

const users = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET': {
            const isAuth = await checkAuth(req.headers)

            if (!!isAuth && isAuth.user.rights.includes(RightType.VIEW_MESSAGE)) {
                return await GET(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        case 'POST': {
            return await POST(req, res)
        }

        default: {
            return res.status(404).json({ error: 'Not found' })
        }
    }
}

export default users
