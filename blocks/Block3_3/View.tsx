import Image from 'next/image'
import { useState } from 'react'
import Logo_hill_png from '../../public/styles/src/page2/logo_hill_side.png'
import type { Props } from '../types'

interface Block3_3Props {
    text1: string[]
    text2: string[]
    text3: string[]
}

const values = {
    text1: [
        'Adresse :',
        'Promoteur :',
        'Surface :',
        'Parking :',
        'Architecte :',
        "Bureaux d'études :",
        'Livraison prévisionnelle :',
        'Labels et certifications :',
        'Type de contrat :',
        'Investisseur :',
        'Stade :',
        'A louer',
    ],
    text2: [
        '53 rue Benjamin Baillaud, 31500 Toulouse',
        'Cogedim',
        '4 330 m² SDP',
        '58 places en sous-sol',
        'Devillers & Associés',
        'OTEIS, Soconer, Bureau Veritas, Gambas Acoustique, Polyexpert Environnement',
        '3e trimestre 2023',
        'HQE® niveau excellent, BREEAM® niveau Very Good, RT 2012 -30%, E2C1',
        'VEFA/BEFA',
        'Tivoli Capital (quand a déjà été vendu / loué)',
        'Travaux en cours',
        '',
    ],
    text3: ['Ce bien vous intéresse ?', 'Nous contacter'],
}

const View = ({ value = {}, theme }: Props) => {
    const { text1, text2, text3 } = values

    let arr = []
    for (let a = 0; a < text1.length; a++) {
        let obj = { title: text1[a], content: text2[a] }
        arr.push(obj)
    }
    const [show, setShow] = useState(false)
    const show_box = () => {
        setShow(!show)
    }
    let imageArr = []
    imageArr.push({ src: require(`../../public/styles/src/page2/image_programme_2@2x.png`).default })
    imageArr.push({ src: require(`../../public/styles/src/page2/image_programme_1@2x.png`).default })
    imageArr.push({ src: require(`../../public/styles/src/page2/image_programme_3@2x.png`).default })
    let [index, change] = useState(0)
    const changeImage = (e: number) => {
        change((index = e))
    }
    const leftChosen = () => {
        // console.log(index)
        if (index != 0) {
            change((index = index - 1))
        }
    }
    const rightChosen = () => {
        // console.log(index)

        if (index != imageArr.length - 1) {
            change((index = index + 1))
        }
    }
    return (
        <div className="block3_3">
            <div className="inner_box">
                <div className="leftBox">
                    <div className="image" onClick={show_box}>
                        <Image src={imageArr[index].src} alt="image_programme_2" className="picture" />
                        <div className="icon-share">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                        </div>
                    </div>
                    <div className="changeButton">
                        {imageArr.map((e, i) => (
                            <div
                                key={i}
                                className={'yellowBall cursorPointer' + (i == index ? ' selected' : '')}
                                onClick={() => changeImage(i)}
                            ></div>
                        ))}
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
                    <div className="logo">
                        {/* <Logo_hill_png aria-label="aria-label">
                        </Logo_hill_png> */}
                        <Image src={Logo_hill_png} aria-label="aria-label" className="logoHill" />
                    </div>
                    {arr.map((e, i) => (
                        <div key={i} className="messages">
                            <text className="title">{e.title} </text>
                            <text className="content">{e.content}</text>
                        </div>
                    ))}
                    <div className="bottom">
                        <div className="question">{text3[0]}</div>
                        <div className="button">
                            <div className="icon-mail"></div>
                            <div className="title-color-text">{text3[1]}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={show ? 'showBox' : 'hidden'}>
                <div className="image">
                    <Image src={imageArr[index].src} alt="image_programme_2" className="image" />
                    <div className="icon-x" onClick={show_box}></div>
                    <div className="icon-left" onClick={leftChosen}></div>
                    <div className="icon-right" onClick={rightChosen}></div>
                </div>
            </div>
        </div>
    )
}

export default View
