import { ClipboardCheck, HardHat, HousePlug, SunMedium, TriangleAlert, UsersRound, Wifi, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LinkButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { MetricCard } from '../components/ui/MetricCard'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import { alerts, users } from '../data/mockData'
import { useDemoData } from '../features/demo-data/DemoDataContext'
import { EnergyPerformancePanel } from '../features/admin/EnergyPerformancePanel'
import { InstallationsTable } from '../features/admin/InstallationsTable'

export function AdminDashboardPage() {
  const { customers, sites, installations } = useDemoData()
  const technicians = users.filter((user) => user.role === 'technician')
  const awaitingReview = installations.filter((installation) => installation.status === 'awaiting-admin-review')
  const recentInstallations = [...awaitingReview, ...installations.filter((installation) => installation.status !== 'awaiting-admin-review')].slice(0, 5)
  const metrics = [
    { label: 'Total customers', value: String(customers.length), context: 'Across the SunGrid portfolio', tone: 'green' as const, icon: UsersRound },
    { label: 'Active sites', value: String(sites.filter((site) => site.status === 'active').length), context: `${sites.length} sites registered`, tone: 'blue' as const, icon: HousePlug },
    { label: 'Active installations', value: String(installations.filter((installation) => installation.status === 'active').length), context: `${installations.length} total installations`, tone: 'amber' as const, icon: Wrench },
    { label: 'Technicians', value: String(technicians.length), context: 'Field team available', tone: 'slate' as const, icon: HardHat },
    { label: 'Online systems', value: String(sites.filter((site) => site.status === 'active').length), context: 'Reporting normally', tone: 'green' as const, icon: Wifi },
    { label: 'Systems requiring attention', value: String(alerts.filter((alert) => alert.status === 'open').length), context: 'No critical alerts', tone: 'amber' as const, icon: TriangleAlert },
    { label: "Today's solar generation", value: '4.82 MWh', context: '+8.4% vs yesterday', tone: 'green' as const, icon: SunMedium },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operations overview"
        title="Good morning, Michael"
        description="Here’s what’s happening across SunGrid Electrical & Solar today."
        action={<StatusBadge tone="success" showDot>Systems reporting</StatusBadge>}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Key business metrics">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm" aria-labelledby="awaiting-review-heading">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800"><ClipboardCheck className="size-5" aria-hidden="true" /></span><div><h2 id="awaiting-review-heading" className="text-lg font-bold text-ink">Installations Awaiting Review</h2><p className="mt-1 text-sm text-muted">{awaitingReview.length} {awaitingReview.length === 1 ? 'installation is' : 'installations are'} ready for Admin confirmation.</p></div></div>
          <div className="flex items-center gap-3"><span className="text-2xl font-bold text-amber-900">{awaitingReview.length} <span className="text-sm font-semibold">Awaiting Review</span></span><LinkButton to={awaitingReview[0] ? `/admin/installations/${awaitingReview[0].id}` : '/admin/installations'} variant="outline" size="sm">{awaitingReview.length ? 'Review Installation' : 'View Installations'}</LinkButton></div>
        </div>
      </section>

      <InstallationsTable
        title="Recent installations"
        description="Newly created work and technician assignments"
        installations={recentInstallations}
        headerAction={<LinkButton to="/admin/installations" variant="outline" size="sm">View all installations</LinkButton>}
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_22rem]" aria-label="Energy performance and alerts">
        <EnergyPerformancePanel />
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-5">
            <div><h2 className="text-lg font-bold text-ink">Recent alerts</h2><p className="mt-1 text-sm text-muted">Needs your attention</p></div>
            <Link to="/admin/alerts" className="text-sm font-bold text-blue-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">View all</Link>
          </div>
          <div className="divide-y divide-line">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-5">
                <div className="flex items-start gap-3">
                  <span className={`mt-1.5 size-2 shrink-0 rounded-full ${alert.severity === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} aria-hidden="true" />
                  <div><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-bold text-ink">{alert.title}</p><StatusBadge tone={alert.severity === 'warning' ? 'warning' : 'info'}>{alert.severity === 'warning' ? 'Review' : 'Update'}</StatusBadge></div><p className="mt-1 text-sm leading-6 text-muted">{alert.message}</p><p className="mt-2 text-xs text-subtle">{alert.createdAt}</p></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}
