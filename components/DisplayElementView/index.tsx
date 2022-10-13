import { getElementDetails } from '../../network/elements'
import { useQuery, UseQueryResult } from 'react-query'
import Blocks from '../../blocks'
import { Typography } from 'antd'
import get from 'lodash.get'
import type { Prisma } from '@prisma/client'

const { Text } = Typography

const DisplayElementView = ({ id }: { id: string }) => {
    const element: UseQueryResult<Prisma.ElementCreateInput, Error> = useQuery<
        Prisma.ElementCreateInput,
        Error
    >(['elements', { id }], () => getElementDetails(id))

    if (element.isLoading) {
        return <Text>Loading...</Text>
    }

    if (element.isError || element.data === undefined) {
        return <Text>Error</Text>
    }

    const Component = get(Blocks, element.data.block, () => null)

    return <Component.View value={element.data.content} />
}

export default DisplayElementView
