// @ts-nocheck
import { useRef, useState, useEffect } from 'react'
import {
    Editor,
    EditorState,
    RichUtils,
    getDefaultKeyBinding,
    convertFromHTML,
    ContentState,
    convertToRaw,
} from 'draft-js'
import { convertToHTML } from 'draft-convert'

import styles from './StyledInput.module.css'

interface Props<T> {
    value: T
    onChange: (value: T) => void
    className?: string
    style?: React.CSSProperties
}

const StyledInput = ({ value, onChange, className, style }: Props<string>) => (
    <input
        className={`${className || ''} ${styles.input}`}
        style={{ width: '100%', ...style }}
        placeholder="Lorem ipsum"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
    />
)

const A = ({ value, onChange, className, style }: Props<string>) => (
    <span className={className} style={{ width: '100%', ...style }}>
        <input
            placeholder="Lorem ipsum"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
            type="text"
        />
    </span>
)

const Span = ({ value, onChange, className, style }: Props<string>) => (
    <span className={className} style={{ width: '100%', ...style }}>
        <textarea
            placeholder="Lorem ipsum dolor sit amet."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
            // type="text"
        />
    </span>
)

const P = ({ value, onChange, className, style }: Props<string>) => {
    const nbOfLines = value?.split('\n').length || 1

    return (
        <p
            className={className}
            style={{
                ...style,
                width: '100%',
                overflow: 'auto',
            }}
        >
            <textarea
                style={{
                    height: `${nbOfLines * 1.6}em`,
                }}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={styles.input}
                // type="text"
            />
        </p>
    )
}

const Li = ({ value, onChange, className, style }: Props<string>) => (
    <li className={className} style={{ width: '100%', ...style }}>
        <input
            placeholder="Lorem ipsum dolor sit amet"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
            type="text"
        />
    </li>
)

const H1 = ({ value, onChange, className, style }: Props<string>) => (
    <h1 className={className} style={{ width: '100%', ...style }}>
        <input
            placeholder="Lorem ipsum dolor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
            type="text"
        />
    </h1>
)

const H2 = ({ value, onChange, className, style }: Props<string>) => (
    <h2 className={className} style={{ width: '100%', ...style }}>
        <input
            placeholder="Lorem ipsum dolor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
            type="text"
        />
    </h2>
)

const H3 = ({ value, onChange, className, style }: Props<string>) => (
    <h3 className={className} style={{ width: '100%', ...style }}>
        <input
            placeholder="Lorem ipsum dolor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
            type="text"
        />
    </h3>
)

const H4 = ({ value, onChange, className, style }: Props<string>) => (
    <h4 className={className} style={{ width: '100%', ...style }}>
        <input
            placeholder="Lorem ipsum dolor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
            type="text"
        />
    </h4>
)

const Button = ({ value, onChange, className, style }: Props<string>) => (
    <button className={className} onClick={(e) => e.preventDefault()} style={{ width: '100%', ...style }}>
        <input
            placeholder="Lorem ipsum"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
            type="text"
        />
    </button>
)

const Text = ({ value, onChange, className, style }: Props<string>) => {
    const ref = useRef<any>()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const handleOnChange = (e: EditorState) => {
        setEditorState(e)

        const html = convertToHTML(e.getCurrentContent()).replace('<p>', '').replace('</p>', '')
        onChange(html)
    }

    useEffect(() => {
        if (!!value) {
            const blocksFromHTML = convertFromHTML(value)
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            )
            handleOnChange(EditorState.createWithContent(state))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleKeyCommand = (command: string, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            handleOnChange(newState)
            return true
        }
        return false
    }

    const mapKeyToEditorCommand = (e: any) => {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */)
            if (newEditorState !== editorState) {
                handleOnChange(newEditorState)
            }
            return
        }
        return getDefaultKeyBinding(e)
    }

    return (
        <div
            className={`${styles.draft || ''} ${className}`}
            onClick={(e) => e.preventDefault()}
            style={{ width: '100%', ...style }}
        >
            <Editor
                placeholder="Lorem ipsum"
                ref={ref}
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={mapKeyToEditorCommand}
                onChange={handleOnChange}
                spellCheck={true}
            />
        </div>
    )
}

StyledInput.div = Text
StyledInput.span = Text
StyledInput.p = P
StyledInput.li = Li
StyledInput.h1 = H1
StyledInput.h2 = H2
StyledInput.h3 = H3
StyledInput.h4 = H4
StyledInput.button = Button
StyledInput.a = A

StyledInput.Text = Text

export default StyledInput
