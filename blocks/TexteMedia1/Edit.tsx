import EditPanel from '@components/EditPanel'
import LinkInput from '@components/LinkInput'
import MediaModal from '@components/MediaModal'
import StyledInput from '@components/StyledInput'
import { Select, Space, Switch, Typography } from 'antd'
import set from 'lodash.set'
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
                    <div className="left-box">
                        <div className="text-box">
                            <StyledInput.h1
                                value={value.title}
                                className="text-box-title"
                                onChange={(e) => handleChange('title', e)}
                            />
                            <div className="text-box-text">
                                <StyledInput.div
                                    className="text2"
                                    value={value.text}
                                    onChange={(e) => handleChange('text', e)}
                                />
                            </div>
                            {value.hasButton && (
                                <div className="button cursorPointer">
                                    <div className="icon-mail"></div>
                                    <div className="title-color-text">
                                        <StyledInput
                                            style={{ width: '15rem' }}
                                            value={value.buttonText}
                                            onChange={(e) => handleChange('buttonText', e)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className="right-box"
                        style={{
                            position: 'relative',
                            backgroundImage: `url(${
                                !!value.image ? `/api/uploads/images/${value.image?.uri}` : '/default.jpg'
                            }`,
                        }}
                    >
                        <div style={{ position: 'absolute', top: 3, left: 3 }}>
                            <MediaModal
                                withoutName
                                type="IMAGE"
                                value={value.image}
                                onMediaSelected={(e) => handleChange('image', e)}
                            />
                        </div>

                        <div className="white-border">
                            <StyledInput.div
                                className="text"
                                value={value.leftTitle}
                                onChange={(e) => handleChange('leftTitle', e)}
                            />
                        </div>
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
