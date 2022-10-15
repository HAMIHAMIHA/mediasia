import { getFormDetails } from '@network/forms'
import { ContainerField } from '@prisma/client'
import { FullFormEdit, Theme } from '@types'
import get from 'lodash.get'
import { useQuery, UseQueryResult } from 'react-query'
import Blocks from '../../blocks'

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

    const Component = get(Blocks, block, () => null)

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
