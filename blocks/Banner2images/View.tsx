import Image from 'next/image'
import type { Props } from '../types'

const View = ({ value = {}, theme }: Props) => {
    return (
        <div className="first">
            <div className="left">
                <Image
                    src={!!value.image1 ? `/api/uploads/images/${value.image1?.uri}` : '/default.jpg'}
                    alt="brand1"
                    width={1200}
                    height={640}
                    className="brand1"
                />
            </div>
            <div className="right">
                <Image
                    src={!!value.image2 ? `/api/uploads/images/${value.image2?.uri}` : '/default.jpg'}
                    alt="brand1"
                    width={1200}
                    height={1035}
                    className="brand1"
                />
            </div>
        </div>
    )
}

export default View
