import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import {
    Input,
    Space,
    Button,
    Typography,
    Card,
    message,
    Spin,
    InputNumber,
    Radio,
    DatePicker,
    Divider,
    Tooltip,
    Select,
} from 'antd'
import get from 'lodash.get'
import { editContent, getContentDetails, postContent } from '../../../network/contents'
import { getContainerDetails } from '../../../network/containers'
import { Prisma, Content, ContainerField /*, ContentField*/, Media, ContainerFieldType } from '@prisma/client'
import { useMutation, useQuery, UseQueryResult, useQueryClient } from 'react-query'
import Head from 'next/head'
import { FileType, FullContainerEdit, FullSection, FullSectionEdit } from '@types'
import CustomSelect from '@components/CustomSelect'
import LinkInput from '@components/LinkInput'
import MediaModal from '@components/MediaModal'
import SectionManager from '@components/SectionManager'
import set from 'lodash.set'
import AccessCheckboxes from '@components/AccessCheckboxes'
import moment from 'moment'
import { useState } from 'react'
import {
    PlusOutlined,
    QuestionCircleOutlined,
    CloseOutlined,
    CloseCircleFilled,
    MinusOutlined,
    CopyOutlined,
} from '@ant-design/icons'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import getNameFieldFromType from '../../../utils/getNameFieldFromType'
import RichEditor from '@components/RichEditor'
import ColorButton from '@components/ColorButton'
import { Availability } from '@blocks/types'

const { Text } = Typography
const { Option } = Select

type MyType = any

const initialValues: MyType = {
    published: true,
}

const Admin = () => {
    const router = useRouter()
    const { pid } = router.query
    const queryClient = useQueryClient()

    const validate = (values: MyType) => {
        let errors: any = {}

        if (!values.title) {
            errors.title = 'Required'
        }

        if (!values.slug) {
            errors.slug = 'Required'
        }

        if (!values.containerId) {
            errors.containerId = 'Required'
        }

        container?.data?.fields?.forEach((field: any, idx: number) => {
            const value = get(
                values,
                `fieldsValue.${field.name}.${getNameFieldFromType(field?.type)}`,
                undefined
            )

            if (field.multiple) {
                if (
                    field.required &&
                    (!Array.isArray(value) ||
                        !value?.length) /*|| value?.findIndex((e) => !e && e !== 0) !== -1*/
                ) {
                    set(errors, `fields.${field.name}`, 'Required')
                } else if (value?.length < field.min) {
                    set(errors, `fields.${field.name}`, 'Missing items')
                } else if (value?.length > field.max) {
                    set(errors, `fields.${field.name}`, 'Too many items')
                }
            } else {
                if (field.required && !value && value !== 0) {
                    set(errors, `fields.${field.name}`, 'Required')
                }
            }
        })

        return errors
    }

    const { values, errors, handleSubmit, handleChange, setValues } = useFormik<MyType>({
        initialValues: { ...initialValues, containerId: router.query.container },
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        validateOnMount: false,
        onSubmit: async (values) => {
            let fields = []
            if (!!values.fieldsValue) {
                fields = Object.keys(values.fieldsValue).map((key: string) => {
                    let mediaId = undefined

                    if (
                        values.fieldsValue[key].type === ContainerFieldType.IMAGE ||
                        values.fieldsValue[key].type === ContainerFieldType.VIDEO ||
                        values.fieldsValue[key].type === ContainerFieldType.FILE
                    ) {
                        if (values.fieldsValue[key].multiple) {
                            mediaId = values.fieldsValue[key].media.map((media: Media) => media.id)
                        } else {
                            mediaId = values.fieldsValue[key].media.id
                        }
                    }

                    return {
                        name: key,
                        ...values.fieldsValue[key],
                        mediaId,
                        media: undefined,
                    }
                })
            }

            let i = 0
            const sections: FullSection[] = []

            if (!!values.sections) {
                for (const section of values.sections) {
                    if (!!section.block || !!section.elementId) {
                        sections.push({
                            ...section,
                            position: i,
                            tempId: undefined,
                        })

                        i = i + 1
                    }
                }
            }

            const slug = encodeURI(get(values, 'slug', ''))

            mutation.mutate({
                pid: pid as string,
                values: { ...values, sections, fields, fieldsValue: undefined, slug },
            })
        },
    })

    const content: UseQueryResult<MyType, Error> = useQuery<MyType, Error>(
        ['contents', { id: pid }],
        () => getContentDetails(pid as string),
        {
            enabled: !!pid && pid !== 'create',
            onSuccess: (data: FullContainerEdit) => {
                const sections = get(data, 'sections', []).sort((a, b) => a.position - b.position)

                const slug = decodeURI(get(data, 'slug.basic', '') || '')

                let fieldsValue: any = {}
                get(data, 'fields', []).forEach((e: any, i: number) => {
                    const valueName = getNameFieldFromType(e.type)
                    let newValues
                    if (e.multiple) {
                        newValues = get(e, `childs`, []).map((c: any) =>
                            e.type === 'date' ? moment(c[valueName]) : c[valueName]
                        )
                    } else {
                        if (e.type === 'date') {
                            newValues = moment(e[valueName])
                        } else {
                            newValues = e[valueName]
                        }
                    }

                    fieldsValue[e.name] = {
                        type: e.type,
                        multiple: e.multiple,
                        [valueName]: newValues,
                    }
                })

                setValues({ ...data, sections, slug, fieldsValue })
            },
            onError: (err) => router.push('/admin/contents'),
        }
    )

    const container: UseQueryResult<FullContainerEdit, Error> = useQuery<FullContainerEdit, Error>(
        ['containers', { id: values.containerId }],
        () => getContainerDetails(values.containerId as string),
        {
            enabled: !!values.containerId,
            // onSuccess: (data: FullContainerEdit) => {
            //     let fieldsValue = {}
            //     for (const field of get(data, 'fields', [])) {
            //         const value: FullContentField | undefined = get(content, 'data.fields', []).find(
            //             (e: FullContentField) => e.name === field.name
            //         )
            //         if (!!value) {
            //             const newValue = {
            //                 type: value.type,
            //                 mediaId: value.mediaId || undefined,
            //                 media: value.media || undefined,
            //                 textValue: value.textValue || undefined,
            //                 numberValue:
            //                     !!value.numberValue || value.numberValue === 0
            //                         ? value.numberValue
            //                         : undefined,
            //                 boolValue: value.boolValue || undefined,
            //                 dateValue: moment(value.dateValue) || undefined,
            //             }
            //             set(fieldsValue, field.name, newValue)
            //         }
            //     }
            //     onHandleChange('fieldsValue', fieldsValue)
            // },
        }
    )

    const mutation = useMutation(
        (data: { pid: string; values: Prisma.ContentCreateInput }) =>
            data.pid === 'create' ? postContent(data.values) : editContent(data.pid, data.values),
        {
            onSuccess: (data: Content) => {
                message.success(`Content ${data.title} saved`)
                queryClient.invalidateQueries('contents')
                router.push('/admin/contents')
            },
            onError: (err) => {
                message.error('An error occured, while creating or updating the content')
                queryClient.invalidateQueries('contents')
            },
        }
    )

    const onHandleChange = (name: string, value: any) => {
        handleChange({ target: { name, value } })
    }

    if (content.isLoading || !pid) {
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
                <title>Admin - Contents</title>
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
                        <Card
                            title="Description"
                            extra={
                                pid !== 'create' ? (
                                    <Button
                                        icon={<CopyOutlined />}
                                        onClick={() => {
                                            setValues({
                                                ...values,
                                                id: undefined,
                                                title: undefined,
                                                slug: undefined,
                                                status: undefined,
                                                updatedAt: undefined,
                                            })

                                            router.push('/admin/containers/create')
                                        }}
                                    >
                                        Create a copy
                                    </Button>
                                ) : null
                            }
                        >
                            <Space direction="vertical">
                                <Space size="large">
                                    <Space direction="vertical">
                                        <Text>Title</Text>
                                        <Input
                                            status={errors.title ? 'error' : undefined}
                                            style={{ width: 240 }}
                                            value={get(values, 'title', '')}
                                            onChange={(e) => onHandleChange('title', e.target.value)}
                                        />
                                    </Space>

                                    <Space direction="vertical">
                                        <Text>Slug</Text>
                                        <Input
                                            status={errors.slug ? 'error' : undefined}
                                            style={{ width: 240 }}
                                            value={get(values, 'slug', '')}
                                            onChange={(e) => onHandleChange('slug', e.target.value)}
                                        />
                                    </Space>

                                    <Space direction="vertical">
                                        <Text>Status</Text>
                                        <Radio.Group
                                            id="status"
                                            value={values.published}
                                            onChange={(e) => onHandleChange('published', e.target.value)}
                                        >
                                            <Radio value={true}>Published</Radio>
                                            <Radio value={false}>Unpublished</Radio>
                                        </Radio.Group>
                                    </Space>

                                    <Space direction="vertical">
                                        <Space>
                                            <Text>Access</Text>
                                            <Tooltip title="Select none to grand access to everybody. If all selected, not logged in users can't access it.">
                                                <QuestionCircleOutlined />
                                            </Tooltip>
                                        </Space>
                                        <AccessCheckboxes
                                            value={values.accesses || []}
                                            onChange={(e) => onHandleChange('accesses', e)}
                                        />
                                    </Space>
                                </Space>

                                <Space size="large">
                                    <Space direction="vertical">
                                        <Text>Container</Text>
                                        <CustomSelect.ListContainers
                                            status={errors.containerId ? 'error' : undefined}
                                            disabled={!pid || pid !== 'create' || values.containerId}
                                            value={values.containerId}
                                            onChange={(e) => onHandleChange('containerId', e)}
                                        />
                                    </Space>
                                </Space>
                            </Space>
                        </Card>

                        {!!values.containerId && !container.isLoading && (
                            <>
                                {!!container?.data?.fields?.length && (
                                    <Card title="Fields" style={{ flex: 1 }}>
                                        <ContentFieldsManager
                                            values={get(values, 'fieldsValue', {})}
                                            fields={get(container, 'data.fields', [])}
                                            onChange={(e) => onHandleChange('fieldsValue', e)}
                                            errors={errors.fields}
                                        />
                                    </Card>
                                )}

                                {!container?.data?.disableContentSections && (
                                    <>
                                        <Divider orientation="left">Custom layout</Divider>

                                        <SectionManager
                                            values={get(values, 'sections', []) as FullSectionEdit[]}
                                            onChange={(e) => onHandleChange('sections', e)}
                                            filterAvailability={[Availability.ALL, Availability.CONTENT]}
                                        />
                                    </>
                                )}
                            </>
                        )}

                        <Button loading={mutation.isLoading} type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Space>
                </Space>
            </form>
        </>
    )
}

interface ContentFieldsManagerProps {
    values: {}
    onChange: (e: {}) => void
    fields: ContainerField[]
    errors: any
}

const ContentFieldsManager = ({ values, fields, onChange, errors }: ContentFieldsManagerProps) => {
    const onHandleChange = (name: string, type: string, value: any, multi?: boolean) => {
        const newValue = { ...values }
        const valueName = getNameFieldFromType(type)
        set(newValue, name, { type, [valueName]: value, multiple: !!multi })

        onChange(newValue)
    }

    return (
        <Space direction="vertical">
            {fields.map((field, idx) => {
                const Label = (
                    <Text>
                        {field.label}
                        {field.required && <Text type="danger">{` *`}</Text>}
                        {field.multiple && (
                            <Text type="secondary">{` (min: ${field.min}, max: ${field.max})`}</Text>
                        )}
                    </Text>
                )

                switch (field.type) {
                    case ContainerFieldType.STRING:
                        return (
                            <Space key={idx} direction="vertical">
                                {Label}
                                <Space>
                                    {field.multiple ? (
                                        <CustomMultipleWrapper
                                            values={get(values, `${field.name}.textValue`, [])}
                                            onChange={(e) => onHandleChange(field.name, field.type, e, true)}
                                            onClear={() =>
                                                onHandleChange(field.name, field.type, undefined, true)
                                            }
                                            error={!!errors?.[field.name]}
                                        />
                                    ) : (
                                        <Input
                                            style={{ width: 480 }}
                                            value={get(values, `${field.name}.textValue`, '')}
                                            onChange={(e) =>
                                                onHandleChange(field.name, field.type, e.target.value)
                                            }
                                            status={!!errors?.[field.name] ? 'error' : undefined}
                                        />
                                    )}
                                    <Text type="danger">{errors?.[field.name]}</Text>
                                </Space>
                            </Space>
                        )

                    case ContainerFieldType.OPTION:
                        return (
                            <Space key={idx} direction="vertical">
                                {Label}
                                <Space>
                                    {field.multiple ? (
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: 480 }}
                                            status={errors?.[field.name] ? 'error' : undefined}
                                            value={get(values, `${field.name}.textValue`, [])}
                                            onChange={(e) => onHandleChange(field.name, field.type, e, true)}
                                        >
                                            {(get(field, 'options', []) as any[])?.map(
                                                (option: any, jdx: number) => (
                                                    <Option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </Option>
                                                )
                                            )}
                                        </Select>
                                    ) : (
                                        <Select
                                            style={{ width: 480 }}
                                            allowClear
                                            status={errors?.[field.name] ? 'error' : undefined}
                                            value={get(values, `${field.name}.textValue`, '')}
                                            onChange={(e) => onHandleChange(field.name, field.type, e)}
                                        >
                                            {(get(field, 'options', []) as any[])?.map(
                                                (option: any, jdx: number) => (
                                                    <Option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </Option>
                                                )
                                            )}
                                        </Select>
                                    )}
                                    <Text type="danger">{errors?.[field.name]}</Text>
                                </Space>
                            </Space>
                        )

                    case ContainerFieldType.PARAGRAPH:
                        return (
                            <Space key={idx} direction="vertical">
                                {Label}
                                <Space>
                                    <Input.TextArea
                                        style={{ width: 480 }}
                                        status={errors?.[field.name] ? 'error' : undefined}
                                        value={get(values, `${field.name}.textValue`, '')}
                                        onChange={(e) =>
                                            onHandleChange(field.name, field.type, e.target.value)
                                        }
                                    />
                                    <Text type="danger">{errors?.[field.name]}</Text>
                                </Space>
                            </Space>
                        )

                    case ContainerFieldType.NUMBER:
                        return (
                            <Space key={idx} direction="vertical">
                                {Label}
                                <Space>
                                    {field.multiple ? (
                                        <CustomMultipleWrapper
                                            type={ContainerFieldType.NUMBER}
                                            values={get(values, `${field.name}.numberValue`, [])}
                                            onChange={(e) => onHandleChange(field.name, field.type, e, true)}
                                            onClear={() =>
                                                onHandleChange(field.name, field.type, undefined, true)
                                            }
                                            error={!!errors?.[field.name]}
                                        />
                                    ) : (
                                        <InputNumber
                                            style={{ width: 480 }}
                                            value={get(values, `${field.name}.numberValue`, undefined)}
                                            onChange={(e) => onHandleChange(field.name, field.type, e)}
                                            status={errors?.[field.name] ? 'error' : undefined}
                                        />
                                    )}
                                    <Text type="danger">{errors?.[field.name]}</Text>
                                </Space>
                            </Space>
                        )

                    case ContainerFieldType.BOOLEAN:
                        return (
                            <Space key={idx} direction="vertical">
                                {Label}
                                <Space>
                                    <Radio.Group
                                        value={get(values, `${field.name}.boolValue`, undefined)}
                                        onChange={(e) =>
                                            onHandleChange(field.name, field.type, e.target.value)
                                        }
                                    >
                                        <Radio value={true}>True</Radio>
                                        <Radio value={false}>False</Radio>
                                    </Radio.Group>
                                    <Text type="danger">{errors?.[field.name]}</Text>
                                </Space>
                            </Space>
                        )

                    case ContainerFieldType.DATE:
                        let value = get(values, `${field.name}.dateValue`, undefined)
                        if (field.multiple) {
                            value?.map((e: string) => moment(e))
                        } else {
                            value = moment(value)
                        }

                        return (
                            <Space key={idx} direction="vertical">
                                {Label}
                                <Space>
                                    {field.multiple ? (
                                        <CustomMultipleWrapper
                                            type={ContainerFieldType.DATE}
                                            values={value}
                                            onChange={(e) => onHandleChange(field.name, field.type, e, true)}
                                            onClear={() =>
                                                onHandleChange(field.name, field.type, undefined, true)
                                            }
                                            error={!!errors?.[field.name]}
                                        />
                                    ) : (
                                        <DatePicker
                                            style={{ width: 480 }}
                                            value={value}
                                            onChange={(e) => onHandleChange(field.name, field.type, e)}
                                            status={errors?.[field.name] ? 'error' : undefined}
                                        />
                                    )}
                                    <Text type="danger">{errors?.[field.name]}</Text>
                                </Space>
                            </Space>
                        )

                    case ContainerFieldType.IMAGE:
                    case ContainerFieldType.FILE:
                    case ContainerFieldType.VIDEO:
                        return (
                            <Space key={idx} direction="vertical">
                                {Label}
                                <Space>
                                    {field.multiple ? (
                                        <MultipleFiles
                                            type={field.type}
                                            value={get(values, `${field.name}.media`, [])}
                                            onChange={(e) => onHandleChange(field.name, field.type, e, true)}
                                            error={!!errors?.[field.name]}
                                        />
                                    ) : (
                                        <MediaModal
                                            type={field.type}
                                            size="small"
                                            value={get(values, `${field.name}.media`, '')}
                                            onMediaSelected={(e) => onHandleChange(field.name, field.type, e)}
                                        />
                                    )}
                                    <Text type="danger">{errors?.[field.name]}</Text>
                                </Space>
                            </Space>
                        )

                    case ContainerFieldType.LINK:
                        return (
                            <Space key={idx} direction="vertical">
                                {Label}
                                <Space>
                                    {field.multiple ? (
                                        <CustomMultipleWrapper
                                            type={ContainerFieldType.LINK}
                                            values={get(values, `${field.name}.textValue`, [])}
                                            onChange={(e) => onHandleChange(field.name, field.type, e, true)}
                                            onClear={() =>
                                                onHandleChange(field.name, field.type, undefined, true)
                                            }
                                            error={!!errors?.[field.name]}
                                        />
                                    ) : (
                                        <LinkInput
                                            width={480}
                                            value={get(values, `${field.name}.textValue`, '')}
                                            onChange={(e) => onHandleChange(field.name, field.type, e)}
                                            status={errors?.[field.name] ? 'error' : undefined}
                                        />
                                    )}
                                    <Text type="danger">{errors?.[field.name]}</Text>
                                </Space>
                            </Space>
                        )

                    case ContainerFieldType.CONTENT:
                        return (
                            <Space key={idx} direction="vertical">
                                {Label}
                                <Space>
                                    {field.multiple ? (
                                        <CustomSelect.ListContents
                                            multi
                                            width={480}
                                            filterId={field.linkedContainerId || undefined}
                                            value={get(values, `${field.name}.contentValueId`, [])}
                                            onChange={(e) => onHandleChange(field.name, field.type, e, true)}
                                            status={errors?.[field.name] ? 'error' : undefined}
                                        />
                                    ) : (
                                        <CustomSelect.ListContents
                                            width={480}
                                            filterId={field.linkedContainerId || undefined}
                                            value={get(values, `${field.name}.contentValueId`, undefined)}
                                            onChange={(e) => onHandleChange(field.name, field.type, e)}
                                            status={errors?.[field.name] ? 'error' : undefined}
                                        />
                                    )}
                                    <Text type="danger">{errors?.[field.name]}</Text>
                                </Space>
                            </Space>
                        )

                    case ContainerFieldType.COLOR:
                        return (
                            <Space key={idx} direction="vertical">
                                {Label}
                                <Space>
                                    {field.multiple ? (
                                        <MultipleColor
                                            values={get(values, `${field.name}.textValue`, [])}
                                            onChange={(e) => onHandleChange(field.name, field.type, e, true)}
                                            error={!!errors?.[field.name]}
                                        />
                                    ) : (
                                        <ColorButton
                                            value={get(values, `${field.name}.textValue`, undefined)}
                                            onChange={(e) => onHandleChange(field.name, field.type, e)}
                                        />
                                    )}
                                    <Text type="danger">{errors?.[field.name]}</Text>
                                </Space>
                            </Space>
                        )

                    case ContainerFieldType.RICHTEXT:
                        return (
                            <Space key={idx} direction="vertical">
                                {Label}
                                <Space>
                                    <RichEditor
                                        defaultValue={get(values, `${field.name}.textValue`, undefined)}
                                        onChange={(e) => onHandleChange(field.name, field.type, e)}
                                        error={!!errors?.[field.name]}
                                    />
                                    <Text type="danger">{errors?.[field.name]}</Text>
                                </Space>
                            </Space>
                        )

                    default:
                        return null
                }
            })}
        </Space>
    )
}

Admin.requireAuth = true

export default Admin

const MultipleColor = ({
    values = [],
    onChange,
    error,
}: {
    values: string[]
    onChange(list: (string | undefined)[] | undefined): void
    error?: boolean
}) => {
    if (!Array.isArray(values)) {
        values = [values]
    }

    return (
        <div
            className="ant-select ant-select-multiple ant-select-allow-clear ant-select-show-search"
            style={{ width: 480 }}
        >
            <div className="ant-select-selector" style={{ borderColor: error ? '#ff4d4f' : undefined }}>
                <div
                    className="ant-select-selection-overflow"
                    style={{ paddingTop: !values?.length ? undefined : 1.5 }}
                >
                    {values?.map((e: string, idx: number) => (
                        <Space key={idx} size={5} style={{ marginRight: 5, marginBottom: 5 }}>
                            <ColorButton
                                value={e}
                                onChange={(e) => {
                                    const newValues = [...values]
                                    newValues[idx] = e
                                    onChange(newValues)
                                }}
                            />
                            <Button
                                type="primary"
                                danger
                                size="small"
                                onClick={(e) => {
                                    const newValues = [...values]
                                    newValues.splice(idx, 1)
                                    onChange(newValues)
                                }}
                                icon={<MinusOutlined />}
                            />
                        </Space>
                    ))}
                    <Button
                        type="primary"
                        onClick={(e) => {
                            const newValues = [...values, undefined]
                            onChange(newValues)
                        }}
                        icon={<PlusOutlined />}
                    />
                </div>
            </div>
            {!!values?.length && (
                <span
                    className="ant-select-clear"
                    unselectable="on"
                    aria-hidden="true"
                    style={{ userSelect: 'none' }}
                >
                    <span role="img" aria-label="close-circle" className="anticon anticon-close-circle">
                        <CloseCircleFilled onClick={() => onChange(undefined)} />
                    </span>
                </span>
            )}
        </div>
    )
}

const MultipleFiles = ({
    value = [],
    onChange,
    type,
    error,
}: {
    value: Media[]
    onChange(list: (Media | undefined)[] | undefined): void
    type?: FileType
    error?: boolean
}) => {
    if (!Array.isArray(value)) {
        value = [value]
    }

    return (
        <div
            className="ant-select ant-select-multiple ant-select-allow-clear ant-select-show-search"
            style={{ width: 480 }}
        >
            <div className="ant-select-selector" style={{ borderColor: error ? '#ff4d4f' : undefined }}>
                <div
                    className="ant-select-selection-overflow"
                    style={{ paddingTop: !value?.length ? undefined : 1.5 }}
                >
                    <Space size="small" direction="vertical">
                        {value?.map((e, idx) => (
                            <MediaModal
                                key={idx}
                                type={type}
                                size="small"
                                value={e}
                                onMediaSelected={(e) => {
                                    if (!e) {
                                        const newValues = [...value]
                                        newValues.splice(idx, 1)
                                        onChange(newValues)
                                        return
                                    }

                                    const newValues = [...value]
                                    newValues[idx] = e
                                    onChange(newValues)
                                }}
                            />
                        ))}
                        <MediaModal
                            primary={false}
                            type={type}
                            size="small"
                            label="Add new"
                            icon={<PlusOutlined />}
                            onMediaSelected={(e) => {
                                const newValues = [...value, e]
                                onChange(newValues)
                            }}
                        >
                            <div className="ant-select-selection-overflow-item" style={{ opacity: 1 }}>
                                <span
                                    className="ant-select-selection-item"
                                    title="Add new"
                                    style={{ padding: '0px 0px 0px 6px' }}
                                >
                                    <span
                                        className="ant-select-selection-item-remove"
                                        unselectable="on"
                                        aria-hidden="true"
                                        style={{ userSelect: 'none' }}
                                    >
                                        <span role="img" aria-label="close" className="anticon anticon-close">
                                            <PlusOutlined style={{ marginRight: 3, color: '#000' }} />
                                        </span>
                                    </span>
                                    <span className="ant-select-selection-item-content">Add new</span>
                                </span>
                            </div>
                        </MediaModal>
                    </Space>
                </div>
            </div>
            {!!value?.length && (
                <span
                    className="ant-select-clear"
                    unselectable="on"
                    aria-hidden="true"
                    style={{ userSelect: 'none' }}
                >
                    <span role="img" aria-label="close-circle" className="anticon anticon-close-circle">
                        <CloseCircleFilled onClick={() => onChange(undefined)} />
                    </span>
                </span>
            )}
        </div>
    )
}

const CustomMultipleWrapper = ({
    values = [],
    type,
    onClear,
    onChange,
    error,
}: {
    values: any[]
    type?: ContainerFieldType
    onClear(): void
    onChange(e: any): void
    error?: boolean
}) => {
    if (!Array.isArray(values)) {
        values = [values]
    }

    return (
        <div
            className="ant-select ant-select-multiple ant-select-allow-clear ant-select-show-search"
            style={{ width: 480 }}
        >
            <div className="ant-select-selector" style={{ borderColor: error ? '#ff4d4f' : undefined }}>
                <div className="ant-select-selection-overflow">
                    {values?.map((e, i) => (
                        <CustomInputTag
                            key={i}
                            text={e}
                            type={type}
                            onClose={() => {
                                const newValues = [...values]
                                newValues.splice(i, 1)
                                onChange(newValues)
                            }}
                            onChange={(e) => {
                                const newValues = [...values]
                                newValues[i] = e
                                onChange(newValues)
                            }}
                        />
                    ))}
                    <AddInputTag type={type} onCreate={(e) => onChange([...values, e])} />
                </div>
            </div>
            {!!values?.length && (
                <span
                    className="ant-select-clear"
                    unselectable="on"
                    aria-hidden="true"
                    style={{ userSelect: 'none' }}
                >
                    <span role="img" aria-label="close-circle" className="anticon anticon-close-circle">
                        <CloseCircleFilled onClick={onClear} />
                    </span>
                </span>
            )}
        </div>
    )
}

const CustomInputTag = ({
    text,
    type,
    onChange,
    onClose,
}: {
    text: string
    type?: ContainerFieldType
    onChange(e: string): void
    onClose(): void
}) => {
    const [inputVisible, setInputVisible] = useState(false)
    const [value, setValue] = useState<any>()

    const onEdit = () => {
        if (!value) {
            onClose()
            return
        }

        onChange(value)
        setInputVisible(false)
    }

    const props = {
        autoFocus: true,
        type: 'text',
        size: 'small' as SizeType,
        placeholder: '',
        value: value,
        onBlur: onEdit,
        onPressEnter: onEdit,
        onChange: (e: any) => setValue(e.target.value),
        style: { width: 125 },
    }

    const MatchingInput = () => {
        switch (type) {
            case ContainerFieldType.NUMBER:
                return <InputNumber {...props} onChange={(e) => setValue(e)} />
            case ContainerFieldType.DATE:
                return <DatePicker {...props} format="DD/MM/YYYY" onChange={(e) => setValue(e)} />
            case ContainerFieldType.LINK:
                return <LinkInput {...props} onChange={(e) => setValue(e)} />

            default:
                return <Input allowClear {...props} onChange={(e) => setValue(e.target.value)} />
        }
    }

    if (inputVisible) {
        return (
            <div className="ant-select-selection-overflow-item" style={{ opacity: 1, marginRight: 5 }}>
                <MatchingInput />
            </div>
        )
    }

    const isLongTag = typeof text === 'number' ? false : text?.length > 20

    return (
        <div className="ant-select-selection-overflow-item" style={{ opacity: 1 }}>
            <span className="ant-select-selection-item" title={text}>
                <span
                    className="ant-select-selection-item-content"
                    style={{ cursor: 'text' }}
                    onClick={() => {
                        setValue(text)
                        setInputVisible(true)
                    }}
                >
                    {isLongTag && type === ContainerFieldType.STRING
                        ? `${text.slice(0, 20)}...`
                        : type === ContainerFieldType.DATE
                        ? moment(text).format('DD/MM/YYYY')
                        : text}
                </span>
                <span
                    className="ant-select-selection-item-remove"
                    unselectable="on"
                    aria-hidden="true"
                    style={{ userSelect: 'none' }}
                >
                    <span role="img" aria-label="close" className="anticon anticon-close">
                        <CloseOutlined onClick={onClose} />
                    </span>
                </span>
            </span>
        </div>
    )
}

const AddInputTag = ({ type, onCreate }: { type?: ContainerFieldType; onCreate(value: any): void }) => {
    const [inputVisible, setInputVisible] = useState(false)
    const [value, setValue] = useState<any>()

    const onEdit = () => {
        if (!!value) {
            onCreate(value)
        }

        setValue('')
        setInputVisible(false)
    }

    const props = {
        autoFocus: true,
        type: 'text',
        size: 'small' as SizeType,
        placeholder: '+ Add new',
        value: value,
        onBlur: onEdit,
        onPressEnter: onEdit,
        // onChange: (e: any) => setValue(e.target.value),
        style: { width: 125 },
    }

    const MatchingInput = () => {
        switch (type) {
            case ContainerFieldType.NUMBER:
                return <InputNumber {...props} onChange={(e) => setValue(e)} />
            case ContainerFieldType.DATE:
                return <DatePicker {...props} format="DD/MM/YYYY" onChange={(e) => setValue(e)} />
            case ContainerFieldType.LINK:
                return <LinkInput {...props} width={115} onChange={(e) => setValue(e)} />

            default:
                return <Input allowClear {...props} onChange={(e) => setValue(e.target.value)} />
        }
    }

    if (inputVisible) {
        return (
            <div className="ant-select-selection-overflow-item" style={{ opacity: 1, marginRight: 5 }}>
                <MatchingInput />
            </div>
        )
    }

    return (
        <div
            className="ant-select-selection-overflow-item"
            style={{ opacity: 1 }}
            onClick={() => setInputVisible(true)}
        >
            <span
                className="ant-select-selection-item"
                title="Add new"
                style={{ padding: '0px 0px 0px 6px' }}
            >
                <span
                    className="ant-select-selection-item-remove"
                    unselectable="on"
                    aria-hidden="true"
                    style={{ userSelect: 'none' }}
                >
                    <span role="img" aria-label="close" className="anticon anticon-close">
                        <PlusOutlined style={{ marginRight: 3, color: '#000' }} />
                    </span>
                </span>
                <span className="ant-select-selection-item-content">Add new</span>
            </span>
        </div>
    )
}
