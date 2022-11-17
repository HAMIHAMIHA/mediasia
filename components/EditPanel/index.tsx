import { SearchOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import { useState } from 'react'
import styles from './EditPanel.module.css'

interface PanelProps {
    view: JSX.Element
    panel?: JSX.Element
}

const EditPanel = ({ view, panel }: PanelProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={styles.wrap}>
            <div className={styles.viewWrap} style={{ flex: 5, backgroundColor: 'rgb(240, 242, 245)' }}>
                {view}
            </div>

            {!!panel && isOpen ? (
                <Card
                    title="Settings Panel"
                    extra={<Button onClick={() => setIsOpen(!isOpen)} icon={<SearchOutlined />} />}
                    className={styles.panelWrap}
                    bordered={false}
                >
                    {panel}
                </Card>
            ) : (
                <Button
                    className={styles.buttonPanel}
                    onClick={() => setIsOpen(!isOpen)}
                    icon={<SearchOutlined />}
                />
            )}
        </div>
    )
}

export default EditPanel
