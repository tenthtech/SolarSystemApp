import type { AustralianAddress, InstallationStatus } from '../types'

export function formatAddress(address: AustralianAddress) {
  return `${address.street}, ${address.suburb} ${address.state} ${address.postcode}`
}

export function formatDisplayDate(value: string) {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00`) : new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

const installationStatusLabels: Record<InstallationStatus, string> = {
  'technician-assigned': 'Technician Assigned',
  'awaiting-admin-review': 'Awaiting Admin Review',
  active: 'Active',
}

export function formatInstallationStatus(status: InstallationStatus) {
  return installationStatusLabels[status]
}

export function getInstallationStatusTone(status: InstallationStatus) {
  if (status === 'active') return 'success' as const
  if (status === 'awaiting-admin-review') return 'warning' as const
  return 'info' as const
}
