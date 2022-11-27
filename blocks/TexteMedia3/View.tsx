import Image from 'next/image'
import type { Props } from '../types'

const View = ({ value = {}, theme }: Props) => {
    return (
        <>
            <div className="left3_4">
                <div className="title yellow" dangerouslySetInnerHTML={{ __html: value.title }} />
                <div className="content" dangerouslySetInnerHTML={{ __html: value.text }} />
                {value.hasButton && (
                    <div className="button" dangerouslySetInnerHTML={{ __html: value.button }} />
                )}
            </div>
            <div className="right3_4">
                <Image
                    src={!!value.image ? `/api/uploads/images/${value.image?.uri}` : '/default.jpg'}
                    alt="brand1"
                    width={960}
                    height={500}
                    className="brand"
                />
            </div>
        </>
    )
}

export default View
