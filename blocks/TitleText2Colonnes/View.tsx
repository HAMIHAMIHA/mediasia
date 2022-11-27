import type { Props } from '../types'

const View = ({ value = {}, theme }: Props) => {
    return (
        <>
            <div className="headline">{value.title}</div>
            <div className="firstParagraph">
                <div className="left">
                    <div className="content" dangerouslySetInnerHTML={{ __html: value.textLeft }} />
                </div>
                <div className="right">
                    <div className="content" dangerouslySetInnerHTML={{ __html: value.textRight }} />
                </div>
            </div>
        </>
    )
}

export default View
