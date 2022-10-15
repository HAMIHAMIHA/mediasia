//import Image, { ImageLoaderProps } from 'next/image'
import type { Media } from '@prisma/client'
import { CSSProperties } from 'react'

interface Props {
    img?:
        | {
              id?: string
              uri: string
              alt?: string | null
          }
        | Media
        | null
    className?: string
    children?: React.ReactNode
    style?: CSSProperties | undefined
}

// const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
//     return `${process.env.UPLOADS_IMAGES_DIR}/${src}?w=${width}&q=${quality || 75}`
// }

const CustomImage = ({ img, className, style }: Props) => {
    const imageURL =
        img?.uri?.indexOf('http://') === 0 ||
        img?.uri?.indexOf('https://') === 0 ||
        img?.uri?.indexOf('www.') === 0
            ? img?.uri
            : `/api/uploads/images/${img?.uri}`

    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imageURL} alt={img?.alt || ''} className={className} style={style} />
    // return (
    //     <Image
    //         className={className}
    //         // loader={myLoader}
    //         src={imageURL}
    //         alt={img?.alt || ''}
    //         layout="fill"
    //         //  width={500}
    //         //  height={500}
    //     />
    // )
}

const Background = ({ img, className, children }: Props) => {
    const imageURL =
        img?.uri?.indexOf('http://') === 0 ||
        img?.uri?.indexOf('https://') === 0 ||
        img?.uri?.indexOf('www.') === 0
            ? img?.uri
            : `/api/uploads/images/${img?.uri}`

    return (
        <>
            <div style={{ backgroundImage: `url(${imageURL})` }} className={className}>
                {children}
            </div>
            <noscript>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageURL} alt={img?.alt || ''} />
                {/* <Image
                    className={className}
                    loader={myLoader}
                    src={imageURL}
                    alt={img?.alt || ''}
                    layout="fill"
                    //  width={500}
                    //  height={500}
                /> */}
            </noscript>
        </>
    )
}

CustomImage.Background = Background

export default CustomImage
