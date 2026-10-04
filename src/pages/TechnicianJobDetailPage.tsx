import { BatteryCharging, FileText, Gauge, Mail, MapPin, Phone, RadioTower, UserRound, Wrench } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { LinkButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { users } from '../data/mockData'
import { RecordNotFound } from '../features/admin/RecordNotFound'
import { useDemoData } from '../features/demo-data/DemoDataContext'
import { InstallationStatusBadge } from '../features/installations/InstallationStatusBadge'
import { formatDisplayDate } from '../lib/formatters'

export function TechnicianJobDetailPage() {
  const { installationId = '' } = useParams()
  const { customers, installations, sites } = useDemoData()
  const technician = users.find((user) => user.role === 'technician')!
  const installation = installations.find((item) => item.id === installationId && item.assignedTechnicianId === technician.id)

  if (!installation) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs items={[{ label: 'My Jobs', to: '/technician' }, { label: 'Job not found' }]} />
        <div className="mt-6"><RecordNotFound title="Job not found" description="This installation is not assigned to Daniel or is no longer available." backTo="/technician" backLabel="Back to My Jobs" /></div>
      </div>
    )
  }

  const customer = customers.find((item) => item.id === installation.customerId)
  const site = sites.find((item) => item.id === installation.siteId)

  if (!customer || !site) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs items={[{ label: 'My Jobs', to: '/technician' }, { label: 'Job unavailable' }]} />
        <div className="mt-6"><RecordNotFound title="Job unavailable" description="The customer or site linked to this installation could not be found." backTo="/technician" backLabel="Back to My Jobs" /></div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Breadcrumbs items={[{ label: 'My Jobs', to: '/technician' }, { label: site.name }]} />
      <div className="mt-5">
        <PageHeader
          eyebrow="Assigned installation"
          title={site.name}
          description={`${customer.name} · ${formatDisplayDate(installation.scheduledDate)}`}
          action={<InstallationStatusBadge status={installation.status} />}
        />
      </div>

      {installation.status !== 'technician-assigned' && (
        <section className={`mt-6 rounded-2xl border p-5 ${installation.status === 'active' ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`} aria-live="polite">
          <div className="flex items-start gap-3">
            <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${installation.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}><Wrench className="size-5" aria-hidden="true" /></span>
            <div><h2 className="font-bold text-ink">{installation.status === 'active' ? 'Installation activated' : 'Submitted for Admin review'}</h2><p className="mt-1 text-sm leading-6 text-muted">{installation.status === 'active' ? 'This job is complete. No further technician action is required.' : 'The Admin is reviewing the submitted installation details. No further action is required.'}</p></div>
          </div>
        </section>
      )}

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-energy-pale text-energy-deep"><UserRound className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-wider text-subtle">Customer</p><h2 className="text-lg font-bold text-ink">{customer.name}</h2></div></div>
          <dl className="mt-5 space-y-4">
            <div className="flex items-start gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" /><div><dt className="text-xs font-bold uppercase tracking-wider text-subtle">Phone</dt><dd className="mt-1"><a href={`tel:${customer.phone.replace(/\s/g, '')}`} className="break-all text-sm font-semibold text-blue-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">{customer.phone}</a></dd></div></div>
            <div className="flex items-start gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" /><div><dt className="text-xs font-bold uppercase tracking-wider text-subtle">Email</dt><dd className="mt-1"><a href={`mailto:${customer.email}`} className="break-all text-sm font-semibold text-blue-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">{customer.email}</a></dd></div></div>
          </dl>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-blue-pale text-blue-deep"><MapPin className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-wider text-subtle">Site</p><h2 className="text-lg font-bold text-ink">{site.name}</h2></div></div>
          <dl className="mt-5 space-y-4">
            <div><dt className="text-xs font-bold uppercase tracking-wider text-subtle">Installation address</dt><dd className="mt-1 text-sm font-semibold leading-6 text-ink">{site.address}</dd></div>
            <div><dt className="text-xs font-bold uppercase tracking-wider text-subtle">System capacity</dt><dd className="mt-1 text-sm font-semibold text-ink">{installation.systemSizeKw} kW</dd></div>
          </dl>
        </Card>
      </div>

      <Card className="mt-5 p-5 sm:p-6">
        <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-energy-pale text-energy-deep"><RadioTower className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-wider text-subtle">Planned equipment</p><h2 className="text-lg font-bold text-ink">Installation plan</h2></div></div>
        <dl className="mt-6 grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl bg-canvas p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><RadioTower className="size-4" aria-hidden="true" /> Inverter</dt><dd className="mt-2 break-words text-sm font-semibold leading-6 text-ink">{installation.inverterBrand} {installation.inverterModel}</dd></div>
          <div className="rounded-xl bg-canvas p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><BatteryCharging className="size-4" aria-hidden="true" /> Battery</dt><dd className="mt-2 text-sm font-semibold leading-6 text-ink">{installation.batteryInstalled ? `${installation.batteryCapacityKwh ?? '—'} kWh planned` : 'Not planned'}</dd></div>
          <div className="rounded-xl bg-canvas p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><Gauge className="size-4" aria-hidden="true" /> Smart meter</dt><dd className="mt-2 text-sm font-semibold leading-6 text-ink">{installation.smartMeter ? 'Planned' : 'Not planned'}</dd></div>
        </dl>
      </Card>

      <Card className="mt-5 p-5 sm:p-6">
        <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-canvas text-muted"><FileText className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-wider text-subtle">Installation notes</p><h2 className="text-lg font-bold text-ink">From the Admin</h2></div></div>
        <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-muted">{installation.notes || 'No additional installation notes were provided.'}</p>
      </Card>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <LinkButton to="/technician" variant="outline">Back to My Jobs</LinkButton>
        {installation.status === 'technician-assigned' && <LinkButton to={`/technician/jobs/${installation.id}/complete`}>Complete Installation</LinkButton>}
      </div>
    </div>
  )
}
