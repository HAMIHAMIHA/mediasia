import { useState } from 'react'
import Image from 'next/image'
import type { Props } from '../types'

const View = ({ value = {}, theme }: Props) => {
    let test1 = 0
    let temporary = 0
    let arr_scroll = []
    let arr_scroll_box = []
    while (test1 < Math.ceil(value.images.length / 24)) {
        for (let i = 0; i < 23; i++) {
            if (value.images[temporary]) {
                arr_scroll.push(value.images[temporary])
                temporary++
            }
        }
        arr_scroll_box.push(arr_scroll)
        test1++
        arr_scroll = []
    }

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
            <div className="block4Title" dangerouslySetInnerHTML={{ __html: value.title }} />
            <div className="brandContainer">
                {arr_scroll_box[chosen - 1].map((e, i) => (
                    <div key={i} className="brandBox">
                        <Image
                            src={!!e ? `/api/uploads/images/${e?.uri}` : '/default.jpg'}
                            alt="brand1"
                            className="brand"
                        />
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

export default View
