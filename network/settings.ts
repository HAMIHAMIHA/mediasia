import INSTANCE from './api'
import type { Setting } from '@prisma/client'

export const getSettings = (): Promise<Setting[]> =>
    new Promise((resolve, reject) => {
        INSTANCE({
            method: 'GET',
            url: `/api/settings`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resolve)
            .catch(reject)
    })

export const editSetting = (name: string, value: string): Promise<Setting> =>
    new Promise((resolve, reject) => {
        INSTANCE({
            method: 'PUT',
            url: `/api/settings`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: { name, value },
        })
            .then(resolve)
            .catch(reject)
    })
