import set from 'lodash.set'

import styles from './SimpleButton.module.css'
import type { Props } from '../types'
import StyledInput from '../../components/StyledInput'
import EditPanel from '../../components/EditPanel'
import LinkInput from '@components/LinkInput'
import ColorButton from '@components/ColorButton'
import { Button, Space } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const { title, link, color } = value

    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    return (
        <EditPanel
            view={
                <section className={styles.wrapper}>
                    <StyledInput.button
                        value={title}
                        style={{ backgroundColor: color }}
                        onChange={(e) => handleChange('title', e)}
                    />
                </section>
            }
            panel={
                <Space direction="vertical">
                    <LinkInput value={link} onChange={(e) => handleChange('link', e)} />
                    <Space>
                        <ColorButton value={color} onChange={(e) => handleChange('color', e)} />
                        <Button
                            type="primary"
                            size="small"
                            icon={<CloseOutlined />}
                            onClick={() => handleChange('color', undefined)}
                            danger
                        />
                    </Space>
                </Space>
            }
        />
    )
}

export default Edit
