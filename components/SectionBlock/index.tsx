import Blocks from '../../blocks'
import get from 'lodash.get'
import { PageProps, PageSection } from '../../types'
import { useFormik } from 'formik'
import { FormFieldType } from '@prisma/client'
import { useMutation } from 'react-query'
import { sendMessage } from '@network/messages'
import set from 'lodash.set'

interface Props {
    section: PageSection
    theme?: {}
    page?: PageProps
}

const getInitialValue = (fields: any[] | undefined) => {
    if (!fields) return {}
    let defaults = {}

    for (const field of fields) {
        if (!!field.defaultMultiple) {
            set(defaults, field.name, field.defaultMultiple)
        } else if (typeof field.defaultNumber === 'number') {
            set(defaults, field.name, field.defaultNumber)
        } else if (!!field.defaultText) {
            set(defaults, field.name, field.defaultText)
        }
    }

    return defaults
}

const SectionBlock = ({ section, theme, page }: Props) => {
    const { values, errors, handleChange, handleSubmit, setValues } = useFormik({
        initialValues: getInitialValue(section?.form?.fields),
        validate: () => {
            let errors: any = {}

            section?.form?.fields?.forEach((field) => {
                if (field.type !== FormFieldType.BUTTON && field.type !== FormFieldType.TITLE) {
                    const fieldValue = get(values, field.name!, undefined)

                    if (field.required && !fieldValue && isNaN(fieldValue)) {
                        errors[field.name!] = 'Required'
                    } else if (field.type === FormFieldType.NUMBER && !isNaN(fieldValue)) {
                        if (
                            !isNaN(parseFloat(`${field.min}`)) &&
                            parseFloat(fieldValue) < parseFloat(`${field.min}`)
                        ) {
                            errors[field.name!] = 'Too low'
                        } else if (
                            !isNaN(parseFloat(`${field.max}`)) &&
                            parseFloat(fieldValue) > parseFloat(`${field.max}`)
                        ) {
                            errors[field.name!] = 'Too high'
                        }
                    }
                }
            })

            return errors
        },
        onSubmit: async (values) => {
            mutation.mutate({
                pid: section?.form!.id as string,
                values,
            })
        },
    })

    const mutation = useMutation((data: { pid: string; values: any }) => sendMessage(data.pid, data.values), {
        onSuccess: (data: any) => setValues({}),
    })

    const block = section.element ? section.element.block : section.block
    const content = section.element ? section.element.content : section.content

    const Component = get(Blocks, block || '___', null)

    if (!Component) {
        return null
    }

    const onHandleChange = (name: string, value: any) => {
        handleChange({
            target: {
                name,
                value,
            },
        })
    }

    return (
        <Component.View
            value={content}
            page={page}
            section={section}
            theme={theme}
            formAction={
                section.form
                    ? {
                          values,
                          errors,
                          handleChange: onHandleChange,
                          handleSubmit,
                          loading: mutation.isLoading,
                          success: mutation.isSuccess,
                      }
                    : undefined
            }
        />
    )
}

export default SectionBlock
