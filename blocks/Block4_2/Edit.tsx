import Image from 'next/image'
import type { Props } from '../types'

interface Block4_2Props {
    text1: string[]
    text2: string[]
    text3: string[]
    text4: string[]
    text5: string[]
}

const values = {
    text1: [
        'Activité',
        "Porté par son modèle intégré unique en France, Altarea a pris une longueur d'avance sur le marché de la transformation urbaine, fondement de sa croissance future, pérenne et solide. Le Groupe propose une offre sur mesure qui favorise la réussite des projets urbains grâce à l'articulation de tous les savoir-faire de l'immobilier. Acteur multi-métier, son modèle intégré lui permet de mobiliser toutes les compétences nécessaires, quelle que soit la classe d'actif concernée.",
    ],
    text2: [
        'promoteur en logement',
        "d'actifs de commerce sous gestion, dont",
        "promoteur d'immobilier d'entreprise (sièges sociaux, bureaux, campus, hôtels, logistique)",
        'développeur de grands projets urbains mixtes',
        '3 Mds€ de réservations',
        '2,4 Mds€ en quote-part',
        '15 projets en développement',
    ],
    text3: [
        'CLIENT',
        '2',
        'e',
        "Cogedim élu Service Client de l'Année",
        '47 000',
        'au classement de la relation client HCG - Les Echos',
        'pour la 5e année consécutive',
        'emplois directs, indirects et induits soutenus en France',
    ],
    text4: [
        'COLLABORATEURS',
        'Top Employer 2022',
        '1996',
        "(certification internationale qui reconnaît l'excellence des pratiques RH)",
        'collaborateurs',
    ],
    text5: [
        'CLIMAT',
        'Confirmation du statut Green Star 5*',
        '-67,3%',
        'au GRESB (agence de notation extra-financière) pour la 6e année consécutive',
        "d'émissions de CO2 sur le patrimoine Commerce depuis 2010",
    ],
}

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const { text1, text2, text3, text4, text5 } = values

    let src1 = require(`../../public/styles/src/page3/graphique@2x.png`).default
    let src2 = require(`../../public/styles/src/page3/organigrame@2x.png`).default
    let src3 = require(`../../public/styles/src/page4/Groupe408@2x.png`).default
    let src4 = require(`../../public/styles/src/page4/Groupe409@2x.png`).default
    let src5 = require(`../../public/styles/src/page4/Groupe410@2x.png`).default
    let src6 = require(`../../public/styles/src/page4/Groupe411@2x.png`).default
    return (
        <>
            <div className="ActivitePart">
                <div className="left">
                    <Image src={src1} alt="brand1" className="brand" />
                </div>
                <div className="right">
                    <div className="text">
                        <div className="title">{text1[0]}</div>
                        <div className="content">{text1[1]}</div>
                    </div>
                    <div className="picture">
                        <Image src={src2} alt="brand1" className="brand" />
                    </div>
                </div>
            </div>
            {/* <div className="clientPart">
                <div className="left">
                    <Client className="leftSvg"></Client>
                </div>
                <div className="right">
                    <Mds></Mds>
                </div>
            </div> */}
            <div className="mclientPart">
                <div className="picture">
                    <Image src={src3} alt="brand1" className="brand" />
                </div>
                <div className="picture">
                    <Image src={src4} alt="brand1" className="brand" />
                </div>
                <div className="picture">
                    <Image src={src5} alt="brand1" className="brand" />
                </div>
                <div className="picture">
                    <Image src={src6} alt="brand1" className="brand" />
                </div>
            </div>
            <div className="clientPart">
                <div className="left">
                    <div className="mds">3 Mds €</div>
                    <div className="de">{"de chiffre d'affaires"}</div>
                    <div className="infos">
                        <div className="info">
                            <div className="line1">
                                2<sup>e</sup>
                            </div>
                            <div className="line2">{text2[0]}</div>
                            <div className="line3"></div>
                            <div className="line4">{text2[4]}</div>
                        </div>
                        <div className="info">
                            <div className="line1">
                                <text className="five">
                                    5,3
                                    <text className="mds">
                                        {' '}
                                        Mds<sup>2</sup>
                                    </text>
                                </text>
                            </div>
                            <div className="line2">{text2[1]}</div>
                            <div className="line3"></div>
                            <div className="line4">{text2[5]}</div>
                        </div>
                        <div className="info">
                            <div className="line1">
                                {' '}
                                1<sup>er</sup>
                            </div>
                            <div className="line2">{text2[2]}</div>
                        </div>
                        <div className="info">
                            <div className="line1">
                                {' '}
                                1<sup>er</sup>
                            </div>
                            <div className="line2">{text2[3]}</div>
                            <div className="line3"></div>
                            <div className="line4">{text2[6]}</div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="client">{text3[0]}</div>
                    <div className="clientContent">
                        <div className="item">
                            <div className="firstTitle">
                                {text3[1]}
                                <sup>{text3[2]}</sup>
                            </div>
                            <div className="clientText">{text3[5]}</div>
                        </div>
                        <div className="item">
                            <div className="secondTitle">{text3[3]}</div>
                            <div className="clientText">{text3[6]}</div>
                        </div>
                        <div className="item">
                            <div className="thirdTitle">{text3[4]}</div>
                            <div className="clientText">{text3[7]}</div>
                        </div>
                    </div>
                    <div className="coll">{text4[0]}</div>
                    <div className="collContent">
                        <div className="item">
                            <div className="firstTitle">{text4[1]}</div>
                            <div className="clientText">{text4[3]}</div>
                        </div>
                        <div className="item2">
                            <div className="secondTitle">{text4[2]}</div>
                            <div className="clientText2">{text4[4]}</div>
                        </div>
                    </div>
                    <div className="climat">{text5[0]}</div>
                    <div className="climatContent">
                        <div className="item">
                            <div className="firstTitle">{text5[1]}</div>
                            <div className="clientText">{text5[3]}</div>
                        </div>
                        <div className="item2">
                            <div className="secondTitle">{text5[2]}</div>
                            <div className="clientText2">{text5[4]}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit
