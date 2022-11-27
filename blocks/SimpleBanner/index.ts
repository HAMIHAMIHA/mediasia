import View from './View'
import Edit from './Edit'
import { Availability, Block } from '../types'

const SimpleBanner: Block = {
    name: 'Bannière simple',
    availability: Availability.ALL,
    View,
    Edit,
}

export default SimpleBanner
