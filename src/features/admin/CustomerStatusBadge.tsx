import type { Customer } from '../../types'
import { StatusBadge } from '../../components/ui/StatusBadge'

const config: Record<Customer['status'], { label: string; tone: 'success' | 'warning' | 'neutral' }> = {
  active: { label: 'Active', tone: 'success' },
  pending: { label: 'Setup pending', tone: 'warning' },
  inactive: { label: 'Inactive', tone: 'neutral' },
}

export function CustomerStatusBadge({ status }: { status: Customer['status'] }) {
  const current = config[status]
  return <StatusBadge tone={current.tone}>{current.label}</StatusBadge>
}
