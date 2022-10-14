import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { Spin, Card, Input, Space, Button, Divider, message, Typography, Radio, Select, Switch } from 'antd'
import {
    PlusOutlined,
    CaretUpOutlined,
    CaretDownOutlined,
    CloseOutlined,
    MinusOutlined,
} from '@ant-design/icons'
import get from 'lodash.get'
import camelcase from 'lodash.camelcase'
import { Form, FormFieldType } from '@prisma/client'
import { useMutation, useQuery, UseQueryResult, useQueryClient } from 'react-query'
import type { FormFieldCreateInput, FullFormEdit } from '../../../types'
import Head from 'next/head'
import { editForm, getFormDetails, postForm } from '../../../network/forms'
import { keys } from 'lodash'

const { Title, Text } = Typography

const initialField: FormFieldCreateInput = {
    name: '',
    type: FormFieldType.TEXT,
    label: '',
    placeholder: '',
    position: 0,
    required: true,
}

const initialValues: FullFormEdit = {
    title: '',
    sendMail: false,
    sendTo: '',
    fields: [initialField],
}

const validate = (values: FullFormEdit) => {
    let errors: any = {}

    if (!values.title) {
        errors.title = 'Required'
    }

    if (!Object.keys(errors).length && (!values.fields || !values.fields.length)) {
        errors.fields = 'Required'
        message.error('Please add field')
    }

    return errors
}

const Admin = () => {
    const router = useRouter()
    const { pid } = router.query
    const queryClient = useQueryClient()

    const { values, errors, handleChange, handleSubmit, setValues } = useFormik<FullFormEdit>({
        initialValues,
        validate,
        validateOnBlur: false,
        validateOnMount: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            let i = 0
            const fields: FormFieldCreateInput[] = []

            if (!!values.fields) {
                for (const field of values.fields) {
                    fields.push({
                        ...field,
                        position: i,
                    })

                    i = i + 1
                }
            }

            mutation.mutate({
                pid: pid as string,
                values: { ...values, fields },
            })
        },
    })

    const form: UseQueryResult<FullFormEdit, Error> = useQuery<FullFormEdit, Error>(
        ['forms', { id: pid }],
        () => getFormDetails(pid as string),
        {
            enabled: !!pid && pid !== 'create',
            onSuccess: (data: FullFormEdit) => {
                const fields = get(data, 'fields', []).sort((a, b) => a.position - b.position)

                setValues({ ...data, fields })
            },
            onError: (err) => router.push('/admin/forms'),
        }
    )

    const mutation = useMutation(
        (data: { pid: string; values: FullFormEdit }) =>
            data.pid === 'create' ? postForm(data.values) : editForm(data.pid, data.values),
        {
            onSuccess: (data: Form) => {
                message.success(`Form ${data.title} saved`)
                queryClient.invalidateQueries('forms')
                router.push('/admin/forms')
            },
            onError: () => {
                message.error('An error occured, while creating or updating the form')
                queryClient.invalidateQueries('forms')
                router.push('/admin/forms')
            },
        }
    )

    const onHandleChange = (name: string, value: any) => {
        handleChange({ target: { name, value } })
    }

    const addField = () => {
        handleChange({
            target: {
                name: 'fields',
                value: [
                    ...get(values, 'fields', []),
                    {
                        ...initialField,
                        position: get(values, 'fields', []).length,
                    },
                ],
            },
        })
    }

    const removeField = (index: number) => {
        let newValue = [...get(values, 'fields', [])]
        newValue.splice(index, 1)

        handleChange({ target: { name: 'fields', value: newValue } })
    }

    const FieldUp = (index: number) => {
        let newValue = [...get(values, 'fields', [])]
        const temp = newValue[index]
        newValue[index] = newValue[index - 1]
        newValue[index - 1] = temp

        handleChange({ target: { name: 'fields', value: newValue } })
    }

    const FieldDown = (index: number) => {
        let newValue = [...get(values, 'fields', [])]
        const temp = newValue[index]
        newValue[index] = newValue[index + 1]
        newValue[index + 1] = temp

        handleChange({ target: { name: 'fields', value: newValue } })
    }

    if (form.isLoading || !pid) {
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
                <title>Admin - Forms</title>
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
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Space size="large">
                                    <Space direction="vertical">
                                        <Text>Title :</Text>
                                        <Input
                                            id="title"
                                            style={{ width: 240 }}
                                            value={get(values, 'title', '')}
                                            onChange={(e) => onHandleChange('title', e.target.value)}
                                            status={errors.title ? 'error' : ''}
                                        />
                                    </Space>

                                    <Space direction="vertical">
                                        <Text>
                                            {'Send to:  '}
                                            <Switch
                                                size="small"
                                                checked={values.sendMail}
                                                onChange={(checked: boolean) => {
                                                    onHandleChange('sendMail', checked)
                                                    if (!checked) onHandleChange('sendTo', '')
                                                }}
                                            />
                                        </Text>
                                        <div style={{ height: 32 }}>
                                            {values.sendMail && (
                                                <Input
                                                    id="sendTo"
                                                    style={{ width: 240 }}
                                                    value={get(values, 'sendTo', '')!}
                                                    onChange={(e) => onHandleChange('sendTo', e.target.value)}
                                                />
                                            )}
                                        </div>
                                    </Space>
                                </Space>
                            </Space>
                        </Card>

                        <Title level={5} style={{ marginLeft: 55 }}>
                            Fields
                        </Title>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            {get(values, 'fields', []).map((field, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: 8 }}>
                                    <Space direction="vertical" size={1}>
                                        <Button
                                            disabled={idx === 0}
                                            onClick={() => FieldUp(idx)}
                                            type="primary"
                                            // shape="circle"
                                            icon={<CaretUpOutlined />}
                                        />
                                        <Button
                                            disabled={idx === get(values, 'fields', []).length - 1}
                                            onClick={() => FieldDown(idx)}
                                            type="primary"
                                            // shape="circle"
                                            icon={<CaretDownOutlined />}
                                        />
                                    </Space>
                                    <Card
                                        // bodyStyle={{ padding: 0 }}
                                        title={`Field ${idx + 1}`}
                                        extra={
                                            <Button
                                                type="primary"
                                                onClick={() => removeField(idx)}
                                                danger
                                                // shape="circle"
                                                icon={<CloseOutlined />}
                                            />
                                        }
                                        style={{ flex: 1 }}
                                    >
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <Space align="start">
                                                <Space direction="vertical">
                                                    <Text>Type :</Text>
                                                    <Select
                                                        id="type"
                                                        style={{ width: 240 }}
                                                        value={field.type}
                                                        onChange={(e) => {
                                                            if (
                                                                e === FormFieldType.OPTION ||
                                                                e === FormFieldType.CHECKBOX
                                                            ) {
                                                                onHandleChange(`fields.${idx}.options`, [
                                                                    { label: '', value: '' },
                                                                ])
                                                            } else {
                                                                onHandleChange(
                                                                    `fields.${idx}.options`,
                                                                    undefined
                                                                )
                                                            }
                                                            onHandleChange(`fields.${idx}.type`, e)
                                                        }}
                                                    >
                                                        {/* TEXT EMAIL PASSWORD PARAGRAPH OPTION CHECKBOX RADIO BUTTON */}

                                                        <Select.Option value={FormFieldType.TEXT}>
                                                            Text
                                                        </Select.Option>
                                                        <Select.Option value={FormFieldType.EMAIL}>
                                                            Email
                                                        </Select.Option>
                                                        <Select.Option value={FormFieldType.PASSWORD}>
                                                            Password
                                                        </Select.Option>
                                                        <Select.Option value={FormFieldType.PARAGRAPH}>
                                                            Paragraph
                                                        </Select.Option>
                                                        <Select.Option value={FormFieldType.OPTION}>
                                                            Option
                                                        </Select.Option>
                                                        <Select.Option value={FormFieldType.CHECKBOX}>
                                                            Checkbox
                                                        </Select.Option>
                                                        <Select.Option value={FormFieldType.RADIO}>
                                                            Radio
                                                        </Select.Option>
                                                        <Select.Option value={FormFieldType.BUTTON}>
                                                            Button
                                                        </Select.Option>
                                                    </Select>
                                                </Space>

                                                {(field.type === FormFieldType.OPTION ||
                                                    field.type === FormFieldType.CHECKBOX) && (
                                                    <Space direction="vertical">
                                                        <Text>Options</Text>
                                                        <>
                                                            {(
                                                                (get(
                                                                    values,
                                                                    `fields.${idx}.options`,
                                                                    []
                                                                ) as any[]) || []
                                                            )?.map((option: any, jdx: number) => (
                                                                <Space key={jdx}>
                                                                    <Input
                                                                        size="small"
                                                                        style={{ width: 150 }}
                                                                        value={option.label}
                                                                        onChange={(e) =>
                                                                            onHandleChange(
                                                                                `fields.${idx}.options.${jdx}.label`,
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        placeholder="Label"
                                                                        // status={
                                                                        //     errors?.[idx]?.options?.[jdx]
                                                                        //         ?.label
                                                                        //         ? 'error'
                                                                        //         : undefined
                                                                        // }
                                                                    />
                                                                    <Input
                                                                        size="small"
                                                                        style={{ width: 150 }}
                                                                        value={option.value}
                                                                        onChange={(e) =>
                                                                            onHandleChange(
                                                                                `fields.${idx}.options.${jdx}.value`,
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        placeholder="Value"
                                                                        // status={
                                                                        //     errors?.[idx]?.options?.[jdx]
                                                                        //         ?.value
                                                                        //         ? 'error'
                                                                        //         : undefined
                                                                        // }
                                                                    />
                                                                    <Button
                                                                        size="small"
                                                                        disabled={
                                                                            (
                                                                                get(
                                                                                    values,
                                                                                    `fields.${idx}.options`,
                                                                                    []
                                                                                ) as any[]
                                                                            ).length === 1
                                                                        }
                                                                        onClick={() => {
                                                                            const copyOpts = [
                                                                                ...(get(
                                                                                    values,
                                                                                    `fields.${idx}.options`,
                                                                                    []
                                                                                ) as any[]),
                                                                            ]
                                                                            copyOpts.splice(jdx, 1)

                                                                            onHandleChange(
                                                                                `fields.${idx}.options`,
                                                                                copyOpts
                                                                            )
                                                                        }}
                                                                        type="primary"
                                                                        danger
                                                                        icon={<MinusOutlined />}
                                                                    />
                                                                </Space>
                                                            ))}
                                                        </>
                                                        <Button
                                                            size="small"
                                                            onClick={() =>
                                                                onHandleChange(`fields.${idx}.options`, [
                                                                    ...((get(
                                                                        values,
                                                                        `fields.${idx}.options`,
                                                                        []
                                                                    ) as any[]) || []),
                                                                    { label: '', value: '' },
                                                                ])
                                                            }
                                                            type="primary"
                                                            icon={<PlusOutlined />}
                                                        />
                                                    </Space>
                                                )}
                                            </Space>
                                            <Divider />
                                            <Space size="large">
                                                <Space direction="vertical">
                                                    <Text>Label :</Text>
                                                    <Input
                                                        id="label"
                                                        style={{ width: 240 }}
                                                        value={field.label}
                                                        onChange={(e) => {
                                                            onHandleChange(
                                                                `fields.${idx}.label`,
                                                                e.target.value
                                                            )

                                                            if (pid === 'create') {
                                                                onHandleChange(
                                                                    `fields.${idx}.name`,
                                                                    camelcase(e.target.value)
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </Space>

                                                {field.type !== FormFieldType.BUTTON && (
                                                    <>
                                                        <Space direction="vertical">
                                                            <Text>Name :</Text>
                                                            <Input
                                                                id="name"
                                                                style={{ width: 240 }}
                                                                value={field.name || ''}
                                                                onChange={(e) =>
                                                                    onHandleChange(
                                                                        `fields.${idx}.name`,
                                                                        camelcase(e.target.value)
                                                                    )
                                                                }
                                                            />
                                                        </Space>
                                                        <Space direction="vertical">
                                                            <Text>Placeholder :</Text>
                                                            <Input
                                                                id="placeholder"
                                                                style={{ width: 240 }}
                                                                value={field.placeholder || ''}
                                                                onChange={(e) =>
                                                                    onHandleChange(
                                                                        `fields.${idx}.placeholder`,
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </Space>
                                                        <Space direction="vertical">
                                                            <Text>Required :</Text>
                                                            <Radio.Group
                                                                id="status"
                                                                value={field.required}
                                                                onChange={(e) =>
                                                                    onHandleChange(
                                                                        `fields.${idx}.required`,
                                                                        e.target.value
                                                                    )
                                                                }
                                                            >
                                                                <Radio value={true}>Required</Radio>
                                                                <Radio value={false}>Not required</Radio>
                                                            </Radio.Group>
                                                        </Space>
                                                    </>
                                                )}
                                            </Space>
                                        </Space>
                                    </Card>
                                </div>
                            ))}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    size="large"
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={addField}
                                >
                                    Add field
                                </Button>
                            </div>
                        </Space>

                        <Divider />
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
