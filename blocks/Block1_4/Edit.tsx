import { useState } from 'react'
import Image from 'next/image'
import type { Props } from '../types'

const values = { text1: 'Ils nous ont fait confiance' }

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const { text1 } = values

    let arr = []
    //brandContainer
    let n = 0
    while (n < 3) {
        for (let i = 1; i < 25; i++) {
            let obj = { src: require(`../../public/styles/src/brand/logo_client_${i}@2x.png`).default }
            // let obj={ 'src':`../../public/styles/src/brand/logo_client_${i}@2x.png`}
            arr.push(obj)
        }
        n++
    }
    // scrollbox
    let test1 = 0
    let temporary = 0
    let arr_scroll = []
    let arr_scroll_box = []
    while (test1 < Math.ceil(arr.length / 24)) {
        for (let i = 0; i < 23; i++) {
            // console.log(arr[temporary])
            if (arr[temporary]) {
                arr_scroll.push(arr[temporary])
                temporary++
            }
        }
        arr_scroll_box.push(arr_scroll)
        test1++
        arr_scroll = []
    }
    // const list = [{src: "!"}]
    // let src1=require("../../public/styles/src/brand/logo_client_1@2x.png").default;
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
    return (
        <>
            <div className="block4Title">{text1}</div>
            <div className="brandContainer">
                {arr_scroll_box[chosen - 1].map((e, i) => (
                    // <div key={i}>{e.src}</div>
                    <div key={i} className="brandBox">
                        <Image key={i} src={e.src} alt="brand1" className="brand" />
                    </div>
                ))}
            </div>
            <div className="borderSelection">
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
                {/* <div className="icon-left"></div>
                <div className="selection selected">1</div>
                <div className="selection">2</div>
                <div className="selection">3</div>
                <div className="icon-right"></div> */}
            </div>
        </>
    )
}

export default Edit
