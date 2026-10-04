import { forwardRef, type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { id, label, hint, error, className = '', ...props },
  ref,
) {
  const textareaId = id ?? props.name
  const helpId = textareaId ? `${textareaId}-help` : undefined

  return (
    <label className="block w-full" htmlFor={textareaId}>
      {label && <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>}
      <textarea
        ref={ref}
        id={textareaId}
        aria-describedby={hint || error ? helpId : undefined}
        aria-invalid={Boolean(error)}
        className={`min-h-28 w-full resize-y rounded-xl border bg-white px-3 py-3 text-base text-ink outline-none transition placeholder:text-subtle focus:border-blue focus:ring-3 focus:ring-blue/10 disabled:bg-canvas disabled:text-subtle ${error ? 'border-red-400' : 'border-line'} ${className}`}
        {...props}
      />
      {(hint || error) && <span id={helpId} className={`mt-1.5 block text-sm ${error ? 'text-red-600' : 'text-muted'}`}>{error ?? hint}</span>}
    </label>
  )
})
