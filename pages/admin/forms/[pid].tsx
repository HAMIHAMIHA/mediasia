import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import {
    Spin,
    Card,
    Input,
    Space,
    Button,
    Divider,
    message,
    Typography,
    Radio,
    Select,
    Switch,
    InputNumber,
    Collapse,
} from 'antd'
import { PlusOutlined, CaretUpOutlined, CaretDownOutlined, MinusOutlined } from '@ant-design/icons'
import get from 'lodash.get'
import camelcase from 'lodash.camelcase'
import { Form, FormFieldType } from '@prisma/client'
import { useMutation, useQuery, UseQueryResult, useQueryClient } from 'react-query'
import type { FormFieldCreateInput, FullFormEdit } from '../../../types'
import Head from 'next/head'
import { editForm, getFormDetails, postForm } from '../../../network/forms'
import autoAnimate from '@formkit/auto-animate'
import { useEffect, useRef } from 'react'
import set from 'lodash.set'

const { Title, Text } = Typography
const { Panel } = Collapse

const initialField: FormFieldCreateInput & { tempId?: string } = {
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
        errors.noField = true
        message.error('Please add field')
    } else {
        values?.fields?.forEach((field, idx) => {
            if (field.type !== FormFieldType.BUTTON && field.type !== FormFieldType.TITLE) {
                if (!field.name) {
                    set(errors, `fields.${idx}.name`, 'Required')
                }

                if (!field.label) {
                    set(errors, `fields.${idx}.label`, 'Required')
                }
            }

            if (field.type === FormFieldType.OPTION || field.type === FormFieldType.CHECKBOX) {
                const options = field.options as { label: string; value: string }[]

                options.forEach((opt, jdx) => {
                    if (!opt.label) {
                        set(errors, `fields.${idx}.options.${jdx}.label`, 'Required')
                    }

                    if (!opt.value) {
                        set(errors, `fields.${idx}.options.${jdx}.value`, 'Required')
                    }
                })
            }
        })
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
            const fields = values?.fields?.map((field, i) => ({
                ...field,
                position: i,
                tempId: undefined,
            }))

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

    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

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
                                <Space>
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

                        <Title level={4} style={{ marginLeft: 55 }}>
                            Fields
                        </Title>
                        <FormFieldManager
                            fields={get(values, 'fields', [])}
                            errors={errors}
                            onHandleChange={onHandleChange}
                        />
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

const FormFieldManager = ({
    fields,
    errors,
    onHandleChange,
}: {
    fields: any[]
    errors: any
    onHandleChange(name: string, value: any): void
}) => {
    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    const addField = () => {
        // handleChange({
        //     target: {
        //         name: 'fields',
        //         value: [
        //             ...get(values, 'fields', []),
        //             {
        //                 ...initialField,
        //                 position: get(values, 'fields', []).length,
        //                 tempId: `${new Date().valueOf()}`,
        //             },
        //         ],
        //     },
        // })

        onHandleChange('fields', [
            ...fields,
            {
                ...initialField,
                position: fields.length,
                tempId: `${new Date().valueOf()}`,
            },
        ])
    }

    const removeField = (index: number) => {
        let newValue = [...fields]
        newValue.splice(index, 1)

        // handleChange({ target: { name: 'fields', value: newValue } })
        onHandleChange('fields', newValue)
    }

    const FieldUp = (index: number) => {
        let newValue = [...fields]
        const temp = newValue[index]
        newValue[index] = newValue[index - 1]
        newValue[index - 1] = temp

        // handleChange({ target: { name: 'fields', value: newValue } })
        onHandleChange('fields', newValue)
    }

    const FieldDown = (index: number) => {
        let newValue = [...fields]
        const temp = newValue[index]
        newValue[index] = newValue[index + 1]
        newValue[index + 1] = temp

        // handleChange({ target: { name: 'fields', value: newValue } })
        onHandleChange('fields', newValue)
    }

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <div ref={parent} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {fields.map((field: FormFieldCreateInput & { tempId?: string }, idx) => (
                    <div key={field.id || field.tempId} style={{ display: 'flex', gap: 8 }}>
                        <Space direction="vertical" size={1}>
                            <Button
                                disabled={idx === 0}
                                onClick={() => FieldUp(idx)}
                                type="primary"
                                // shape="circle"
                                icon={<CaretUpOutlined />}
                                size="small"
                            />
                            <Button
                                disabled={idx === fields.length - 1}
                                onClick={() => FieldDown(idx)}
                                type="primary"
                                // shape="circle"
                                icon={<CaretDownOutlined />}
                                size="small"
                            />
                        </Space>
                        <Collapse defaultActiveKey={['1']} style={{ width: '100%' }}>
                            <Panel
                                key="1"
                                style={{ width: '100%' }}
                                header={`Field ${idx + 1}`}
                                extra={
                                    <Button
                                        type="primary"
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            removeField(idx)
                                        }}
                                        danger
                                        icon={<MinusOutlined />}
                                        size="small"
                                    />
                                }
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
                                                        e === FormFieldType.CHECKBOX ||
                                                        e === FormFieldType.RADIO
                                                    ) {
                                                        onHandleChange(`fields.${idx}.defaultText`, undefined)
                                                        onHandleChange(
                                                            `fields.${idx}.defaultNumber`,
                                                            undefined
                                                        )
                                                        onHandleChange(`fields.${idx}.options`, [
                                                            { label: '', value: '' },
                                                        ])
                                                    } else if (e === FormFieldType.NUMBER) {
                                                        onHandleChange(`fields.${idx}.defaultText`, undefined)
                                                        onHandleChange(
                                                            `fields.${idx}.defaultMultiple`,
                                                            undefined
                                                        )
                                                        onHandleChange(`fields.${idx}.options`, undefined)
                                                    } else {
                                                        onHandleChange(
                                                            `fields.${idx}.defaultNumber`,
                                                            undefined
                                                        )
                                                        onHandleChange(
                                                            `fields.${idx}.defaultMultiple`,
                                                            undefined
                                                        )
                                                        onHandleChange(`fields.${idx}.options`, undefined)
                                                    }
                                                    onHandleChange(`fields.${idx}.type`, e)
                                                }}
                                            >
                                                {/* TEXT EMAIL PASSWORD PARAGRAPH OPTION CHECKBOX RADIO BUTTON */}

                                                <Select.Option value={FormFieldType.TEXT}>Text</Select.Option>
                                                <Select.Option value={FormFieldType.TITLE}>
                                                    Title
                                                </Select.Option>
                                                <Select.Option value={FormFieldType.NUMBER}>
                                                    Number
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
                                            field.type === FormFieldType.CHECKBOX ||
                                            field.type === FormFieldType.RADIO) && (
                                            <Space direction="vertical">
                                                <Text>Options :</Text>
                                                <>
                                                    {(
                                                        (get(fields, `${idx}.options`, []) as any[]) || []
                                                    )?.map((option: any, jdx: number) => (
                                                        <Space key={jdx}>
                                                            <Input
                                                                size="small"
                                                                style={{
                                                                    width: 150,
                                                                }}
                                                                value={option.label}
                                                                onChange={(e) =>
                                                                    onHandleChange(
                                                                        `fields.${idx}.options.${jdx}.label`,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                placeholder="Label"
                                                                status={
                                                                    get(
                                                                        errors,
                                                                        `fields.${idx}.options.${jdx}.label`
                                                                    )
                                                                        ? 'error'
                                                                        : undefined
                                                                }
                                                            />
                                                            <Input
                                                                size="small"
                                                                style={{
                                                                    width: 150,
                                                                }}
                                                                value={option.value}
                                                                onChange={(e) =>
                                                                    onHandleChange(
                                                                        `fields.${idx}.options.${jdx}.value`,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                placeholder="Value"
                                                                status={
                                                                    get(
                                                                        errors,
                                                                        `fields.${idx}.options.${jdx}.value`
                                                                    )
                                                                        ? 'error'
                                                                        : undefined
                                                                }
                                                            />
                                                            <Button
                                                                size="small"
                                                                disabled={
                                                                    (
                                                                        get(
                                                                            fields,
                                                                            `${idx}.options`,
                                                                            []
                                                                        ) as any[]
                                                                    ).length === 1
                                                                }
                                                                onClick={() => {
                                                                    const copyOpts = [
                                                                        ...(get(
                                                                            fields,
                                                                            `${idx}.options`,
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
                                                                fields,
                                                                `${idx}.options`,
                                                                []
                                                            ) as any[]) || []),
                                                            {
                                                                label: '',
                                                                value: '',
                                                            },
                                                        ])
                                                    }
                                                    type="primary"
                                                    icon={<PlusOutlined />}
                                                />
                                            </Space>
                                        )}

                                        {field.type === FormFieldType.NUMBER && (
                                            <>
                                                <Space direction="vertical">
                                                    <Text>Min :</Text>
                                                    <InputNumber
                                                        style={{
                                                            width: 65,
                                                        }}
                                                        value={field.min}
                                                        onChange={(e) =>
                                                            onHandleChange(`fields.${idx}.min`, e)
                                                        }
                                                        max={field.max || undefined}
                                                    />
                                                </Space>
                                                <Space direction="vertical">
                                                    <Text>Max :</Text>
                                                    <InputNumber
                                                        style={{
                                                            width: 65,
                                                        }}
                                                        value={field.max}
                                                        onChange={(e) =>
                                                            onHandleChange(`fields.${idx}.max`, e)
                                                        }
                                                        min={field.min || undefined}
                                                    />
                                                </Space>
                                            </>
                                        )}

                                        {field.type !== FormFieldType.BUTTON &&
                                            field.type !== FormFieldType.TITLE && (
                                                <Space direction="vertical">
                                                    <Text>Default :</Text>
                                                    {field.type === FormFieldType.NUMBER ? (
                                                        <InputNumber
                                                            style={{ width: 240 }}
                                                            value={field.defaultNumber}
                                                            onChange={(e) =>
                                                                onHandleChange(
                                                                    `fields.${idx}.defaultNumber`,
                                                                    e
                                                                )
                                                            }
                                                        />
                                                    ) : field.type === FormFieldType.CHECKBOX ? (
                                                        <Select
                                                            mode="multiple"
                                                            style={{ width: 240 }}
                                                            value={field.defaultMultiple || []}
                                                            onChange={(e) =>
                                                                onHandleChange(
                                                                    `fields.${idx}.defaultMultiple`,
                                                                    e
                                                                )
                                                            }
                                                        >
                                                            {(
                                                                get(fields, `${idx}.options`, []) as any[]
                                                            )?.map((opt, idx) => (
                                                                <Select.Option
                                                                    key={opt.value || idx}
                                                                    value={opt.value}
                                                                >
                                                                    {opt.label}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    ) : field.type === FormFieldType.RADIO ||
                                                      field.type === FormFieldType.OPTION ? (
                                                        <Select
                                                            style={{ width: 240 }}
                                                            value={field.defaultNumber}
                                                            onChange={(e) =>
                                                                onHandleChange(
                                                                    `fields.${idx}.defaultNumber`,
                                                                    e
                                                                )
                                                            }
                                                        >
                                                            {(
                                                                get(fields, `${idx}.options`, []) as any[]
                                                            )?.map((opt, idx) => (
                                                                <Select.Option
                                                                    key={opt.value || idx}
                                                                    value={opt.value}
                                                                >
                                                                    {opt.label}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    ) : (
                                                        <Input
                                                            style={{ width: 240 }}
                                                            value={field.defaultText || undefined}
                                                            onChange={(e) =>
                                                                onHandleChange(
                                                                    `fields.${idx}.defaultText`,
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </Space>
                                            )}
                                    </Space>
                                    <Divider />
                                    <Space>
                                        <Space direction="vertical">
                                            <Text>Label :</Text>
                                            <Input
                                                id="label"
                                                style={{ width: 240 }}
                                                value={field.label}
                                                onChange={(e) =>
                                                    onHandleChange(`fields.${idx}.label`, e.target.value)
                                                }
                                                status={
                                                    get(errors, `fields.${idx}.label`) ? 'error' : undefined
                                                }
                                            />
                                        </Space>

                                        {field.type !== FormFieldType.BUTTON &&
                                            field.type !== FormFieldType.TITLE && (
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
                                                            status={
                                                                get(errors, `fields.${idx}.name`)
                                                                    ? 'error'
                                                                    : undefined
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
                            </Panel>
                        </Collapse>
                    </div>
                ))}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button size="large" type="primary" icon={<PlusOutlined />} onClick={addField}>
                    Add field
                </Button>
            </div>
        </Space>
    )
}
