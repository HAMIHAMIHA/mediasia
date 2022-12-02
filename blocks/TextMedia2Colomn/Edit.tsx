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

    let src1 = require(`../../public/styles/src/page4/image_page_reference_6@2x.png`).default
    return (
        <EditPanel
            view={
                <>
                    <div className="block5_4">
                        <div className="images" style={{ position: 'relative', height: 676, top: 0 }}>
                            <div style={{ position: 'absolute', top: 3, left: 3, zIndex: 2 }}>
                                <MediaModal
                                    withoutName
                                    value={value.image}
                                    onMediaSelected={(e) => handleChange('image', e)}
                                />
                            </div>
                            <Image
                                src={
                                    !!value.image ? `/api/uploads/images/${value.image?.uri}` : '/default.jpg'
                                }
                                alt="brand1"
                                layout="fill"
                            />
                        </div>
                        <div className="texts">
                            <div className="title">
                                <StyledInput value={value.title} onChange={(e) => handleChange('title', e)} />
                            </div>
                            <div className="introduce">
                                <StyledInput value={value.intro} onChange={(e) => handleChange('intro', e)} />
                            </div>
                            <StyledInput.div
                                className="content"
                                value={value.text}
                                onChange={(e) => handleChange('text', e)}
                            />
                            <div className="brands">
                                {value?.images?.map((e: any, i: number) => (
                                    <div key={i} className="brand1">
                                        <Image
                                            src={!!e ? `/api/uploads/images/${e?.uri}` : '/default.jpg'}
                                            alt="brand1"
                                            width={100}
                                            height={24}
                                            className="brand1"
                                        />
                                    </div>
                                ))}
                                <div className="brand1">
                                    <MediaModal
                                        withoutName
                                        label="Add logo"
                                        onMediaSelected={(e) =>
                                            handleChange('images', [...(value?.images || []), e])
                                        }
                                    />
                                </div>
                            </div>
                            {value.hasButton && (
                                <div className="button">
                                    <StyledInput
                                        value={value.buttonText}
                                        onChange={(e) => handleChange('buttonText', e)}
                                    />
                                </div>
                            )}
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
