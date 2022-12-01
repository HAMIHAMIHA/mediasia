import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Props } from '../types'

const View = ({ value = {}, theme }: Props) => {
    const [show, setShow] = useState(false)
    const show_box = () => {
        setShow(!show)
    }

    let [index, change] = useState(0)
    const changeImage = (e: number) => {
        change((index = e))
    }
    const leftChosen = () => {
        if (index != 0) {
            change((index = index - 1))
        }
    }
    const rightChosen = () => {
        if (index != value.images?.length - 1) {
            change((index = index + 1))
        }
    }
    return (
        <>
            <div className="inner_box">
                <div className="leftBox">
                    <div className="image" onClick={show_box} style={{ position: 'relative' }}>
                        <Image
                            src={
                                !!value.images?.length
                                    ? `/api/uploads/images/${value.images[index]?.uri}`
                                    : '/default.jpg'
                            }
                            layout="fill"
                            alt="image_programme_2"
                            className="picture"
                        />
                        <div className="icon-share">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                        </div>
                    </div>
                    <div className="changeButton">
                        {value.images?.map((e: any, i: number) => (
                            <div
                                key={i}
                                className={'yellowBall cursorPointer' + (i == index ? ' selected' : '')}
                                onClick={() => changeImage(i)}
                            ></div>
                        ))}
                    </div>
                    <div className="icon-left_yellow_arrow" onClick={leftChosen}>
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </div>
                    <div className="icon-right_yellow_arrow" onClick={rightChosen}>
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </div>
                </div>
                <div className="rightBox">
                    <div className="logo" style={{ position: 'relative' }}>
                        {value.logo && (
                            <Image
                                src={`/api/uploads/images/${value.logo?.uri}`}
                                aria-label="aria-label"
                                className="logoHill"
                                layout="fill"
                            />
                        )}
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
                                <>
                                    <div className="messages">
                                        <div>{value.text}</div>
                                    </div>
                                    <div className="bottom">
                                        <div className="question">{value.question}</div>
                                        <div className="button">
                                            <div className="icon-mail"></div>
                                            <div className="title-color-text">{value.buttonText}</div>
                                        </div>
                                    </div>
                                </>
                            </a>
                        </Link>
                    )}
                </div>
            </div>
            <div className={show ? 'showBox' : 'hidden'}>
                <div className="image">
                    <Image
                        src={
                            !!value.images?.length
                                ? `/api/uploads/images/${value.images[index]?.uri}`
                                : '/default.jpg'
                        }
                        alt="image_programme_2"
                        className="image"
                        layout="fill"
                    />
                    <div className="icon-x" onClick={show_box}></div>
                    <div className="icon-left" onClick={leftChosen}></div>
                    <div className="icon-right" onClick={rightChosen}></div>
                </div>
            </div>
        </>
    )
}

export default View
