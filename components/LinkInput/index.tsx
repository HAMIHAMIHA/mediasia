import { Dropdown, Input, Menu, Typography } from 'antd'
import { useQuery, UseQueryResult } from 'react-query'
import { useMemo } from 'react'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

import { getSlugs } from '../../network/api'

const { Text } = Typography

interface Props {
    value: string
    width?: number | `${string}%`
    onChange: (value: string) => void
    size?: SizeType
    onBlur?: () => void
    onPressEnter?: () => void
    placeholder?: string
    status?: '' | 'error' | 'warning' | undefined
}

// const LinkInput = ({ value, onChange, width = 300, status, ...rest }: Props) => {
//     const slugs: UseQueryResult<Slug[], Error> = useQuery<Slug[], Error>(['slugs'], () => getSlugs(), {
//         refetchOnMount: false,
//     })

//     const options = useMemo(() => {
//         const pagesOptions =
//             slugs?.data?.map((slug: any) => ({
//                 value: `/${slug.full}`,
//                 searchLabel: slug?.content?.title || slug?.container?.title,
//                 label: (
//                     <>
//                         <Text>{slug?.content?.title || slug?.container?.title}</Text>
//                         <Text type="secondary">{` (/${slug.full})`}</Text>
//                     </>
//                 ),
//             })) || []

//         return [...pagesOptions]
//     }, [slugs])

//     return (
//         <AutoComplete
//             {...rest}
//             value={value}
//             options={options}
//             style={{ width }}
//             onSelect={(value: string) => onChange(value)}
//             onChange={onChange}
//             status={status}
//             allowClear
//             // filterOption={(inputValue, option) =>
//             //     option!.searchLabel.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
//             // }
//         />
//     )
// }

type NewSlug = {
    container: {
        title: string
    } | null
    full: string
    childs: {
        content: {
            title: string
        } | null
        full: string
    }[]
}

const LinkInput = ({ value, onChange, width = 300, status, ...rest }: Props) => {
    const slugs: UseQueryResult<NewSlug[], Error> = useQuery<NewSlug[], Error>(['slugs'], () => getSlugs(), {
        refetchOnMount: false,
    })

    const options = useMemo(() => {
        const newS =
            slugs?.data?.map((slug) => ({
                label: (
                    <Text onClick={() => onChange(`/${slug.full}`)}>
                        {slug?.container?.title}
                        <Text type="secondary">{` (/${slug.full})`}</Text>
                    </Text>
                ),
                key: slug.full || '/',
                children: slug.childs
                    ? slug.childs.map((child) => ({
                          label: (
                              <Text onClick={() => onChange(`/${child.full}`)}>
                                  {child?.content?.title}
                                  <Text type="secondary">{` (/${child.full})`}</Text>
                              </Text>
                          ),
                          key: child.full || '/',
                      }))
                    : undefined,
            })) || []

        return newS
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slugs?.data])

    return (
        <Dropdown overlay={<Menu items={options} />}>
            <Input
                {...rest}
                style={{ width: 280 }}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                allowClear
                status={status}
            />
        </Dropdown>
    )
}

export default LinkInput
