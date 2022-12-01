import EditPanel from '@components/EditPanel'
import LinkInput from '@components/LinkInput'
import MediaModal from '@components/MediaModal'
import StyledInput from '@components/StyledInput'
import { Select, Space, Switch, Typography } from 'antd'
import set from 'lodash.set'
import Image from 'next/image'
import type { Props } from '../types'

const { Text } = Typography

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    return (
        <EditPanel
            view={
                <>
                    <div className="left3_4">
                        <StyledInput.div
                            className="title yellow"
                            value={value.title}
                            onChange={(e) => handleChange('title', e)}
                        />
                        <StyledInput.div
                            className="content"
                            value={value.text}
                            onChange={(e) => handleChange('text', e)}
                        />
                        {value.hasButton && (
                            <StyledInput.div
                                className="button"
                                value={value.button}
                                onChange={(e) => handleChange('button', e)}
                            />
                        )}
                    </div>
                    <div className="right3_4" style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 3, left: 3, zIndex: 2 }}>
                            <MediaModal
                                withoutName
                                value={value.image}
                                onMediaSelected={(e) => handleChange('image', e)}
                            />
                        </div>
                        <Image
                            src={!!value.image ? `/api/uploads/images/${value.image?.uri}` : '/default.jpg'}
                            alt="brand1"
                            width={960}
                            height={500}
                            className="brand"
                        />
                    </div>
                </>
            }
            panel={
                <Space direction="vertical">
                    <Text>Has Button:</Text>
                    <Switch
                        checked={value.hasButton}
                        onChange={() => handleChange('hasButton', !value.hasButton)}
                    />

                    <Text>Button type:</Text>
                    {value.hasButton && (
                        <Select
                            value={value.buttonType}
                            onChange={(e) => handleChange('buttonType', e)}
                            style={{ width: 240 }}
                        >
                            <Select.Option value="link">Link</Select.Option>
                            <Select.Option value="file">File</Select.Option>
                        </Select>
                    )}
                    {value.hasButton && value.buttonType === 'link' && (
                        <>
                            <Text>Link:</Text>
                            <LinkInput
                                value={value.buttonLink}
                                onChange={(e) => handleChange('buttonLink', e)}
                            />
                        </>
                    )}
                    {value.hasButton && value.buttonType === 'file' && (
                        <>
                            <Text>File:</Text>
                            <MediaModal
                                type="FILE"
                                value={value.buttonFile}
                                onMediaSelected={(e) => handleChange('buttonFile', e)}
                            />
                        </>
                    )}
                </Space>
            }
        />
    )
}

export default Edit
