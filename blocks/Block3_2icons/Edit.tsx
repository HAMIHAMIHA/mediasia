import Image from 'next/image'
import plan_situation from '../../public/styles/src/page2/plan_situation@2x.png'
import type { Props } from '../types'

interface Block3_2Props {
    text1: string
    text2: string[]
    text3: string[]
    transports: string[]
}

const values = {
    text1: 'Plan de situation',
    text2: ['Métro', 'Aéroport', 'TGV', 'Autoroute'],
    text3: [
        'Arrêt Jolimont, métro A 1 minute à pied',
        'Aéroport Toulouse-Blagnac 15 minutes en voiture',
        'Gare Toulouse Matabiau 5 minutes en métro',
        'A61 5 minutes en voiture',
    ],
    transports: ['metro', 'aeroport1', 'ter', 'autoroute'],
}

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const { text1, text2, text3, transports } = values

    let arr_name = [0, 1, 2, 3]
    let arr = []
    for (let i of arr_name) {
        // console.log(i,`../../public/styles/src/image_home_${i}@2x.png`)
        // let obj={ 'src':require(`../../public/styles/src/page2/icone_transport_${i}@2x.png`).default,"id":parseInt(i)-1}
        let obj = { name: transports[i], id: i }
        arr.push(obj)
    }
    // let [leftposition,changePosition] =useState('calc(40% - 320px);')
    // let move=320;
    // const moveleft=()=>{
    //     move=move+20
    //     changePosition(leftposition='calc(40% - ' + move + 'px);')
    // }
    // const moveright=()=>{
    //     move=move-20
    //     changePosition(leftposition='calc(40% - ' + move + 'px);')
    // }
    return (
        <>
            <div className="transparents">
                {arr.map((e, i) => (
                    <div key={i} className="transport-boxs">
                        <div className={'transport-box yellow icon-' + e.name}></div>
                        <div className="transport-name yellow">{text2[e.id]}</div>
                        <div className="transport-journey">{text3[e.id]}</div>
                    </div>
                ))}
                <div className="vehicle1"></div>
            </div>
        </>
    )
}

export default Edit
