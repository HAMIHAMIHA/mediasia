import { RightType, Status } from '@prisma/client'
import checkAuth from '@utils/checkAuth'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../utils/prisma'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const slugs = await prisma.slug.findMany({
        orderBy: { full: 'asc' },
        where: {
            published: true,
            container: { published: true, status: Status.AVAILABLE },
        },
        select: {
            container: { select: { title: true } },
            full: true,
            childs: {
                where: {
                    published: true,
                    content: {
                        published: true,
                        status: Status.AVAILABLE,
                    },
                },
                select: {
                    full: true,
                    content: {
                        select: {
                            title: true,
                        },
                    },
                },
            },
        },
    })

    return res.status(200).json(slugs)
}

const me = async (req: NextApiRequest, res: NextApiResponse) => {
    const isAuth = await checkAuth(req.headers)

    if (!isAuth) {
        return res.status(403).json({ error: 'Forbidden' })
    }

    switch (req.method) {
        case 'GET': {
            if (
                isAuth.user.rights.includes(RightType.UPDATE_CONTAINER) ||
                isAuth.user.rights.includes(RightType.UPDATE_CONTENT)
            ) {
                return await GET(req, res)
            }
            return res.status(405).json({ error: 'Method not allowed' })
        }

        default: {
            return res.status(404).json({ error: 'Not found' })
        }
    }
}

export default me
