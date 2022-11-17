import { useState } from 'react'
import Image from 'next/image'
import type { Props } from '../types'

interface Block2_2Props {
    number1: number
    text1: string
    text2: string[]
    text3: string[]
}

const values = {
    number1: 57,
    text1: 'programmes en cours',
    text2: ['Hill Side - Toulouse', 'Boréal - Lyon 7', 'EMH - Villeurbanne', 'Commercialisation en cours'],
    text3: ['Surface', '31 000 m2 SDP', 'Livraison', '3e trimestre 2020'],
}

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const { number1, text1, text2, text3 } = values
    // scrollbox
    let arr = []
    let arrm = []
    let test = 0
    while (test < 10) {
        for (let i = 2; i < 5; i++) {
            let obj = {
                src: require(`../../public/styles/src/image_home_${i}@2x.png`).default,
                icon: require(`../../public/styles/src/label_1@2x.png`).default,
            }
            arr.push(obj)
        }
        test++
    }
    let test1 = 0
    let temporary = 0
    let arr_scroll = []
    let arr_scroll_box = []
    while (test1 < Math.ceil(arr.length / 4)) {
        for (let i = 0; i < 4; i++) {
            if (arr[temporary]) {
                arr_scroll.push(arr[temporary])
                temporary++
            }
        }
        arr_scroll_box.push(arr_scroll)
        test1++
        arr_scroll = []
    }
    // console.log("arr_scroll_box",arr_scroll_box)

    for (let i = 2; i < 5; i++) {
        let obj = {
            src: require(`../../public/styles/src/image_home_${i}@2x.png`).default,
            icon: require(`../../public/styles/src/label_1@2x.png`).default,
        }
        arrm.push(obj)
    }
    let obj1 = {
        src: require(`../../public/styles/src/image_home_2@2x.png`).default,
        icon: require(`../../public/styles/src/label_1@2x.png`).default,
    }
    arrm.push(obj1)
    let [chosen, setChosen] = useState(1)
    const changeChosen = (e: number) => {
        setChosen((chosen = e + 1))
    }
    const leftChosen = () => {
        if (chosen != 1) {
            setChosen((chosen = chosen - 1))
        }
        // console.log(chosen)
    }
    const rightChosen = () => {
        if (chosen != arr_scroll_box.length) {
            setChosen((chosen = chosen + 1))
        }
        // console.log(chosen)
    }
    // let [chosenArr, plus] = useState([{}])
    // chosenArr.push(arr[0])
    // for(let a=0;a<4;a++){
    //     chosenArr.push(arr[a])
    // }
    // let index=4
    // const moreChosen=()=>{
    //     plus(chosenArr.push(arr[index]))
    // }
    return (
        <>
            <div className="scrollBox">
                <div className="scroll-boxm">
                    {arr_scroll_box[chosen - 1].map((e, i) => (
                        <div key={i} className="show-box">
                            <div className="picture-title">
                                <Image
                                    key={i}
                                    src={e.icon}
                                    alt="brand1"
                                    width={83}
                                    height={20}
                                    className="picture"
                                />
                                <Image
                                    key={i}
                                    src={e.icon}
                                    alt="brand1"
                                    width={83}
                                    height={20}
                                    className="picture"
                                />
                            </div>
                            <div className="picture-box picture-box1">
                                <div className="bgc">
                                    <Image
                                        key={i}
                                        src={e.src}
                                        alt="brand1"
                                        width={1200}
                                        height={900}
                                        className="picture"
                                    />
                                    <div className="picture-text1">{text2[0]}</div>
                                    <div className="picture-text2">{text2[3]}</div>
                                </div>
                                <div className="white-bottom-box">
                                    <div className="Surface-flex">
                                        <div className="icon-calendrier"></div>
                                        <div className="Surface-name">
                                            <div className="Surface-Surface">{text3[0]}</div>
                                            <div className="Surface-info">{text3[1]}</div>
                                        </div>
                                    </div>
                                    <div className="Surface-flex">
                                        <div className="icon-surface"></div>
                                        <div className="Livraison-name">
                                            <div className="Surface-Surface">{text3[2]}</div>
                                            <div className="Surface-info">{text3[3]}</div>
                                        </div>
                                    </div>
                                    <div className="Decouvrirm">
                                        <div>Découvrir</div>
                                        <div className="icon-right"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="Decouvrir">
                                <div>Découvrir</div>
                                <div className="icon-right"></div>
                            </div>
                        </div>
                    ))}
                    {/* onClick={moreChosen} */}
                    <div className="voir">Voir plus de projets</div>
                </div>
                <div className="border-selection">
                    <div className="icon-left cursorPointer" onClick={leftChosen}></div>
                    {arr_scroll_box.map((e, i) => (
                        <div
                            key={i}
                            className={'selection cursorPointer' + (i + 1 == chosen ? ' selected' : '')}
                            onClick={() => changeChosen(i)}
                        >
                            {i + 1}
                        </div>
                    ))}
                    <div className="icon-right cursorPointer" onClick={rightChosen}></div>
                </div>
            </div>
        </>
    )
}

export default Edit
