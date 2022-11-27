import type { Props } from '../types'

const View = ({ value = {}, theme }: Props) => {
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
                    backgroundImage: `url(${
                        !!value.image ? `/api/uploads/images/${value.image?.uri}` : '/default.jpg'
                    }`,
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
