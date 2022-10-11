import { useState } from 'react'
import styles from './Title.module.css'

import type { Props } from '../types'
import { Card } from 'antd'
import StyledInput from '../../components/StyledInput'
import set from 'lodash.set'

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        console.log('001', newValue)

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    return (
        <EditPanel
            view={
                <section className={styles.title}>
                    <StyledInput.h1
                        // style={{
                        //     color: primary,
                        //     textShadow: `0.025em 0.025em 0 ${background}, 0.05em 0.05em 0 ${secondary}, 0.075em 0.075em 0 ${background}, 0.1em 0.1em 0 ${secondary}`,
                        // }}
                        className={styles.title}
                        value={value.title}
                        onChange={(e) => handleChange('title', e)}
                    />
                </section>
            }
        />
    )
}

interface PanelProps {
    view: JSX.Element
    panel?: JSX.Element
}

const EditPanel = ({ view, panel }: PanelProps) => (
    <div style={{ display: 'flex' }}>
        <div style={{ flex: 5, backgroundColor: 'rgb(240, 242, 245)' }}>{view}</div>
        {!!panel && (
            <Card title="Settings Panel" style={{ flex: 1, marginTop: 1 }} bordered={false}>
                {panel}
            </Card>
        )}
    </div>
)

export default Edit
