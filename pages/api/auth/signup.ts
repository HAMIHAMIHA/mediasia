import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import isEmail from '@utils/isEmail'
import { initSession } from '@utils'
import { prisma } from '@utils/prisma'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email, password, name } = req.body

        if (!isEmail(email) && typeof email !== 'string') {
            throw new Error('Email must be a valid email address.')
        }

        if (typeof password !== 'string') {
            throw new Error('Password must be a string.')
        }

        if (typeof name !== 'string') {
            throw new Error('Name must be a string.')
        }

        const hash = await bcrypt.hash(password, 10)

        const login = await prisma.login.create({
            data: {
                email: email as string,
                password: hash as string,
                user: {
                    create: {
                        name: name as string,
                    },
                },
            },
            include: { user: true },
        })

        if (!login) {
            throw new Error('Email already exist.')
        }

        const session = await initSession(login.id)

        return res.status(201).json({
            token: session.token,
            expiresAt: session.expiresAt,
        })
    } catch (err) {
        res.status(400).json({ errors: err })
    }
}

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST': {
            return await POST(req, res)
        }

        default: {
            return res.status(404).json({ error: 'Not found' })
        }
    }
}

export default pages
