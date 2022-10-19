import { getElementDetails } from '../../network/elements'
import { useQuery, UseQueryResult } from 'react-query'
import Blocks from '../../blocks'
import { Typography } from 'antd'
import get from 'lodash.get'
import { FullElementEdit, FullFormEdit } from '@types'
import { getFormDetails } from '@network/forms'

const { Text } = Typography

const DisplayElementView = ({ id }: { id: string }) => {
    const element: UseQueryResult<FullElementEdit, Error> = useQuery<FullElementEdit, Error>(
        ['elements', { id }],
        () => getElementDetails(id)
    )

    const form: UseQueryResult<FullFormEdit, Error> = useQuery<FullFormEdit, Error>(
        ['forms', { id: element?.data?.formId }],
        () => getFormDetails(element?.data?.formId!),
        {
            enabled: !!element?.data?.formId,
        }
    )

    if (element.isLoading || form.isLoading) {
        return <Text>Loading...</Text>
    }

    if (element.isError || element.data === undefined) {
        return <Text>Error</Text>
    }

    const Component = get(Blocks, element.data.block, () => null)

    return (
        <Component.View
            value={element.data.content}
            form={form.data}
            formAction={{
                values: {},
                errors: {},
                handleChange: () => {},
                handleSubmit: () => {},
                loading: false,
                success: false,
            }}
        />
    )
}

export default DisplayElementView
