"use client"

import { useState, useEffect } from "react"

const RichTextEditor = ({ initialValue = "", onChange }) => {
  const [editorContent, setEditorContent] = useState(initialValue)

  useEffect(() => {
    // Initialize the editor with the initial value
    setEditorContent(initialValue)
  }, [initialValue])

  const handleChange = (e) => {
    const content = e.target.value
    setEditorContent(content)
    onChange(content)
  }

  // Function to handle paste events to preserve formatting
  const handlePaste = (e) => {
    e.preventDefault()

    // Get pasted content as HTML
    const clipboardData = e.clipboardData || window.clipboardData
    const pastedData = clipboardData.getData("text/html") || clipboardData.getData("text")

    // Insert at cursor position or replace selection
    document.execCommand("insertHTML", false, pastedData)
  }

  return (
    <div className="rich-text-editor">
      <div className="editor-toolbar border-b p-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => document.execCommand("bold")}
          className="p-1 hover:bg-gray-100 rounded"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => document.execCommand("italic")}
          className="p-1 hover:bg-gray-100 rounded"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => document.execCommand("underline")}
          className="p-1 hover:bg-gray-100 rounded"
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          type="button"
          onClick={() => document.execCommand("formatBlock", false, "<h1>")}
          className="p-1 hover:bg-gray-100 rounded"
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => document.execCommand("formatBlock", false, "<h2>")}
          className="p-1 hover:bg-gray-100 rounded"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => document.execCommand("formatBlock", false, "<h3>")}
          className="p-1 hover:bg-gray-100 rounded"
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => document.execCommand("insertUnorderedList")}
          className="p-1 hover:bg-gray-100 rounded"
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => document.execCommand("insertOrderedList")}
          className="p-1 hover:bg-gray-100 rounded"
          title="Numbered List"
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => document.execCommand("formatBlock", false, "<blockquote>")}
          className="p-1 hover:bg-gray-100 rounded"
          title="Quote"
        >
          "Quote"
        </button>
        <button
          type="button"
          onClick={() => document.execCommand("formatBlock", false, "<pre>")}
          className="p-1 hover:bg-gray-100 rounded"
          title="Code Block"
        >
          Code
        </button>
      </div>

      <div
        className="editor-content p-4 min-h-[300px] prose prose-lg max-w-none"
        contentEditable
        dangerouslySetInnerHTML={{ __html: editorContent }}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        onPaste={handlePaste}
        style={{ outline: "none" }}
      />

      <textarea className="hidden" value={editorContent} onChange={handleChange} name="notesText" />
    </div>
  )
}

export default RichTextEditor
