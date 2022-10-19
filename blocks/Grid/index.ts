import View from './View'
import Edit from './Edit'
import { Availability, Block } from '../types'

const Title: Block = {
    name: 'Grid',
    availability: Availability.CONTAINER,
    View,
    Edit,
}

export default Title
