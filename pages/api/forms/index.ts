import { Prisma, RightType, Status } from '@prisma/client'
import { FullFormEdit } from '../../../types'
import get from 'lodash.get'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../utils/prisma'
import checkAuth from '@utils/checkAuth'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const q = req.query.q as string | undefined

    let search: any = { where: { status: Status.AVAILABLE } }

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

    const forms = await prisma.form.findMany({
        ...search,
        // include: { fields: true },
        // _count: { fields: true },
        include: {
            _count: {
                select: { fields: true },
            },
        },
    })

    return res.status(200).json(forms)
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const newFormContent = req.body as FullFormEdit

    const fields: Prisma.FormFieldCreateInput[] = get(req, 'body.fields', [])
    delete newFormContent.fields

    const article = await prisma.form.create({
        data: {
            ...(newFormContent as Prisma.FormCreateInput),
            fields: { create: fields },
        },
    })

    return res.status(200).json(article)
}

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
    const isAuth = await checkAuth(req.headers)

    if (!isAuth) {
        return res.status(403).json({ error: 'Forbidden' })
    }

    switch (req.method) {
        case 'GET': {
            if (isAuth.user.rights.includes(RightType.VIEW_FORM)) {
                return await GET(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        case 'POST': {
            if (isAuth.user.rights.includes(RightType.CREATE_FORM)) {
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
