import View from './View'
import Edit from './Edit'
import { Availability, Block } from '../types'

const LogoList: Block = {
    name: 'Logo list',
    availability: Availability.ALL,
    View,
    Edit,
}

export default LogoList
