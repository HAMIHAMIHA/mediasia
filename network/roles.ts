import INSTANCE from './api'
import { Prisma, RightType } from '@prisma/client'
import type { Role } from '@prisma/client'
import { FullRole } from '@types'

export const postRole = (data: Prisma.RoleCreateInput & { rights: RightType[] }): Promise<Role> =>
    new Promise(async (resolve, reject) => {
        INSTANCE({
            method: 'POST',
            url: `/api/users/roles`,
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        })
            .then(resolve)
            .catch(reject)
    })

export const editRole = (id: string, data: Prisma.RoleCreateInput & { rights: RightType[] }): Promise<Role> =>
    new Promise((resolve, reject) => {
        INSTANCE({
            method: 'PUT',
            url: `/api/users/roles/${id}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        })
            .then(resolve)
            .catch(reject)
    })

export const getRoles = (q?: string): Promise<Role[]> =>
    new Promise((resolve, reject) => {
        INSTANCE({
            method: 'GET',
            url: `/api/users/roles`,
            params: { q },
        })
            .then(resolve)
            .catch(reject)
    })

export const getRoleDetails = (id: string): Promise<FullRole> =>
    new Promise((resolve, reject) => {
        INSTANCE({
            method: 'GET',
            url: `/api/users/roles/${id}`,
        })
            .then(resolve)
            .catch(reject)
    })

export const deleteRole = (id: string): Promise<void> =>
    new Promise((resolve, reject) => {
        INSTANCE({
            method: 'DELETE',
            url: `/api/users/roles/${id}`,
        })
            .then(resolve)
            .catch(reject)
    })
