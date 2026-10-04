import { CalendarDays, CheckCircle2, HardHat, HousePlug, SunMedium, UserRound } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { LinkButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { users } from '../data/mockData'
import { RecordNotFound } from '../features/admin/RecordNotFound'
import { useDemoData } from '../features/demo-data/DemoDataContext'
import { InstallationStatusBadge } from '../features/installations/InstallationStatusBadge'
import { formatDisplayDate } from '../lib/formatters'

export function InstallationCreatedPage() {
  const { installationId = '' } = useParams()
  const { installations, customers, sites } = useDemoData()
  const installation = installations.find((item) => item.id === installationId)

  if (!installation) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Admin', to: '/admin' }, { label: 'Installations', to: '/admin/installations' }, { label: 'Confirmation unavailable' }]} />
        <RecordNotFound title="Installation not found" description="This installation confirmation is not available in the current demo data." backTo="/admin/installations" backLabel="Back to Installations" />
      </div>
    )
  }

  const customer = customers.find((item) => item.id === installation.customerId)
  const site = sites.find((item) => item.id === installation.siteId)
  const technician = users.find((item) => item.id === installation.assignedTechnicianId)

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Admin', to: '/admin' }, { label: 'Installations', to: '/admin/installations' }, { label: 'Installation Created' }]} />
      <Card className="mx-auto max-w-3xl overflow-hidden">
        <div className="bg-ink px-6 py-8 text-center text-white sm:px-10 sm:py-10">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-energy text-ink shadow-lg"><CheckCircle2 className="size-8" aria-hidden="true" /></span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-energy">Assignment ready</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">Installation Created</h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-white/62">The installation is now in SunGrid’s records and ready for the assigned technician.</p>
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-blue/20 bg-blue-pale/60 p-4"><div><p className="text-xs font-bold uppercase tracking-wider text-blue-deep">Status</p><p className="mt-1 text-sm text-muted">This installation’s current workflow status is shown here.</p></div><InstallationStatusBadge status={installation.status} /></div>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-line bg-white p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><UserRound className="size-4" aria-hidden="true" /> Customer</dt><dd className="mt-2 font-bold text-ink">{customer?.name ?? 'Customer'}</dd></div>
            <div className="rounded-xl border border-line bg-white p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><HousePlug className="size-4" aria-hidden="true" /> Site</dt><dd className="mt-2 font-bold text-ink">{site?.name ?? 'Site'}</dd></div>
            <div className="rounded-xl border border-line bg-white p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><SunMedium className="size-4" aria-hidden="true" /> Solar system</dt><dd className="mt-2 font-bold text-ink">{installation.systemSizeKw} kW Solar System</dd></div>
            <div className="rounded-xl border border-line bg-white p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><HardHat className="size-4" aria-hidden="true" /> Assigned technician</dt><dd className="mt-2 font-bold text-ink">{technician?.name ?? 'Technician'}</dd></div>
            <div className="rounded-xl border border-line bg-white p-4 sm:col-span-2"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><CalendarDays className="size-4" aria-hidden="true" /> Planned installation date</dt><dd className="mt-2 font-bold text-ink">{formatDisplayDate(installation.scheduledDate)}</dd></div>
          </dl>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center"><LinkButton to={`/admin/installations/${installation.id}`}>View Installation</LinkButton><LinkButton to="/admin/installations" variant="outline">Back to Installations</LinkButton></div>
        </div>
      </Card>
    </div>
  )
}
