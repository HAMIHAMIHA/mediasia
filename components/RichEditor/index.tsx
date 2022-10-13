// @ts-nocheck
import { Space, Button, Card } from 'antd'
import { useEffect, useRef, useState } from 'react'
import {
    BoldOutlined,
    CodeOutlined,
    ItalicOutlined,
    UnderlineOutlined,
    UnorderedListOutlined,
    OrderedListOutlined,
    HighlightOutlined,
} from '@ant-design/icons'
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertFromHTML, ContentState } from 'draft-js'

interface RichEditorProps {
    defaultValue: string | undefined
    onChange(e: string): void
    error?: boolean
}

const RichEditor = ({ defaultValue, onChange, error }: RichEditorProps) => {
    const ref = useRef<any>()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const focus = () => ref?.current?.editor?.focus()

    useEffect(() => {
        if (!!defaultValue) {
            const blocksFromHTML = convertFromHTML(defaultValue)
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            )
            handleOnChange(EditorState.createWithContent(state))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOnChange = (e: EditorState) => {
        setEditorState(e)
        onChange(ref?.current?.editor?.innerHTML)
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

    const toggleBlockType = (blockType: any) => {
        handleOnChange(RichUtils.toggleBlockType(editorState, blockType))
    }

    const toggleInlineStyle = (inlineStyle: any) => {
        handleOnChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
    }

    return (
        <Card
            bodyStyle={{ padding: 0 }}
            style={{
                resize: 'horizontal',
                minWidth: 480,
                maxWidth: 980,
                borderColor: error ? '#ff4d4f' : '#d9d9d9',
            }}
            title={
                <Space direction="vertical">
                    <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
                    <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
                </Space>
            }
        >
            <div style={{ padding: 24 }} onClick={focus}>
                <Editor
                    ref={ref}
                    // blockStyleFn={getBlockStyle}
                    // customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={handleOnChange}
                    spellCheck={true}
                />
            </div>
        </Card>
    )
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
}

// function getBlockStyle(block: any) {
//     switch (block.getType()) {
//         case 'blockquote':
//             return 'RichEditor-blockquote'
//         default:
//             return null
//     }
// }

interface StyledButtonProps {
    onToggle(e: string): void
    style: string
    label?: string
    icon?: JSX.Element
    active: boolean
}

const StyledButton = ({ onToggle, style, active, label, icon }: StyledButtonProps) => {
    const onMouseDown = (e: any) => {
        e.preventDefault()
        onToggle(style)
    }

    return (
        <Button icon={icon} size="small" type={active ? 'primary' : undefined} onMouseDown={onMouseDown}>
            {label}
        </Button>
    )
}

interface StylesType {
    label?: string
    style: string
    icon?: JSX.Element
}

const BLOCK_TYPES: StylesType[] = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    // { label: 'Blockquote', style: 'blockquote' },
    { icon: <UnorderedListOutlined />, style: 'unordered-list-item' },
    { icon: <OrderedListOutlined />, style: 'ordered-list-item' },
    { icon: <CodeOutlined />, style: 'code-block' },
]

interface StyleControlsProps {
    editorState: EditorState
    onToggle(e: string): void
}

const BlockStyleControls = ({ editorState, onToggle }: StyleControlsProps) => {
    const selection = editorState.getSelection()
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType()

    return (
        <Space>
            {BLOCK_TYPES.map((type) => (
                <StyledButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={onToggle}
                    icon={type.icon}
                    style={type.style}
                />
            ))}
        </Space>
    )
}

var INLINE_STYLES: StylesType[] = [
    { icon: <BoldOutlined />, style: 'BOLD' },
    { icon: <ItalicOutlined />, style: 'ITALIC' },
    { icon: <UnderlineOutlined />, style: 'UNDERLINE' },
    { icon: <HighlightOutlined />, style: 'CODE' },
]

const InlineStyleControls = (props: any) => {
    const currentStyle = props.editorState.getCurrentInlineStyle()

    return (
        <Space>
            {INLINE_STYLES.map((type) => (
                <StyledButton
                    key={type.style}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    icon={type.icon}
                    style={type.style}
                />
            ))}
        </Space>
    )
}

export default RichEditor
