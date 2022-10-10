import { ContainerFieldType } from '@prisma/client'

const getNameFieldFromType = (type: string) => {
    let valueName = 'textValue'

    switch (type) {
        case ContainerFieldType.STRING:
        case ContainerFieldType.PARAGRAPH:
        case ContainerFieldType.LINK:
        case ContainerFieldType.OPTION:
            valueName = 'textValue'
            break
        case ContainerFieldType.NUMBER:
            valueName = 'numberValue'
            break
        case ContainerFieldType.BOOLEAN:
            valueName = 'boolValue'
            break
        case ContainerFieldType.DATE:
            valueName = 'dateValue'
            break
        case ContainerFieldType.IMAGE:
        case ContainerFieldType.FILE:
        case ContainerFieldType.VIDEO:
            valueName = 'media'
            break
        case ContainerFieldType.CONTENT:
            valueName = 'contentValueId'
            break
    }

    return valueName
}

export default getNameFieldFromType
