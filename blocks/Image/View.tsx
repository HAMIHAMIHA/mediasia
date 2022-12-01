import Image from 'next/image'
import Link from 'next/link'
import type { Props } from '../types'

const View = ({ value = {}, theme, onChange }: Props) => {
    return (
        <>
            {!!value.title && <div className="title yellow">{value.title}</div>}
            <div className="picture" style={{ position: 'relative' }}>
                <Image
                    src={!!value.image ? `/api/uploads/images/${value.image?.uri}` : '/default.jpg'}
                    alt="brand1"
                    className="brand"
                    layout="fill"
                />
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
                        <div className="button3_5">{value.buttonText}</div>
                    </a>
                </Link>
            )}
        </>
    )
}

export default View
