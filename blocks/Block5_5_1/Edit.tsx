import Image from 'next/image'
import type { Props } from '../types'

const values = {
    text1: [
        'Nom du projet',
        'Sous-titre ici',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non nulla sit amet ante cursus commodo sit amet nec nisl. In eu nulla enim. Sed maximus nulla in nunc viverra scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras dictum sed lorem id mattis. Ut lacinia sapien non blandit ornare. Duis vitae posuere lorem.',
        'Découvrir ce projet',
    ],
    text2: [
        'Nom du projet',
        'Sous-titre ici',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non nulla sit amet ante cursus commodo sit amet nec nisl. In eu nulla enim. Sed maximus nulla in nunc viverra scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras dictum sed lorem id mattis. Ut lacinia sapien non blandit ornare. Duis vitae posuere lorem.',
        'Découvrir ce projet',
    ],
}

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const { text1 /* text2*/ } = values

    let src1 = require(`../../public/styles/src/page4/image_page_reference_2@2x.png`).default
    // let src2 = require(`../../public/styles/src/page4/image_page_reference_3@2x.png`).default
    let brand1 = require(`../../public/styles/src/page4/label_1@2x.png`).default
    let brand2 = require(`../../public/styles/src/page4/label_2@2x.png`).default
    let brand3 = require(`../../public/styles/src/page4/label_3@2x.png`).default
    let brand4 = require(`../../public/styles/src/page4/label_4@2x.png`).default
    return (
        <>
            <div className="community">
                <div className="leftBox">
                    <div className="left">
                        <div className="title">{text1[0]}</div>
                        <div className="introduce">{text1[1]}</div>
                        <div className="content">{text1[2]}</div>
                        <div className="brands">
                            <div className="brand1">
                                <Image src={brand1} alt="brand1" width={100} height={24} className="brand1" />
                            </div>
                            <div className="brand2">
                                <Image src={brand2} alt="brand1" width={58} height={50} />
                            </div>
                            <div className="brand2">
                                <Image src={brand3} alt="brand1" width={68} height={50} />
                            </div>
                            <div className="brand2">
                                <Image src={brand4} alt="brand1" width={114} height={50} />
                            </div>
                        </div>
                        <div className="button">{text1[3]}</div>
                    </div>
                </div>
                <div className="right">
                    <Image src={src1} alt="brand1" width={940} height={500} />
                </div>
            </div>
        </>
    )
}

export default Edit
