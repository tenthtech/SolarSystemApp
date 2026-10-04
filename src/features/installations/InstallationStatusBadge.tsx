import { StatusBadge } from '../../components/ui/StatusBadge'
import { formatInstallationStatus, getInstallationStatusTone } from '../../lib/formatters'
import type { InstallationStatus } from '../../types'

export function InstallationStatusBadge({ status }: { status: InstallationStatus }) {
  return (
    <StatusBadge tone={getInstallationStatusTone(status)} showDot>
      {formatInstallationStatus(status)}
    </StatusBadge>
  )
}
