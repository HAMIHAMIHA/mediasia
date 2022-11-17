// @ts-nocheck
import { useRef, useState } from 'react'
import {
    Editor,
    EditorState,
    RichUtils,
    getDefaultKeyBinding,
    convertFromHTML,
    ContentState,
    convertToRaw,
} from 'draft-js'

import styles from './StyledInput.module.css'

interface Props<T> {
    value: T
    onChange: (value: T) => void
    className?: string
    style?: React.CSSProperties
}

const StyledInput = ({ value, onChange, className, style }: Props<string>) => (
    <div className={className} style={{ ...style, width: '100%' }}>
        <textarea
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
            // type="text"
        />
    </div>
)

const A = ({ value, onChange, className, style }: Props<string>) => (
    <span className={className} style={{ ...style, width: '100%' }}>
        <input
            placeholder="Lorem ipsum dolor sit amet"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
            type="text"
        />
    </span>
)

const Span = ({ value, onChange, className, style }: Props<string>) => (
    <span className={className} style={{ ...style, width: '100%' }}>
        <textarea
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
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
    <li className={className} style={{ ...style, width: '100%' }}>
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
    <h1 className={className} style={{ ...style, width: '100%' }}>
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
    <h2 className={className} style={{ ...style, width: '100%' }}>
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
    <h3 className={className} style={{ ...style, width: '100%' }}>
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
    <h4 className={className} style={{ ...style, width: '100%' }}>
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
    <button className={className} onClick={(e) => e.preventDefault()} style={{ ...style, width: '100%' }}>
        <input
            placeholder="Lorem ipsum"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
            type="text"
        />
    </button>
)

const Test = ({ value, onChange, className, style }: Props<string>) => {
    const ref = useRef<any>()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const handleOnChange = (e: EditorState) => {
        setEditorState(e)
        // console.log(e)
        console.log('ref:', ref?.current)
        console.log('state: ', convertToRaw(editorState.getCurrentContent()).blocks)
    }

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
        <div className={className} onClick={(e) => e.preventDefault()} style={{ ...style, width: '100%' }}>
            <Editor
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

StyledInput.div = StyledInput
StyledInput.span = Span
StyledInput.p = P
StyledInput.li = Li
StyledInput.h1 = H1
StyledInput.h2 = H2
StyledInput.h3 = H3
StyledInput.h4 = H4
StyledInput.button = Button
StyledInput.a = A
StyledInput.Test = Test

export default StyledInput
