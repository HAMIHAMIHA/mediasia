import EditPanel from '@components/EditPanel'
import LinkInput from '@components/LinkInput'
import MediaModal from '@components/MediaModal'
import StyledInput from '@components/StyledInput'
import { Space, Switch } from 'antd'
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
        <EditPanel
            view={
                <>
                    <div className="left3_4">
                        <StyledInput.div
                            className="title yellow"
                            value={value.title}
                            onChange={(e) => handleChange('title', e)}
                        />
                        <StyledInput.div
                            className="content"
                            value={value.text}
                            onChange={(e) => handleChange('text', e)}
                        />
                        {value.hasButton && (
                            <StyledInput.div
                                className="button"
                                value={value.button}
                                onChange={(e) => handleChange('button', e)}
                            />
                        )}
                    </div>
                    <div className="right3_4" style={{ position: 'relative' }}>
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
                            width={960}
                            height={500}
                            className="brand"
                        />
                    </div>
                </>
            }
            panel={
                <Space direction="vertical">
                    <Switch
                        checked={value.hasButton}
                        onChange={() => handleChange('hasButton', !value.hasButton)}
                    />
                    {value.hasButton && (
                        <LinkInput value={value.buttonLink} onChange={(e) => handleChange('buttonLink', e)} />
                    )}
                </Space>
            }
        />
    )
}

export default Edit
