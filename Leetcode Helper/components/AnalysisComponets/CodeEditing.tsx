import { useEffect, useRef } from "react"
import { Card } from "../ui/Card"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  disabled?: boolean
}

export function CodeEditor({ value, onChange, language = "java", disabled = false }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  return (
    <Card className="relative border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-8 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-3">
        <span className="text-xs text-slate-500 dark:text-slate-400">{language}</span>
      </div>
      <div className="pt-8">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full min-h-[150px] p-3 font-mono text-sm bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 resize-none focus:outline-none"
          spellCheck="false"
        />
      </div>
    </Card>
  )
}

