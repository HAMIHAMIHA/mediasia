import { useState } from 'react'
import Image from 'next/image'
import type { Props } from '../types'

interface Block4_1Props {
    text0: string[]
    text1: string[]
    text4: string
    text5: string[]
}

const values = {
    text0: ['Le Groupe Altarea', 'Nos programmes', 'Nos références', 'Nous contacter'],
    text1: [
        'LE GROUPE ALTAREA',
        "Fondé en 1994 par Alain Taravella, Altarea est aujourd'hui le premier développeur immobilier de France. Le Groupe a développé une plateforme de compétences immobilières et de développement unique au service de la transformation des villes, couvrant l'ensemble des classes d'actifs immobiliers (logement, commerce, bureau, logistique, hôtellerie, résidences services…). ",
        "Cette spécificité lui permet de répondre efficacement et de manière globale aux enjeux de transformation des territoires et contribue à créer des villes agréables à vivre et ouvertes sur l'avenir.",
    ],
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

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const { text0, text1, text4, text5 } = values

    const block1 = {
        colorBar: false,
        textTitle: true,
        logo: false,
        roundButton: false,
        brands: false,
        infos: false,
        button: false,
        whiteText: false,
        person: true,
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
    let src = require(`../../public/styles/src/page3/photo_alain_taravella@2x.png`).default
    return (
        <div className="block4_1">
            <div className="imageBox">
                <div className="Header">
                    <div className="left">
                        <div className="icon-logo_purple">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                            <span className="path8"></span>
                            <span className="path9"></span>
                            <span className="path10"></span>
                        </div>
                        <div className="icon-burger_menu" onClick={show_box}></div>
                    </div>
                    <div className="title-text">{text0[0]}</div>
                    <div className="title-text" onClick={show_box}>
                        {text0[1]}
                    </div>
                    <div className="title-text">{text0[2]}</div>
                    <div className="button" onClick={show_input}>
                        <div className="icon-mail"></div>
                        <div className="title-color-text">{text0[3]}</div>
                    </div>
                    <div className={show ? 'mchooseBox' : 'hidden'}>
                        <div className="Part">
                            <div className="leftPart"></div>
                            <div className="rightPart">
                                <div className="titleText">{text0[0]}</div>
                                <div className="titleText " onClick={show_box2}>
                                    {text0[1]}
                                </div>
                                <div className={show2 ? 'contentText' : 'hidden'}>
                                    <div className="text5 dark_red" onClick={(e) => changeColor('dark_red')}>
                                        {text5[0]}
                                    </div>
                                    <div className="text5 purple" onClick={(e) => changeColor('purple')}>
                                        {text5[1]}
                                    </div>
                                    <div className="text5 blue" onClick={(e) => changeColor('blue')}>
                                        {text5[2]}
                                    </div>
                                    <div
                                        className="text5 light_blue"
                                        onClick={(e) => changeColor('light_blue')}
                                    >
                                        {text5[3]}
                                    </div>
                                    <div className="text5 green" onClick={(e) => changeColor('green')}>
                                        {text5[4]}
                                    </div>
                                    <div
                                        className="text5 dark_yellow"
                                        onClick={(e) => changeColor('dark_yellow')}
                                    >
                                        {text5[5]}
                                    </div>
                                    <div
                                        className="text5 medium_yellow"
                                        onClick={(e) => changeColor('medium_yellow')}
                                    >
                                        {text5[6]}
                                    </div>
                                    <div className="text5 lemon" onClick={(e) => changeColor('lemon')}>
                                        {text5[7]}
                                    </div>
                                    <div className="text5 yellow" onClick={(e) => changeColor('yellow')}>
                                        {text5[8]}
                                    </div>
                                    <div className="text5 orange" onClick={(e) => changeColor('orange')}>
                                        {text5[9]}
                                    </div>
                                    <div className="text5 red" onClick={(e) => changeColor('red')}>
                                        {text5[10]}
                                    </div>
                                </div>
                                <div className="titleText">{text0[2]}</div>
                                <div className="titleText">{text0[3]}</div>
                            </div>
                        </div>
                    </div>
                    <div className={show ? 'chooseBox' : 'hidden'}>
                        <div className="chooseBoxinner">
                            <div className="leftPart">{text4}</div>
                            <div className="rightPart">
                                {colorArr.map((e, i) => (
                                    <div
                                        key={i}
                                        className={'choice ' + 'hover_' + e}
                                        onClick={() => changeColor(e)}
                                    >
                                        {text5[i]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={block1.colorBar ? 'colorBar ' + typeColors + '_bgc' : 'hidden'}>
                    <div className="typebox">
                        <div className="type">test{' > '}</div>
                        <div className="type">test</div>
                    </div>
                </div>
                <div className="text-box">
                    <div className="text">
                        <div className={block1.textTitle ? 'textTitle ' + typeColors : 'hidden'}>
                            {text1[0]}
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
                        <p className="content">{text1[1]}</p>
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
                    <div className={block1.infos ? 'infos' : 'hidden'}>
                        <div className="line1">
                            <text className="title">title:</text>
                            <text className="content"> content</text>
                        </div>
                        <div className="line2">
                            <text className="title">title:</text>
                            <text className="content"> content</text>
                        </div>
                        <div className="line3">
                            <text className="title">title:</text>
                            <text className="content"> content</text>
                        </div>
                    </div>
                    <div className={block1.button ? 'button' : 'hidden'}>
                        <div className="icon-mail"></div>
                        <div className="title-color-text">button</div>
                    </div>
                </div>
                <div className={'arcBox ' + typeColors + '_bgc07'}>
                    <div className={block1.person ? 'hidden' : 'mwhiteText'}></div>
                    <div className={block1.person ? 'person' : 'hidden'}>
                        <div className="mimage">
                            <Image src={src} width={1600} height={1600} alt="" />
                        </div>
                    </div>
                </div>
                <div className="white-ball-box">
                    <div className="white-ball"></div>
                </div>
                <div className="white-box">
                    <div className="color-ball"></div>
                </div>
            </div>
        </div>
    )
}

export default Edit
