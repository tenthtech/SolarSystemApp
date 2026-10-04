import { CalendarDays, ClipboardCheck, MapPin, RadioTower, SunMedium, Wrench } from 'lucide-react'
import { LinkButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import { users } from '../data/mockData'
import { useDemoData } from '../features/demo-data/DemoDataContext'
import { InstallationStatusBadge } from '../features/installations/InstallationStatusBadge'
import { formatDisplayDate } from '../lib/formatters'
import type { Customer, Installation, Site } from '../types'

interface JobCardProps {
  installation: Installation
  customer?: Customer
  site?: Site
}

function JobCard({ installation, customer, site }: JobCardProps) {
  const equipment = `${installation.inverterBrand} ${installation.inverterModel}${installation.batteryInstalled ? ` · ${installation.batteryCapacityKwh ?? '—'} kWh battery` : ' · No battery'}`

  return (
    <Card className="overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-bold text-blue-deep">{customer?.name ?? 'Customer unavailable'}</p>
            <h3 className="mt-1 text-lg font-bold text-ink">{site?.name ?? 'Site unavailable'}</h3>
            <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-muted"><MapPin className="mt-1 size-4 shrink-0" aria-hidden="true" /><span>{site?.address ?? 'Address unavailable'}</span></p>
          </div>
          <InstallationStatusBadge status={installation.status} />
        </div>

        <dl className="mt-5 grid gap-4 border-y border-line py-4 sm:grid-cols-3">
          <div><dt className="text-xs font-bold uppercase tracking-wider text-subtle">Installation Date</dt><dd className="mt-1 text-sm font-semibold text-ink">{formatDisplayDate(installation.scheduledDate)}</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wider text-subtle">System Capacity</dt><dd className="mt-1 text-sm font-semibold text-ink">{installation.systemSizeKw} kW</dd></div>
          <div className="min-w-0"><dt className="text-xs font-bold uppercase tracking-wider text-subtle">Equipment</dt><dd className="mt-1 break-words text-sm font-semibold leading-6 text-ink">{equipment}</dd></div>
        </dl>

        <div className="mt-5 flex justify-end">
          <LinkButton to={`/technician/jobs/${installation.id}`} className="w-full sm:w-auto">View Job</LinkButton>
        </div>
      </div>
    </Card>
  )
}

export function TechnicianPortalPage() {
  const { customers, installations, sites } = useDemoData()
  const technician = users.find((user) => user.role === 'technician')!
  const jobs = installations
    .filter((installation) => installation.assignedTechnicianId === technician.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const awaitingCompletion = jobs.filter((installation) => installation.status === 'technician-assigned')
  const recentlySubmitted = jobs
    .filter((installation) => installation.status !== 'technician-assigned')
    .sort((a, b) => new Date(b.technicianSubmission?.submittedAt ?? b.createdAt).getTime() - new Date(a.technicianSubmission?.submittedAt ?? a.createdAt).getTime())

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <PageHeader
        eyebrow="SunGrid Field"
        title="Welcome, Daniel"
        description="Review your assigned installations and submit completed work from site."
        action={<StatusBadge tone="success" showDot>Available</StatusBadge>}
      />

      <section className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Technician job metrics">
        {[
          { label: 'Assigned Jobs', value: jobs.length, icon: Wrench },
          { label: 'Awaiting Completion', value: awaitingCompletion.length, icon: CalendarDays },
          { label: 'Recently Submitted', value: recentlySubmitted.length, icon: ClipboardCheck },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="flex items-center gap-4 p-4 sm:p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-energy-pale text-energy-deep"><Icon className="size-5" aria-hidden="true" /></span>
            <div><p className="text-2xl font-bold text-ink">{value}</p><p className="mt-0.5 text-sm font-semibold text-muted">{label}</p></div>
          </Card>
        ))}
      </section>

      <section className="mt-9" aria-labelledby="assigned-installations-heading">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div><h2 id="assigned-installations-heading" className="text-xl font-bold text-ink">My Assigned Installations</h2><p className="mt-1 text-sm text-muted">Jobs ready for you to complete on site.</p></div>
          <span className="hidden items-center gap-2 text-xs font-semibold text-subtle sm:flex"><SunMedium className="size-4" aria-hidden="true" /> {awaitingCompletion.length} ready</span>
        </div>
        <div className="grid gap-4">
          {awaitingCompletion.length ? awaitingCompletion.map((installation) => (
            <JobCard
              key={installation.id}
              installation={installation}
              customer={customers.find((customer) => customer.id === installation.customerId)}
              site={sites.find((site) => site.id === installation.siteId)}
            />
          )) : (
            <Card><EmptyState compact icon={ClipboardCheck} title="No installations awaiting completion" description="New work assigned to Daniel will appear here." /></Card>
          )}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="recently-submitted-heading">
        <div className="mb-4"><h2 id="recently-submitted-heading" className="text-xl font-bold text-ink">Recently Submitted</h2><p className="mt-1 text-sm text-muted">Submitted and activated jobs remain available for reference.</p></div>
        <div className="grid gap-4">
          {recentlySubmitted.length ? recentlySubmitted.map((installation) => (
            <JobCard
              key={installation.id}
              installation={installation}
              customer={customers.find((customer) => customer.id === installation.customerId)}
              site={sites.find((site) => site.id === installation.siteId)}
            />
          )) : (
            <Card><EmptyState compact icon={RadioTower} title="No submitted installations yet" description="Completed work will appear here after it is submitted for review." /></Card>
          )}
        </div>
      </section>
    </div>
  )
}
