import Image from 'next/image'
import { useState } from 'react'
import type { Props } from '../types'

interface Block3_1Props {
    text0: string[]
    text1: string
    text2: string[]
    text3: string[]
    text4: string
    text5: string[]
    text6: string[]
    number1: number[]
}

const values = {
    text0: ['Le Groupe Altarea', 'Nos programmes', 'Nos références', 'Nous contacter'],
    text1: "Idéalement situé face au Quartier Guillemet, Hill Side est à la croisée de l'hypercentre et des faubourgs de la ville.",
    text2: ['Surface', 'Livraison', 'Stade', 'SDP', 'trimestre'],
    number1: [4330, 3, 2023],
    text3: ['Travaux'],
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
    text6: ['Hill Side'],
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

const View = ({ value = {}, theme }: Props) => {
    const { text0, text1, text2, text3, text4, text5, text6, number1 } = values

    const block1 = {
        colorBar: true,
        textTitle: false,
        logo: true,
        roundButton: false,
        brands: true,
        infos: true,
        button: true,
        whiteText: false,
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
    let [typeColors, changeType] = useState('yellow')
    const changeColor = (e: string) => {
        changeType((typeColors = e))
        // console.log(typeColors)
    }
    return (
        <div className="block3_1">
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
                        <div className={block1.textTitle ? 'textTitle ' + typeColors : 'hidden'}>{text1}</div>
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
                        <p className="content">{text1}</p>
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
                            <text className="title">{text2[0]}:</text>
                            <text className="content"> {number1[0]}</text>
                            <text className="content">
                                {' '}
                                m<sup>2</sup>
                            </text>
                            <text className="content"> {text2[3]}</text>
                        </div>
                        <div className="line2">
                            <text className="title">{text2[1]}:</text>
                            <text className="content">
                                {' '}
                                {number1[1]}
                                <sup>e</sup>
                            </text>
                            <text className="content"> {text2[4]}</text>
                            <text className="content"> {number1[2]}</text>
                        </div>
                        <div className="line3">
                            <text className="title">{text2[2]}:</text>
                            <text className="content"> {text3[0]}</text>
                        </div>
                    </div>
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
                    <div className="white-text"></div>
                </div>
                <div className="white-ball-box">
                    <div className="white-ball"></div>
                </div>
                <div className={'white-box ' + typeColors + '_bgc03'}>
                    <div className={'color-ball ' + typeColors + '_bgc07'}></div>
                </div>
            </div>
        </div>
    )
}

export default View