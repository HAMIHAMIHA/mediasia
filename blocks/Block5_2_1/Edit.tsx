import EditPanel from '@components/EditPanel'
import LinkInput from '@components/LinkInput'
import MediaModal from '@components/MediaModal'
import StyledInput from '@components/StyledInput'
import { Space, Switch, Typography, Divider, Select } from 'antd'
import set from 'lodash.set'
import Image from 'next/image'
import type { Props } from '../types'

const { Text } = Typography

const values = {
    text1: [
        '#Community, Mérignac (33)',
        "Un campus d'inspiration biophilique pour Groupama",
        "L'inspiration biophilique est une démarche qui consiste à prendre en considération le lien entre l'homme et la nature dans la conception même des bâtiments. C'est le fil rouge qui a guidé Cogedim pour développer #Community, un campus tertiaire d'envergure conçu par Hubert Godet Architectes.",
        'Découvrir ce projet',
    ],
    text2: [
        'Nom du projet',
        'Sous-titre ici',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non nulla sit amet ante cursus commodo sit amet nec nisl. In eu nulla enim. Sed maximus nulla in nunc viverra scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras dictum sed lorem id mattis. Ut lacinia sapien non blandit ornare. Duis vitae posuere lorem.',
        'Découvrir ce projet',
    ],
}

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    const { text1 /*text2*/ } = values

    let src1 = require(`../../public/styles/src/page4/image_page_reference_2@2x.png`).default
    // let src2 = require(`../../public/styles/src/page4/image_page_reference_3@2x.png`).default
    let brand1 = require(`../../public/styles/src/page4/label_1@2x.png`).default
    let brand2 = require(`../../public/styles/src/page4/label_2@2x.png`).default
    let brand3 = require(`../../public/styles/src/page4/label_3@2x.png`).default
    let brand4 = require(`../../public/styles/src/page4/label_4@2x.png`).default
    return (
        <EditPanel
            view={
                value.orientation ? (
                    <>
                        <div className="left5_2_1" style={{ position: 'relative' }}>
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
                                width={940}
                                height={500}
                            />
                        </div>
                        <div className="right5_2_1">
                            <div className="title">
                                <StyledInput value={value.title} onChange={(e) => handleChange('title', e)} />
                            </div>
                            <div className="introduce">
                                <StyledInput value={value.intro} onChange={(e) => handleChange('into', e)} />
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
                    </>
                ) : (
                    <>
                        <div className="mnom">
                            <div className="mright">
                                <Image src={src1} alt="brand1" width={940} height={500} />
                            </div>
                            <div className="left-box">
                                <div className="left">
                                    <div className="title">
                                        <StyledInput
                                            value={value.title}
                                            onChange={(e) => handleChange('title', e)}
                                        />
                                    </div>
                                    <div className="introduce">
                                        <StyledInput
                                            value={value.intro}
                                            onChange={(e) => handleChange('into', e)}
                                        />
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
                                                    src={
                                                        !!e ? `/api/uploads/images/${e?.uri}` : '/default.jpg'
                                                    }
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
                            <div className="right" style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 3, left: 3, zIndex: 2 }}>
                                    <MediaModal
                                        withoutName
                                        value={value.image}
                                        onMediaSelected={(e) => handleChange('image', e)}
                                    />
                                </div>
                                <Image
                                    src={
                                        !!value.image
                                            ? `/api/uploads/images/${value.image?.uri}`
                                            : '/default.jpg'
                                    }
                                    alt="brand1"
                                    width={580}
                                    height={500}
                                />
                            </div>
                        </div>
                    </>
                )
            }
            panel={
                <Space direction="vertical">
                    <Text>Orientation:</Text>
                    <Switch
                        checkedChildren="Left"
                        unCheckedChildren="Right"
                        checked={value.orientation}
                        onChange={() => handleChange('orientation', !value.orientation)}
                    />
                    <Divider />

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
