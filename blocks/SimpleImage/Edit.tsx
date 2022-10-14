import set from 'lodash.set'

import styles from './SimpleImage.module.css'
import type { Props } from '../types'
import StyledInput from '../../components/StyledInput'
import EditPanel from '../../components/EditPanel'
import MediaModal from '@components/MediaModal'
import CustomImage from '@components/CustomImage'

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    return (
        <EditPanel
            view={
                <section className={styles.wrapper}>
                    <CustomImage img={value.image} className={styles.image} />
                </section>
            }
            panel={
                <>
                    <MediaModal value={value.image} onMediaSelected={(e) => handleChange('image', e)} />
                </>
            }
        />
    )
}

export default Edit
