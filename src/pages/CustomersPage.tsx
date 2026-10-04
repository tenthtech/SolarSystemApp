import { Search, UserRoundPlus, UsersRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { LinkButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { DataTable, type TableColumn } from '../components/ui/DataTable'
import { EmptyState } from '../components/ui/EmptyState'
import { Input } from '../components/ui/Input'
import { PageHeader } from '../components/ui/PageHeader'
import { Select } from '../components/ui/Select'
import type { Customer } from '../types'
import { CustomerStatusBadge } from '../features/admin/CustomerStatusBadge'
import { getCustomerInitials, useDemoData } from '../features/demo-data/DemoDataContext'
import { formatDisplayDate } from '../lib/formatters'

export function CustomersPage() {
  const { customers, sites } = useDemoData()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'all' | Customer['status']>('all')

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase()
    return customers.filter((customer) => {
      const matchesSearch = !query || [customer.name, customer.email, customer.phone].some((value) => value.toLowerCase().includes(query))
      const matchesStatus = status === 'all' || customer.status === status
      return matchesSearch && matchesStatus
    })
  }, [customers, search, status])

  const columns: TableColumn<Customer>[] = [
    {
      key: 'customer',
      header: 'Customer',
      render: (customer) => (
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-energy-pale text-xs font-bold text-energy-deep">{getCustomerInitials(customer)}</span>
          <span className="font-bold text-ink">{customer.name}</span>
        </div>
      ),
    },
    { key: 'email', header: 'Email', render: (customer) => customer.email },
    { key: 'phone', header: 'Phone', render: (customer) => customer.phone },
    { key: 'sites', header: 'Sites', render: (customer) => sites.filter((site) => site.customerId === customer.id).length },
    { key: 'status', header: 'Status', render: (customer) => <CustomerStatusBadge status={customer.status} /> },
    { key: 'created', header: 'Created', render: (customer) => formatDisplayDate(customer.createdAt) },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Admin', to: '/admin' }, { label: 'Customers' }]} />
      <PageHeader
        eyebrow="Customer management"
        title="Customers"
        description="Manage customer details, connected sites and installation records."
        action={<LinkButton to="/admin/customers/new" leadingIcon={<UserRoundPlus className="size-4" aria-hidden="true" />}>Add Customer</LinkButton>}
      />

      <Card className="overflow-hidden">
        <div className="grid gap-3 border-b border-line p-4 sm:grid-cols-[minmax(0,1fr)_12rem] sm:p-5">
          <Input id="customer-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, email or phone" aria-label="Search customers" leadingIcon={<Search className="size-4" />} />
          <Select id="customer-status-filter" aria-label="Filter customers by status" value={status} onChange={(event) => setStatus(event.target.value as typeof status)}>
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="pending">Setup pending</option>
            <option value="inactive">Inactive</option>
          </Select>
        </div>

        <div className="flex items-center justify-between border-b border-line px-5 py-3 text-sm">
          <span className="font-semibold text-ink">{filteredCustomers.length} {filteredCustomers.length === 1 ? 'customer' : 'customers'}</span>
          {(search || status !== 'all') && <button type="button" onClick={() => { setSearch(''); setStatus('all') }} className="min-h-9 rounded-lg px-2 font-semibold text-blue-deep hover:bg-blue-pale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">Clear filters</button>}
        </div>

        <DataTable
          caption="SunGrid customers"
          columns={columns}
          rows={filteredCustomers}
          getRowKey={(customer) => customer.id}
          onRowClick={(customer) => navigate(`/admin/customers/${customer.id}`)}
          getRowAriaLabel={(customer) => `View ${customer.name}`}
          emptyState={<EmptyState compact icon={UsersRound} title="No customers found" description="Try a different search or clear the selected status filter." />}
        />
      </Card>
    </div>
  )
}
