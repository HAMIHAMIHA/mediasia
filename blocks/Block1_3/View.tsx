import type { Props } from '../types'

// const values = {
//     text1: [
//         'Une culture entrepreneuriale',
//         'Animé par une véritable culture entrepreneuriale',
//         ", Cogedim a développé un fort ancrage territorial, gage d'une croissance durable. Acteur clé de la ville, au contact des métropoles et de leurs territoires, nous offrons à nos clients des solutions urbaines et immobilières à taille humaine. ",
//         'Nous contacter',
//         "L'immobilier d'entreprise au servive du développement des territoires.",
//     ],
// }

const View = ({ value = {}, theme }: Props) => {
    // const { text1 } = values
    // let src=require(`../../public/styles/src/image_home_5@2x.png`).default
    return (
        <>
            <div className="left-box">
                <div className="text-box">
                    <div className="text-box-title">{value.title}</div>
                    <div className="text-box-text">
                        <text className="text2" dangerouslySetInnerHTML={{ __html: value.text }} />
                    </div>
                    {value.hasButton && (
                        <div className="button cursorPointer">
                            <div className="icon-mail"></div>
                            <div className="title-color-text">{value.buttonText}</div>
                        </div>
                    )}
                </div>
            </div>
            <div
                className="right-box"
                style={{
                    backgroundImage: value.image ? `url(/api/uploads/images/${value.image.uri})` : undefined,
                }}
            >
                <div className="white-border">
                    <div className="text" dangerouslySetInnerHTML={{ __html: value.leftTitle }} />
                </div>
                {/* <Image src={src} width={960} height={500}/> */}
            </div>
        </>
    )
}

export default View
