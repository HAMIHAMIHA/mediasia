import { FormOutlined, LoadingOutlined } from '@ant-design/icons'
import { getFormDetails } from '@network/forms'
import { ContainerField } from '@prisma/client'
import { FullFormEdit, Theme } from '@types'
import { Space, Typography } from 'antd'
import get from 'lodash.get'
import { useQuery, UseQueryResult } from 'react-query'
import Blocks from '../../blocks'

const { Title } = Typography
interface GetEditComponentProps {
    block?: string | null
    value: any
    onChange: (value: any) => void
    theme?: Theme
    fields?: ContainerField[]
    formId?: string
}

const GetEditComponent = ({ block, value, onChange, theme, fields, formId }: GetEditComponentProps) => {
    const form: UseQueryResult<FullFormEdit, Error> = useQuery<FullFormEdit, Error>(
        ['forms', { id: formId }],
        () => getFormDetails(formId!),
        {
            enabled: !!formId,
        }
    )

    if (!block) return null

    if (!!get(Blocks, `${block}.needForm`) && !formId) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem 2rem 1rem 2rem',
                }}
            >
                {!!form.isLoading ? (
                    <Space align="center">
                        <LoadingOutlined style={{ color: '#1890ff', fontSize: 28 }} />
                        <Title style={{ marginBottom: 0 }} level={3}>
                            Loading form...
                        </Title>
                    </Space>
                ) : (
                    <Space align="center">
                        <FormOutlined style={{ color: '#1890ff', fontSize: 28 }} />
                        <Title style={{ marginBottom: 0 }} level={3}>
                            Pick a form
                        </Title>
                    </Space>
                )}
            </div>
        )
    }

    const Component = get(Blocks, block)

    if (!Component) return null

    return (
        <Component.Edit
            value={value}
            onChange={onChange}
            theme={theme}
            fields={fields}
            form={!!formId ? form?.data : undefined}
        />
    )
}

export default GetEditComponent
