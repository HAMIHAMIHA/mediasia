import { BgColorsOutlined } from '@ant-design/icons'
import { Button, Popover } from 'antd'
import { ChromePicker } from 'react-color'

interface ColorButtonProps {
    value: string | undefined
    onChange(e: string): void
}

const ColorButton = ({ value, onChange }: ColorButtonProps) => (
    <Popover
        placement="right"
        trigger="click"
        content={<ChromePicker onChange={(e) => onChange(e.hex)} color={value} />}
    >
        <Button
            type="primary"
            style={{
                backgroundColor: value,
                borderColor: '#000',
                width: !!value ? 113 : undefined,
                textShadow: '1px 1px 2px #000000',
            }}
            icon={<BgColorsOutlined />}
        >
            {value?.toLocaleUpperCase() || 'Pick color'}
        </Button>
    </Popover>
)

export default ColorButton
