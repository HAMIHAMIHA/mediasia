import CryptoJS from 'crypto-js'
// import type { Login, Session, User } from '@prisma/client'
// import crypto from 'crypto'
import { prisma } from '../utils/prisma'

export function makeId(length: number) {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

export const initSession = async (loginId: string) => {
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + 2)

    const token: string = generateToken(`${loginId}.${expiresAt.getMilliseconds()}`)
    const session = await prisma.session.create({
        data: {
            token,
            loginId,
            expiresAt,
        },
    })

    return session
}

export const generateToken = (message: string) => CryptoJS.SHA3(message, { outputLength: 512 }).toString()
