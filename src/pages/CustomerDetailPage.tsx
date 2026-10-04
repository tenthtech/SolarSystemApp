import { Building2, ChevronRight, ClipboardList, HousePlug, Mail, MapPin, Phone, Plus, UserRound } from 'lucide-react'
import { useLocation, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { LinkButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import { SuccessBanner } from '../components/ui/SuccessBanner'
import { InstallationsTable } from '../features/admin/InstallationsTable'
import { RecordNotFound } from '../features/admin/RecordNotFound'
import { getCustomerInitials, useDemoData } from '../features/demo-data/DemoDataContext'
import { formatAddress } from '../lib/formatters'

export function CustomerDetailPage() {
  const { customerId = '' } = useParams()
  const location = useLocation()
  const { customers, sites, installations } = useDemoData()
  const customer = customers.find((item) => item.id === customerId)

  if (!customer) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Admin', to: '/admin' }, { label: 'Customers', to: '/admin/customers' }, { label: 'Customer not found' }]} />
        <RecordNotFound title="Customer not found" description="This customer record is not available in the current demo data." backTo="/admin/customers" backLabel="Back to Customers" />
      </div>
    )
  }

  const customerSites = sites.filter((site) => site.customerId === customer.id)
  const activeSites = customerSites.filter((site) => site.status === 'active')
  const customerInstallations = installations.filter((installation) => installation.customerId === customer.id)
  const customerCreated = Boolean((location.state as { customerCreated?: boolean } | null)?.customerCreated)
  const createInstallationUrl = `/admin/installations/new?customerId=${encodeURIComponent(customer.id)}`

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Admin', to: '/admin' }, { label: 'Customers', to: '/admin/customers' }, { label: customer.name }]} />
      {customerCreated && <SuccessBanner title="Customer created" description={`${customer.name} has been added. You can now create their first installation.`} />}
      <PageHeader
        eyebrow="Customer detail"
        title={customer.name}
        description="Customer contact, solar sites and installation history in one place."
        action={<LinkButton to={createInstallationUrl} leadingIcon={<Plus className="size-4" aria-hidden="true" />}>Create Installation</LinkButton>}
      />

      <section className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5" aria-label="Customer site and installation relationship">
        <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="flex items-center gap-3 rounded-xl bg-energy-pale p-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white text-energy-deep"><UserRound className="size-5" aria-hidden="true" /></span>
            <div><p className="text-xs font-bold uppercase tracking-wider text-energy-deep">Customer</p><p className="mt-0.5 font-bold text-ink">{customer.name}</p></div>
          </div>
          <ChevronRight className="mx-auto hidden size-5 text-line-strong md:block" aria-hidden="true" />
          <div className="flex items-center gap-3 rounded-xl bg-canvas p-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white text-muted"><HousePlug className="size-5" aria-hidden="true" /></span>
            <div><p className="text-xs font-bold uppercase tracking-wider text-subtle">Sites</p><p className="mt-0.5 font-bold text-ink">{customerSites.length} {customerSites.length === 1 ? 'site' : 'sites'}</p></div>
          </div>
          <ChevronRight className="mx-auto hidden size-5 text-line-strong md:block" aria-hidden="true" />
          <div className="flex items-center gap-3 rounded-xl bg-blue-pale p-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white text-blue-deep"><ClipboardList className="size-5" aria-hidden="true" /></span>
            <div><p className="text-xs font-bold uppercase tracking-wider text-blue-deep">Installations</p><p className="mt-0.5 font-bold text-ink">{customerInstallations.length} {customerInstallations.length === 1 ? 'record' : 'records'}</p></div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]" aria-label="Customer profile and account status">
        <Card className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-base font-bold text-white">{getCustomerInitials(customer)}</span>
            <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-subtle">Customer profile</p><h2 className="mt-1 text-xl font-bold text-ink">{customer.name}</h2></div>
          </div>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" /><div><dt className="text-xs font-semibold uppercase tracking-wider text-subtle">Email</dt><dd className="mt-1 break-all text-sm font-medium text-ink">{customer.email}</dd></div></div>
            <div className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" /><div><dt className="text-xs font-semibold uppercase tracking-wider text-subtle">Phone</dt><dd className="mt-1 text-sm font-medium text-ink">{customer.phone}</dd></div></div>
            <div className="flex gap-3 sm:col-span-2"><MapPin className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" /><div><dt className="text-xs font-semibold uppercase tracking-wider text-subtle">Address</dt><dd className="mt-1 text-sm font-medium text-ink">{formatAddress(customer.address)}</dd></div></div>
          </dl>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-subtle">Customer access</p><h2 className="mt-1 text-lg font-bold text-ink">Account setup</h2></div><StatusBadge tone={customer.accountStatus === 'active' ? 'success' : 'warning'}>{customer.accountStatus === 'active' ? 'Active' : 'Not Activated'}</StatusBadge></div>
          <dl className="mt-5 divide-y divide-line rounded-xl border border-line bg-canvas px-4">
            <div className="flex items-center justify-between gap-4 py-3"><dt className="text-sm text-muted">Account Status</dt><dd className="text-sm font-bold text-ink">{customer.accountStatus === 'active' ? 'Active' : 'Not Activated'}</dd></div>
            <div className="flex items-center justify-between gap-4 py-3"><dt className="text-sm text-muted">Mobile Access</dt><dd className="text-sm font-bold text-ink">{customer.mobileAccessEnabled ? 'Enabled' : 'Not Enabled'}</dd></div>
            <div className="flex items-center justify-between gap-4 py-3"><dt className="text-sm text-muted">Sites</dt><dd className="text-sm font-bold text-ink">{activeSites.length} Active</dd></div>
          </dl>
          <p className="mt-4 text-sm leading-6 text-muted">{customer.mobileAccessEnabled ? 'The customer can now receive access to the mobile application.' : 'Customer app access becomes available after an installation is completed and confirmed by an administrator.'}</p>
          <div className="mt-5 rounded-xl border border-line bg-canvas p-4"><p className="text-xs font-semibold uppercase tracking-wider text-subtle">Current next step</p><p className="mt-1 text-sm font-bold text-ink">{customer.accountStatus === 'active' ? 'Customer mobile access is ready' : customerInstallations.length ? 'Technician completes the assigned installation' : 'Create and assign an installation'}</p></div>
        </Card>
      </section>

      <section aria-labelledby="customer-sites-heading">
        <div className="mb-4 flex items-end justify-between gap-4"><div><h2 id="customer-sites-heading" className="text-xl font-bold text-ink">Sites</h2><p className="mt-1 text-sm text-muted">Locations connected to this customer.</p></div></div>
        {customerSites.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {customerSites.map((site) => (
              <Card key={site.id} className="p-5">
                <div className="flex items-start justify-between gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-energy-pale text-energy-deep"><Building2 className="size-5" aria-hidden="true" /></span><div className="flex flex-wrap justify-end gap-2"><span className="rounded-full bg-canvas px-2.5 py-1 text-xs font-bold capitalize text-muted">{site.type}</span><StatusBadge tone={site.status === 'active' ? 'success' : site.status === 'pending' ? 'warning' : 'neutral'}>{site.status === 'active' ? 'Active' : site.status === 'pending' ? 'Pending' : 'Offline'}</StatusBadge></div></div>
                <h3 className="mt-5 font-bold text-ink">{site.name}</h3><p className="mt-1 text-sm leading-6 text-muted">{site.address}</p><p className="mt-4 text-sm font-semibold text-ink">{site.solarCapacityKw} kW solar{site.batteryCapacityKwh ? ` · ${site.batteryCapacityKwh} kWh battery` : ''}</p>
                <LinkButton to={`/admin/sites/${site.id}`} variant="outline" size="sm" className="mt-5 w-full">View Site</LinkButton>
              </Card>
            ))}
          </div>
        ) : (
          <Card><EmptyState compact icon={HousePlug} title="No sites yet" description="A site will be added when the first installation is created." /></Card>
        )}
      </section>

      <section aria-labelledby="customer-installations-heading">
        <div className="mb-4"><h2 id="customer-installations-heading" className="text-xl font-bold text-ink">Installations</h2><p className="mt-1 text-sm text-muted">Installation records linked to this customer.</p></div>
        {customerInstallations.length ? (
          <Card className="overflow-hidden"><InstallationsTable installations={customerInstallations} /></Card>
        ) : (
          <Card>
            <EmptyState
              icon={ClipboardList}
              title="No installation has been created for this customer."
              description="Create the site, planned equipment and technician assignment in one step."
              action={<LinkButton to={createInstallationUrl}>Create Installation</LinkButton>}
            />
          </Card>
        )}
      </section>
    </div>
  )
}
