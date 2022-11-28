import View from './View'
import Edit from './Edit'
import { Availability, Block } from '../types'

const TexteSlider: Block = {
    name: 'Texte + slider',
    availability: Availability.ALL,
    View,
    Edit,
}

export default TexteSlider
