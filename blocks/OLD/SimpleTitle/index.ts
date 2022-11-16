import View from './View'
import Edit from './Edit'
import { Availability, Block } from '../types'

const Title: Block = {
    name: 'Simple Title',
    availability: Availability.ALL,
    View,
    Edit,
}

export default Title
