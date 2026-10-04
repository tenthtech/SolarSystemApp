import { forwardRef, type SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  hint?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { id, label, hint, error, className = '', children, ...props },
  ref,
) {
  const selectId = id ?? props.name
  const helpId = selectId ? `${selectId}-help` : undefined

  return (
    <label className="block w-full" htmlFor={selectId}>
      {label && <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>}
      <span className="relative block">
        <select
          ref={ref}
          id={selectId}
          aria-describedby={hint || error ? helpId : undefined}
          aria-invalid={Boolean(error)}
          className={`min-h-11 w-full appearance-none rounded-xl border bg-white px-3 pr-10 text-base text-ink outline-none transition focus:border-blue focus:ring-3 focus:ring-blue/10 disabled:bg-canvas disabled:text-subtle ${error ? 'border-red-400' : 'border-line'} ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
      </span>
      {(hint || error) && <span id={helpId} className={`mt-1.5 block text-sm ${error ? 'text-red-600' : 'text-muted'}`}>{error ?? hint}</span>}
    </label>
  )
})
