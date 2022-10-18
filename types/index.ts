import type {
    User,
    Login,
    Metadata,
    Section,
    Element,
    Role,
    FormField,
    Form,
    Message,
    Media,
    ContainerField,
    Container,
    Content,
    Slug,
    ContentField,
    ContainerFieldType,
    FormFieldType,
} from '@prisma/client'
import { Prisma } from '@prisma/client'

export interface ContextUser {
    email: string
    id: string
    name: string
    role: string
    updatedAt: Date
}

export type FullUser = User & {
    login: Login & {
        role: Role
    }
}

export type UserCreation = Prisma.UserCreateInput & {
    email?: string
    type?: string
    password?: string
}

export interface FormFieldCreateInput extends Omit<Prisma.FormFieldCreateInput, 'form'> {}

export type FullFormEdit = Prisma.FormCreateInput & {
    fields?: FormFieldCreateInput[] | null
}

export type FullSection = Section & {
    element: Element | null
    form: FullForm | null
    tempId?: string
}

export type FullSectionEdit = Prisma.SectionCreateInput & {
    elementId?: string
    formId?: string
    tempId?: string
}

export type FullMessage = Message & {
    form: FullForm | null
}

export type FullForm = Form & {
    fields: FormField[] | null
}

// export type FullPageEdit = Prisma.PageCreateInput & {
//     metadatas?: Metadata[] | null
//     sections?: FullSection[] | null
//     accesses?: string[] | null
//     headerId?: string | undefined
//     footerId?: string | undefined

//     slugEdit?: (string | undefined)[]
// }

export type FullContainerEdit = Prisma.ContainerCreateInput & {
    fields?: ContainerField[] | null
    metadatas?: Metadata[] | null
    contentMetadatas?: Metadata[] | null
    sections?: FullSection[] | null
    contentSections?: FullSection[] | null
    slug?: Slug | null

    accesses?: string[] | null

    slugEdit?: (string | undefined)[]

    containerTabError?: boolean
    contentTabError?: boolean
}

export type FullContent = Content & {
    container: Container | null
    fields?: ContentField | null
}

export type FullContentField = ContentField & {
    media: Media | null
}

export type AuthResponse = {
    token: string
    expiresAt: Date
    // user: User & {
    //     role: string
    //     email: string
    // }
}

export type Theme = {
    background: string
    primary: string
    secondary: string
}

export type PageSection = {
    form: {
        id: string
        fields: {
            id: string
            type: FormFieldType
            position: number
            name: string | null
            label: string
            placeholder: string | null
            required: boolean | null

            options: { label: string; value: string }[] | Prisma.JsonValue
            min: number | null
            max: number | null
            defaultText: string | null
            defaultNumber: number | null
            defaultMultiple: string[] | Prisma.JsonValue
        }[]
    } | null
    content: any
    id: string
    block: string | null
    position: number
    element: {
        content: {} | Prisma.JsonValue
        id: string
        block: string
    } | null
}

export type ContentFields = {
    id: string
    name: string
    type: ContainerFieldType
    multiple: boolean

    dateValue: number | null
    textValue: string | null
    numberValue: number | null
    boolValue: boolean | null
    contentValue: {
        id: string
        title: string
        slug: {
            id: string
            full: string
        } | null
    } | null
    media: {
        id: string
        uri: string
        alt: string | null
        name: string
        mimeType: string
    } | null

    childs: {
        id: string
        name: string
        type: ContainerFieldType
        multiple: boolean

        dateValue: number | null
        textValue: string | null
        numberValue: number | null
        boolValue: boolean | null
        contentValue: {
            id: string
            title: string
            slug: {
                id: string
                full: string
            } | null
        } | null
        media: {
            id: string
            uri: string
            alt: string | null
            name: string
            mimeType: string
        } | null
    }[]
}

export type ContainerPageContents = {
    fields: ContentFields[]
    id: string
    title: string
    slug: {
        id: string
        full: string
    } | null
}

export type PageProps = {
    id: string | undefined
    appName: string | undefined
    metadatas: any[]
    theme: {
        background: string | null
        primary: string | null
        secondary: string | null
    }
    title: string | undefined
    type: string
    fields: ContentFields[]
    contents: ContainerPageContents[]
    headerSections: PageSection[]
    topSections: PageSection[]
    sections: PageSection[]
    bottomSections: PageSection[]
    footerSections: PageSection[]
    linkedContents: any | null
    container: {
        id: string
        title: string
        slug: {
            id: string
            full: string
        } | null
    } | null
    updatedAt: number | null
}

export type LayoutProps = {
    header: (Section & {
        form: Form | null
    })[]
    topBody: (Section & {
        form: Form | null
    })[]
    bottomBody: (Section & {
        form: Form | null
    })[]
    footer: (Section & {
        form: Form | null
    })[]
}

export type FileType = 'IMAGE' | 'VIDEO' | 'FILE'

// export type AuthResponse = {
//     title: string,
//     // detail: 'Successfully validated login credentials',
//     // token: session.token,
//     // expiresAt: session.expiresAt,
//     // // type: login.type,
//     // user: { ...login.user, type: login.type },
// }

// title: 'Login Successful',
// detail: 'Successfully validated login credentials',
// token: session.token,
// expiresAt: session.expiresAt,
// user: { ...login.user, type: login.type },
