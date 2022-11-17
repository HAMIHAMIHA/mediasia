import { CloseOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons'
import { useOutsideAlerter } from '@hooks/useOutsideAlerter'
import { Button, Card } from 'antd'
import { useRef, useState } from 'react'
import styles from './EditPanel.module.css'

interface PanelProps {
    view: JSX.Element
    panel?: JSX.Element
}

const EditPanel = ({ view, panel }: PanelProps) => {
    const myRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    useOutsideAlerter(myRef, () => setIsOpen(false))

    return (
        <div className={styles.wrap}>
            <div className={styles.viewWrap} style={{ flex: 5, backgroundColor: 'rgb(240, 242, 245)' }}>
                {view}
            </div>

            {!!panel && isOpen ? (
                <Card
                    ref={myRef}
                    title="Settings Panel"
                    extra={
                        <Button
                            danger
                            onClick={() => setIsOpen(!isOpen)}
                            icon={<CloseOutlined />}
                            size="small"
                        />
                    }
                    className={styles.panelWrap}
                    bordered={false}
                >
                    {panel}
                </Card>
            ) : (
                <Button
                    className={styles.buttonPanel}
                    onClick={() => setIsOpen(!isOpen)}
                    icon={<MoreOutlined />}
                />
            )}
        </div>
    )
}

export default EditPanel
