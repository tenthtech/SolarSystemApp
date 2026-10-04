import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  to?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, index) => {
          const current = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="size-4 text-line-strong" aria-hidden="true" />}
              {item.to && !current ? (
                <Link to={item.to} className="inline-flex min-h-9 items-center rounded-lg px-1.5 font-medium text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">{item.label}</Link>
              ) : (
                <span aria-current={current ? 'page' : undefined} className="inline-flex min-h-9 items-center px-1.5 font-semibold text-ink">{item.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
