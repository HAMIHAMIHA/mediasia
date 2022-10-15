import styles from './SimpleForm.module.css'

import type { Props } from '../types'
import { FormFieldType } from '@prisma/client'
import { Fragment } from 'react'

const View = ({ section, formAction }: Props) => {
    if (!formAction) return <div />

    const { values, errors, handleChange, handleSubmit, loading, success } = formAction

    if (!!success) return <h3>Success</h3>

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div className={styles.form}>
                    <h3 className={styles.title}>{section?.form?.title}</h3>

                    {section?.form?.fields
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
                                                value={values?.[field.name!]}
                                                onChange={(e) => handleChange(field.name!, e.target.value)}
                                            />
                                            {errors?.[field.name!] && (
                                                <p className={styles.error}>{errors?.[field.name!]}</p>
                                            )}
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
                                                value={values?.[field.name!]}
                                                onChange={(e) => handleChange(field.name!, e.target.value)}
                                            />
                                            {errors?.[field.name!] && (
                                                <p className={styles.error}>{errors?.[field.name!]}</p>
                                            )}
                                        </Fragment>
                                    )
                                case FormFieldType.OPTION:
                                    return (
                                        <Fragment key={field.name!}>
                                            <label htmlFor={field.name!} className={styles.label}>
                                                {field.label}
                                            </label>
                                            <select
                                                id={field.name!}
                                                value={values?.[field.name!]}
                                                onChange={(e) => handleChange(field.name!, e.target.value)}
                                            >
                                                {!values?.[field.name!] && (
                                                    <option value={undefined}>&nbsp;</option>
                                                )}
                                                {options?.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors?.[field.name!] && (
                                                <p className={styles.error}>{errors?.[field.name!]}</p>
                                            )}
                                        </Fragment>
                                    )
                                case FormFieldType.RADIO:
                                case FormFieldType.CHECKBOX:
                                    return (
                                        <div key={field.name!} className={styles.check}>
                                            <p>{field.label}</p>
                                            {options?.map((opt, idx) => (
                                                <Fragment key={field.name! + opt.value}>
                                                    <input
                                                        type={
                                                            field.type === FormFieldType.CHECKBOX
                                                                ? 'checkbox'
                                                                : 'radio'
                                                        }
                                                        id={`${field.name!}${idx + 1}`}
                                                        name={field.name!}
                                                        value={opt.value}
                                                        checked={
                                                            field.type === FormFieldType.RADIO
                                                                ? values?.[field.name!] === opt.value
                                                                : (values?.[field.name!] || []).findIndex(
                                                                      (e: string) => e === opt.value
                                                                  ) !== -1
                                                        }
                                                        onChange={(e) => {
                                                            if (field.type === FormFieldType.RADIO) {
                                                                handleChange(field.name!, e.target.value)
                                                            } else {
                                                                const indexOf = (
                                                                    values?.[field.name!] || []
                                                                ).findIndex(
                                                                    (el: string) => el === e.target.value
                                                                )

                                                                if (indexOf === -1) {
                                                                    handleChange(field.name!, [
                                                                        ...(values?.[field.name!] || []),
                                                                        e.target.value,
                                                                    ])
                                                                } else {
                                                                    const newVals = [
                                                                        ...(values?.[field.name!] || []),
                                                                    ]
                                                                    newVals.splice(indexOf, 1)
                                                                    handleChange(field.name!, newVals)
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <label htmlFor={`${field.name!}${idx + 1}`}>
                                                        {opt.label}
                                                    </label>
                                                    {errors?.[field.name!] && (
                                                        <p className={styles.error}>
                                                            {errors?.[field.name!]}
                                                        </p>
                                                    )}
                                                </Fragment>
                                            ))}
                                        </div>
                                    )
                                case FormFieldType.TITLE:
                                    return <h3>{field.label}</h3>
                                case FormFieldType.BUTTON:
                                    return (
                                        <button
                                            key={idx}
                                            disabled={loading}
                                            className={styles.button}
                                            type="submit"
                                        >
                                            {field.label}
                                        </button>
                                    )
                            }
                        })}
                </div>
            </form>
        </section>
    )
}

export default View
