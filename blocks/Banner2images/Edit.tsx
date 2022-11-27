import MediaModal from '@components/MediaModal'
import set from 'lodash.set'
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

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    return (
        <>
            <div className="first">
                <div className="left" style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 3, left: 3, zIndex: 2 }}>
                        <MediaModal
                            withoutName
                            value={value.image1}
                            onMediaSelected={(e) => handleChange('image1', e)}
                        />
                    </div>
                    <Image
                        src={!!value.image1 ? `/api/uploads/images/${value.image1?.uri}` : '/default.jpg'}
                        alt="brand1"
                        layout="fill"
                        className="brand1"
                    />
                </div>
                <div className="right" style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 3, left: 3, zIndex: 2 }}>
                        <MediaModal
                            withoutName
                            value={value.image1}
                            onMediaSelected={(e) => handleChange('image1', e)}
                        />
                    </div>
                    <Image
                        src={!!value.image2 ? `/api/uploads/images/${value.image2?.uri}` : '/default.jpg'}
                        alt="brand2"
                        layout="fill"
                        className="brand1"
                    />
                </div>
            </div>
        </>
    )
}

export default Edit
