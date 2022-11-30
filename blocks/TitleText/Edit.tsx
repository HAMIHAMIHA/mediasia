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
            <div className="top4_3">
                <div className="left">
                    <div className="icon-cogedim"></div>
                    <div className="content">
                        <StyledInput value={value.title} onChange={(e) => handleChange('title', e)} />
                    </div>
                </div>
                <div className="right">
                    <StyledInput.div
                        className="content2"
                        value={value.text}
                        onChange={(e) => handleChange('text', e)}
                    />
                </div>
            </div>
        </>
    )
}

export default Edit
