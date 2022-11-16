import View from './View'
import Edit from './Edit'
import type { Block } from '../types'
import { Availability } from '../types'

const Title: Block = {
    name: 'Simple Form',
    availability: Availability.ALL,
    needForm: true,
    View,
    Edit,
}

export default Title
