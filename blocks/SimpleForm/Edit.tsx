import styles from './SimpleForm.module.css'

import { Card, Typography } from 'antd'
import { Props } from '../types'
import { FormFieldType } from '@prisma/client'
import { Fragment } from 'react'

const { Title } = Typography

const NoFormMessage = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem 2rem 1rem 2rem',
        }}
    >
        <Title level={3}>Choose a form</Title>
    </div>
)

const Edit = ({ form }: Props) => {
    if (!form) return <NoFormMessage />

    return (
        <EditPanel
            view={
                <section>
                    <div className={styles.form}>
                        <h3 className={styles.title}>{form?.title}</h3>

                        {form?.fields
                            ?.sort((a, b) => a.position - b.position)
                            .map((field, idx) => {
                                const options =
                                    (field?.options as {
                                        label: string
                                        value: string
                                    }[]) || []

                                switch (field.type) {
                                    case FormFieldType.TEXT:
                                    case FormFieldType.NUMBER:
                                    case FormFieldType.PASSWORD:
                                    case FormFieldType.EMAIL:
                                        return (
                                            <Fragment key={field.name!}>
                                                <label htmlFor={field.name!} className={styles.label}>
                                                    {field.label}
                                                </label>
                                                <input
                                                    type={
                                                        field.type === FormFieldType.NUMBER
                                                            ? 'number'
                                                            : field.type === FormFieldType.PASSWORD
                                                            ? 'password'
                                                            : field.type === FormFieldType.EMAIL
                                                            ? 'email'
                                                            : 'text'
                                                    }
                                                    id={field.name!}
                                                    name={field.name!}
                                                    className={styles.input}
                                                />
                                            </Fragment>
                                        )
                                    case FormFieldType.PARAGRAPH:
                                        return (
                                            <Fragment key={field.name!}>
                                                <label htmlFor={field.name!} className={styles.label}>
                                                    {field.label}
                                                </label>
                                                <textarea
                                                    id={field.name!}
                                                    className={styles.input}
                                                    name={field.name!}
                                                />
                                            </Fragment>
                                        )
                                    case FormFieldType.OPTION:
                                        return (
                                            <Fragment key={field.name!}>
                                                <label htmlFor={field.name!} className={styles.label}>
                                                    {field.label}
                                                </label>
                                                <select id={field.name!}>
                                                    {options?.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Fragment>
                                        )
                                    case FormFieldType.RADIO:
                                    case FormFieldType.CHECKBOX:
                                        return (
                                            <div key={field.name!} className={styles.check}>
                                                <p>{field.label}</p>
                                                {options?.map((opt, idx) => (
                                                    <Fragment key={field.name!}>
                                                        <input
                                                            type={
                                                                field.type === FormFieldType.CHECKBOX
                                                                    ? 'checkbox'
                                                                    : 'radio'
                                                            }
                                                            id={`${field.name!}${idx + 1}`}
                                                            name={field.name!}
                                                            value={opt.value}
                                                        />
                                                        <label htmlFor={`${field.name!}${idx + 1}`}>
                                                            {opt.label}
                                                        </label>
                                                    </Fragment>
                                                ))}
                                            </div>
                                        )
                                    case FormFieldType.TITLE:
                                        return <h3 key={idx}>{field.label}</h3>
                                    case FormFieldType.BUTTON:
                                        return (
                                            <button key={idx} className={styles.button} type="submit">
                                                {field.label}
                                            </button>
                                        )
                                }
                            })}
                    </div>
                </section>
            }
        />
    )
}

interface PanelProps {
    view: JSX.Element
    panel?: JSX.Element
}

const EditPanel = ({ view, panel }: PanelProps) => (
    <div style={{ display: 'flex' }}>
        <div style={{ flex: 5 }}>{view}</div>
        {!!panel && (
            <Card title="Settings Panel" style={{ flex: 1, marginTop: 1 }} bordered={false}>
                {panel}
            </Card>
        )}
    </div>
)

export default Edit
