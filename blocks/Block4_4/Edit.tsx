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
        <div className="block4_4">
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
                <div className="bottom">{text1[5]}</div>
            </div>
            <div className="pictures">
                <div className="pictureBox">
                    <Image src={src2} alt="brand1" className="image" width={800} height={552} />
                    <div className="title">{text2[0]}</div>
                </div>
                <div className="pictureBox">
                    <Image src={src3} alt="brand1" className="image" width={800} height={552} />
                    <div className="title">{text2[1]}</div>
                </div>
                <div className="pictureBox">
                    <Image src={src4} alt="brand1" className="image" width={800} height={552} />
                    <div className="title">{text2[2]}</div>
                </div>
            </div>
        </div>
    )
}

export default Edit
