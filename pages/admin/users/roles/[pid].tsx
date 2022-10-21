import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import {
    // Breadcrumb,
    Input,
    Space,
    Button,
    // Select,
    // Radio,
    Typography,
    Card,
    message,
    Spin,
    Checkbox,
    Divider,
    Row,
    Col,
} from 'antd'
// import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import get from 'lodash.get'
// import kebabcase from 'lodash.kebabcase'
import { Prisma, RightType } from '@prisma/client'
import type { Role } from '@prisma/client'
import { postRole, editRole, getRoleDetails } from '../../../../network/roles'
import { UseQueryResult, useQuery, useMutation, useQueryClient } from 'react-query'
import Head from 'next/head'
import { FullRole, FullRoleEdit } from '@types'

const { Text } = Typography

const initialValues: FullRoleEdit = {
    name: '',
    rightsEdit: new Set([
        RightType.VIEW_CONTAINER,
        RightType.VIEW_USER,
        RightType.VIEW_ROLE,
        RightType.VIEW_CONTENT,
        RightType.VIEW_ELEMENT,
        RightType.VIEW_FORM,
        RightType.VIEW_LAYOUT,
        RightType.VIEW_MEDIA,
    ]),
}

const validate = (values: FullRoleEdit) => {
    let errors: any = {}

    if (!values.name) {
        errors.name = 'Required'
    }

    return errors
}

const UsersCreation = () => {
    const router = useRouter()
    const { pid } = router.query
    const queryClient = useQueryClient()

    const { values, /*errors,*/ handleChange, handleSubmit, setValues } = useFormik<FullRoleEdit>({
        validate,
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validateOnMount: false,
        onSubmit: async (values) => {
            const rights = Array.from(values.rightsEdit || [])
            delete values.rightsEdit

            mutation.mutate({
                pid: pid as string,
                values: { ...values, rights },
            })
        },
    })

    const role: UseQueryResult<FullRole, Error> = useQuery<FullRole, Error>(
        ['roles', { id: pid }],
        () => getRoleDetails(pid as string),
        {
            enabled: !!pid && pid !== 'create',
            onSuccess: (data: FullRole) => {
                const rightsEdit = new Set(data.rights.map((right) => right.rightType))

                setValues({
                    ...(data as FullRoleEdit),
                    rightsEdit: new Set(rightsEdit),
                })
            },
            onError: (err) => router.push('/admin/users'),
        }
    )

    const mutation = useMutation(
        (data: { pid: string; values: Prisma.RoleCreateInput & { rights: RightType[] } }) =>
            data.pid === 'create' ? postRole(data.values) : editRole(data.pid, data.values),
        {
            onSuccess: (data: Role) => {
                message.success(`User types ${data.name} saved`)
                queryClient.invalidateQueries('roles')
                router.push('/admin/users/roles')
            },
            onError: (err) => {
                message.error('An error occured, while creating or updating the user types')
                queryClient.invalidateQueries('roles')
                router.push('/admin/users/roles')
            },
        }
    )

    const onHandleChange = (name: string, value: any) => {
        handleChange({ target: { name, value } })
    }

    if (role.isLoading || !pid) {
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

    const onHandleCheck = (key: RightType, onDelete?: RightType[], onAdd?: RightType[]) => {
        const newSet = new Set(values?.rightsEdit)

        if (newSet.has(key)) {
            newSet.delete(key)

            if (onDelete) {
                for (const linked of onDelete) {
                    newSet.delete(linked)
                }
            }
        } else {
            newSet.add(key)

            if (onAdd) {
                for (const linked of onAdd) {
                    newSet.add(linked)
                }
            }
        }

        onHandleChange('rightsEdit', newSet)
    }

    return (
        <>
            <Head>
                <title>Admin - User Types</title>
            </Head>

            <form onSubmit={handleSubmit}>
                <Space
                    direction="vertical"
                    style={{
                        width: '100%',
                        minHeight: 'calc(100vh - 29px)',
                        padding: 15,
                        backgroundColor: '#f0f2f5',
                    }}
                >
                    <Card title="Description">
                        <Space direction="vertical">
                            <Text>Name</Text>
                            <Input
                                style={{ width: 240 }}
                                value={get(values, 'name', '')!}
                                onChange={(e) => onHandleChange('name', e.target.value)}
                            />
                        </Space>
                    </Card>

                    <Card title="Rights">
                        <Space direction="vertical" style={{ width: '100%' }} size={0}>
                            <Row>
                                <Col span={8}>
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.VIEW_CONTAINER)}
                                            onChange={() =>
                                                onHandleCheck(RightType.VIEW_CONTAINER, [
                                                    RightType.CREATE_CONTAINER,
                                                    RightType.UPDATE_CONTAINER,
                                                    RightType.DELETE_CONTAINER,
                                                ])
                                            }
                                        >
                                            {'View all containers'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.CREATE_CONTAINER)}
                                            onChange={() =>
                                                onHandleCheck(RightType.CREATE_CONTAINER, undefined, [
                                                    RightType.VIEW_CONTAINER,
                                                ])
                                            }
                                        >
                                            {'Create container'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.UPDATE_CONTAINER)}
                                            onChange={() =>
                                                onHandleCheck(RightType.UPDATE_CONTAINER, undefined, [
                                                    RightType.VIEW_CONTAINER,
                                                ])
                                            }
                                        >
                                            {'Update container'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.DELETE_CONTAINER)}
                                            onChange={() =>
                                                onHandleCheck(RightType.DELETE_CONTAINER, undefined, [
                                                    RightType.VIEW_CONTAINER,
                                                ])
                                            }
                                        >
                                            {'Delete container'}
                                        </Checkbox>
                                    </Space>
                                </Col>
                                <Col span={8}>
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.VIEW_USER)}
                                            onChange={() =>
                                                onHandleCheck(RightType.VIEW_USER, [
                                                    RightType.CREATE_USER,
                                                    RightType.UPDATE_USER,
                                                    RightType.DELETE_USER,
                                                ])
                                            }
                                        >
                                            {'View all users'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.CREATE_USER)}
                                            onChange={() =>
                                                onHandleCheck(RightType.CREATE_USER, undefined, [
                                                    RightType.VIEW_USER,
                                                ])
                                            }
                                        >
                                            {'Create user'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.UPDATE_USER)}
                                            onChange={() =>
                                                onHandleCheck(RightType.UPDATE_USER, undefined, [
                                                    RightType.VIEW_USER,
                                                ])
                                            }
                                        >
                                            {'Update user'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.DELETE_USER)}
                                            onChange={() =>
                                                onHandleCheck(RightType.DELETE_USER, undefined, [
                                                    RightType.VIEW_USER,
                                                ])
                                            }
                                        >
                                            {'Delete user'}
                                        </Checkbox>
                                    </Space>
                                </Col>
                                <Col span={8}>
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.VIEW_ELEMENT)}
                                            onChange={() =>
                                                onHandleCheck(RightType.VIEW_ELEMENT, [
                                                    RightType.CREATE_ELEMENT,
                                                    RightType.UPDATE_ELEMENT,
                                                    RightType.DELETE_ELEMENT,
                                                ])
                                            }
                                        >
                                            {'View all elements'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.CREATE_ELEMENT)}
                                            onChange={() =>
                                                onHandleCheck(RightType.CREATE_ELEMENT, undefined, [
                                                    RightType.VIEW_ELEMENT,
                                                ])
                                            }
                                        >
                                            {'Create element'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.UPDATE_ELEMENT)}
                                            onChange={() =>
                                                onHandleCheck(RightType.UPDATE_ELEMENT, undefined, [
                                                    RightType.VIEW_ELEMENT,
                                                ])
                                            }
                                        >
                                            {'Update element'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.DELETE_ELEMENT)}
                                            onChange={() =>
                                                onHandleCheck(RightType.DELETE_ELEMENT, undefined, [
                                                    RightType.VIEW_ELEMENT,
                                                ])
                                            }
                                        >
                                            {'Delete element'}
                                        </Checkbox>
                                    </Space>
                                </Col>
                            </Row>

                            <Divider />
                            <Row>
                                <Col span={8}>
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.VIEW_ROLE)}
                                            onChange={() =>
                                                onHandleCheck(RightType.VIEW_ROLE, [
                                                    RightType.CREATE_ROLE,
                                                    RightType.UPDATE_ROLE,
                                                    RightType.DELETE_ROLE,
                                                ])
                                            }
                                        >
                                            {'View all roles'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.CREATE_ROLE)}
                                            onChange={() =>
                                                onHandleCheck(RightType.CREATE_ROLE, undefined, [
                                                    RightType.VIEW_ROLE,
                                                ])
                                            }
                                        >
                                            {'Create role'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.UPDATE_ROLE)}
                                            onChange={() =>
                                                onHandleCheck(RightType.UPDATE_ROLE, undefined, [
                                                    RightType.VIEW_ROLE,
                                                ])
                                            }
                                        >
                                            {'Update role'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.DELETE_ROLE)}
                                            onChange={() =>
                                                onHandleCheck(RightType.DELETE_ROLE, undefined, [
                                                    RightType.VIEW_ROLE,
                                                ])
                                            }
                                        >
                                            {'Delete role'}
                                        </Checkbox>
                                    </Space>
                                </Col>
                                <Col span={8}>
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.VIEW_CONTENT)}
                                            onChange={() =>
                                                onHandleCheck(RightType.VIEW_CONTENT, [
                                                    RightType.CREATE_CONTENT,
                                                    RightType.UPDATE_CONTENT,
                                                    RightType.DELETE_CONTENT,
                                                ])
                                            }
                                        >
                                            {'View all content'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.CREATE_CONTENT)}
                                            onChange={() =>
                                                onHandleCheck(RightType.CREATE_CONTENT, undefined, [
                                                    RightType.VIEW_CONTENT,
                                                ])
                                            }
                                        >
                                            {'Create content'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.UPDATE_CONTENT)}
                                            onChange={() =>
                                                onHandleCheck(RightType.UPDATE_CONTENT, undefined, [
                                                    RightType.VIEW_CONTENT,
                                                ])
                                            }
                                        >
                                            {'Update content'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.DELETE_CONTENT)}
                                            onChange={() =>
                                                onHandleCheck(RightType.DELETE_CONTENT, undefined, [
                                                    RightType.VIEW_CONTENT,
                                                ])
                                            }
                                        >
                                            {'Delete content'}
                                        </Checkbox>
                                    </Space>
                                </Col>
                                <Col span={8}>
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.VIEW_FORM)}
                                            onChange={() =>
                                                onHandleCheck(RightType.VIEW_FORM, [
                                                    RightType.CREATE_FORM,
                                                    RightType.UPDATE_FORM,
                                                    RightType.DELETE_FORM,
                                                ])
                                            }
                                        >
                                            {'View all forms'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.CREATE_FORM)}
                                            onChange={() =>
                                                onHandleCheck(RightType.CREATE_FORM, undefined, [
                                                    RightType.VIEW_FORM,
                                                ])
                                            }
                                        >
                                            {'Create form'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.UPDATE_FORM)}
                                            onChange={() =>
                                                onHandleCheck(RightType.UPDATE_FORM, undefined, [
                                                    RightType.VIEW_FORM,
                                                ])
                                            }
                                        >
                                            {'Update form'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.DELETE_FORM)}
                                            onChange={() =>
                                                onHandleCheck(RightType.DELETE_FORM, undefined, [
                                                    RightType.VIEW_FORM,
                                                ])
                                            }
                                        >
                                            {'Delete form'}
                                        </Checkbox>
                                    </Space>
                                </Col>
                            </Row>

                            <Divider />

                            <Row>
                                <Col span={8}>
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.VIEW_MEDIA)}
                                            onChange={() =>
                                                onHandleCheck(RightType.VIEW_MEDIA, [
                                                    RightType.CREATE_MEDIA,
                                                    RightType.UPDATE_MEDIA,
                                                    RightType.DELETE_MEDIA,
                                                ])
                                            }
                                        >
                                            {'View all medias'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.CREATE_MEDIA)}
                                            onChange={() =>
                                                onHandleCheck(RightType.CREATE_MEDIA, undefined, [
                                                    RightType.VIEW_MEDIA,
                                                ])
                                            }
                                        >
                                            {'Upload media'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.UPDATE_MEDIA)}
                                            onChange={() =>
                                                onHandleCheck(RightType.UPDATE_MEDIA, undefined, [
                                                    RightType.VIEW_MEDIA,
                                                ])
                                            }
                                        >
                                            {'Update media'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.DELETE_MEDIA)}
                                            onChange={() =>
                                                onHandleCheck(RightType.DELETE_MEDIA, undefined, [
                                                    RightType.VIEW_MEDIA,
                                                ])
                                            }
                                        >
                                            {'Delete media'}
                                        </Checkbox>
                                    </Space>
                                </Col>
                                <Col span={8}>
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.VIEW_LAYOUT)}
                                            onChange={() =>
                                                onHandleCheck(RightType.VIEW_LAYOUT, [
                                                    RightType.UPDATE_LAYOUT,
                                                ])
                                            }
                                        >
                                            {'View layout'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.UPDATE_LAYOUT)}
                                            onChange={() =>
                                                onHandleCheck(RightType.UPDATE_LAYOUT, undefined, [
                                                    RightType.VIEW_LAYOUT,
                                                ])
                                            }
                                        >
                                            {'Update layout'}
                                        </Checkbox>
                                        <div>&nbsp;</div>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.VIEW_MESSAGE)}
                                            onChange={() => onHandleCheck(RightType.VIEW_MESSAGE)}
                                        >
                                            {'View messages'}
                                        </Checkbox>
                                    </Space>
                                </Col>

                                <Col span={8}>
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.ACCESS_SETTINGS)}
                                            onChange={() => onHandleCheck(RightType.ACCESS_SETTINGS)}
                                        >
                                            {'Access Settings'}
                                        </Checkbox>
                                        <Checkbox
                                            checked={values?.rightsEdit?.has(RightType.REVALIDATION)}
                                            onChange={() => onHandleCheck(RightType.REVALIDATION)}
                                        >
                                            {'Revalidation'}
                                        </Checkbox>
                                    </Space>
                                </Col>
                            </Row>
                        </Space>
                    </Card>

                    <Button loading={mutation.isLoading} type="primary" htmlType="submit">
                        Save
                    </Button>
                </Space>
            </form>
        </>
    )
}

UsersCreation.requireAuth = true

export default UsersCreation
