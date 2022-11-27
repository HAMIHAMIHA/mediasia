import type { Props } from '../types'

const View = ({ value = {}, theme }: Props) => {
    return (
        <>
            <div className="transparents">
                {value?.array?.map((e: any, i: number) => (
                    <div key={i} className="transport-boxs">
                        <div className={`transport-box yellow icon-${e.icon}`}></div>
                        <div className="transport-name yellow">{e.title}</div>
                        <div className="transport-journey">{e.text}</div>
                    </div>
                ))}
                <div className="vehicle1"></div>
            </div>
        </>
    )
}

export default View
