import { BatteryCharging, CloudSun, Gauge, HousePlug, MapPin, RadioTower, Router, SunMedium, UserRound, Wifi } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import { RecordNotFound } from '../features/admin/RecordNotFound'
import { useDemoData } from '../features/demo-data/DemoDataContext'

function connectionLabel(value?: 'connected' | 'not-connected' | 'not-required') {
  if (!value) return 'Not available'
  if (value === 'not-required') return 'Not Required'
  return value === 'connected' ? 'Connected' : 'Not Connected'
}

export function SiteDetailPage() {
  const { siteId = '' } = useParams()
  const { customers, installations, sites } = useDemoData()
  const site = sites.find((item) => item.id === siteId)

  if (!site) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Admin', to: '/admin' }, { label: 'Sites', to: '/admin/sites' }, { label: 'Site not found' }]} />
        <RecordNotFound title="Site not found" description="This site record is not available in the current demo data." backTo="/admin/customers" backLabel="Back to Customers" />
      </div>
    )
  }

  const customer = customers.find((item) => item.id === site.customerId)
  const installation = installations
    .filter((item) => item.siteId === site.id && item.status === 'active')
    .sort((a, b) => new Date(b.activatedAt ?? b.createdAt).getTime() - new Date(a.activatedAt ?? a.createdAt).getTime())[0]
  const submission = installation?.technicianSubmission

  const inverter = submission ? `${submission.inverter.manufacturer} ${submission.inverter.model}` : installation ? `${installation.inverterBrand} ${installation.inverterModel}` : 'Not available'
  const battery = submission?.battery.installed
    ? `${submission.battery.manufacturer} ${submission.battery.model} · ${submission.battery.capacityKwh} kWh`
    : installation?.batteryInstalled
      ? `${installation.batteryCapacityKwh ?? '—'} kWh`
      : 'Not installed'
  const smartMeter = submission ? (submission.smartMeter.installed ? 'Installed' : 'Not installed') : installation ? (installation.smartMeter ? 'Planned equipment' : 'Not installed') : 'Not available'

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Admin', to: '/admin' }, { label: 'Customers', to: '/admin/customers' }, ...(customer ? [{ label: customer.name, to: `/admin/customers/${customer.id}` }] : []), { label: site.name }]} />
      <PageHeader eyebrow="Site detail" title={site.name} description={site.address} action={<StatusBadge tone={site.status === 'active' ? 'success' : site.status === 'pending' ? 'warning' : 'neutral'} showDot>{site.status === 'active' ? 'Active' : site.status === 'pending' ? 'Pending' : 'Offline'}</StatusBadge>} />

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]" aria-label="Site summary">
        <Card className="p-5 sm:p-6">
          <div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-xl bg-energy-pale text-energy-deep"><HousePlug className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-wider text-subtle">Site</p><h2 className="text-lg font-bold text-ink">{site.name}</h2></div></div>
          <dl className="mt-6 space-y-5">
            <div className="flex items-start gap-3"><UserRound className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" /><div><dt className="text-xs font-bold uppercase tracking-wider text-subtle">Customer</dt><dd className="mt-1 text-sm font-semibold text-ink">{customer ? <Link to={`/admin/customers/${customer.id}`} className="text-blue-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">{customer.name}</Link> : 'Not available'}</dd></div></div>
            <div className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" /><div><dt className="text-xs font-bold uppercase tracking-wider text-subtle">Address</dt><dd className="mt-1 text-sm font-semibold leading-6 text-ink">{site.address}</dd></div></div>
            <div className="flex items-start gap-3"><SunMedium className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" /><div><dt className="text-xs font-bold uppercase tracking-wider text-subtle">System</dt><dd className="mt-1 text-sm font-semibold text-ink">{site.solarCapacityKw} kW</dd></div></div>
          </dl>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-xl bg-blue-pale text-blue-deep"><RadioTower className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-wider text-subtle">Installed Equipment</p><h2 className="text-lg font-bold text-ink">System hardware</h2></div></div>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-canvas p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><RadioTower className="size-4" aria-hidden="true" /> Inverter</dt><dd className="mt-2 break-words text-sm font-semibold leading-6 text-ink">{inverter}</dd></div>
            <div className="rounded-xl bg-canvas p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><BatteryCharging className="size-4" aria-hidden="true" /> Battery</dt><dd className="mt-2 break-words text-sm font-semibold leading-6 text-ink">{battery}</dd></div>
            <div className="rounded-xl bg-canvas p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><Gauge className="size-4" aria-hidden="true" /> Smart Meter</dt><dd className="mt-2 text-sm font-semibold leading-6 text-ink">{smartMeter}</dd></div>
          </dl>
        </Card>
      </section>

      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-xl bg-energy-pale text-energy-deep"><Wifi className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-wider text-subtle">Connections</p><h2 className="text-lg font-bold text-ink">Simulated service status</h2></div></div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-line p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><Wifi className="size-4" aria-hidden="true" /> Inverter API</dt><dd className="mt-2 text-sm font-bold text-ink">{connectionLabel(submission?.inverterConnection)}</dd></div>
          <div className="rounded-xl border border-line p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><CloudSun className="size-4" aria-hidden="true" /> Weather</dt><dd className="mt-2 text-sm font-bold text-ink">Available</dd></div>
          <div className="rounded-xl border border-line p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><Router className="size-4" aria-hidden="true" /> Modbus</dt><dd className="mt-2 text-sm font-bold text-ink">{connectionLabel(submission?.modbus)}</dd></div>
        </dl>
      </Card>

      <Card className="overflow-hidden">
        <div className="border-b border-line px-5 py-5 sm:px-6"><h2 className="text-lg font-bold text-ink">Monitoring</h2><p className="mt-1 text-sm text-muted">Energy data will be introduced in the next product phase.</p></div>
        <div className="flex min-h-48 flex-col items-center justify-center px-5 py-10 text-center sm:px-8"><span className="flex size-12 items-center justify-center rounded-2xl border border-dashed border-line-strong bg-canvas text-muted"><Gauge className="size-5" aria-hidden="true" /></span><p className="mt-4 max-w-lg text-sm leading-7 text-muted">Live energy monitoring will appear here once the system begins receiving device data.</p></div>
      </Card>
    </div>
  )
}
