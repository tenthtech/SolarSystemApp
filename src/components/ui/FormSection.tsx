import type { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  description?: string
  children: ReactNode
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <section className="grid gap-5 border-b border-line px-5 py-6 last:border-b-0 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8">
      <div>
        <h2 className="text-base font-bold text-ink">{title}</h2>
        {description && <p className="mt-1 text-sm leading-6 text-muted">{description}</p>}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
