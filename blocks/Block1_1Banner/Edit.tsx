import { useMemo, useState } from 'react'
import Image from 'next/image'
import type { Props } from '../types'
import EditPanel from '@components/EditPanel'
import { Space } from 'antd'
import ColorButton from '@components/ColorButton'
import set from 'lodash.set'
import MediaModal from '@components/MediaModal'
import StyledInput from '@components/StyledInput'

const values = {
    text0: ['Le Groupe Altarea', 'Nos programmes', 'Nos références', 'Nous contacter'],
    text1: 'LE BUREAU EN RÉGION PAR COGEDIM',
    text2: [
        "Premier promoteur en immobilier d'entreprise à l'échelle nationale, ",
        'Cogedim ',
        'développe des opérations de bureau partout en France autour de 3 pôles majeurs : ',
        "la prestation de services, les immeubles clés en main utilisateur et l'investissement.",
        "Le Groupe a pour vocation d'",
        'accompagner les entreprises de toutes tailles ',
        "dans leur stratégie d'implantation régionale dans un contexte où les modes de travail se transforment et les enjeux de développement durable sont prépondérants.",
    ],
    text3: ['       ', "Imaginer le futur de l'immobilier d'entreprise"],
    text4: 'Découvrez nos projets immobiliers par région',
    text5: [
        'Auvergne Rhône-Alpes',
        'Bourgogne Franche-Comté',
        'Bretagne',
        'Centre Val de Loire',
        'Grand Est',
        'Hauts-de-France',
        'Normandie',
        'Nouvelle Aquitaine',
        'Occitanie',
        'Pays de la Loire',
        "Provence Alpes Côte d'Azur",
    ],
    propramme: ['program1', 'program2', 'program3'],
    introduce:
        'Les données recueillies ci-dessus sont nécessaires pour nous permettre de répondre à votre demande de renseignement dans le cadre de la commercialisation des programmes par Cogedim Provence. Pour en savoir plus sur le traitement de vos données et vos droits, cliquer ici.',
}

//Only block1 can click the button to display the input field

const Edit = ({ value = { color: '#42145F' }, onChange, theme }: Props) => {
    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    const { /* text0, text1, text2,  text4, text5, */ text3, propramme, introduce } = values
    const block1 = {
        colorBar: true,
        textTitle: true,
        logo: true,
        roundButton: true,
        brands: true,
        infos: true,
        button: true,
        whiteText: true,
        person: true,
    }
    let label_1 = require(`../../public/styles/src/page4/label_1@2x.png`).default
    let label_2 = require(`../../public/styles/src/page4/label_2@2x.png`).default
    let label_3 = require(`../../public/styles/src/page4/label_3@2x.png`).default
    let label_4 = require(`../../public/styles/src/page4/label_4@2x.png`).default
    const move_down = () => {
        scrollTo({
            top: 800,
            left: 0,
            behavior: 'smooth',
        })
    }
    // const [show, setShow] = useState(false)
    // const show_box = () => {
    //     setShow(!show)
    // }
    // const [show2, setShow2] = useState(false)
    // const show_box2 = () => {
    //     setShow2(!show2)
    // }
    const [showi, showInput] = useState(false)
    const show_input = () => {
        showInput(!showi)
    }
    // let [typeColors, changeType] = useState('dark_purple')
    // const changeColor = (e: string) => {
    //     changeType((typeColors = e))
    //     // console.log(typeColors)
    // }
    let arr = []
    for (let i = 0; i < propramme.length; i++) {
        let obj = { selections: propramme[i] }
        arr.push(obj)
    }

    const color = useMemo(() => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value.color)

        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null
    }, [value.color])

    return (
        <EditPanel
            view={
                <>
                    <div
                        className="imageBox"
                        style={{
                            position: 'relative',
                            backgroundImage: value.image
                                ? `url(/api/uploads/images/${value.image.uri})`
                                : undefined,
                        }}
                    >
                        <div style={{ position: 'absolute', top: 3, left: 3 }}>
                            <MediaModal
                                withoutName
                                type="IMAGE"
                                value={value.image}
                                onMediaSelected={(e) => handleChange('image', e)}
                            />
                        </div>
                        <div
                            className="text-box"
                            style={{
                                position: 'relative',
                            }}
                        >
                            <div style={{ position: 'absolute', top: 33, right: 33, zIndex: 5 }}>
                                <ColorButton value={value.color} onChange={(e) => handleChange('color', e)} />
                            </div>
                            <div className="text">
                                <StyledInput.Text
                                    className={block1.textTitle ? 'textTitle' : 'hidden'}
                                    value={value.title}
                                    onChange={(e) => handleChange('title', e)}
                                />
                                <div className={block1.logo ? 'logo' : 'hidden'}>
                                    <div className="icon-logo_hill_side">
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                        <span className="path3"></span>
                                        <span className="path4"></span>
                                        <span className="path5"></span>
                                        <span className="path6"></span>
                                        <span className="path7"></span>
                                    </div>
                                </div>
                                <StyledInput.Text
                                    value={value.text}
                                    onChange={(e) => handleChange('text', e)}
                                />
                            </div>
                            <div className={block1.brands ? 'brands' : 'hidden'}>
                                <div className="icon-lower">
                                    <Image src={label_1} width={100} height={24} alt="" />
                                </div>
                                <div className="icon">
                                    <Image src={label_2} alt="" />
                                </div>
                                <div className="icon">
                                    <Image src={label_3} alt="" />
                                </div>
                                <div className="icon">
                                    <Image src={label_4} alt="" />
                                </div>

                                {/* <div className="icon">
                                    <Image src={label_4} alt="" />
                                </div> */}
                            </div>
                            <div className={block1.infos ? 'infos' : 'hidden'}>
                                {/* <div className="line1">
                                    <Space></Space>
                                    <StyledInput className="title" />
                                    <StyledInput.Text className="content" />
                                </div> */}
                                <div className="line2">
                                    <text className="title">title:</text>
                                    <text className="content"> content</text>
                                </div>
                                <div className="line3">
                                    <text className="title">title:</text>
                                    <text className="content"> content</text>
                                </div>
                            </div>
                            <div className={block1.button ? 'button' : 'hidden'}>
                                <div className="icon-mail"></div>
                                <div className="title-color-text">button</div>
                            </div>
                            <div
                                className={block1.roundButton ? 'roundButton' : 'hidden'}
                                onClick={move_down}
                            >
                                <div className="icon-composant">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </div>
                            </div>
                        </div>
                        <div className={'arcBox'}>
                            <div className={block1.person ? 'hidden' : 'mwhiteText'}>{text3[1]}</div>
                            <div className={block1.person ? 'person' : 'hidden'}>
                                <Image src={label_1} alt="" />
                            </div>
                        </div>
                        <div className="white-text-box">
                            <div className="white-text">
                                <StyledInput.Text
                                    value={value.leftTitle}
                                    onChange={(e) => handleChange('leftTitle', e)}
                                />
                                {/* <text>xxx{text3[0]}</text>
                                <text>{text3[1]}</text> */}
                            </div>
                        </div>
                        <div className="white-ball-box">
                            <div className="white-ball"></div>
                        </div>
                        <div
                            className="white-box"
                            style={{
                                backgroundColor: `rgba(${color?.r || 0}, ${color?.g || 0}, ${
                                    color?.b || 10
                                }, 0.3)`,
                            }}
                        >
                            <div
                                className="color-ball"
                                style={{
                                    backgroundColor: `rgba(${color?.r || 0}, ${color?.g || 0}, ${
                                        color?.b || 0
                                    }, 0.7)`,
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className={showi ? 'inputBox' : 'hidden'}>
                        <form action="submit" className="relativeBox">
                            <div className="circular">
                                <div className="icon-logo_white">
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
                            <div className="close" onClick={show_input}>
                                <div className="icon-x"></div>
                            </div>
                            <div className="title">En savoir plus</div>
                            <div className="programme">
                                <div className="text">Programme</div>
                                <select className="select">
                                    <option className="option none"></option>
                                    {arr.map((e, i) => (
                                        <option key={i} className="option">
                                            {e.selections}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="selection" placeholder="Programme">
                                <input
                                    type="radio"
                                    name="radio"
                                    value="Acheter"
                                    className="select"
                                    checked
                                ></input>
                                Acheter
                                <input
                                    type="radio"
                                    name="radio"
                                    value="Louer"
                                    className="select"
                                    checked
                                ></input>
                                Louer
                                <input
                                    type="radio"
                                    name="radio"
                                    value={"Demande d'information"}
                                    className="select"
                                    checked
                                ></input>
                                {"Demande d'information"}
                            </div>
                            <div className="nompre">
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="*Nom"
                                    className="middle nom"
                                ></input>
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="*Prénom"
                                    className="middler pre"
                                ></input>
                            </div>
                            <input
                                type="text"
                                name="firstname"
                                placeholder="*Email"
                                className="large email"
                            ></input>
                            <input
                                type="text"
                                name="firstname"
                                placeholder="*Téléphone"
                                className="large telephone"
                            ></input>
                            <div className="code">
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="*Code Postal"
                                    className="middle nom"
                                ></input>
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="*Ville"
                                    className="middler pre"
                                ></input>
                            </div>
                            <textarea
                                name="message"
                                id=""
                                cols={30}
                                rows={10}
                                placeholder="Message"
                                className="message"
                            ></textarea>
                            <button type="submit" className="envoyer" onClick={show_input}>
                                <div className="email">
                                    <div className="icon-mail"></div>
                                </div>
                                <div>Envoyer</div>
                            </button>
                            <div className="bottomText">{introduce}</div>
                        </form>
                        {/* <div className="merci">
                <div className="circular">
                    <Image src={src} className="logo" width={100} height={100}/>
                </div>
                <button type="submit" className="fermer" onClick={show_input}>Fermer</button>
                <div className="bottomText">{introduce}</div>
            </div>  */}
                    </div>
                </>
            }
            panel={<Space direction="vertical"></Space>}
        />
    )
}
export default Edit
