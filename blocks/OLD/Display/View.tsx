import moment from 'moment'

import type { Props } from '../../types'
import styles from './Display.module.css'

const View = ({ value = {}, theme, page }: Props) => {
    const { fields } = value

    const image = page?.fields?.find((e) => e.name === fields.image)?.media?.uri || ''
    const title = page?.fields?.find((e) => e.name === fields.title)?.textValue || ''
    const subtitle = page?.fields?.find((e) => e.name === fields.subtitle)?.dateValue || ''
    const description = page?.fields?.find((e) => e.name === fields.description)?.textValue || ''

    return (
        <section className={styles.display}>
            <div
                className={styles.img}
                style={{
                    backgroundImage: `url(/api/uploads/images/${image})`,
                }}
            />
            <div className={styles.container}>
                <h1>{title}</h1>
                <span>{moment(subtitle).isValid() ? moment(subtitle).format('DD MMM YYYY') : ''}</span>
                <p>{description}</p>
            </div>
        </section>
    )
}

export default View
