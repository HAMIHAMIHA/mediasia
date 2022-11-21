import EditPanel from '@components/EditPanel'
import LinkInput from '@components/LinkInput'
import MediaModal from '@components/MediaModal'
import StyledInput from '@components/StyledInput'
import { Space, Switch } from 'antd'
import set from 'lodash.set'
import type { Props } from '../types'

// const values = {
//     text1: [
//         'Une culture entrepreneuriale',
//         'Animé par une véritable culture entrepreneuriale',
//         ", Cogedim a développé un fort ancrage territorial, gage d'une croissance durable. Acteur clé de la ville, au contact des métropoles et de leurs territoires, nous offrons à nos clients des solutions urbaines et immobilières à taille humaine. ",
//         'Nous contacter',
//         "L'immobilier d'entreprise au servive du développement des territoires.",
//     ],
// }

const Edit = ({ value = {}, onChange, theme }: Props) => {
    // const { text1 } = values
    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    // var aRgb = [
    //     parseInt(aRgbHex[0], 16),
    //     parseInt(aRgbHex[1], 16),
    //     parseInt(aRgbHex[2], 16)
    // ];

    // let src=require(`../../public/styles/src/image_home_5@2x.png`).default
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
                            {/* <div className="text-box-title">{text1[0]}</div> */}
                            <div className="text-box-text">
                                <StyledInput.div
                                    className="text2"
                                    value={value.text}
                                    onChange={(e) => handleChange('text', e)}
                                />
                                {/* <text className="text1">{text1[1]}</text>
                        <text className="text2">{text1[2]}</text> */}
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
                                        {/* {text1[3]} */}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className="right-box"
                        style={{
                            position: 'relative',
                            backgroundImage: value.image
                                ? `url(/api/uploads/images/${value.image.uri})`
                                : undefined,
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
                            {/* <div className="text">{text1[4]}</div> */}
                            <StyledInput.div
                                className="text"
                                value={value.leftTitle}
                                onChange={(e) => handleChange('leftTitle', e)}
                            />
                        </div>
                        {/* <Image src={src} width={960} height={500}/> */}
                    </div>
                </>
            }
            panel={
                <Space direction="vertical">
                    {/* <ColorButton value={value.color} onChange={(e) => handleChange('color', e)} /> */}
                    <Switch
                        checked={value.hasButton}
                        onChange={() => handleChange('hasButton', !value.hasButton)}
                    />
                    {value.hasButton && (
                        <LinkInput value={value.buttonLink} onChange={(e) => handleChange('buttonLink', e)} />
                    )}
                </Space>
            }
        />
    )
}

export default Edit
