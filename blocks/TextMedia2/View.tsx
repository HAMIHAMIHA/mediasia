import Image from 'next/image'
import type { Props } from '../types'

const View = ({ value = {}, theme }: Props) => {
    return (
        <>
            <div className="third">
                <div className="leftBox">
                    <div className="left" dangerouslySetInnerHTML={{ __html: value.text || '' }} />
                </div>
                <div className="right" style={{ position: 'relative' }}>
                    <Image
                        src={!!value.image ? `/api/uploads/images/${value.image?.uri}` : '/default.jpg'}
                        layout="fill"
                        alt="brand1"
                        className="brand1"
                    />
                </div>
            </div>
        </>
    )
}

export default View
