// import { FullArticleEdit } from '../../../types'
import type { NextApiRequest, NextApiResponse } from 'next'
// import type { Page, Metadata, Section, Article } from '@prisma/client'
// import get from 'lodash.get'

import { prisma } from '../../../utils/prisma'
import { FormField, RightType } from '@prisma/client'
import get from 'lodash.get'
import { FullFormEdit } from '../../../types'
import checkAuth from '@utils/checkAuth'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.uid as string

    const form = await prisma.form.findUnique({
        where: { id },
        include: { fields: true },
    })

    if (!form) return res.status(404).json({ error: 'Form not found' })

    return res.status(200).json(form)
}

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.uid as string
    const newFormContent: FullFormEdit = req.body

    // delete existing sections
    await prisma.formField.deleteMany({
        where: { formId: id },
    })

    // create new sections
    const newFields: FormField[] = get(req, 'body.fields', [])
    delete newFormContent.fields

    for (const field of newFields) {
        await prisma.formField.create({
            data: {
                formId: id,
                name: field.name,
                type: field.type,
                label: field.label,
                placeholder: field.placeholder,
                position: field.position,
                options: field?.options || undefined,
                required: field.required,

                defaultText: field.defaultText,
                defaultMultiple: field?.defaultMultiple || undefined,
                defaultNumber: field.defaultNumber,
                min: field.min,
                max: field.max,
            },
        })
    }

    const form = await prisma.form.update({
        where: { id },
        data: newFormContent,
        include: { fields: true },
    })

    return res.status(200).json(form)
}

const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.uid as string

    await prisma.formField.deleteMany({ where: { formId: id } })

    const form = await prisma.form.delete({ where: { id } })

    return res.status(200).json(form)
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

        case 'PUT': {
            if (isAuth.user.rights.includes(RightType.UPDATE_FORM)) {
                return await PUT(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        case 'DELETE': {
            if (isAuth.user.rights.includes(RightType.DELETE_FORM)) {
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
