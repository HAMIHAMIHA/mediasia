import INSTANCE from './api'
import { Content } from '@prisma/client'

export const getContents = (container?: string, q?: string): Promise<Content[]> =>
    new Promise((resolve, reject) => {
        INSTANCE({
            method: 'GET',
            url: `/api/public/contents`,
            headers: {
                'Content-Type': 'application/json',
            },
            params: { q, container },
        })
            .then(resolve)
            .catch(reject)
    })
