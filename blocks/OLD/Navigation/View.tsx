import Link from 'next/link'

import styles from './Title.module.css'
import type { Props } from '../types'

const View = ({ value = {} }: Props) => {
    const { links } = value

    return (
        <nav className={styles.navigation}>
            <div className={styles.container}>
                <ul>
                    {links?.map((e: any, i: number) => (
                        <li key={i}>
                            <Link href={e.link}>
                                <a>{e.title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default View
