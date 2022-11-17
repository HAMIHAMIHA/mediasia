import Image from 'next/image'
import type { Props } from '../types'

interface Block4_3Props {
    text1: string[]
    text2: string[]
}

const values = {
    text1: [
        'Marque historique du Groupe',
        "L'acteur incontournable de l'immobilier neuf depuis 1963. Cogedim réalise de nombreux programmes immobiliers à l'identité architecturale affirmée et développe partout en France des opérations d'envergure, garantes de la pluralité de ses savoir-faire.",
        'Cogedim est particulièrement connu pour ses logements mais réalise également depuis plusieurs années des bureaux partout en France.',
    ],
    text2: [
        'Les bureaux par Cogedim',
        "Cogedim a pour vocation d'accompagner les entreprises de toutes tailles dans leur stratégie d'implantation régionale dans un contexte où les modes de travail se transforment et les enjeux de développement durable sont prépondérants. Cogedim imagine ainsi le futur de l'immobilier de bureaux et s'adapte à ces changements pour en faire des lieux de rencontre plus attractifs et plus ouverts.",
        "L'immobilier d'entreprise en Régions regroupe une trentaine de collaborateurs répartis sur l'ensemble du territoire au sein des agences régionales de Cogedim. Ces implantations locales favorisent la connaissance des territoires, leurs spécificités et enjeux et permet ainsi de donner une réponse efficiente et adaptée aux mentalités et aux usages.",
        'EM Lyon, Lyon 7e',
    ],
}

const View = ({ value = {}, theme }: Props) => {
    const { text1, text2 } = values

    let src = require(`../../public/styles/src/page3/image_page_groupe_1@2x.png`).default
    return (
        <div className="block4_3">
            <div className="top">
                <div className="left">
                    <div className="icon-cogedim"></div>
                    <div className="content">{text1[0]}</div>
                </div>
                <div className="right">
                    <div className="content2">{text1[1]}</div>
                    <div className="content2">{text1[2]}</div>
                </div>
            </div>
            <div className="bottom">
                <div className="bottom-box">
                    <div className="left">
                        <div className="title">{text2[0]}</div>
                        <div className="content">{text2[1]}</div>
                        <div className="content">{text2[2]}</div>
                    </div>
                </div>
                <div className="right">
                    <div className="rightPicture">
                        <Image src={src} alt="brand1" className="image" />
                    </div>
                    <div className="smallText">{text2[3]}</div>
                </div>
            </div>
        </div>
    )
}

export default View
