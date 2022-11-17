import Image from 'next/image'
import type { Props } from '../types'

interface Block4_4Props {
    text1: string[]
    text2: string[]
}

const values = {
    text1: [
        'Évolution des usages',
        'Développement Technologique',
        'Délocalisation dans les métropoles régionales',
        'Augmentation du nombre de télétravailleurs',
        'Des enjeux environnementaux croissants',
        'Évolution du management',
        'La Tannerie, Lyon 7',
        "White, Villeneuve d'Ascq",
        'Uway, Toulouse',
    ],
    text2: ['La Tannerie, Lyon 7', "White, Villeneuve d'Ascq", 'Uway, Toulouse'],
}

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const { text1, text2 } = values

    let src2 = require(`../../public/styles/src/page3/image_page_groupe_2@2x.png`).default
    let src3 = require(`../../public/styles/src/page3/image_page_groupe_3@2x.png`).default
    let src4 = require(`../../public/styles/src/page3/image_page_groupe_4@2x.png`).default
    return (
        <>
            <div className="arrows">
                <div className="title">{text1[0]}</div>
                <div className="arrowsPart">
                    <div className="left">
                        <div className="line">{text1[1]}</div>
                        <div className="line">{text1[2]}</div>
                    </div>
                    <div className="middle">
                        <div className="vertical"></div>
                        <div className="triangle"></div>
                    </div>
                    <div className="right">
                        <div className="line">{text1[3]}</div>
                        <div className="line">{text1[4]}</div>
                    </div>
                </div>
                <div className="bottom4_4">{text1[5]}</div>
            </div>
        </>
    )
}

export default Edit
