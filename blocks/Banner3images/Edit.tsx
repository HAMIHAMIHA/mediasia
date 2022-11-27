import MediaModal from '@components/MediaModal'
import Image from 'next/image'
import type { Props } from '../types'
import set from 'lodash.set'
import StyledInput from '@components/StyledInput'

const Edit = ({ value = {}, onChange, theme }: Props) => {
    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    return (
        <div className="pictures">
            <div className="pictureBox" style={{ position: 'relative' }}>
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
                    className="image"
                    width={800}
                    height={552}
                />
                <StyledInput
                    className="title"
                    value={value.text1}
                    onChange={(e) => handleChange('text1', e)}
                />
            </div>

            <div className="pictureBox" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 3, left: 3, zIndex: 2 }}>
                    <MediaModal
                        withoutName
                        value={value.image2}
                        onMediaSelected={(e) => handleChange('image2', e)}
                    />
                </div>
                <Image
                    src={!!value.image2 ? `/api/uploads/images/${value.image2?.uri}` : '/default.jpg'}
                    alt="brand2"
                    className="image"
                    width={800}
                    height={552}
                />
                <StyledInput
                    className="title"
                    value={value.text2}
                    onChange={(e) => handleChange('text2', e)}
                />
            </div>

            <div className="pictureBox" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 3, left: 3, zIndex: 2 }}>
                    <MediaModal
                        withoutName
                        value={value.image3}
                        onMediaSelected={(e) => handleChange('image3', e)}
                    />
                </div>
                <Image
                    src={!!value.image3 ? `/api/uploads/images/${value.image3?.uri}` : '/default.jpg'}
                    alt="brand3"
                    className="image"
                    width={800}
                    height={552}
                />
                <StyledInput
                    className="title"
                    value={value.text3}
                    onChange={(e) => handleChange('text3', e)}
                />
            </div>
        </div>
    )
}

export default Edit
