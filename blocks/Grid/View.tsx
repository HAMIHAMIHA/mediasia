import get from 'lodash.get'
import Link from 'next/link'
import moment from 'moment'

import type { Props } from '../types'
import styles from './Grid.module.css'

const View = ({ value = {}, theme, page }: Props) => {
    // const { primary, secondary, background } = theme
    const { fields } = value

    return (
        <section className={styles.grid}>
            <h1>{page?.title}</h1>
            <div className={styles.container}>
                {page?.contents?.map((content, i) => {
                    const url = get(content, 'slug.full', '/')
                    const image = content.fields.find((e) => e.name === fields.image)?.media?.uri || ''
                    const title = content.fields.find((e) => e.name === fields.title)?.textValue || ''
                    const subtitle = content.fields.find((e) => e.name === fields.subtitle)?.dateValue || ''
                    const description =
                        content.fields.find((e) => e.name === fields.description)?.textValue || ''

                    return (
                        <Link key={i} href={`/${url}`}>
                            <a>
                                <div className={styles.card}>
                                    <div
                                        className={styles.img}
                                        style={{
                                            backgroundImage: `url(/api/uploads/images/${image})`,
                                        }}
                                    />
                                    <h3>{title}</h3>
                                    <span>
                                        {moment(subtitle).isValid()
                                            ? moment(subtitle).format('DD MMM YYYY')
                                            : ''}
                                    </span>
                                    <p>{description}</p>
                                </div>
                            </a>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default View
