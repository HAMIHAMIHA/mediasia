import { /*useMemo,*/ useMemo, useState } from 'react'
import type { Media } from '@prisma/client'
import { Button, Space, Typography } from 'antd'
import { UploadOutlined, CloseOutlined } from '@ant-design/icons'

import { uploadMedia, uploadFavicon } from '../../network/medias'
import { FileType } from '@types'

interface Props {
    value?: Media
    onDeleteValue?(): void
    onFileRecieved(file: Media): void
    type?: FileType
}

const UploadButton = ({ value, onDeleteValue, onFileRecieved, type = 'IMAGE' }: Props) => {
    const [loading, setLoading] = useState(false)
    // const [value, setValue] = useState<File | null>(null)

    const handleFiles = async (event: any) => {
        setLoading(true)
        const file = event.target.files[0]
        if (!file) return
        // if (file.size >= fileSize * 1024 * 1024) {
        //     return
        // }

        const res: Media = await uploadMedia(file)

        setLoading(false)

        if (res) onFileRecieved(res)
    }

    const typeFiles = useMemo(() => {
        switch (type) {
            case 'IMAGE':
                return 'image/*'
            case 'VIDEO':
                return 'video/*'
            case 'FILE':
                return '.pdf,.xlsx,.xls,.csv,.doc,.docx'
        }
    }, [type])

    return (
        <Space>
            <Button
                type="primary"
                icon={<UploadOutlined />}
                style={{ position: 'relative' }}
                loading={loading}
            >
                Upload
                <input
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        fontSize: 0,
                        backgroundColor: 'transparent',
                        border: 'none',
                        opacity: 0,
                        zIndex: 1,
                    }}
                    type="file"
                    name="file"
                    accept={typeFiles}
                    // accept=".pdf,.xlsx,.xls,.csv,.doc,.docx|video/*|image/*"
                    onChange={handleFiles}
                    onClick={(event: any) => {
                        event.target.value = null
                    }}
                />
            </Button>
            {value && (
                <>
                    <Typography.Text underline>{value?.name}</Typography.Text>
                    <Button onClick={onDeleteValue} shape="circle" icon={<CloseOutlined />} />
                </>
            )}
        </Space>
    )
}

const Favicon = () => {
    const [loading, setLoading] = useState(false)
    // const [value, setValue] = useState<File | null>(null)

    const handleFiles = async (event: any) => {
        setLoading(true)
        const file = event.target.files[0]
        if (!file) return
        // if (file.size >= fileSize * 1024 * 1024) {
        //     return
        // }

        await uploadFavicon(file)
        setLoading(false)
    }

    return (
        <Space>
            <Button
                type="primary"
                icon={<UploadOutlined />}
                style={{ position: 'relative' }}
                loading={loading}
            >
                Upload
                <input
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        fontSize: 0,
                        backgroundColor: 'transparent',
                        border: 'none',
                        opacity: 0,
                        zIndex: 1,
                    }}
                    type="file"
                    name="file"
                    accept=".ico"
                    onChange={handleFiles}
                    // onChange={(e) => {
                    //     toggleModal()
                    //     handleFiles(e)
                    // }}
                    onClick={(event: any) => {
                        event.target.value = null
                    }}
                />
            </Button>
        </Space>
    )
}

UploadButton.Favicon = Favicon

export default UploadButton
