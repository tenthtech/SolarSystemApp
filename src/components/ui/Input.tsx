import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  leadingIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, hint, error, leadingIcon, className = '', ...props },
  ref,
) {
  const inputId = id ?? props.name
  const helpId = inputId ? `${inputId}-help` : undefined

  return (
    <label className="block w-full" htmlFor={inputId}>
      {label && <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>}
      <span className="relative block">
        {leadingIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-subtle" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-describedby={hint || error ? helpId : undefined}
          aria-invalid={Boolean(error)}
          className={`min-h-11 w-full rounded-xl border bg-white px-3 text-base text-ink outline-none transition placeholder:text-subtle focus:border-blue focus:ring-3 focus:ring-blue/10 disabled:bg-canvas disabled:text-subtle ${
            leadingIcon ? 'pl-10' : ''
          } ${error ? 'border-red-400' : 'border-line'} ${className}`}
          {...props}
        />
      </span>
      {(hint || error) && (
        <span id={helpId} className={`mt-1.5 block text-sm ${error ? 'text-red-600' : 'text-muted'}`}>
          {error ?? hint}
        </span>
      )}
    </label>
  )
})
