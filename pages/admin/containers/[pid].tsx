import { Fragment, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import {
    Input,
    Space,
    Button,
    Typography,
    Card,
    Select,
    message,
    Spin,
    Tabs,
    Radio,
    Divider,
    Switch,
    InputNumber,
} from 'antd'
import Head from 'next/head'
import get from 'lodash.get'
import set from 'lodash.set'
import kebabcase from 'lodash.kebabcase'
// import { ContainerField } from '@prisma/client'
import {
    PlusOutlined,
    MinusOutlined,
    CaretUpOutlined,
    CaretDownOutlined,
    CopyOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery, UseQueryResult, useQueryClient } from 'react-query'

import SectionManager from '../../../components/SectionManager'
import AccessCheckboxes from '../../../components/AccessCheckboxes'
import { FullContainerEdit, FullSection, FullSectionEdit } from '../../../types'
import { editContainer, getContainerDetails, postContainer } from '../../../network/containers'
import camelcase from 'lodash.camelcase'
import CustomSelect from '@components/CustomSelect'
import { ContainerField, ContainerFieldType } from '@prisma/client'
import autoAnimate from '@formkit/auto-animate'

const { Text, Title } = Typography

const initialValues: FullContainerEdit = {
    title: '',
    disableContentSections: false,
    published: true,
    slugEdit: [''],
}

const validate = (values: FullContainerEdit) => {
    let containerTabErrors: any = {}

    if (!values.title) {
        containerTabErrors.title = 'Required'
    }

    if (values.id !== 'page') {
        if (!values?.slugEdit) {
            containerTabErrors.slugEdit = []
        } else {
            values?.slugEdit.forEach((slug, i) => {
                if (!slug) {
                    set(containerTabErrors, `slugEdit.${i}`, 'Required')
                }
            })
        }
    }

    values.metadatas?.forEach((metadata, i) => {
        if (!metadata.name) {
            set(containerTabErrors, `metadatas.${i}.name`, 'Required')
        }
        if (!metadata.content) {
            set(containerTabErrors, `metadatas.${i}.content`, 'Required')
        }
    })

    let contentTabErrors: any = {}

    const prevNames = new Set()
    values?.fields?.forEach((field, i) => {
        if (!field.label) {
            set(contentTabErrors, `fields.${i}.label`, 'Required')
        }

        if (!field.name) {
            set(contentTabErrors, `fields.${i}.name`, 'Required')
        } else if (prevNames.has(field.name)) {
            set(contentTabErrors, `fields.${i}.name`, 'Already exist')
        } else {
            prevNames.add(field.name)
        }

        if (!field.type) {
            set(contentTabErrors, `fields.${i}.type`, 'Required')
        }

        if (field.multiple) {
            if (!field.min && field.min !== 0) {
                set(contentTabErrors, `fields.${i}.min`, 'Required')
            }

            if (!field.max || (field.max || 0) < (field.min || 0)) {
                set(contentTabErrors, `fields.${i}.max`, 'Required')
            }
        }

        if (field.type === ContainerFieldType.OPTION) {
            let options = get(field, 'options', []) as any[]
            const prevOpts = new Set()

            options.forEach((option: any, j: number) => {
                if (!option.label) {
                    set(contentTabErrors, `fields.${i}.options.${j}.label`, 'Required')
                }
                if (!option.value) {
                    set(contentTabErrors, `fields.${i}.options.${j}.value`, 'Required')
                } else if (prevOpts.has(option.value)) {
                    set(contentTabErrors, `fields.${i}.options.${j}.value`, 'Already exist')
                } else {
                    prevOpts.add(option.value)
                }
            })
        }

        if (field.type === ContainerFieldType.CONTENT && !field.linkedContainerId) {
            set(contentTabErrors, `fields.${i}.linkedContainerId`, 'Required')
        }
    })

    let errors: any = { ...containerTabErrors, ...contentTabErrors }
    if (!!Object.keys(containerTabErrors).length) {
        errors.containerTabError = true
    }
    if (!!Object.keys(contentTabErrors).length) {
        errors.contentTabError = true
    }

    return errors
}

const Admin = () => {
    const router = useRouter()
    const { pid } = router.query
    const queryClient = useQueryClient()

    const { values, errors, handleSubmit, handleChange, setValues } = useFormik<FullContainerEdit>({
        initialValues,
        validate,
        validateOnBlur: false,
        validateOnMount: false,
        validateOnChange: false,
        onSubmit: async (values) => {
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

            i = 0
            const contentSections: FullSection[] = []

            if (!!values.contentSections) {
                for (const section of values.contentSections) {
                    if (!!section.block || !!section.elementId) {
                        contentSections.push({
                            ...section,
                            position: i,
                            tempId: undefined,
                        })

                        i = i + 1
                    }
                }
            }

            mutation.mutate({
                pid: pid as string,
                values: { ...values, sections, contentSections },
            })
        },
    })

    const mutation = useMutation(
        (data: { pid: string; values: FullContainerEdit }) =>
            data.pid === 'create' ? postContainer(data.values) : editContainer(data.pid, data.values),
        {
            onSuccess: (data: any) => {
                message.success(`Containers ${data.title} saved`)
                router.push('/admin/containers')
                queryClient.invalidateQueries('containers')
            },
            onError: (err) => {
                message.error('An error occured, while creating or updating the container')
                queryClient.invalidateQueries('containers')
            },
        }
    )

    const container: UseQueryResult<FullContainerEdit, Error> = useQuery<FullContainerEdit, Error>(
        ['containers', { id: pid }],
        () => getContainerDetails(pid as string),
        {
            enabled: !!pid && pid !== 'create' && !mutation.isLoading,
            // onSuccess: (data: FullContainerEdit) => setValues(data),

            onSuccess: (data: FullContainerEdit) => {
                const sections = get(data, 'sections', []).sort((a, b) => a.position - b.position)

                const contentSections = get(data, 'contentSections', []).sort(
                    (a, b) => a.position - b.position
                )

                const accesses = get(data, 'accesses', []).map((access) => get(access, 'roleId', ''))

                const slug = decodeURI(get(data, 'slug.basic', '') || '')
                const slugEdit = slug.split('/')

                setValues({ ...data, sections, contentSections, accesses, slugEdit })
            },
            onError: (err) => router.push('/admin/containers'),
        }
    )

    const isDefaultPage = values.id === 'page'

    const lastSlugIndex = get(values, 'slugEdit', []).length - 1

    const addSlug = () => {
        let newValue = [...get(values, 'slugEdit', [])]
        newValue.splice(lastSlugIndex, 0, '')

        onHandleChange('slugEdit', newValue)
    }

    const removeSlug = () => {
        let newValue = [...get(values, 'slugEdit', [])]
        newValue.splice(lastSlugIndex - 1, 1)

        onHandleChange('slugEdit', newValue)
    }

    const onHandleChange = (name: string, value: any) => {
        handleChange({ target: { name, value } })
    }

    if (container.isLoading || !pid) {
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

    const ContainerTab = (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Card title="Description">
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Space size="large">
                        <Space direction="vertical">
                            <Text>Title :</Text>
                            <Input
                                id="title"
                                status={errors.title ? 'error' : undefined}
                                disabled={isDefaultPage}
                                style={{ width: 240 }}
                                value={values.title}
                                onChange={(e) => {
                                    onHandleChange('title', e.target.value)

                                    if (pid === 'create') {
                                        onHandleChange(`slugEdit.${lastSlugIndex}`, kebabcase(e.target.value))
                                    }
                                }}
                            />
                        </Space>

                        <Space direction="vertical">
                            <Text>Status</Text>
                            <Radio.Group
                                id="status"
                                disabled={isDefaultPage}
                                value={values.published}
                                onChange={(e) => onHandleChange('published', e.target.value)}
                            >
                                <Radio value={true}>Published</Radio>
                                <Radio value={false}>Unpublished</Radio>
                            </Radio.Group>
                        </Space>

                        {!isDefaultPage && (
                            <Space direction="vertical">
                                <Text>Access</Text>
                                <AccessCheckboxes
                                    value={values.accesses || []}
                                    onChange={(e) => onHandleChange('accesses', e)}
                                />
                            </Space>
                        )}
                    </Space>

                    {!isDefaultPage && (
                        <>
                            <Divider />
                            <Title level={5}>Page URL</Title>
                            <Space style={{ width: '100%' }}>
                                {get(values, 'slugEdit', []).map((slug, idx) => (
                                    <Fragment key={idx}>
                                        {idx === lastSlugIndex && (
                                            <>
                                                <Button
                                                    id="slug-minus"
                                                    onClick={removeSlug}
                                                    type="primary"
                                                    // shape="circle"
                                                    danger
                                                    disabled={get(values, 'slugEdit', []).length < 2}
                                                    icon={<MinusOutlined />}
                                                />
                                                <Button
                                                    id="slug-plus"
                                                    onClick={addSlug}
                                                    disabled={get(values, 'slugEdit', []).length > 5}
                                                    type="primary"
                                                    // shape="circle"
                                                    icon={<PlusOutlined />}
                                                />
                                            </>
                                        )}
                                        <Input
                                            id={`slug-${idx}`}
                                            status={errors?.slugEdit?.[idx] ? 'error' : undefined}
                                            style={{
                                                minWidth: 200,
                                            }}
                                            value={slug}
                                            onChange={(e) =>
                                                onHandleChange(`slugEdit.${idx}`, kebabcase(e.target.value))
                                            }
                                        />
                                        {lastSlugIndex !== idx && '/'}
                                    </Fragment>
                                ))}
                            </Space>
                        </>
                    )}
                </Space>
            </Card>

            <MetadatasManager
                errors={errors.metadatas}
                values={get(values, 'metadatas', [])}
                onChange={(e) => onHandleChange('metadatas', e)}
            />

            <Divider orientation="left">Container Layout</Divider>

            <SectionManager
                values={get(values, 'sections', []) as FullSectionEdit[]}
                onChange={(e) => onHandleChange('sections', e)}
                fields={get(values, 'fields', [])}
            />
        </Space>
    )

    const ContentTab = (
        <Space direction="vertical" style={{ width: '100%' }}>
            <FieldsManager
                errors={errors.fields}
                values={get(values, 'fields', [])}
                onChange={(e) => onHandleChange('fields', e)}
            />

            <Divider orientation="left">
                <Space size="middle">
                    Disable Content Sections
                    <Switch
                        disabled={values.id === 'page'}
                        checked={values.disableContentSections}
                        onChange={(checked: boolean) => onHandleChange('disableContentSections', checked)}
                    />
                </Space>
            </Divider>
            <SectionManager
                values={get(values, 'contentSections', []) as FullSectionEdit[]}
                onChange={(e) => onHandleChange('contentSections', e)}
                fields={get(values, 'fields', [])}
            />
        </Space>
    )

    const tabItems = [
        {
            label: errors.containerTabError ? (
                <Text strong type="danger">
                    Container
                </Text>
            ) : (
                'Container'
            ),
            key: '1',
            children: ContainerTab,
        }, // remember to pass the key prop
        {
            label: errors.contentTabError ? (
                <Text strong type="danger">
                    Content
                </Text>
            ) : (
                'Content'
            ),
            key: '2',
            children: ContentTab,
        },
    ]

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
                    <div className="admin-card-container">
                        <Tabs
                            type="card"
                            tabBarExtraContent={
                                pid !== 'create'
                                    ? {
                                          right: (
                                              <Button
                                                  icon={<CopyOutlined />}
                                                  onClick={() => {
                                                      setValues({
                                                          ...values,
                                                          id: undefined,
                                                          title: '',
                                                          slug: undefined,
                                                          slugEdit: [''],
                                                          status: undefined,
                                                          updatedAt: undefined,
                                                      })

                                                      router.push('/admin/containers/create')
                                                  }}
                                              >
                                                  Create a copy
                                              </Button>
                                          ),
                                      }
                                    : null
                            }
                            items={tabItems}
                        />
                    </div>

                    <Button loading={mutation.isLoading} type="primary" htmlType="submit">
                        Save
                    </Button>
                </Space>
            </form>
        </>
    )
}

interface MetadatasManagerProps {
    values: { name: string; content?: string; field?: string }[]
    onChange(e: { name: string; content?: string; field?: string }[]): void
    errors: any
}

const MetadatasManager = ({ values, onChange, errors }: MetadatasManagerProps) => {
    const addMetadata = () => {
        onChange([...values, { name: '' }])
    }

    const removeMetadata = (index: number) => {
        let newValue = [...values]
        newValue.splice(index, 1)

        onChange(newValue)
    }

    const modifyMetadata = (index: number, key: string, value: any) => {
        let newValue = [...values]
        set(newValue, `${index}.${key}`, value)

        onChange(newValue)
    }

    return (
        <Card title="Metadatas">
            <Space direction="vertical">
                {values.map((metadata: any, idx: number) => (
                    <Space key={idx} align="end">
                        <Space direction="vertical">
                            <Text>Name</Text>
                            <Select
                                id={`meta-name-${idx}`}
                                style={{ width: 240 }}
                                value={metadata.name}
                                onChange={(e) => modifyMetadata(idx, 'name', e)}
                                status={errors?.[idx]?.name ? 'error' : undefined}
                            >
                                <Select.Option value="application-name">Application name</Select.Option>
                                <Select.Option value="author">Author</Select.Option>
                                <Select.Option value="description">Description</Select.Option>
                                <Select.Option value="generator">Generator</Select.Option>
                                <Select.Option value="keywords">Keywords</Select.Option>
                                <Select.Option value="viewport">Viewport</Select.Option>
                            </Select>
                        </Space>

                        <Space direction="vertical">
                            <Text>Content</Text>
                            <Input
                                id={`meta-content-${idx}`}
                                style={{ width: 240 }}
                                value={metadata.content}
                                onChange={(e) => modifyMetadata(idx, 'content', e.target.value)}
                                status={errors?.[idx]?.content ? 'error' : undefined}
                            />
                        </Space>

                        <Button
                            id={`meta-minus-${idx}`}
                            onClick={() => removeMetadata(idx)}
                            type="primary"
                            // shape="circle"
                            danger
                            icon={<MinusOutlined />}
                        />
                    </Space>
                ))}
                <Button
                    id={'meta-plus'}
                    onClick={addMetadata}
                    type="primary"
                    // shape="circle"
                    icon={<PlusOutlined />}
                />
            </Space>
        </Card>
    )
}

interface FieldsManagerProps {
    values: any[]
    onChange(e: any[]): void
    errors: any
}

const FieldsManager = ({ values, onChange, errors }: FieldsManagerProps) => {
    const addField = () => {
        onChange([...values, { multiple: false, required: true, type: ContainerFieldType.STRING }])
    }

    const removeField = (index: number) => {
        let newValue = [...values]
        newValue.splice(index, 1)

        onChange(newValue)
    }

    const modifyField = (index: number, key: string, value: any) => {
        let newValue = [...values]
        set(newValue, `${index}.${key}`, value)

        onChange(newValue)
    }

    const canMeta = (type: string) =>
        type === ContainerFieldType.STRING ||
        type === ContainerFieldType.PARAGRAPH ||
        type === ContainerFieldType.NUMBER ||
        type === ContainerFieldType.BOOLEAN ||
        type === ContainerFieldType.DATE ||
        type === ContainerFieldType.LINK ||
        type === ContainerFieldType.OPTION

    const canMultiple = (type: string) =>
        type !== ContainerFieldType.BOOLEAN &&
        type !== ContainerFieldType.RICHTEXT &&
        type !== ContainerFieldType.PARAGRAPH

    const FieldUp = (index: number) => {
        // let newValue = [...get(values, 'fields', [])]
        // const temp = newValue[index]
        // newValue[index] = newValue[index - 1]
        // newValue[index - 1] = temp
        // handleChange({ target: { name: 'fields', value: newValue } })
    }

    const FieldDown = (index: number) => {
        // let newValue = [...get(values, 'fields', [])]
        // const temp = newValue[index]
        // newValue[index] = newValue[index + 1]
        // newValue[index + 1] = temp
        // handleChange({ target: { name: 'fields', value: newValue } })
    }

    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    return (
        <Card title="Fields">
            <Space
                direction="vertical"
                style={{ width: '100%', backgroundColor: 'rgb(240, 242, 245)', padding: 8 }}
            >
                <div ref={parent} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {values.map((field: ContainerField, idx: number) => (
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
                                style={{ width: '100%' }}
                                title={`Field ${idx + 1}`}
                                extra={
                                    <Button
                                        id={`field-minus-${idx}`}
                                        onClick={() => removeField(idx)}
                                        type="primary"
                                        danger
                                        icon={<MinusOutlined />}
                                    />
                                }
                            >
                                <Space direction="vertical">
                                    <Space>
                                        <Space direction="vertical">
                                            <Text>Label</Text>
                                            <Input
                                                id={`field-label-${idx}`}
                                                style={{ width: 240 }}
                                                value={field.label}
                                                onChange={(e) => modifyField(idx, 'label', e.target.value)}
                                                status={errors?.[idx]?.label ? 'error' : undefined}
                                            />
                                        </Space>

                                        <Space direction="vertical">
                                            <Text>Name</Text>
                                            <Input
                                                id={`field-name-${idx}`}
                                                style={{ width: 240 }}
                                                value={field.name}
                                                onChange={(e) =>
                                                    modifyField(idx, 'name', camelcase(e.target.value))
                                                }
                                                status={errors?.[idx]?.name ? 'error' : undefined}
                                            />
                                        </Space>

                                        <Space direction="vertical">
                                            <Text>Required</Text>
                                            <div
                                                style={{
                                                    height: 32,
                                                    width: 75,
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                }}
                                            >
                                                <Switch
                                                    checked={field.required || undefined}
                                                    onClick={(e) => modifyField(idx, 'required', e)}
                                                />
                                            </div>
                                        </Space>
                                    </Space>

                                    <Space align="start">
                                        <Space direction="vertical">
                                            <Text>Type</Text>
                                            <Select
                                                id={`field-type-${idx}`}
                                                style={{ width: 240 }}
                                                value={field.type}
                                                onChange={(e) => {
                                                    modifyField(idx, 'type', e)
                                                    if (!canMeta(e)) {
                                                        modifyField(idx, 'metadata', undefined)
                                                    }
                                                    if (!canMultiple(e)) {
                                                        modifyField(idx, 'min', undefined)
                                                        modifyField(idx, 'max', undefined)
                                                        modifyField(idx, 'multiple', false)
                                                    }
                                                    if (e === ContainerFieldType.OPTION) {
                                                        modifyField(idx, 'options', [
                                                            { label: '', value: '' },
                                                        ])
                                                    } else {
                                                        modifyField(idx, 'options', undefined)
                                                    }
                                                    modifyField(idx, 'containerId', undefined)
                                                }}
                                            >
                                                <Select.Option value={ContainerFieldType.STRING}>
                                                    Text
                                                </Select.Option>
                                                <Select.Option value={ContainerFieldType.PARAGRAPH}>
                                                    Paragraph
                                                </Select.Option>
                                                <Select.Option value={ContainerFieldType.NUMBER}>
                                                    Number
                                                </Select.Option>
                                                <Select.Option value={ContainerFieldType.BOOLEAN}>
                                                    Boolean
                                                </Select.Option>
                                                <Select.Option value={ContainerFieldType.OPTION}>
                                                    Option
                                                </Select.Option>
                                                <Select.Option value={ContainerFieldType.DATE}>
                                                    Date
                                                </Select.Option>
                                                <Select.Option value={ContainerFieldType.IMAGE}>
                                                    Image
                                                </Select.Option>
                                                <Select.Option value={ContainerFieldType.FILE}>
                                                    File
                                                </Select.Option>
                                                <Select.Option value={ContainerFieldType.VIDEO}>
                                                    Video
                                                </Select.Option>
                                                <Select.Option value={ContainerFieldType.LINK}>
                                                    Link
                                                </Select.Option>
                                                <Select.Option value={ContainerFieldType.RICHTEXT}>
                                                    Rich text
                                                </Select.Option>
                                                <Select.Option value={ContainerFieldType.CONTENT}>
                                                    Content
                                                </Select.Option>
                                                <Select.Option value={ContainerFieldType.COLOR}>
                                                    Color
                                                </Select.Option>
                                            </Select>
                                        </Space>

                                        {field.type === ContainerFieldType.CONTENT && (
                                            <Space direction="vertical">
                                                <Text>Content from</Text>
                                                <CustomSelect.ListContainers
                                                    value={field.linkedContainerId || undefined}
                                                    onChange={(e: string) =>
                                                        modifyField(idx, 'linkedContainerId', e)
                                                    }
                                                    status={
                                                        errors?.[idx]?.linkedContainerId ? 'error' : undefined
                                                    }
                                                />
                                            </Space>
                                        )}

                                        {field.type === ContainerFieldType.OPTION && (
                                            <Space direction="vertical">
                                                <Text>Options</Text>
                                                <>
                                                    {((get(field, 'options', []) as any[]) || [])?.map(
                                                        (option: any, jdx: number) => (
                                                            <Space key={jdx}>
                                                                <Input
                                                                    size="small"
                                                                    style={{ width: 150 }}
                                                                    value={option.label}
                                                                    onChange={(e) =>
                                                                        modifyField(
                                                                            idx,
                                                                            `options.${jdx}.label`,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    placeholder="Label"
                                                                    status={
                                                                        errors?.[idx]?.options?.[jdx]?.label
                                                                            ? 'error'
                                                                            : undefined
                                                                    }
                                                                />
                                                                <Input
                                                                    size="small"
                                                                    style={{ width: 150 }}
                                                                    value={option.value}
                                                                    onChange={(e) =>
                                                                        modifyField(
                                                                            idx,
                                                                            `options.${jdx}.value`,
                                                                            kebabcase(e.target.value)
                                                                        )
                                                                    }
                                                                    placeholder="Value"
                                                                    status={
                                                                        errors?.[idx]?.options?.[jdx]?.value
                                                                            ? 'error'
                                                                            : undefined
                                                                    }
                                                                />
                                                                <Button
                                                                    size="small"
                                                                    disabled={
                                                                        (get(field, 'options', []) as any[])
                                                                            .length === 1
                                                                    }
                                                                    onClick={() => {
                                                                        const copyOpts = [
                                                                            ...(get(
                                                                                field,
                                                                                'options',
                                                                                []
                                                                            ) as any[]),
                                                                        ]
                                                                        copyOpts.splice(jdx, 1)

                                                                        modifyField(idx, 'options', copyOpts)
                                                                    }}
                                                                    type="primary"
                                                                    danger
                                                                    icon={<MinusOutlined />}
                                                                />
                                                            </Space>
                                                        )
                                                    )}
                                                </>
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        modifyField(idx, 'options', [
                                                            ...((get(field, 'options', []) as any[]) || []),
                                                            { label: '', value: '' },
                                                        ])
                                                    }
                                                    type="primary"
                                                    icon={<PlusOutlined />}
                                                />
                                            </Space>
                                        )}
                                    </Space>

                                    <Space>
                                        <Space direction="vertical">
                                            <Text>Multiple</Text>
                                            <div
                                                style={{
                                                    height: 32,
                                                    width: 75,
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                }}
                                            >
                                                <Switch
                                                    disabled={!canMultiple(field.type)}
                                                    checked={field.multiple}
                                                    onClick={(e) => {
                                                        if (!e) {
                                                            modifyField(idx, 'min', undefined)
                                                            modifyField(idx, 'max', undefined)
                                                        } else {
                                                            modifyField(idx, 'min', 1)
                                                            modifyField(idx, 'max', 15)
                                                        }
                                                        modifyField(idx, 'multiple', e)
                                                    }}
                                                />
                                            </div>
                                        </Space>

                                        {field.multiple && (
                                            <>
                                                <Space direction="vertical">
                                                    <Text>Min</Text>
                                                    <InputNumber
                                                        style={{
                                                            width: 65,
                                                        }}
                                                        value={field.min}
                                                        onChange={(e) => modifyField(idx, 'min', e)}
                                                        min={0}
                                                        max={field.max || undefined}
                                                        status={errors?.[idx]?.min ? 'error' : undefined}
                                                    />
                                                </Space>
                                                <Space direction="vertical">
                                                    <Text>Max</Text>
                                                    <InputNumber
                                                        style={{
                                                            width: 65,
                                                        }}
                                                        value={field.max}
                                                        onChange={(e) => modifyField(idx, 'max', e)}
                                                        min={field.min || undefined}
                                                        max={999}
                                                        status={errors?.[idx]?.max ? 'error' : undefined}
                                                    />
                                                </Space>
                                            </>
                                        )}
                                    </Space>

                                    <Space direction="vertical">
                                        <Text>Metadata</Text>
                                        <Select
                                            allowClear
                                            disabled={!canMeta(field.type)}
                                            id={`meta-name-${idx}`}
                                            style={{ width: 240 }}
                                            value={field.metadata}
                                            onChange={(e) => modifyField(idx, 'metadata', e)}
                                        >
                                            <Select.Option value="application-name">
                                                Application name
                                            </Select.Option>
                                            <Select.Option value="author">Author</Select.Option>
                                            <Select.Option value="description">Description</Select.Option>
                                            <Select.Option value="generator">Generator</Select.Option>
                                            <Select.Option value="keywords">Keywords</Select.Option>
                                            <Select.Option value="viewport">Viewport</Select.Option>
                                        </Select>
                                    </Space>
                                </Space>
                            </Card>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        type="primary"
                        size="large"
                        // shape="round"
                        icon={<PlusOutlined />}
                        // size="small"
                        onClick={addField}
                    >
                        Add field
                    </Button>
                </div>
            </Space>
        </Card>
    )
}

Admin.requireAuth = true

export default Admin
