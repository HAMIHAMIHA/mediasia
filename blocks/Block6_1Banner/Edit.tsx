import { useState } from 'react'
import Image from 'next/image'
import type { Props } from '../types'

interface Block6_1Props {
    text0: string[]
    text1: string[]
    text3: string[]
    text4: string
    text5: string[]
}

const colorArr = [
    'dark_red',
    'purple',
    'blue',
    'light_blue',
    'green',
    'dark_yellow',
    'medium_yellow',
    'lemon',
    'yellow',
    'orange',
    'red',
]

const values = {
    text0: ['Le Groupe Altarea', 'Nos programmes', 'Nos références', 'Nous contacter'],
    text1: [
        'Nos références',
        '#Community, Mérignac',
        "L'inspiration biophilique est une démarche qui consiste à prendre en considération le lien entre l'homme et la nature dans la conception même des bâtiments. C'est le fil rouge qui a guidé Cogedim pour développer #Community, un campus tertiaire d'envergure conçu par Hubert Godet Architectes.",
    ],
    text3: ['       ', "Un campus d'inspiration biophilique pour Groupama "],
    text4: 'Découvrez nos projets immobiliers par région',
    text5: [
        'Auvergne Rhône-Alpes',
        'Bourgogne Franche-Comté',
        'Bretagne',
        'Centre Val de Loire',
        'Grand Est',
        'Hauts-de-France',
        'Normandie',
        'Nouvelle Aquitaine',
        'Occitanie',
        'Pays de la Loire',
        "Provence Alpes Côte d'Azur",
    ],
}

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const { text0, text1, text3, text4, text5 } = values

    const block1 = {
        colorBar: true,
        textTitle: true,
        logo: false,
        roundButton: false,
        brands: true,
        infos: false,
        button: true,
        whiteText: true,
        person: false,
    }
    let label_1 = require(`../../public/styles/src/page4/label_1@2x.png`).default
    let label_2 = require(`../../public/styles/src/page4/label_2@2x.png`).default
    let label_3 = require(`../../public/styles/src/page4/label_3@2x.png`).default
    let label_4 = require(`../../public/styles/src/page4/label_4@2x.png`).default
    const [show, setShow] = useState(false)
    const show_box = () => {
        setShow(!show)
    }
    const [show2, setShow2] = useState(false)
    const show_box2 = () => {
        setShow2(!show2)
    }
    const [showi, showInput] = useState(false)
    const show_input = () => {
        showInput(!showi)
    }
    let [typeColors, changeType] = useState('dark_purple')
    const changeColor = (e: string) => {
        changeType((typeColors = e))
        // console.log(typeColors)
    }
    return (
        <>
            <div className="imageBox imageBox6">
                <div className="text-box">
                    <div className="text">
                        <div className={block1.textTitle ? 'textTitleSmall ' + typeColors : 'hidden'}>
                            {text1[0]}
                        </div>
                        <div className={block1.textTitle ? 'textTitle ' + typeColors : 'hidden'}>
                            {text1[1]}
                        </div>
                        <div className={block1.logo ? 'logo' : 'hidden'}>
                            <div className="icon-logo_hill_side">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                                <span className="path4"></span>
                                <span className="path5"></span>
                                <span className="path6"></span>
                                <span className="path7"></span>
                            </div>
                        </div>
                        <p className="content">{text1[2]}</p>
                    </div>
                    <div className={block1.roundButton ? 'roundButton' : 'hidden'}>
                        <div className="icon-composant">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </div>
                    </div>
                    <div className={block1.brands ? 'brands' : 'hidden'}>
                        <div className="icon-lower">
                            <Image src={label_1} width={100} height={24} alt="" />
                        </div>
                        <div className="icon">
                            <Image src={label_2} alt="" />
                        </div>
                        <div className="icon">
                            <Image src={label_3} alt="" />
                        </div>
                        <div className="icon">
                            <Image src={label_4} alt="" />
                        </div>
                    </div>
                    <div className={block1.infos ? 'infos' : 'hidden'}></div>
                    <div className={block1.button ? 'button' : 'hidden'} onClick={show_input}>
                        <div className="icon-mail"></div>
                        <div className="title-color-text">{text0[3]}</div>
                    </div>
                </div>
                <div className={'arcBox ' + typeColors + '_bgc03'}>
                    <div className={block1.person ? 'hidden' : 'mwhiteText'}>{text3[1]}</div>
                    <div className={block1.person ? 'person' : 'hidden'}>
                        <Image src={label_1} alt="" />
                    </div>
                </div>
                <div className="white-text-box">
                    <div className="white-text">
                        <text>{text3[0]}</text>
                        <text>{text3[1]}</text>
                    </div>
                </div>
                <div className="white-ball-box">
                    <div className="white-ball"></div>
                </div>
                <div className="white-box">
                    <div className="color-ball"></div>
                </div>
            </div>
        </>
    )
}

export default Edit
