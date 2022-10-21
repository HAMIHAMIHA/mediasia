import { Login, PrismaClient, RightType, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'
import get from 'lodash.get'
const prisma = new PrismaClient()

async function main() {
    const defaultContainer = await prisma.container.findUnique({
        where: { id: 'page' },
        include: { slug: true },
    })

    let parentId = get(defaultContainer, 'slug.id', undefined)

    if (!defaultContainer) {
        const newDefaultContainer = await prisma.container.create({
            data: {
                id: 'page',
                title: 'Default Page',
                published: true,
                slug: {
                    create: {
                        full: '',
                        basic: '',
                    },
                },
            },
            include: { slug: true },
        })

        parentId = get(newDefaultContainer, 'slug.id', undefined)
    }

    const notfound = await prisma.content.findUnique({
        where: { id: 'notfound' },
    })

    if (!notfound) {
        await prisma.content.create({
            data: {
                id: 'notfound',
                title: 'Not Found',
                containerId: 'page',
                published: true,
                slug: {
                    create: {
                        full: 'not-found',
                        basic: 'not-found',
                        parentId,
                    },
                },
            },
        })
    }

    const signin = await prisma.content.findUnique({
        where: { id: 'signin' },
    })

    if (!signin) {
        await prisma.content.create({
            data: {
                id: 'signin',
                title: 'Sign In',
                containerId: 'page',
                published: true,
                slug: {
                    create: {
                        full: 'sign-in',
                        basic: 'sign-in',
                        parentId,
                    },
                },
            },
        })
    }

    const superAdminType: Role[] = await prisma.role.findMany({
        where: { id: 'super-admin' },
    })

    if (!superAdminType.length) {
        await prisma.role.create({
            data: {
                id: 'super-admin',
                name: 'Super Admin',
                rights: {
                    create: [
                        { rightType: RightType.VIEW_MESSAGE },
                        { rightType: RightType.VIEW_CONTAINER },
                        { rightType: RightType.CREATE_CONTAINER },
                        { rightType: RightType.UPDATE_CONTAINER },
                        { rightType: RightType.DELETE_CONTAINER },
                        { rightType: RightType.VIEW_USER },
                        { rightType: RightType.CREATE_USER },
                        { rightType: RightType.UPDATE_USER },
                        { rightType: RightType.DELETE_USER },
                        { rightType: RightType.VIEW_ROLE },
                        { rightType: RightType.CREATE_ROLE },
                        { rightType: RightType.UPDATE_ROLE },
                        { rightType: RightType.DELETE_ROLE },
                        { rightType: RightType.VIEW_CONTENT },
                        { rightType: RightType.CREATE_CONTENT },
                        { rightType: RightType.UPDATE_CONTENT },
                        { rightType: RightType.DELETE_CONTENT },
                        { rightType: RightType.VIEW_ELEMENT },
                        { rightType: RightType.CREATE_ELEMENT },
                        { rightType: RightType.UPDATE_ELEMENT },
                        { rightType: RightType.DELETE_ELEMENT },
                        { rightType: RightType.VIEW_FORM },
                        { rightType: RightType.CREATE_FORM },
                        { rightType: RightType.UPDATE_FORM },
                        { rightType: RightType.DELETE_FORM },
                        { rightType: RightType.VIEW_LAYOUT },
                        { rightType: RightType.UPDATE_LAYOUT },
                        { rightType: RightType.VIEW_MEDIA },
                        { rightType: RightType.CREATE_MEDIA },
                        { rightType: RightType.UPDATE_MEDIA },
                        { rightType: RightType.DELETE_MEDIA },
                        { rightType: RightType.ACCESS_SETTINGS },
                        { rightType: RightType.REVALIDATION },
                    ],
                },
            },
        })
    }

    const admins: Login[] = await prisma.login.findMany({
        where: { roleId: 'super-admin' },
    })

    if (!admins.length) {
        const hash = await bcrypt.hash('root', 10)

        await prisma.user.create({
            data: {
                name: 'root',
                login: {
                    create: {
                        roleId: 'super-admin',
                        email: 'root',
                        password: hash,
                    },
                },
            },
        })
    }

    const revalidate = await prisma.setting.findUnique({
        where: { name: 'revalidate' },
    })

    if (!revalidate) {
        await prisma.setting.create({
            data: {
                name: 'revalidate',
                value: '86400',
            },
        })
    }

    const appname = await prisma.setting.findUnique({
        where: { name: 'app_name' },
    })

    if (!appname) {
        await prisma.setting.create({
            data: {
                name: 'app_name',
                value: 'NextJS App',
            },
        })
    }

    const bgcolor = await prisma.setting.findUnique({
        where: { name: 'background_color' },
    })

    if (!bgcolor) {
        await prisma.setting.create({
            data: {
                name: 'background_color',
                value: '#f0f2f5',
            },
        })
    }

    const primarycolor = await prisma.setting.findUnique({
        where: { name: 'primary_color' },
    })

    if (!primarycolor) {
        await prisma.setting.create({
            data: {
                name: 'primary_color',
                value: '#2196F3',
            },
        })
    }

    const secondarycolor = await prisma.setting.findUnique({
        where: { name: 'secondary_color' },
    })

    if (!secondarycolor) {
        await prisma.setting.create({
            data: {
                name: 'secondary_color',
                value: '#FF9800',
            },
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
