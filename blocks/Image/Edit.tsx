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
            <StyledInput.div
                className="title yellow"
                value={value.text}
                onChange={(e) => handleChange('text', e)}
            />
            <div className="picture" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 3, left: 3, zIndex: 2 }}>
                    <MediaModal
                        withoutName
                        value={value.image}
                        onMediaSelected={(e) => handleChange('image', e)}
                    />
                </div>
                <Image
                    src={!!value.image ? `/api/uploads/images/${value.image?.uri}` : '/default.jpg'}
                    alt="brand1"
                    className="brand"
                    layout="fill"
                />
            </div>
            <div className="button3_5">
                <StyledInput
                    value={value.text}
                    style={{ margin: 0 }}
                    onChange={(e) => handleChange('text', e)}
                />
            </div>
        </>
    )
}

export default Edit
