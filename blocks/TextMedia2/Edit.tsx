import MediaModal from '@components/MediaModal'
import StyledInput from '@components/StyledInput'
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
            <div className="third">
                <div className="leftBox">
                    <StyledInput.div
                        className="left"
                        value={value.text}
                        onChange={(e) => handleChange('text', e)}
                    />
                </div>
                <div className="right" style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 3, left: 3, zIndex: 2 }}>
                        <MediaModal
                            withoutName
                            value={value.image1}
                            onMediaSelected={(e) => handleChange('image', e)}
                        />
                    </div>
                    <Image
                        src={!!value.image ? `/api/uploads/images/${value.image?.uri}` : '/default.jpg'}
                        alt="brand1"
                        layout="fill"
                        className="brand1"
                    />
                </div>
            </div>
        </>
    )
}

export default Edit
