import { RightType } from '@prisma/client'
import checkAuth from '@utils/checkAuth'
import type { NextApiRequest, NextApiResponse } from 'next'
// import get from 'lodash.get'

import { prisma } from '../../utils/prisma'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const settings = await prisma.setting.findMany()
    return res.status(200).json(settings)
}

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, value } = req.body

    const updatedSetting = await prisma.setting.update({
        where: { name },
        data: {
            value,
        },
    })

    return res.status(200).json(updatedSetting)
}

const ERROR = async (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(405).json({ error: 'Method not allowed' })
}

const users = async (req: NextApiRequest, res: NextApiResponse) => {
    const isAuth = await checkAuth(req.headers)

    if (!isAuth) {
        return res.status(403).json({ error: 'Forbidden' })
    }

    switch (req.method) {
        case 'GET': {
            if (isAuth.user.rights.includes(RightType.ACCESS_SETTINGS)) {
                return await GET(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        case 'PUT': {
            if (isAuth.user.rights.includes(RightType.ACCESS_SETTINGS)) {
                return await PUT(req, res)
            }
            return res.status(404).json({ error: 'Not found' })
        }

        default: {
            return await ERROR(req, res)
        }
    }
}

export default users
