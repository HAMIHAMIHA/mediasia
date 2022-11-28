import View from './View'
import Edit from './Edit'
import { Availability, Block } from '../types'

const MapBlock: Block = {
    name: 'Map block',
    availability: Availability.ALL,
    View,
    Edit,
}

export default MapBlock
