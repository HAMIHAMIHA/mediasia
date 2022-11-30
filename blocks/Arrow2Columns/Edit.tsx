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
            <div className="arrows">
                <div className="title">
                    <StyledInput value={value.topTitle} onChange={(e) => handleChange('topTitle', e)} />
                </div>

                <div className="arrowsPart">
                    <div className="left">
                        <div className="line">
                            <StyledInput value={value.topLeft} onChange={(e) => handleChange('topLeft', e)} />
                        </div>
                        <div className="line">
                            <StyledInput
                                value={value.bottomLeft}
                                onChange={(e) => handleChange('bottomLeft', e)}
                            />
                        </div>
                    </div>
                    <div className="middle">
                        <div className="vertical"></div>
                        <div className="triangle"></div>
                    </div>
                    <div className="right">
                        <div className="line">
                            <StyledInput
                                value={value.topRight}
                                onChange={(e) => handleChange('topRight', e)}
                            />
                        </div>
                        <div className="line">
                            <StyledInput
                                value={value.bottomRight}
                                onChange={(e) => handleChange('bottomRight', e)}
                            />
                        </div>
                    </div>
                </div>
                <div className="bottom4_4">
                    <StyledInput value={value.bottomTitle} onChange={(e) => handleChange('bottomTitle', e)} />
                </div>
            </div>
        </>
    )
}

export default Edit
