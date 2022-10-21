import checkAuth from '@utils/checkAuth'
import type { NextApiRequest, NextApiResponse } from 'next'

const me = async (req: NextApiRequest, res: NextApiResponse) => {
    const isAuth = await checkAuth(req.headers)

    if (!isAuth) {
        return res.status(403).json({ error: 'Forbidden' })
    }

    switch (req.method) {
        case 'GET': {
            return res.status(200).json(isAuth.user)
        }

        default: {
            return res.status(404).json({ error: 'Not found' })
        }
    }
}

export default me
