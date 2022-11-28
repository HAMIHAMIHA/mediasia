import { useState } from 'react'
import Image from 'next/image'
import type { Props } from '../types'
import StyledInput from '@components/StyledInput'
import set from 'lodash.set'
import MediaModal from '@components/MediaModal'
import { CloseOutlined, FileImageOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const Edit = ({ value = { images: [] }, onChange, theme }: Props) => {
    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

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
            <StyledInput.div
                className="block4Title"
                value={value.title}
                onChange={(e) => handleChange('title', e)}
            />
            <div className="brandContainer">
                {arr_scroll_box[chosen - 1]?.map((e, i) => (
                    // <div key={i}>{e.src}</div>
                    <div key={i} className="brandBox" style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 3, left: 3, zIndex: 2 }}>
                            <MediaModal
                                withoutName
                                label=""
                                icon={<FileImageOutlined />}
                                value={value.images[i]}
                                onMediaSelected={(e) => handleChange(`images.${i}`, e)}
                            />
                        </div>

                        <div style={{ position: 'absolute', top: 3, right: 3, zIndex: 2 }}>
                            <Button
                                danger
                                icon={<CloseOutlined />}
                                onClick={() => {
                                    const newValues = [...value.images]

                                    newValues.splice(i, 1)

                                    handleChange('images', newValues)
                                }}
                            />
                        </div>
                        <Image
                            src={!!e ? `/api/uploads/images/${e?.uri}` : '/default.jpg'}
                            alt="brand1"
                            className="brand"
                            layout="fill"
                        />
                    </div>
                ))}

                {(arr_scroll_box.length === chosen || arr_scroll_box.length === 0) && (
                    <div className="brandBox">
                        <MediaModal
                            withoutName
                            label="Add one"
                            icon={<FileImageOutlined />}
                            value={undefined}
                            onMediaSelected={(e) => handleChange(`images`, [...value.images, e])}
                        />
                    </div>
                )}
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
