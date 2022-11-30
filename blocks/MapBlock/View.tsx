import { useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import Image from 'next/image'
import type { Props } from '../types'
import { useQuery } from 'react-query'
import { getContainerDetails } from '@network/containers'
import { getContents } from '@network/public'
import get from 'lodash.get'
import Link from 'next/link'

const values = {
    number1: 57,
    text1: 'programmes en cours',
    text2: ['Hill Side - Toulouse', 'Boréal - Lyon 7', 'EMH - Villeurbanne', 'Commercialisation en cours'],
    text3: ['Surface', '31 000 m2 SDP', 'Livraison', '3e trimestre 2020'],
}

const View = ({ value = {}, theme }: Props) => {
    // const { number1, text1, text2, text3 } = values

    const contents = useQuery(
        ['contents', { container: value.container }],
        () => getContents(value.container as string),
        {
            enabled: !!value.container,
        }
    )

    const [open, setOpen] = useState(false)
    const change_map_size = () => {
        setOpen(!open)
    }
    // scrollbox
    // let arr = []
    let arrm = []
    // let test = 0
    // while (test < 10) {
    //     for (let i = 2; i < 5; i++) {
    //         let obj = {
    //             src: require(`../../public/styles/src/image_home_${i}@2x.png`).default,
    //             icon: require(`../../public/styles/src/label_1@2x.png`).default,
    //         }
    //         arr.push(obj)
    //     }
    //     test++
    // }

    let test1 = 0
    let temporary = 0
    let arr_scroll = []
    let arr_scroll_box = []
    while (test1 < Math.ceil((contents.data?.length || 0) / 9)) {
        for (let i = 0; i < 8; i++) {
            if (get(contents, `data.${temporary}`)) {
                arr_scroll.push(get(contents, `data.${temporary}`))
                temporary++
            }
        }
        arr_scroll_box.push(arr_scroll)
        test1++
        arr_scroll = []
    }
    // console.log("arr_scroll_box",arr_scroll_box)

    for (let i = 2; i < 5; i++) {
        let obj = {
            src: require(`../../public/styles/src/image_home_${i}@2x.png`).default,
            icon: require(`../../public/styles/src/label_1@2x.png`).default,
        }
        arrm.push(obj)
    }
    let obj1 = {
        src: require(`../../public/styles/src/image_home_2@2x.png`).default,
        icon: require(`../../public/styles/src/label_1@2x.png`).default,
    }
    arrm.push(obj1)
    let [chosen, setChosen] = useState(1)
    const changeChosen = (e: number) => {
        setChosen((chosen = e + 1))
    }
    const leftChosen = () => {
        if (chosen != 1) {
            setChosen((chosen = chosen - 1))
        }
        // console.log(chosen)
    }
    const rightChosen = () => {
        if (chosen != arr_scroll_box.length) {
            setChosen((chosen = chosen + 1))
        }
        // console.log(chosen)
    }
    return (
        <div className="block1_2">
            <div className={'map' + (open ? ' open' : '')}>
                {/* <div className="mblock2-map">
                    <div className="title">
                        {number1} {text1}
                    </div>
                    <Map
                        // {...viewport}
                        initialViewState={{
                            longitude: 0.6,
                            latitude: 47.18,
                            zoom: 6.06
                        }}
                        style={{width: '100%', height: '400px'}}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken="pk.eyJ1IjoicGl6enVwIiwiYSI6ImNsOTNtN3FzbzA1b3Mzdm9lZXpvcG94OXQifQ.PT2kirQB9_9_8By1AT41uQ"
                        // mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        // onViewportChange={ viewport=>{
                        //         setViewport(viewport);
                        //     }}
                    >
                        <Marker longitude={6} latitude={54} anchor="bottom" >
                            <div className="icon-gps_altarea">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                            </div>
                        </Marker>
                        <Marker longitude={8} latitude={53.8} anchor="bottom" >
                            <div className="number-ball" aria-label="aria-label">
                                13
                            </div>
                        </Marker>
                    </Map>
                </div> */}
                <div className={'block2-map' + (open ? ' open' : '')} id="block2-id">
                    <div className="title">{`${contents.data?.length || 0} programmes en cours`}</div>
                    <div className="mapBox">
                        <Map
                            // {...viewport}
                            initialViewState={{
                                longitude: 0.6,
                                latitude: 47.18,
                                zoom: 6.06,
                            }}
                            style={{ width: '100%', height: '100%' }}
                            mapStyle="mapbox://styles/mapbox/streets-v9"
                            mapboxAccessToken="pk.eyJ1IjoicGl6enVwIiwiYSI6ImNsOTNtN3FzbzA1b3Mzdm9lZXpvcG94OXQifQ.PT2kirQB9_9_8By1AT41uQ"
                            // mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                            // onViewportChange={ viewport=>{
                            //         setViewport(viewport);
                            //     }}
                        >
                            <Marker longitude={6} latitude={54} anchor="bottom">
                                <div className="icon-gps_altarea">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                    <span className="path3"></span>
                                </div>
                            </Marker>
                            <Marker longitude={8} latitude={53.8} anchor="bottom">
                                <div className="number-ball" aria-label="aria-label">
                                    13
                                </div>
                            </Marker>
                        </Map>
                    </div>
                    {/* <Script id="show-scroll" strategy="lazyOnload">
                        {`console.log("1")`}
                    </Script> */}
                </div>
            </div>
            <div className="scrollBox">
                <div className="scroll-boxm">
                    {arr_scroll_box[chosen - 1]?.map((e, i) => {
                        const coverField = e.fields?.find((f: any) => f.name === value.coverField)
                        const titleField = e.fields?.find((f: any) => f.name === value.titleField)
                        const descField = e.fields?.find((f: any) => f.name === value.descField)
                        const logoLeft = e.fields?.find((f: any) => f.name === value.logoLeft)
                        const logoRight = e.fields?.find((f: any) => f.name === value.logoRight)

                        const surfField = e.fields?.find((f: any) => f.name === value.surfField)
                        const livrField = e.fields?.find((f: any) => f.name === value.livrField)

                        return (
                            <div key={i} className="show-box">
                                <div className="picture-title">
                                    <Image
                                        key={i}
                                        src={
                                            !!logoLeft?.media
                                                ? `/api/uploads/images/${logoLeft.media?.uri}`
                                                : '/default.jpg'
                                        }
                                        alt="brand1"
                                        width={83}
                                        height={20}
                                        className="picture"
                                    />
                                    <Image
                                        key={i}
                                        src={
                                            !!logoRight?.media
                                                ? `/api/uploads/images/${logoRight.media?.uri}`
                                                : '/default.jpg'
                                        }
                                        alt="brand1"
                                        width={83}
                                        height={20}
                                        className="picture"
                                    />
                                </div>
                                <div className="picture-box picture-box1">
                                    <div className="bgc">
                                        <Image
                                            key={i}
                                            src={
                                                !!coverField?.media
                                                    ? `/api/uploads/images/${coverField.media?.uri}`
                                                    : '/default.jpg'
                                            }
                                            alt="brand1"
                                            width={1200}
                                            height={900}
                                            className="picture"
                                        />
                                        <div className="picture-text1">{titleField?.textValue}</div>
                                        <div className="picture-text2">{descField?.textValue}</div>
                                    </div>
                                    <div className="white-bottom-box">
                                        <div className="Surface-flex">
                                            <div className="icon-calendrier"></div>
                                            <div className="Surface-name">
                                                <div className="Surface-Surface">{'Surface'}</div>
                                                <div className="Surface-info">{surfField?.textValue}</div>
                                            </div>
                                        </div>
                                        <div className="Surface-flex">
                                            <div className="icon-surface"></div>
                                            <div className="Livraison-name">
                                                <div className="Surface-Surface">{'Livraison'}</div>
                                                <div className="Surface-info">{livrField?.textValue}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Link href={`/${e.slug.full}`}>
                                    <a>
                                        <div className="Decouvrir">
                                            <div>Découvrir</div>
                                            <div className="icon-right"></div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        )
                    })}
                    <div className="voir">Voir plus de projets</div>
                </div>
                <div className="scroll-box-outside">
                    <div className="scroll-title">{`${contents.data?.length || 0} programmes en cours`}</div>
                    <div className={'scroll-box' + (open ? ' box-show' : '')}>
                        {arr_scroll_box[chosen - 1]?.map((e, i) => {
                            const coverField = e.fields?.find((f: any) => f.name === value.coverField)
                            const titleField = e.fields?.find((f: any) => f.name === value.titleField)
                            const descField = e.fields?.find((f: any) => f.name === value.descField)
                            const logoLeft = e.fields?.find((f: any) => f.name === value.logoLeft)
                            const logoRight = e.fields?.find((f: any) => f.name === value.logoRight)

                            const surfField = e.fields?.find((f: any) => f.name === value.surfField)
                            const livrField = e.fields?.find((f: any) => f.name === value.livrField)

                            return (
                                <div key={i} className={'show-box' + (open ? ' show-box-width' : '')}>
                                    <div className="picture-title">
                                        <Image
                                            key={i}
                                            src={
                                                !!logoLeft?.media
                                                    ? `/api/uploads/images/${logoLeft.media?.uri}`
                                                    : '/default.jpg'
                                            }
                                            alt="brand1"
                                            width={83}
                                            height={20}
                                            className="picture"
                                        />
                                        <Image
                                            key={i}
                                            src={
                                                !!logoRight?.media
                                                    ? `/api/uploads/images/${logoRight.media?.uri}`
                                                    : '/default.jpg'
                                            }
                                            alt="brand1"
                                            width={83}
                                            height={20}
                                            className="picture"
                                        />
                                    </div>
                                    <div className="picture-box picture-box1">
                                        <div className="bgc">
                                            <Image
                                                key={i}
                                                src={
                                                    !!coverField?.media
                                                        ? `/api/uploads/images/${coverField.media?.uri}`
                                                        : '/default.jpg'
                                                }
                                                alt="brand1"
                                                width={1200}
                                                height={900}
                                                className="picture"
                                            />
                                            <div className="picture-text1">{titleField?.textValue}</div>
                                            <div className="picture-text2">{descField?.textValue}</div>
                                        </div>
                                        <div className="white-bottom-box">
                                            <div className="Surface-flex">
                                                <div className="icon-surface"></div>
                                                <div className="Surface-name">
                                                    <div className="Surface-Surface">{'Surface'}</div>
                                                    <div className="Surface-info">{surfField?.textValue}</div>
                                                </div>
                                            </div>
                                            <div className="Surface-flex">
                                                <div className="icon-calendrier"></div>
                                                <div className="Livraison-name">
                                                    <div className="Surface-Surface">{'Livraison'}</div>
                                                    <div className="Surface-info">{livrField?.textValue}</div>
                                                </div>
                                            </div>
                                            <Link href={`/${e.slug.full}`}>
                                                <a>
                                                    <div className="Decouvrir">
                                                        <div>Découvrir</div>{' '}
                                                        <div className="icon-right"></div>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={'border-bottom' + (open ? ' border-bottom-click' : '')}></div>
                    <div className="border-selection">
                        <div className="icon-left cursorPointer" onClick={leftChosen}></div>
                        {arr_scroll_box.map((e, i) => (
                            <div
                                key={i}
                                className={'selection cursorPointer' + (i + 1 == chosen ? ' selected' : '')}
                                onClick={() => changeChosen(i)}
                            >
                                {i + 1}
                            </div>
                        ))}
                        {/* <div className="selection selected">1</div>
                        <div className="selection">2</div>
                        <div className="selection">3</div>
                        <div className="selection">4</div>
                        <div className="selection">5</div>
                        <div className="selection">6</div> */}
                        <div className="icon-right cursorPointer" onClick={rightChosen}></div>
                    </div>
                    <div
                        className={'click-move' + (open ? ' hidden' : '')}
                        style={{}}
                        onClick={change_map_size}
                    >
                        <div className="icon-left"></div>
                    </div>
                    <div
                        className={'click-move' + (open ? '' : ' hidden')}
                        style={{}}
                        onClick={change_map_size}
                    >
                        <div className="icon-right"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View
