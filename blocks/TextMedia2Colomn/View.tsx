import Image from 'next/image'
import Link from 'next/link'
import type { Props } from '../types'

const View = ({ value = {}, theme }: Props) => {
    let src1 = require(`../../public/styles/src/page4/image_page_reference_6@2x.png`).default
    return (
        <div className="block5_4">
            <div className="images">
                <Image src={src1} alt="brand1" />
            </div>
            <div className="texts">
                <div className="title">{value.title}</div>
                <div className="introduce">{value.intro}</div>
                <div className="content" dangerouslySetInnerHTML={{ __html: value.text || '' }} />
                <div className="brands">
                    {value?.images?.map((e: any, i: number) => (
                        <div key={i} className="brand1">
                            <Image
                                src={!!e ? `/api/uploads/images/${e?.uri}` : '/default.jpg'}
                                alt="brand1"
                                width={100}
                                height={24}
                                className="brand1"
                            />
                        </div>
                    ))}
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
                            <div className="button">{value.buttonText}</div>
                        </a>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default View
