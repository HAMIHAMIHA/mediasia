import MediaModal from '@components/MediaModal'
import set from 'lodash.set'
import Image from 'next/image'
import type { Props } from '../types'

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    return (
        <>
            <div className="first">
                <div className="left" style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 3, left: 3, zIndex: 2 }}>
                        <MediaModal
                            withoutName
                            value={value.image1}
                            onMediaSelected={(e) => handleChange('image1', e)}
                        />
                    </div>
                    <Image
                        src={!!value.image1 ? `/api/uploads/images/${value.image1?.uri}` : '/default.jpg'}
                        alt="brand1"
                        layout="fill"
                        className="brand1"
                    />
                </div>
                <div className="right" style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 3, left: 3, zIndex: 2 }}>
                        <MediaModal
                            withoutName
                            value={value.image1}
                            onMediaSelected={(e) => handleChange('image1', e)}
                        />
                    </div>
                    <Image
                        src={!!value.image2 ? `/api/uploads/images/${value.image2?.uri}` : '/default.jpg'}
                        alt="brand2"
                        layout="fill"
                        className="brand1"
                    />
                </div>
            </div>
        </>
    )
}

export default Edit
