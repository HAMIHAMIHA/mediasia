import type { Props } from '../types'

const View = ({ value = {}, theme }: Props) => {
    return (
        <>
            <div className="arrows">
                <div className="title">{value.topTitle}</div>

                <div className="arrowsPart">
                    <div className="left">
                        <div className="line">{value.topLeft}</div>
                        <div className="line">{value.bottomLeft}</div>
                    </div>
                    <div className="middle">
                        <div className="vertical"></div>
                        <div className="triangle"></div>
                    </div>
                    <div className="right">
                        <div className="line">{value.topRight}</div>
                        <div className="line">{value.bottomRight}</div>
                    </div>
                </div>
                <div className="bottom4_4">{value.bottomTitle}</div>
            </div>
        </>
    )
}

export default View
