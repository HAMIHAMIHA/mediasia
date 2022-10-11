import styles from './Title.module.css'

import type { Props } from '../types'

const View = ({ value = {}, theme }: Props) => {
    const { title } = value

    return (
        <section className={styles.title}>
            <h1>{title}</h1>
        </section>
    )
}

export default View
