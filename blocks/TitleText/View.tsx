import type { Props } from '../types'

const View = ({ value = {}, theme }: Props) => {
    return (
        <>
            <div className="top4_3">
                <div className="left">
                    <div className="icon-cogedim"></div>
                    <div className="content">{value.title}</div>
                </div>
                <div className="right">
                    <div className="content2" dangerouslySetInnerHTML={{ __html: value.text }} />
                </div>
            </div>
        </>
    )
}

export default View
