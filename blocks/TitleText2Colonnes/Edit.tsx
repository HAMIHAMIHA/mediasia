import StyledInput from '@components/StyledInput'
import set from 'lodash.set'
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
                className="headline"
                value={value.title}
                onChange={(e) => handleChange('title', e)}
            />
            <div className="firstParagraph">
                <div className="left">
                    <StyledInput.div
                        className="content"
                        value={value.textLeft}
                        onChange={(e) => handleChange('textLeft', e)}
                    />
                </div>
                <div className="right">
                    <StyledInput.div
                        className="content"
                        value={value.textRight}
                        onChange={(e) => handleChange('textRight', e)}
                    />
                </div>
            </div>
        </>
    )
}

export default Edit
