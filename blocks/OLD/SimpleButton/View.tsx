import styles from './SimpleButton.module.css'
import type { Props } from '../types'
import Link from 'next/link'

const View = ({ value = {}, theme }: Props) => {
    const { title, link, color } = value

    return (
        <section className={styles.wrapper}>
            <Link href={link || '/'}>
                <a>
                    <button style={{ backgroundColor: color }}>{title || 'Submit'}</button>
                </a>
            </Link>
        </section>
    )
}

export default View
