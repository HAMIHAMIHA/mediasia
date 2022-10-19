import set from 'lodash.set'

import styles from './SimpleTitle.module.css'
import type { Props } from '../types'
import StyledInput from '../../components/StyledInput'
import EditPanel from '../../components/EditPanel'

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    return (
        <EditPanel
            view={
                <section className={styles.title}>
                    <StyledInput.h1
                        className={styles.title}
                        value={value?.title}
                        onChange={(e) => handleChange('title', e)}
                    />
                </section>
            }
        />
    )
}

export default Edit
