import { ContainerField } from '@prisma/client'
import { FullFormEdit, FullSection, PageProps } from '../types'

export interface Block {
    name: string
    preview?: string
    type?: 'container' | 'content'
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
    section?: FullSection
    page?: PageProps
    fields?: ContainerField[]
    form?: FullFormEdit | undefined
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
