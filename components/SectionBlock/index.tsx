import Blocks from '../../blocks'
import get from 'lodash.get'
import { PageProps, PageSection } from '../../types'

interface Props {
    section: PageSection
    theme?: {}
    page?: PageProps
}

const SectionBlock = ({ section, theme, page }: Props) => {
    const block = section.element ? section.element.block : section.block
    const content = section.element ? section.element.content : section.content

    const Component = get(Blocks, block || '___', null)

    if (!Component) {
        return null
    }

    return <Component.View value={content} page={page} section={section} theme={theme} />
}

export default SectionBlock
