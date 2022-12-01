import { CloseOutlined, FileImageOutlined, PlusOutlined } from '@ant-design/icons'
import EditPanel from '@components/EditPanel'
import LinkInput from '@components/LinkInput'
import MediaModal from '@components/MediaModal'
import StyledInput from '@components/StyledInput'
import { Button, Select, Space, Switch, Typography } from 'antd'
import set from 'lodash.set'
import Image from 'next/image'
import { useState } from 'react'
import type { Props } from '../types'

const { Text } = Typography

const Edit = ({ value = { images: [] }, onChange, theme }: Props) => {
    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    // const [show, setShow] = useState(false)
    // const show_box = () => {
    //     setShow(!show)
    // }

    let [index, change] = useState(0)
    const changeImage = (e: number) => {
        change((index = e))
    }
    const leftChosen = () => {
        if (index != 0) {
            change((index = index - 1))
        }
    }
    const rightChosen = () => {
        if (index != value.images?.length - 1) {
            change((index = index + 1))
        }
    }
    return (
        <EditPanel
            view={
                <>
                    <div className="inner_box">
                        <div className="leftBox">
                            <div className="image" style={{ position: 'relative' }}>
                                <Image
                                    src={
                                        !!value.images?.length
                                            ? `/api/uploads/images/${value.images[index]?.uri}`
                                            : '/default.jpg'
                                    }
                                    layout="fill"
                                    alt="image_programme_2"
                                    className="picture"
                                />
                                <div className="icon-share">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                    <span className="path3"></span>
                                </div>
                                {!!value.images?.length && (
                                    <>
                                        <div style={{ position: 'absolute', top: 3, left: 3, zIndex: 2 }}>
                                            <MediaModal
                                                withoutName
                                                label=""
                                                icon={<FileImageOutlined />}
                                                value={value.images[index]}
                                                onMediaSelected={(e) => handleChange(`images.${index}`, e)}
                                            />
                                        </div>
                                        <div style={{ position: 'absolute', top: 3, left: 40, zIndex: 2 }}>
                                            <Button
                                                danger
                                                icon={<CloseOutlined />}
                                                onClick={() => {
                                                    const newValues = [...value.images]

                                                    newValues.splice(index, 1)

                                                    handleChange('images', newValues)
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="changeButton">
                                {value.images?.map((e: any, i: number) => (
                                    <div
                                        key={i}
                                        className={
                                            'yellowBall cursorPointer' + (i == index ? ' selected' : '')
                                        }
                                        onClick={() => changeImage(i)}
                                    ></div>
                                ))}
                                <div className={'yellowBall cursorPointer'}>
                                    <MediaModal
                                        size="small"
                                        shape="circle"
                                        withoutName
                                        label=""
                                        value={undefined}
                                        icon={<PlusOutlined />}
                                        onMediaSelected={(e) => handleChange('images', [...value.images, e])}
                                    />
                                </div>
                            </div>
                            <div className="icon-left_yellow_arrow" onClick={leftChosen}>
                                <span className="path1"></span>
                                <span className="path2"></span>
                            </div>
                            <div className="icon-right_yellow_arrow" onClick={rightChosen}>
                                <span className="path1"></span>
                                <span className="path2"></span>
                            </div>
                        </div>
                        <div className="rightBox">
                            <div className="logo" style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: -10, left: -10, zIndex: 2 }}>
                                    {value.logo ? (
                                        <Button
                                            type="primary"
                                            danger
                                            icon={<CloseOutlined />}
                                            onClick={() => handleChange('logo', undefined)}
                                        />
                                    ) : (
                                        <MediaModal
                                            label=""
                                            withoutName
                                            icon={<FileImageOutlined />}
                                            value={value.logo}
                                            onMediaSelected={(e) => handleChange('logo', e)}
                                        />
                                    )}
                                </div>

                                {value.logo && (
                                    <Image
                                        src={`/api/uploads/images/${value.logo?.uri}`}
                                        aria-label="aria-label"
                                        className="logoHill"
                                        layout="fill"
                                    />
                                )}
                            </div>
                            {value.hasButton && (
                                <>
                                    <div className="messages">
                                        <StyledInput.div
                                            value={value.text}
                                            onChange={(e) => handleChange('text', e)}
                                        />
                                    </div>

                                    <div className="bottom">
                                        <StyledInput
                                            className="question"
                                            value={value.question}
                                            onChange={(e) => handleChange('question', e)}
                                        />
                                        <div className="button">
                                            <div className="icon-mail"></div>
                                            <StyledInput
                                                className="title-color-text"
                                                value={value.buttonText}
                                                onChange={(e) => handleChange('buttonText', e)}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={false ? 'showBox' : 'hidden'}>
                        <div className="image">
                            <Image
                                src={
                                    !!value.images?.length
                                        ? `/api/uploads/images/${value.images[index]?.uri}`
                                        : '/default.jpg'
                                }
                                alt="image_programme_2"
                                className="image"
                                layout="fill"
                            />
                            <div className="icon-x"></div>
                            <div className="icon-left" onClick={leftChosen}></div>
                            <div className="icon-right" onClick={rightChosen}></div>
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
