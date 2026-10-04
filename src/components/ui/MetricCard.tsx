import type { LucideIcon } from 'lucide-react'
import { Card } from './Card'

interface MetricCardProps {
  label: string
  value: string
  context: string
  icon: LucideIcon
  tone?: 'green' | 'blue' | 'amber' | 'slate'
}

const toneClasses = {
  green: 'bg-energy-pale text-energy-deep',
  blue: 'bg-blue-pale text-blue-deep',
  amber: 'bg-amber-50 text-amber-700',
  slate: 'bg-slate-100 text-slate-700',
}

export function MetricCard({ label, value, context, icon: Icon, tone = 'slate' }: MetricCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-ink">{value}</p>
        </div>
        <span className={`flex size-10 items-center justify-center rounded-xl ${toneClasses[tone]}`}>
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-sm text-subtle">{context}</p>
    </Card>
  )
}
