import Image from 'next/image'
import type { Props } from '../types'

interface Block6_3Props {
    text1: string
    text2: string[]
    text3: string[]
}

const values = {
    text1: 'Un immeuble exemplaire sur le plan environnemental',
    text2: [
        'Lumière naturelle et vue sur la nature',
        'Toiture et façade végétalisées',
        "Privilégier les solutions vertueuses pour l'environnement",
        'Le Booster du Réemploi',
    ],
    text3: [
        "C'est l'un des piliers de la démarche biophilique. L'immeuble a été construit en H afin que la totalité des espaces tertiaires offre une vue sur la nature.",
        "L'intégralité des 2 500 m² de terrasse est végétalisée, une première en France. Elle intègre des sols de natures diversifiées, afin qu'une flore spontanée s'adaptant naturellement aux conditions créées.",
        'Tout au long du projet, les solutions les plus durables ont été favorisées quand plusieurs possibilités se présentaient : parking silo plutôt que souterrain pour éviter le pompage des sols, clôture végétalisée plutôt que clôture en dur pour permettre aux animaux de petite taille de circuler, 100% du mobilier extérieur est fabriqué avec du bois local etc …',
        "Avec #Community, Cogedim a expérimenté les principes du Booster du Réemploi, une démarche d'économie circulaire vertueuse associant de nombreux promoteurs et entreprises. Son objectif : favoriser le réemploi des déchets et gravats produits par le secteur de la construction afin de réduire l'impact environnemental de l'immobilier. À Mérignac, plus de 2 800 m2 de faux planchers de l'immeuble sont ainsi issus du réemploi de matériaux. Ils ont été conditionnés, transportés stockés, préparés, assurés et fournis par l'entreprise spécialisée Mobius Réemploi.",
    ],
}

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const { text1, text2, text3 } = values

    let src = require(`../../public/styles/src/page5/logo_page_projet_reference@2x.png`).default
    let src1 = require(`../../public/styles/src/page5/image_page_projet_reference_2@2x.png`).default
    let src2 = require(`../../public/styles/src/page4/image_page_reference_4@2x.png`).default
    return (
        <>
            <div className="headline">{text1}</div>
            <div className="firstParagraph">
                <div className="left">
                    <div className="title">{text2[0]}</div>
                    <div className="content">{text3[0]}</div>
                    <div className="title">{text2[1]}</div>
                    <div className="content">{text3[1]}</div>
                    <div className="title">{text2[2]}</div>
                    <div className="content">{text3[2]}</div>
                </div>
                <div className="right">
                    <div className="title">{text2[3]}</div>
                    <div className="brand">
                        <Image src={src} alt="brand1" className="image" width={208} height={100} />
                    </div>
                    <div className="content">{text3[3]}</div>
                </div>
            </div>
            <div className="secondParagraph">
                <div className="leftBox">
                    <div className="left">
                        <Image src={src1} alt="brand1" className="image" width={1200} height={1035} />
                    </div>
                </div>
                <div className="right">
                    <Image src={src2} alt="brand1" className="image" width={1200} height={640} />
                </div>
            </div>
        </>
    )
}

export default Edit
