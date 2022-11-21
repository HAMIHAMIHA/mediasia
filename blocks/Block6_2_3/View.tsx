import Image from 'next/image'
import type { Props } from '../types'

const values = {
    text1: '#Community, Mérignac',
    text2: [
        'Adresse : ',
        'Surface : ',
        'Architecte : ',
        'Livraison : ',
        'Labels et certifications : ',
        'Investisseur : ',
        'Utilisateur : ',
    ],
    text3: [
        'Chemin du Magret, Parc Innolin, Mérignac (33700) ',
        'environ 15 000 m² ',
        'Hubert Godet Architectes ',
        'avril 2022 ',
        'NF HQE® « Excellent », BREEAM® International New Construction 2016 « Very Good », RT 2012 - 20 %, Label BIODIVERSITY, WiredScore Silver ',
        'ATREAM',
        'Groupama',
    ],
    text4: "Situé au cœur du parc d'activités Innolin, à Mérignac, en Gironde, s'inscrivant dans la philosophie et la trame verte de ce parc, le bâtiment de 15 000 m² regroupe depuis 2022 toutes les équipes bordelaises de Groupama, qui louera l'immeuble à hauteur de 80 %. Desservi par le futur tramway et la rocade bordelaise, il intègre de nombreux services, espaces collaboratifs et aménagements biophiliques contribuant au bien-être des futurs utilisateurs.",
}

const View = ({ value = {}, theme }: Props) => {
    const { text1, text2, text3, text4 } = values

    let arr = []
    for (let i = 0; i < text2.length; i++) {
        // console.log(i,`../../public/styles/src/image_home_${i}@2x.png`)
        let obj = { title: text2[i], content: text3[i] }
        arr.push(obj)
    }
    let src1 = require(`../../public/styles/src/page4/image_page_reference_2@2x.png`).default
    let src2 = require(`../../public/styles/src/page4/image_page_reference_7@2x.png`).default
    let src3 = require(`../../public/styles/src/page4/image_page_reference_3@2x.png`).default
    let src4 = require(`../../public/styles/src/page4/image_page_reference_4@2x.png`).default
    return (
        <div className="block6_2">
            <div className="first">
                <div className="left">
                    <Image src={src1} alt="brand1" width={1200} height={640} className="brand1" />
                </div>
                <div className="right">
                    <Image src={src2} alt="brand1" width={1200} height={1035} className="brand1" />
                </div>
            </div>
            <div className="second">
                <div className="leftBox">
                    <div className="left">
                        <Image src={src3} alt="brand1" width={1200} height={1035} className="brand1" />
                    </div>
                </div>
                <div className="right">
                    <div className="title">{text1}</div>
                    {arr.map((e, i) => (
                        <div className="line" key={i}>
                            <text className="bold">{e.title}</text>
                            <text className="content">{e.content}</text>
                        </div>
                    ))}
                </div>
            </div>
            <div className="third">
                <div className="leftBox">
                    <div className="left">{text4}</div>
                </div>
                <div className="right">
                    <Image src={src4} alt="brand1" width={1200} height={640} className="brand1" />
                </div>
            </div>
        </div>
    )
}

export default View
