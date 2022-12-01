import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { Input, Space, Button, Typography, Card, Select, message, Spin, Divider } from 'antd'
import get from 'lodash.get'
import { editElement, getElementDetails, postElement } from '../../../network/elements'
import { Element } from '@prisma/client'
import Blocks from '../../../blocks'
import GetEditComponent from '../../../components/GetEditComponent'
import { useMutation, useQuery, UseQueryResult, useQueryClient } from 'react-query'
import Head from 'next/head'
import CustomSelect from '@components/CustomSelect'
import { FullElementEdit } from '@types'
import { Availability } from '@blocks/types'

const { Text } = Typography

const initialValues: FullElementEdit = {
    title: '',
    block: '',
}

const validate = (values: FullElementEdit) => {
    let errors: any = {}

    if (!values.title) {
        errors.title = 'Required'
    }

    if (!values.block) {
        errors.block = 'Required'
    }

    return errors
}

const Admin = () => {
    const router = useRouter()
    const { pid } = router.query
    const queryClient = useQueryClient()

    const { values, errors, handleSubmit, handleChange, setValues } = useFormik<FullElementEdit>({
        initialValues,
        validate,
        validateOnBlur: false,
        validateOnMount: false,
        validateOnChange: false,
        onSubmit: async (values) =>
            mutation.mutate({
                pid: pid as string,
                values: { ...values, content: values.content || undefined },
            }),
    })

    const element: UseQueryResult<FullElementEdit, Error> = useQuery<FullElementEdit, Error>(
        ['elements', { id: pid }],
        () => getElementDetails(pid as string),
        {
            enabled: !!pid && pid !== 'create',
            onSuccess: (data: FullElementEdit) => setValues(data),
            onError: (err) => router.push('/admin/elements'),
        }
    )

    const mutation = useMutation(
        (data: { pid: string; values: FullElementEdit }) =>
            data.pid === 'create' ? postElement(data.values) : editElement(data.pid, data.values),
        {
            onSuccess: (data: Element) => {
                message.success(`Element ${data.title} saved`)
                queryClient.invalidateQueries('elements')
                router.push('/admin/elements')
            },
            onError: (err) => {
                message.error('An error occured, while creating or updating the element')
                queryClient.invalidateQueries('elements')
                // router.push('/admin/elements')
            },
        }
    )

    const onHandleChange = (name: string, value: any) => {
        handleChange({ target: { name, value } })
    }

    if (element.isLoading || !pid) {
        return (
            <div
                style={{
                    height: 'calc(100vh - 29px)',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f0f2f5',
                }}
            >
                <Spin size="large" tip="Loading..." />
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Admin - Elements</title>
            </Head>

            <form onSubmit={handleSubmit}>
                <Space
                    direction="vertical"
                    size="large"
                    style={{
                        width: '100%',
                        minHeight: 'calc(100vh - 29px)',
                        padding: 15,
                        backgroundColor: '#f0f2f5',
                    }}
                >
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Card title="Description">
                            <Space size="large">
                                <Space direction="vertical">
                                    <Text>Title</Text>
                                    <Input
                                        style={{ width: 240 }}
                                        value={get(values, 'title', '')}
                                        onChange={(e) => onHandleChange('title', e.target.value)}
                                        status={errors.title ? 'error' : undefined}
                                    />
                                </Space>
                            </Space>
                        </Card>

                        <Card
                            bodyStyle={{ padding: 0 }}
                            title={
                                <Space>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'normal',
                                        }}
                                    >
                                        Block:
                                    </Text>
                                    <Select
                                        value={values.block}
                                        disabled={!!values.block}
                                        onChange={(e) => onHandleChange('block', e)}
                                        style={{ width: 240 }}
                                        status={errors.block ? 'error' : undefined}
                                        allowClear
                                    >
                                        {Object.keys(Blocks)
                                            .filter(
                                                (key) =>
                                                    get(Blocks, `${key}.availability`, '') ===
                                                    Availability.ALL
                                            )
                                            .map((key) => (
                                                <Select.Option key={key} value={key}>
                                                    {get(Blocks, `${key}.name`, '')}
                                                </Select.Option>
                                            ))}
                                    </Select>
                                    {!!values.block && get(Blocks, `${values.block}.needForm`, false) && (
                                        <>
                                            <Divider type="vertical" />
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: 'normal',
                                                }}
                                            >
                                                Form:
                                            </Text>
                                            <CustomSelect.ListForms
                                                value={values.formId}
                                                onChange={(e) => onHandleChange(`formId`, e)}
                                            />
                                        </>
                                    )}
                                </Space>
                            }
                            style={{ flex: 1 }}
                        >
                            <GetEditComponent
                                block={values.block}
                                value={values.content}
                                onChange={(e) => onHandleChange('content', e)}
                                formId={values.formId}
                            />
                        </Card>

                        <Button loading={mutation.isLoading} type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Space>
                </Space>
            </form>
        </>
    )
}

Admin.requireAuth = true

export default Admin
