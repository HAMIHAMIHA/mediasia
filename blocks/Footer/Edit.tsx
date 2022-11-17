import type { Props } from '../types'

interface Bottom_Props {
    text1: string[]
    text2: string[]
    text3: string[]
}

const values = {
    text1: ['UNE MARQUE ALTAREA', "Vous avez besoin de plus d'informations ?", 'Nous contacter'],
    text2: ['Le Groupe Altarea', 'Nos programmes', 'Nos références', 'Nous contacter'],
    text3: [
        'Visitez le site',
        ' Altarea',
        ' et le site',
        ' Cogedim pour les Particuliers',
        'Copyright Altarea 2022 - Mentions Légales',
    ],
}

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const { text1, text2, text3 } = values

    return (
        <>
            <div className="block5Top">
                <div className="icon-logo_simple"></div>
                <text className="topName">{text1[0]}</text>
            </div>
            <div className="block5Middle">
                <div className="question">{text1[1]}</div>
                <div className="button">
                    <div className="icon-mail"></div>
                    <div className="title-color-text">{text1[2]}</div>
                </div>
            </div>
            <div className="block5Bottom">
                <div className="options">
                    <div className="brandm">
                        <div className="icon-logo_purple">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                            <span className="path8"></span>
                            <span className="path9"></span>
                            <span className="path10"></span>
                        </div>
                    </div>
                    <div className="option">{text2[0]}</div>
                    <div className="option">{text2[1]}</div>
                    <div className="brand">
                        <div className="icon-logo_purple">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                            <span className="path8"></span>
                            <span className="path9"></span>
                            <span className="path10"></span>
                        </div>
                    </div>
                    <div className="option">{text2[2]}</div>
                    <div className="option">{text2[3]}</div>
                </div>
                <div className="declaration">
                    <div className="first-line">
                        <text className="text-normal">{text3[0]}</text>
                        <text className="text-bold">{text3[1]}</text>
                        <text className="text-normal">{text3[2]}</text>
                        <text className="text-bold">{text3[3]}</text>
                    </div>
                    <div className="second-line">{text3[4]}</div>
                </div>
            </div>
        </>
    )
}

export default Edit
