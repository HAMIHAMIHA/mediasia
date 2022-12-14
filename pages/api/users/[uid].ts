import type { NextApiRequest, NextApiResponse } from 'next'
// import type { User, Login } from '@prisma/client'
// import get from 'lodash.get'
import bcrypt from 'bcryptjs'
// import { LoginOutlined } from '@ant-design/icons'

import { prisma } from '../../../utils/prisma'
import checkAuth from '@utils/checkAuth'
import { RightType } from '@prisma/client'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.uid as string

    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            login: {
                select: {
                    role: true,
                    email: true,
                },
            },
        },
    })

    if (!user) return res.status(404).json({ error: 'User not found' })

    return res.status(200).json({
        ...user,
    })
}

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.uid as string

    const { roleId, name, password, email } = req.body

    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            name,
        },
    })

    let hash = undefined
    if (password) {
        hash = await bcrypt.hash(password, 10)
    }

    const updatedLogin = await prisma.login.update({
        where: { userId: id },
        data: {
            password: hash,
            roleId,
            email,
        },
    })

    return res.status(200).json({
        ...updatedUser,
        login: { roleId: updatedLogin.roleId, email: updatedLogin.email },
    })
}

const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.uid as string

    const login = await prisma.login.findUnique({ where: { userId: id } })

    if (!login || login.roleId === 'super-admin') {
        return res.status(405).json('Method not allowed')
    }

    await prisma.login.delete({ where: { userId: id } })

    await prisma.session.deleteMany({ where: { loginId: login.id } })
    await prisma.user.delete({ where: { id } })

    return res.status(200).json('User deleted')
}

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
    const isAuth = await checkAuth(req.headers)

    if (!isAuth) {
        return res.status(403).json({ error: 'Forbidden' })
    }

    switch (req.method) {
        case 'GET': {
            if (isAuth.user.rights.includes(RightType.VIEW_USER)) {
                return await GET(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        case 'PUT': {
            if (isAuth.user.rights.includes(RightType.UPDATE_USER)) {
                return await PUT(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        case 'DELETE': {
            if (isAuth.user.rights.includes(RightType.DELETE_USER)) {
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
