import { ArrowRight, CheckCircle2, MapPin, PlugZap, UsersRound, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PlatformArchitecture } from '../components/overview/PlatformArchitecture'
import { Card } from '../components/ui/Card'
import { StatusBadge } from '../components/ui/StatusBadge'
import { company, devices, sites, users } from '../data/mockData'

const workflowSteps = [
  'Create customer',
  'Create installation',
  'Assign technician',
  'Complete & submit',
  'Admin review',
  'Activate site',
  'Customer monitors',
]

export function OverviewPage() {
  const homeSite = sites[0]
  const inverter = devices[0]
  const technician = users.find((user) => user.role === 'technician')

  return (
    <div>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge tone="success" showDot>Product concept · Phase 1</StatusBadge>
                <span className="text-sm font-medium text-subtle">Prepared for {company.name}</span>
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-[-0.045em] text-ink sm:text-5xl lg:text-[3.8rem] lg:leading-[1.05]">Energy Management Platform</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted sm:text-xl">A connected platform for managing solar customers, installations, devices and ongoing energy performance.</p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-canvas p-4">
              <div className="px-3"><p className="text-2xl font-bold tracking-tight text-ink">3</p><p className="mt-1 text-xs leading-5 text-muted">Connected experiences</p></div>
              <div className="px-3"><p className="text-2xl font-bold tracking-tight text-ink">1</p><p className="mt-1 text-xs leading-5 text-muted">Shared platform</p></div>
              <div className="px-3"><p className="text-2xl font-bold tracking-tight text-ink">24/7</p><p className="mt-1 text-xs leading-5 text-muted">Energy visibility</p></div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] space-y-20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <PlatformArchitecture />

        <section aria-labelledby="workflow-heading">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-energy-deep">MVP operating model</p>
              <h2 id="workflow-heading" className="mt-2 text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">From signed customer to live energy data.</h2>
              <p className="mt-3 max-w-lg text-base leading-7 text-muted">The first release keeps ownership clear: technicians complete the field work, administrators confirm it, and customers gain access once the site is ready.</p>
              <Link to="/roadmap" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-energy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy">
                Explore the delivery roadmap <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <Card className="p-4 sm:p-6">
              <ol className="grid gap-2 sm:grid-cols-2 xl:grid-cols-7" aria-label="MVP workflow">
                {workflowSteps.map((step, index) => (
                  <li key={step} className="relative flex min-h-[104px] flex-col justify-between rounded-xl bg-canvas p-3">
                    <span className="font-mono text-xs font-bold text-subtle">{String(index + 1).padStart(2, '0')}</span>
                    <span className="mt-5 text-sm font-bold leading-5 text-ink">{step}</span>
                    {index < workflowSteps.length - 1 && <ArrowRight className="absolute -right-2.5 top-1/2 z-10 hidden size-4 -translate-y-1/2 text-line-strong xl:block" aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </section>

        <section aria-labelledby="demo-data-heading" className="rounded-[1.75rem] bg-ink p-5 text-white sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-energy">A grounded demonstration</p>
              <h2 id="demo-data-heading" className="mt-2 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">Built around a real Brisbane solar scenario.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/58">Every screen uses coherent Australian business and system data, ready to grow into the detailed workflows.</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><MapPin className="size-5 text-energy" aria-hidden="true" /><p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/40">Customer site</p><p className="mt-1 font-bold">{homeSite.name}</p><p className="mt-1 text-sm text-white/55">{homeSite.address}</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><PlugZap className="size-5 text-energy" aria-hidden="true" /><p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/40">Solar system</p><p className="mt-1 font-bold">{homeSite.solarCapacityKw} kW Solar System</p><p className="mt-1 text-sm text-white/55">{inverter.manufacturer} inverter</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><CheckCircle2 className="size-5 text-energy" aria-hidden="true" /><p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/40">Storage</p><p className="mt-1 font-bold">{homeSite.batteryCapacityKwh} kWh Battery</p><p className="mt-1 text-sm text-white/55">Connected & monitored</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><Wrench className="size-5 text-energy" aria-hidden="true" /><p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/40">Field technician</p><p className="mt-1 font-bold">{technician?.name}</p><p className="mt-1 text-sm text-white/55">Brisbane service team</p></div>
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs text-white/45"><UsersRound className="size-4" aria-hidden="true" /> Single-company MVP for {company.name}</div>
        </section>
      </div>
    </div>
  )
}
