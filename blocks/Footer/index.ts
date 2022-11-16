import View from './View'
import Edit from './Edit'
import { Availability, Block } from '../types'

const Title: Block = {
    name: 'Footer',
    availability: Availability.CONTAINER_CONTENT,
    View,
    Edit,
}

export default Title
