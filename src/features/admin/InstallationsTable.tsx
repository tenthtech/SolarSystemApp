import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { users } from '../../data/mockData'
import type { Installation } from '../../types'
import { Card } from '../../components/ui/Card'
import { DataTable, type TableColumn } from '../../components/ui/DataTable'
import { useDemoData } from '../demo-data/DemoDataContext'
import { formatDisplayDate } from '../../lib/formatters'
import { InstallationStatusBadge } from '../installations/InstallationStatusBadge'

interface InstallationsTableProps {
  installations: Installation[]
  title?: string
  description?: string
  headerAction?: ReactNode
  emptyState?: ReactNode
}

export function InstallationsTable({ installations, title, description, headerAction, emptyState }: InstallationsTableProps) {
  const { customers, sites } = useDemoData()
  const navigate = useNavigate()

  const columns: TableColumn<Installation>[] = [
    {
      key: 'customer',
      header: 'Customer',
      render: (installation) => <span className="font-bold text-ink">{customers.find((item) => item.id === installation.customerId)?.name ?? 'Unknown customer'}</span>,
    },
    {
      key: 'site',
      header: 'Site',
      render: (installation) => sites.find((item) => item.id === installation.siteId)?.name ?? 'Unknown site',
    },
    {
      key: 'system',
      header: 'System size',
      render: (installation) => `${installation.systemSizeKw} kW`,
    },
    {
      key: 'technician',
      header: 'Technician',
      render: (installation) => users.find((user) => user.id === installation.assignedTechnicianId)?.name ?? 'Unassigned',
    },
    {
      key: 'status',
      header: 'Status',
      render: (installation) => <InstallationStatusBadge status={installation.status} />,
    },
    {
      key: 'date',
      header: 'Date',
      render: (installation) => formatDisplayDate(installation.scheduledDate),
    },
  ]

  const table = (
    <DataTable
      caption={title ?? 'Installations'}
      columns={columns}
      rows={installations}
      getRowKey={(row) => row.id}
      onRowClick={(row) => navigate(`/admin/installations/${row.id}`)}
      getRowAriaLabel={(row) => `View installation for ${customers.find((item) => item.id === row.customerId)?.name ?? 'customer'}`}
      emptyState={emptyState}
    />
  )

  if (!title) return table

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col justify-between gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
        <div><h2 className="text-lg font-bold text-ink">{title}</h2>{description && <p className="mt-1 text-sm text-muted">{description}</p>}</div>
        {headerAction}
      </div>
      {table}
    </Card>
  )
}
