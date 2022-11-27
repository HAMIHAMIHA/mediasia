import Image from 'next/image'
import type { Props } from '../types'

const View = ({ value = {}, theme, onChange }: Props) => {
    return (
        <>
            {!!value.title && <div className="title yellow">{value.title}</div>}
            <div className="picture">
                <Image
                    src={!!value.image ? `/api/uploads/images/${value.image?.uri}` : '/default.jpg'}
                    alt="brand1"
                    className="brand"
                    layout="fill"
                />
            </div>
            <div className="button3_5">{value.text}</div>
        </>
    )
}

export default View
