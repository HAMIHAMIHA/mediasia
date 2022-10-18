import Link from 'next/link'
import { Button, Result } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import type { GetStaticPathsContext } from 'next'

import getPagePropsFromUrl from '../utils/getPagePropsFromUrl'

import { PageProps } from '../types'
import PageDisplay from '../components/PageDisplay'

const Home = (props: PageProps) => (
    <PageDisplay pageProps={props} onEmpty={<DefaultHome appName={props.appName} />} />
)

const DefaultHome = ({ appName }: { appName?: string }) => {
    return (
        <div
            style={{
                height: '50vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Result
                icon={<HomeOutlined />}
                title={`Welcome to ${appName}! Login to start edit your website.`}
                extra={
                    <Link href="/sign-in">
                        <a>
                            <Button type="primary">Sign In</Button>
                        </a>
                    </Link>
                }
            />
        </div>
    )
}

export async function getStaticProps(context: GetStaticPathsContext) {
    return await getPagePropsFromUrl('')
}

export default Home
