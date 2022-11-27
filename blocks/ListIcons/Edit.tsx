import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import StyledInput from '@components/StyledInput'
import { Button, Dropdown, Typography } from 'antd'
import set from 'lodash.set'
import type { Props } from '../types'

const { Text } = Typography

const Edit = ({ value = { array: [{ icon: 'metro' }] }, onChange, theme }: Props) => {
    const handleChange = (name: string, e: any) => {
        const newValue = { ...value }

        set(newValue, name, e)
        if (!!onChange) onChange(newValue)
    }

    return (
        <>
            <div className="transparents">
                {value?.array?.map((e: any, i: number) => (
                    <div key={i} className="transport-boxs" style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 3, right: 3 }}>
                            <Button
                                icon={<MinusOutlined />}
                                shape="circle"
                                danger
                                onClick={() => {
                                    const newValue = [...(value.array || [])]

                                    newValue.splice(i - 1, 1)

                                    handleChange('array', newValue)
                                }}
                            />
                        </div>

                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: 'metro',
                                        label: (
                                            <Text onClick={() => handleChange(`array.${i}.icon`, 'metro')}>
                                                Metro
                                            </Text>
                                        ),
                                    },
                                    {
                                        key: 'aeroport1',
                                        label: (
                                            <Text
                                                onClick={() => handleChange(`array.${i}.icon`, 'aeroport1')}
                                            >
                                                Plane
                                            </Text>
                                        ),
                                    },
                                    {
                                        key: 'ter',
                                        label: (
                                            <Text onClick={() => handleChange(`array.${i}.icon`, 'ter')}>
                                                Train
                                            </Text>
                                        ),
                                    },
                                    {
                                        key: 'autoroute',
                                        label: (
                                            <Text
                                                onClick={() => handleChange(`array.${i}.icon`, 'autoroute')}
                                            >
                                                Route
                                            </Text>
                                        ),
                                    },
                                ],
                            }}
                            trigger={['click']}
                        >
                            <div className={`transport-box yellow icon-${e.icon}`}></div>
                        </Dropdown>
                        <StyledInput.div
                            className="transport-name yellow"
                            value={e.title}
                            onChange={(e) => handleChange(`array.${i}.title`, e)}
                        />
                        <StyledInput.div
                            className="transport-journey"
                            value={e.text}
                            onChange={(e) => handleChange(`array.${i}.text`, e)}
                        />
                    </div>
                ))}
                <div className="transport-boxs">
                    <Button
                        icon={<PlusOutlined />}
                        shape="circle"
                        type="primary"
                        onClick={() => handleChange('array', [...(value.array || []), { icon: 'metro' }])}
                    />
                </div>
                {/* <div className="vehicle1"></div> */}
            </div>
        </>
    )
}

export default Edit
