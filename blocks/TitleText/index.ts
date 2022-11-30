import View from './View'
import Edit from './Edit'
import { Availability, Block } from '../types'

const TitleText: Block = {
    name: 'Title + text',
    availability: Availability.ALL,
    View,
    Edit,
}

export default TitleText
