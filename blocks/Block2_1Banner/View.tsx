import type { Props } from '../types'
import { useState } from 'react'
import Image from 'next/image'

interface Block2_1Props {
    text0: string[]
    text1: string
    text2: string[]
    text3: string[]
    text4: string
    text5: string[]
    propramme: string[]
    introduce: string
}

const values = {
    text0: ['Le Groupe Altarea', 'Nos programmes', 'Nos références', 'Nous contacter'],
    text1: 'OCCITANIE',
    text2: [
        'Filiale toulousaine du Groupe Altarea, notre Direction régionale est implantée au cœur de la ville de Toulouse.',
        "Notre équipe de 52 collaborateurs est impliquée quotidiennement dans le développement de notre territoire. Nous développons localement des projets immobiliers qualitatifs empreints de l'identité architecturale et des spécificités de la métropole Toulousaine et des villes de la région Occitanie.",
    ],
    text3: ['       ', 'Découvrez nos offres de bureau en région'],
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
    propramme: ['program1', 'program2', 'program3'],
    introduce:
        'Les données recueillies ci-dessus sont nécessaires pour nous permettre de répondre à votre demande de renseignement dans le cadre de la commercialisation des programmes par Cogedim Provence. Pour en savoir plus sur le traitement de vos données et vos droits, cliquer ici.',
}

const View = ({ value = {}, theme }: Props) => {
    const { text0, text1, text2, text3, text4, text5, propramme, introduce } = values
    // let backgroundImage=require(`../../public/styles/src/image_home_1@2x.png`).default
    const block1 = {
        colorBar: false,
        textTitle: true,
        logo: false,
        roundButton: true,
        brands: false,
        infos: false,
        button: false,
        whiteText: true,
        person: false,
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
    let label_1 = require(`../../public/styles/src/page4/label_1@2x.png`).default
    let label_2 = require(`../../public/styles/src/page4/label_2@2x.png`).default
    let label_3 = require(`../../public/styles/src/page4/label_3@2x.png`).default
    let label_4 = require(`../../public/styles/src/page4/label_4@2x.png`).default
    const move_down = () => {
        scrollTo({
            top: 4800,
            left: 0,
            behavior: 'smooth',
        })
    }
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
    let arr = []
    for (let i = 0; i < propramme.length; i++) {
        let obj = { selections: propramme[i] }
        arr.push(obj)
    }
    return (
        <div className="block2_1">
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
                                    {colorArr.map((e, i) => (
                                        <div key={i} className={e} onClick={() => changeColor(e)}>
                                            {text5[i]}
                                        </div>
                                    ))}
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
                        <p className="content">{text2[0]}</p>
                        <p className="content">{text2[1]}</p>
                    </div>
                    <div className={block1.roundButton ? 'roundButton' : 'hidden'} onClick={move_down}>
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
                <div className={'white-box ' + typeColors + '_bgc03'}>
                    <div className={'color-ball ' + typeColors + '_bgc07'}></div>
                </div>
            </div>
        </div>
    )
}

export default View
