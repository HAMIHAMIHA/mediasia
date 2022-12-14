import Head from 'next/head'

import EditPageButton from '../../components/EditPageButton'
import { PageProps } from '../../types'
import SectionBlock from '../../components/SectionBlock'

interface PageDisplayProps {
    pageProps: PageProps
    onEmpty: JSX.Element
    noTitle?: boolean
}

const PageDisplay = ({ pageProps, onEmpty, noTitle = false }: PageDisplayProps) => {
    const {
        id,
        type,
        title,
        appName,
        theme,
        topSections,
        sections,
        bottomSections,
        metadatas,
        headerSections,
        footerSections,
    } = pageProps

    return (
        <>
            <Head>
                <link rel="icon" href="/api/uploads/favicon.ico" />
                <title>{noTitle ? appName : `${appName} | ${title}`}</title>
                {metadatas?.map((meta) => (
                    <meta key={meta.id} name={meta.name} content={meta.content} />
                ))}
            </Head>

            <EditPageButton redirectTo={`/admin/${type === 'CONTAINER' ? 'containers' : 'contents'}/${id}`} />

            <header>
                {headerSections?.map((section) => (
                    <SectionBlock key={section.id} section={section} page={pageProps} theme={theme} />
                ))}
            </header>

            <main>
                {topSections?.map((section) => (
                    <SectionBlock key={section.id} section={section} page={pageProps} theme={theme} />
                ))}
                {!sections?.length && onEmpty}
                {sections?.map((section) => (
                    <SectionBlock key={section.id} section={section} page={pageProps} theme={theme} />
                ))}
                {bottomSections?.map((section) => (
                    <SectionBlock key={section.id} section={section} page={pageProps} theme={theme} />
                ))}
            </main>

            <footer>
                {footerSections?.map((section) => (
                    <SectionBlock key={section.id} section={section} page={pageProps} theme={theme} />
                ))}
            </footer>
        </>
    )
}

export default PageDisplay
