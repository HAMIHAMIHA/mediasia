import Image from 'next/image'
import type { Props } from '../types'

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

const View = ({ value = {}, theme }: Props) => {
    return (
        <div className="pictures">
            <div className="pictureBox">
                <Image
                    src={!!value.image1 ? `/api/uploads/images/${value.image1?.uri}` : '/default.jpg'}
                    alt="brand1"
                    className="image"
                    width={800}
                    height={552}
                />
                <div className="title">{value.text1}</div>
            </div>
            <div className="pictureBox">
                <Image
                    src={!!value.image2 ? `/api/uploads/images/${value.image2?.uri}` : '/default.jpg'}
                    alt="brand2"
                    className="image"
                    width={800}
                    height={552}
                />
                <div className="title">{value.text2}</div>
            </div>
            <div className="pictureBox">
                <Image
                    src={!!value.image3 ? `/api/uploads/images/${value.image3?.uri}` : '/default.jpg'}
                    alt="brand3"
                    className="image"
                    width={800}
                    height={552}
                />
                <div className="title">{value.text3}</div>
            </div>
        </div>
    )
}

export default View
