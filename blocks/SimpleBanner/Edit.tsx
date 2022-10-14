import set from 'lodash.set'

import styles from './SimpleBanner.module.css'
import type { Props } from '../types'
import StyledInput from '../../components/StyledInput'
import EditPanel from '../../components/EditPanel'
import MediaModal from '@components/MediaModal'
import CustomImage from '@components/CustomImage'
import { Space, Switch, Typography } from 'antd'

const { Text } = Typography

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const { image, title, text, reverse } = value

    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    return (
        <EditPanel
            view={
                <section className={styles.wrapper + (reverse ? ` ${styles.reverse}` : '')}>
                    <div className={styles.info}>
                        <StyledInput.h2
                            className={styles.title}
                            value={title}
                            onChange={(e) => handleChange('title', e)}
                        />
                        <StyledInput.p
                            className={styles.text}
                            value={text}
                            onChange={(e) => handleChange('text', e)}
                        />
                    </div>
                    <div className={styles.imgWrap}>
                        <CustomImage img={image} className={styles.image} />
                    </div>
                </section>
            }
            panel={
                <Space direction="vertical">
                    <MediaModal value={value.image} onMediaSelected={(e) => handleChange('image', e)} />

                    <Space>
                        <Text>Direction :</Text>
                        <Switch checked={reverse} onChange={(e) => handleChange('reverse', e)} />
                    </Space>
                </Space>
            }
        />
    )
}

export default Edit
