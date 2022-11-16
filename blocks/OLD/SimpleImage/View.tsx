import styles from './SimpleImage.module.css'
import type { Props } from '../types'
import CustomImage from '@components/CustomImage'

const View = ({ value = {}, theme }: Props) => {
    const { image } = value

    return (
        <section className={styles.wrapper}>
            <CustomImage img={image} className={styles.image} />
        </section>
    )
}

export default View
