import Image from 'next/image'
import Link from 'next/link'
import type { Props } from '../types'

const values = {
    text1: [
        '#Community, Mérignac (33)',
        "Un campus d'inspiration biophilique pour Groupama",
        "L'inspiration biophilique est une démarche qui consiste à prendre en considération le lien entre l'homme et la nature dans la conception même des bâtiments. C'est le fil rouge qui a guidé Cogedim pour développer #Community, un campus tertiaire d'envergure conçu par Hubert Godet Architectes.",
        'Découvrir ce projet',
    ],
    text2: [
        'Nom du projet',
        'Sous-titre ici',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non nulla sit amet ante cursus commodo sit amet nec nisl. In eu nulla enim. Sed maximus nulla in nunc viverra scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras dictum sed lorem id mattis. Ut lacinia sapien non blandit ornare. Duis vitae posuere lorem.',
        'Découvrir ce projet',
    ],
}

const View = ({ value = {}, theme }: Props) => {
    let src1 = require(`../../public/styles/src/page4/image_page_reference_2@2x.png`).default
    let src2 = require(`../../public/styles/src/page4/image_page_reference_3@2x.png`).default
    let brand1 = require(`../../public/styles/src/page4/label_1@2x.png`).default
    let brand2 = require(`../../public/styles/src/page4/label_2@2x.png`).default
    let brand3 = require(`../../public/styles/src/page4/label_3@2x.png`).default
    let brand4 = require(`../../public/styles/src/page4/label_4@2x.png`).default

    if (value.orientation) {
        return (
            <>
                <div className="left5_2_1">
                    <Image
                        src={!!value.image ? `/api/uploads/images/${value.image?.uri}` : '/default.jpg'}
                        alt="brand1"
                        width={940}
                        height={500}
                    />
                </div>
                <div className="right5_2_1">
                    <div className="title">{value.title}</div>
                    <div className="introduce">{value.intro}</div>
                    <div className="content" dangerouslySetInnerHTML={{ __html: value.text || '' }} />
                    <div className="brands">
                        {value?.images?.map((e: any, i: number) => (
                            <div key={i} className="brand1">
                                <Image
                                    src={!!e ? `/api/uploads/images/${e?.uri}` : '/default.jpg'}
                                    alt="brand1"
                                    width={100}
                                    height={24}
                                    className="brand1"
                                />
                            </div>
                        ))}
                    </div>
                    {value.hasButton && (
                        <Link
                            href={
                                value.buttonType === 'link'
                                    ? value.buttonLink
                                    : `/api/uploads/files/${value.buttonFile?.uri}`
                            }
                        >
                            <a>
                                <div className="button">{value.buttonText}</div>
                            </a>
                        </Link>
                    )}
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="mnom">
                    <div className="mright">
                        <Image src={src1} alt="brand1" width={940} height={500} />
                    </div>
                    <div className="left-box">
                        <div className="left">
                            <div className="title">{value.title}</div>
                            <div className="introduce">{value.intro}</div>
                            <div className="content" dangerouslySetInnerHTML={{ __html: value.text || '' }} />
                            <div className="brands">
                                {value?.images?.map((e: any, i: number) => (
                                    <div key={i} className="brand1">
                                        <Image
                                            src={!!e ? `/api/uploads/images/${e?.uri}` : '/default.jpg'}
                                            alt="brand1"
                                            width={100}
                                            height={24}
                                            className="brand1"
                                        />
                                    </div>
                                ))}
                            </div>
                            {value.hasButton && (
                                <Link
                                    href={
                                        value.buttonType === 'link'
                                            ? value.buttonLink
                                            : `/api/uploads/files/${value.buttonFile?.uri}`
                                    }
                                >
                                    <a>
                                        <div className="button">{value.buttonText}</div>
                                    </a>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="right">
                        <Image
                            src={!!value.image ? `/api/uploads/images/${value.image?.uri}` : '/default.jpg'}
                            alt="brand1"
                            width={580}
                            height={500}
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default View
