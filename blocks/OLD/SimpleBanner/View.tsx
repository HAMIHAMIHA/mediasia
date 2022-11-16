import styles from './SimpleBanner.module.css'
import type { Props } from '../../types'
import CustomImage from '@components/CustomImage'

const View = ({ value = {}, theme }: Props) => {
    const { image, title, text, reverse } = value

    return (
        <section className={styles.wrapper + (reverse ? ` ${styles.reverse}` : '')}>
            <div className={styles.info}>
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
            <div className={styles.imgWrap}>
                <CustomImage img={image} className={styles.image} />
            </div>
        </section>
    )
}

export default View
