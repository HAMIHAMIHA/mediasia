import { IncomingHttpHeaders } from 'http'

import { prisma } from '../utils/prisma'

const checkAuth = async (headers: IncomingHttpHeaders) => {
    const session = await prisma.session.findFirst({
        where: {
            token: headers.token as string,
            expiresAt: { gte: new Date() },
        },
        include: {
            login: {
                include: {
                    user: true,
                    role: {
                        include: { rights: true },
                    },
                },
            },
        },
    })

    if (!!session) {
        return {
            token: session.token,
            expiresAt: session.expiresAt,
            user: {
                ...session.login.user,
                role: session.login.roleId,
                email: session.login.email,
                rights: session.login.role.rights.map((right) => right.rightType),
            },
        }
    }

    return false
}

export default checkAuth
