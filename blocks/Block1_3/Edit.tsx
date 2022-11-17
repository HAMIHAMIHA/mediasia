import ColorButton from '@components/ColorButton'
import EditPanel from '@components/EditPanel'
import MediaModal from '@components/MediaModal'
import StyledInput from '@components/StyledInput'
import { Media } from '@prisma/client'
import { Space } from 'antd'
import set from 'lodash.set'
import type { Props } from '../types'

interface Block1_3Props {
    text1: string[]
}

const values = {
    text1: [
        'Une culture entrepreneuriale',
        'Animé par une véritable culture entrepreneuriale',
        ", Cogedim a développé un fort ancrage territorial, gage d'une croissance durable. Acteur clé de la ville, au contact des métropoles et de leurs territoires, nous offrons à nos clients des solutions urbaines et immobilières à taille humaine. ",
        'Nous contacter',
        "L'immobilier d'entreprise au servive du développement des territoires.",
    ],
}

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const { text1 } = values
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
<<<<<<< HEAD
        <>
            <div className="left-box">
                <div className="text-box">
                    <div className="text-box-title">{text1[0]}</div>
                    <div className="text-box-text">
                        <text className="text1">{text1[1]}</text>
                        <text className="text2">{text1[2]}</text>
=======
        <EditPanel
            view={
                <div className="block1_3">
                    <div className="left-box">
                        <div className="text-box">
                            <StyledInput.h1
                                value={value.title}
                                className="text-box-title"
                                onChange={(e) => handleChange('title', e)}
                            />
                            {/* <div className="text-box-title">{text1[0]}</div> */}
                            <div className="text-box-text">
                                <StyledInput.p
                                    className="text2"
                                    value={value.text}
                                    onChange={(e) => handleChange('text', e)}
                                />
                                {/* <text className="text1">{text1[1]}</text>
                        <text className="text2">{text1[2]}</text> */}
                            </div>
                            <div className="button cursorPointer">
                                <div className="icon-mail"></div>
                                <div className="title-color-text">{text1[3]}</div>
                            </div>
                        </div>
>>>>>>> a19ef1649ac9ee59822ed4a64e417cc26c4827eb
                    </div>
                    <div
                        className="right-box"
                        style={{
                            backgroundImage: value.image
                                ? `url(/api/uploads/images/${value.image.uri})`
                                : undefined,
                        }}
                    >
                        <div className="white-border">
                            {/* <div className="text">{text1[4]}</div> */}
                            <StyledInput.Test
                                className="text"
                                value={value.leftTitle}
                                onChange={(e) => handleChange('leftTitle', e)}
                            />
                        </div>
                        {/* <Image src={src} width={960} height={500}/> */}
                    </div>
                </div>
<<<<<<< HEAD
            </div>
            <div className="right-box">
                <div className="white-border">
                    <div className="text">{text1[4]}</div>
                </div>
                {/* <Image src={src} width={960} height={500}/> */}
            </div>
        </>
=======
            }
            panel={
                <Space direction="vertical">
                    {/* <ColorButton value={value.color} onChange={(e) => handleChange('color', e)} /> */}
                    <MediaModal
                        type="IMAGE"
                        value={value.image}
                        onMediaSelected={(e) => handleChange('image', e)}
                    />
                </Space>
            }
        />
>>>>>>> a19ef1649ac9ee59822ed4a64e417cc26c4827eb
    )
}

export default Edit
