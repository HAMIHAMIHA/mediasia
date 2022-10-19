import { ContainerField } from '@prisma/client'
import { PageForm, PageProps } from '../types'

export interface Block {
    name: string
    preview?: string
    availability: AvailabilityType
    needForm?: boolean
    View: (props: Props) => JSX.Element
    Edit: (props: Props) => JSX.Element
}

export interface Props {
    value: any
    onChange?(value?: any): void
    theme?: {
        background: string
        primary: string
        secondary: string
    }
    // section?: FullSection
    page?: PageProps
    fields?: ContainerField[]
    form?: PageForm | undefined
    formAction?:
        | {
              values: any
              errors: any
              handleChange(name: string, value: any): void
              handleSubmit(): void
              loading: boolean
              success: boolean
          }
        | undefined
}

export type AvailabilityType = 'ALL' | 'CONTAINER' | 'CONTAINER_CONTENT' | 'CONTENT'

export const Availability: {
    ALL: 'ALL' // Everywhere
    CONTAINER: 'CONTAINER' // Container page
    CONTAINER_CONTENT: 'CONTAINER_CONTENT' // Content template in container
    CONTENT: 'CONTENT'
} = {
    ALL: 'ALL', // Everywhere
    CONTAINER: 'CONTAINER', // Container page
    CONTAINER_CONTENT: 'CONTAINER_CONTENT', // Content template in container
    CONTENT: 'CONTENT', // Content page
}
