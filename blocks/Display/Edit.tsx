import { Card, Select, Space, Typography } from 'antd'
import set from 'lodash.set'
import get from 'lodash.get'
import { ContainerFieldType } from '@prisma/client'

import styles from './Display.module.css'
import type { Props } from '../types'

const { Option } = Select
const { Text } = Typography

const Edit = ({ value = {}, onChange, theme, fields }: Props) => {
    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    const isText = (type: string) =>
        type === ContainerFieldType.STRING || type === ContainerFieldType.PARAGRAPH

    return (
        <EditPanel
            view={
                <section className={styles.display}>
                    <div
                        className={styles.img}
                        style={{
                            backgroundImage: 'url(/default.png)',
                        }}
                    />
                    <h1>this is a title</h1>
                    <span>18 Oct 2021</span>
                    <p>
                        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum
                    </p>
                </section>
            }
            panel={
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Text>Image :</Text>
                    <Select
                        style={{ width: '100%' }}
                        value={get(value, 'fields.image', undefined)}
                        onChange={(e) => handleChange('fields.image', e)}
                    >
                        {fields?.map((field) => (
                            <Option
                                disabled={field.type !== ContainerFieldType.IMAGE}
                                key={field.name}
                                value={field.name}
                            >
                                {field.label}
                            </Option>
                        ))}
                    </Select>
                    <Text>Title :</Text>
                    <Select
                        style={{ width: '100%' }}
                        value={get(value, 'fields.title', undefined)}
                        onChange={(e) => handleChange('fields.title', e)}
                    >
                        {fields?.map((field) => (
                            <Option disabled={!isText(field.type)} key={field.name} value={field.name}>
                                {field.label}
                            </Option>
                        ))}
                    </Select>
                    <Text>Subtitle :</Text>
                    <Select
                        style={{ width: '100%' }}
                        value={get(value, 'fields.subtitle', undefined)}
                        onChange={(e) => handleChange('fields.subtitle', e)}
                    >
                        {fields?.map((field) => (
                            <Option
                                disabled={field.type !== ContainerFieldType.DATE}
                                key={field.name}
                                value={field.name}
                            >
                                {field.label}
                            </Option>
                        ))}
                    </Select>
                    <Text>Description :</Text>
                    <Select
                        style={{ width: '100%' }}
                        value={get(value, 'fields.description', undefined)}
                        onChange={(e) => handleChange('fields.description', e)}
                    >
                        {fields?.map((field) => (
                            <Option disabled={!isText(field.type)} key={field.name} value={field.name}>
                                {field.label}
                            </Option>
                        ))}
                    </Select>
                </Space>
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
