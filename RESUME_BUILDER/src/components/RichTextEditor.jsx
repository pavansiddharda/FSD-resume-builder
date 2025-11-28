import { useRef, useEffect } from 'react'
import { FaBold, FaItalic, FaUnderline, FaHeading, FaListUl, FaListOl, FaUndo, FaRedo, FaParagraph } from 'react-icons/fa'

const RichTextEditor = ({ value, onChange, placeholder = 'Enter text...' }) => {
  const editorRef = useRef(null)
  const toolbarRef = useRef(null)

  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || ''
      }
    }
  }, [value])

  const handleInput = () => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const formatHeading = (level) => {
    execCommand('formatBlock', `h${level}`)
  }

  const formatList = (type) => {
    execCommand(type === 'ul' ? 'insertUnorderedList' : 'insertOrderedList')
  }

  const handleKeyDown = (e) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault()
          execCommand('bold')
          break
        case 'i':
          e.preventDefault()
          execCommand('italic')
          break
        case 'u':
          e.preventDefault()
          execCommand('underline')
          break
        case 'z':
          if (!e.shiftKey) {
            e.preventDefault()
            execCommand('undo')
          }
          break
        case 'y':
        case 'Z':
          if (e.shiftKey) {
            e.preventDefault()
            execCommand('redo')
          }
          break
        default:
          break
      }
    }
  }

  return (
    <div className="border-2 border-gray-300 rounded-xl overflow-hidden focus-within:border-primary-500 transition-colors">
      {/* Toolbar */}
      <div 
        ref={toolbarRef}
        className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap items-center gap-2"
        onClick={(e) => e.preventDefault()}
      >
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bold (Ctrl+B)"
        >
          <FaBold />
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Italic (Ctrl+I)"
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Underline (Ctrl+U)"
        >
          <FaUnderline />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => formatHeading(1)}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Heading 1"
        >
          <FaHeading className="text-xs" /> <span className="text-xs ml-1">1</span>
        </button>
        <button
          type="button"
          onClick={() => formatHeading(2)}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Heading 2"
        >
          <FaHeading className="text-xs" /> <span className="text-xs ml-1">2</span>
        </button>
        <button
          type="button"
          onClick={() => formatHeading(3)}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Heading 3"
        >
          <FaHeading className="text-xs" /> <span className="text-xs ml-1">3</span>
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', 'p')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Normal Text"
        >
          <FaParagraph className="text-xs" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => formatList('ul')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bullet List"
        >
          <FaListUl />
        </button>
        <button
          type="button"
          onClick={() => formatList('ol')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Numbered List"
        >
          <FaListOl />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => execCommand('undo')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Undo (Ctrl+Z)"
        >
          <FaUndo />
        </button>
        <button
          type="button"
          onClick={() => execCommand('redo')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Redo (Ctrl+Y)"
        >
          <FaRedo />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={(e) => {
          e.preventDefault()
          const text = e.clipboardData.getData('text/plain')
          document.execCommand('insertText', false, text)
        }}
        className="min-h-[120px] p-4 focus:outline-none bg-white custom-scrollbar"
        style={{
          fontFamily: 'inherit',
          fontSize: '14px',
          lineHeight: '1.5'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
    </div>
  )
}

export default RichTextEditor

