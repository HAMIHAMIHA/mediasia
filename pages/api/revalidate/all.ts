import { RightType, Status } from '@prisma/client'
import checkAuth from '@utils/checkAuth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/prisma'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const slugs = await prisma.slug.findMany({
        where: {
            published: true,
            OR: [
                { container: { published: true, status: Status.AVAILABLE } },
                { content: { published: true, status: Status.AVAILABLE } },
            ],
        },
    })

    try {
        const urls: string[] = []

        for (const slug of slugs) {
            const uri = `/${slug.full}`
            await res.revalidate(uri)
            urls.push(uri)
        }

        return res.status(200).json({ revalidated: urls })
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
    const isAuth = await checkAuth(req.headers)

    if (!isAuth) {
        return res.status(403).json({ error: 'Forbidden' })
    }

    switch (req.method) {
        case 'POST': {
            if (!!isAuth && isAuth.user.rights.includes(RightType.REVALIDATION)) {
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
