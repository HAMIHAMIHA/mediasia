import Image from 'next/image'
import type { Props } from '../types'

interface Block3_4Props {
    text1: string[]
}

const values = {
    text1: [
        'Hill Side',
        "Disposant d'une excellente accessibilité et visibilité, à proximité immédiate du nouveau quartier Guillemet, cet immeuble en R+5 bénéficie d'une flexibilité optimale grâce à la divisibilité des plateaux de bureaux en deux lots distincts sur chacun des niveaux. Hill Side a été conçu pour offrir des espaces de travail de haute qualité : hauteur libre des plateaux de bureaux de 2,70 m, avec l'ensemble des bureaux en premier jour et des ouvrant de confort par bureau.",
        'Télécharger la brochure',
    ],
}

const View = ({ value = {}, theme }: Props) => {
    const { text1 } = values

    let src = require(`../../public/styles/src/page2/image_programme_3@2x.png`).default
    return (
        <div className="block3_4">
            <div className="left">
                <div className="title yellow">{text1[0]}</div>
                <div className="content">{text1[1]}</div>
                <div className="button">{text1[2]}</div>
            </div>
            <div className="right">
                <Image src={src} alt="brand1" width={960} height={500} className="brand" />
            </div>
        </div>
    )
}

export default View
