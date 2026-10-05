import { BatteryCharging, Building2, CalendarDays, Check, CheckCircle2, ClipboardCheck, FileText, Gauge, HardHat, HousePlug, Mail, MapPin, RadioTower, SunMedium, UserRound, Wifi, Zap, type LucideIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Button, LinkButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { users } from '../data/mockData'
import { RecordNotFound } from '../features/admin/RecordNotFound'
import { useDemoData } from '../features/demo-data/DemoDataContext'
import { InstallationStatusBadge } from '../features/installations/InstallationStatusBadge'
import { formatDisplayDate, formatInstallationStatus } from '../lib/formatters'
import type { InstallationStatus, TechnicianSubmission } from '../types'

const workflowSteps: Array<{ status: InstallationStatus; label: string }> = [
  { status: 'technician-assigned', label: 'Technician Assigned' },
  { status: 'awaiting-admin-review', label: 'Awaiting Admin Review' },
  { status: 'active', label: 'Active' },
]

function DetailItem({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-canvas text-muted"><Icon className="size-4" aria-hidden="true" /></span>
      <div className="min-w-0"><dt className="text-xs font-bold uppercase tracking-wider text-subtle">{label}</dt><dd className="mt-1 break-words text-sm font-semibold leading-6 text-ink">{value}</dd></div>
    </div>
  )
}

function connectionLabel(value: TechnicianSubmission['inverterConnection'] | TechnicianSubmission['modbus']) {
  if (value === 'not-required') return 'Not Required'
  return value === 'connected' ? 'Connected' : 'Not Connected'
}

export function InstallationDetailPage() {
  const { installationId = '' } = useParams()
  const navigate = useNavigate()
  const { installations, customers, sites, activateInstallation } = useDemoData()
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [activating, setActivating] = useState(false)
  const [activationError, setActivationError] = useState('')
  const activationGuard = useRef(false)
  const installation = installations.find((item) => item.id === installationId)

  if (!installation) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Admin', to: '/admin' }, { label: 'Installations', to: '/admin/installations' }, { label: 'Installation not found' }]} />
        <RecordNotFound title="Installation not found" description="This installation record is not available in the platform." backTo="/admin/installations" backLabel="Back to Installations" />
      </div>
    )
  }

  const customer = customers.find((item) => item.id === installation.customerId)
  const site = sites.find((item) => item.id === installation.siteId)
  const technician = users.find((item) => item.id === installation.assignedTechnicianId)
  const submission = installation.technicianSubmission
  const currentStep = workflowSteps.findIndex((step) => step.status === installation.status)
  const currentInstallationId = installation.id

  function confirmActivation() {
    if (activationGuard.current) return
    activationGuard.current = true
    setActivating(true)
    const result = activateInstallation(currentInstallationId)
    if (!result) {
      activationGuard.current = false
      setActivating(false)
      setActivationError('The installation could not be activated. Check that the technician submission is still awaiting review.')
      return
    }
    navigate(`/admin/installations/${currentInstallationId}/activated`, { replace: true })
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Admin', to: '/admin' }, { label: 'Installations', to: '/admin/installations' }, { label: site?.name ?? 'Installation' }]} />
      <PageHeader
        eyebrow={installation.status === 'awaiting-admin-review' ? 'Installation review' : 'Installation detail'}
        title={site?.name ?? 'Installation'}
        description={`${customer?.name ?? 'Customer'} · ${installation.systemSizeKw} kW solar system`}
        action={<InstallationStatusBadge status={installation.status} />}
      />

      {installation.status === 'awaiting-admin-review' && (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm" aria-labelledby="awaiting-review-heading">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800"><ClipboardCheck className="size-5" aria-hidden="true" /></span><div><h2 id="awaiting-review-heading" className="font-bold text-ink">Installation awaiting review</h2><p className="mt-1 text-sm leading-6 text-muted">Daniel Brooks has submitted the installed equipment and connectivity details.</p></div></div>
            <Button onClick={() => setConfirmationOpen(true)} disabled={confirmationOpen}>Confirm Installation</Button>
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5" aria-labelledby="installation-progress-heading">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center"><div><h2 id="installation-progress-heading" className="text-base font-bold text-ink">MVP installation journey</h2><p className="mt-1 text-sm text-muted">A simple three-stage path from assignment to an active customer site.</p></div><InstallationStatusBadge status={installation.status} /></div>
        <ol className="mt-5 grid gap-3 md:grid-cols-3">
          {workflowSteps.map((step, index) => {
            const complete = index < currentStep || installation.status === 'active'
            const current = index === currentStep && installation.status !== 'active'
            return (
              <li key={step.status} aria-current={current ? 'step' : undefined} className={`rounded-xl border p-4 ${complete ? 'border-emerald-200 bg-emerald-50' : current ? 'border-amber-300 bg-amber-50' : 'border-line bg-canvas'}`}>
                <span className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${complete ? 'bg-emerald-600 text-white' : current ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'}`}>{complete ? <Check className="size-4" aria-hidden="true" /> : index + 1}</span>
                <p className={`mt-3 text-sm font-bold ${complete || current ? 'text-ink' : 'text-subtle'}`}>{step.label}</p>
              </li>
            )
          })}
        </ol>
      </section>

      {submission ? (
        <section className="grid gap-6 xl:grid-cols-2" aria-label="Installation plan and technician submission">
          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-blue-pale text-blue-deep"><FileText className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-wider text-blue-deep">Original Installation Plan</p><h2 className="text-lg font-bold text-ink">Planned by the Admin</h2></div></div>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <DetailItem icon={UserRound} label="Customer" value={customer?.name ?? 'Not available'} />
              <DetailItem icon={HousePlug} label="Site" value={site?.name ?? 'Not available'} />
              <DetailItem icon={SunMedium} label="Planned system size" value={`${installation.systemSizeKw} kW`} />
              <DetailItem icon={RadioTower} label="Planned inverter" value={`${installation.inverterBrand} ${installation.inverterModel}`} />
              <DetailItem icon={BatteryCharging} label="Planned battery" value={installation.batteryInstalled ? `${installation.batteryCapacityKwh ?? '—'} kWh` : 'None planned'} />
              <DetailItem icon={HardHat} label="Technician" value={technician?.name ?? 'Not assigned'} />
            </dl>
          </Card>

          <Card className="border-amber-200 p-5 sm:p-6">
            <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800"><ClipboardCheck className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-wider text-amber-800">Technician Submission</p><h2 className="text-lg font-bold text-ink">Installed on site</h2></div></div>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <DetailItem icon={RadioTower} label="Actual inverter" value={`${submission.inverter.manufacturer} ${submission.inverter.model}`} />
              <DetailItem icon={Gauge} label="Inverter serial" value={submission.inverter.serialNumber} />
              <DetailItem icon={BatteryCharging} label="Battery" value={submission.battery.installed ? `${submission.battery.manufacturer} ${submission.battery.model} · ${submission.battery.capacityKwh} kWh · ${submission.battery.serialNumber ?? 'Serial not provided'}` : 'Not installed'} />
              <DetailItem icon={Gauge} label="Smart meter" value={submission.smartMeter.installed ? `${submission.smartMeter.manufacturer} ${submission.smartMeter.model}${submission.smartMeter.serialNumber ? ` · ${submission.smartMeter.serialNumber}` : ''}` : 'Not installed'} />
              <DetailItem icon={Wifi} label="Inverter connection" value={connectionLabel(submission.inverterConnection)} />
              <DetailItem icon={Zap} label="Modbus" value={connectionLabel(submission.modbus)} />
            </dl>
            <div className="mt-5 rounded-xl bg-canvas p-4"><p className="text-xs font-bold uppercase tracking-wider text-subtle">Technician notes</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted">{submission.notes || 'No additional technician notes were added.'}</p></div>
          </Card>
        </section>
      ) : (
        <section className="grid gap-6 xl:grid-cols-2" aria-label="Customer and installation plan">
          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-energy-pale text-energy-deep"><UserRound className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-wider text-subtle">Customer</p><h2 className="text-lg font-bold text-ink">{customer?.name ?? 'Customer'}</h2></div></div>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2"><DetailItem icon={Mail} label="Email" value={customer?.email ?? 'Not available'} /><DetailItem icon={Building2} label="Account status" value={customer?.accountStatus === 'active' ? 'Active' : 'Not Activated'} /><DetailItem icon={MapPin} label="Installation address" value={site?.address ?? 'Not available'} /><DetailItem icon={Gauge} label="System type" value={site?.type === 'commercial' ? 'Commercial' : 'Residential'} /></dl>
            {customer && <Link to={`/admin/customers/${customer.id}`} className="mt-5 inline-flex min-h-10 items-center text-sm font-bold text-energy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy">View customer profile</Link>}
          </Card>
          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-blue-pale text-blue-deep"><Zap className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-wider text-subtle">Original Installation Plan</p><h2 className="text-lg font-bold text-ink">Planned system</h2></div></div>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2"><DetailItem icon={SunMedium} label="Solar capacity" value={`${installation.systemSizeKw} kW`} /><DetailItem icon={CalendarDays} label="Installation date" value={formatDisplayDate(installation.scheduledDate)} /><DetailItem icon={RadioTower} label="Inverter" value={`${installation.inverterBrand} ${installation.inverterModel}`} /><DetailItem icon={BatteryCharging} label="Battery" value={installation.batteryInstalled ? `${installation.batteryCapacityKwh ?? '—'} kWh planned` : 'None planned'} /><DetailItem icon={Gauge} label="Smart meter" value={installation.smartMeter ? 'Planned' : 'Not planned'} /><DetailItem icon={HardHat} label="Technician" value={technician?.name ?? 'Not assigned'} /></dl>
          </Card>
        </section>
      )}

      {submission && (
        <Card className="p-5 sm:p-6">
          <h2 className="text-lg font-bold text-ink">Confirmed site details</h2>
          <dl className="mt-5 grid gap-5 sm:grid-cols-3"><DetailItem icon={HousePlug} label="Site" value={submission.siteName} /><DetailItem icon={MapPin} label="Address" value={submission.installationAddress} /><DetailItem icon={SunMedium} label="System capacity" value={`${submission.systemSizeKw} kW`} /></dl>
        </Card>
      )}

      {confirmationOpen && installation.status === 'awaiting-admin-review' && (
        <section className="rounded-2xl border border-ink/15 bg-ink p-5 text-white shadow-card sm:p-6" aria-labelledby="activation-confirmation-heading">
          <div className="flex items-start gap-3"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-energy text-ink"><CheckCircle2 className="size-5" aria-hidden="true" /></span><div><h2 id="activation-confirmation-heading" className="text-lg font-bold">Confirm Installation</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-white/70">Confirm that the installation details have been reviewed and the site is ready to be activated.</p></div></div>
          {activationError && <p className="mt-4 rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-100" role="alert">{activationError}</p>}
          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="ghost" className="text-white/75 hover:bg-white/10 hover:text-white" onClick={() => { setConfirmationOpen(false); setActivationError('') }} disabled={activating}>Cancel</Button><Button type="button" variant="secondary" onClick={confirmActivation} disabled={activating}>{activating ? 'Activating…' : 'Confirm & Activate'}</Button></div>
        </section>
      )}

      {installation.status === 'active' && site && <div className="flex justify-end"><LinkButton to={`/admin/sites/${site.id}`}>View Active Site</LinkButton></div>}

      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-canvas text-muted"><FileText className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-wider text-subtle">Admin notes</p><h2 className="text-lg font-bold text-ink">Installation notes</h2></div></div>
        <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-muted">{installation.notes || 'No additional installation notes have been added.'}</p>
      </Card>

      <p className="sr-only">Current installation status: {formatInstallationStatus(installation.status)}</p>
    </div>
  )
}
