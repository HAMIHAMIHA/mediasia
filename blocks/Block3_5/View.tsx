import Image from 'next/image'
import type { Props } from '../types'

interface Block3_5Props {
    text1: string[]
}

const values = {
    text1: ['Plan de masse', 'Voir les plans'],
}

const View = ({ value = {}, theme }: Props) => {
    const { text1 } = values

    let src = require(`../../public/styles/src/page2/pland_de_masse@2x.png`).default
    return (
        <div className="block3_5">
            <div className="title yellow">{text1[0]}</div>
            <div className="picture">
                <Image src={src} alt="brand1" className="brand" />
            </div>
            <div className="button">{text1[1]}</div>
        </div>
    )
}

export default View
