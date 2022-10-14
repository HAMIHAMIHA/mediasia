// // pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'

import { prisma } from '../../utils/prisma'
import { Status } from '@prisma/client'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const slugs = await prisma.slug.findMany({
        where: {
            published: true,
            full: { not: 'not-found' },
            OR: [
                { container: { status: { not: Status.DISCONTINUED } } },
                { content: { status: { not: Status.DISCONTINUED } } },
            ],
        },
    })

    const paths = slugs.map((slug) => ({
        loc: `${process.env.SITE_URL}/${slug.full}`,
        lastmod: new Date().toISOString(),
    }))

    return getServerSideSitemap(ctx, paths)
}

export default function Sitemap() {}
