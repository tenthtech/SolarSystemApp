import { ArrowRight, BatteryCharging, Building2, Layers3, MapPin, Rocket, SunMedium, UsersRound, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PlatformArchitecture } from '../components/overview/PlatformArchitecture'
import { Card } from '../components/ui/Card'
import { StatusBadge } from '../components/ui/StatusBadge'
import { company, devices, sites, users } from '../data/mockData'

const productStory = [
  { label: 'Today', title: 'A solar electrical contractor', description: 'SunGrid installs and manages solar systems for its customers.', icon: Building2, tone: 'bg-canvas text-muted' },
  { label: 'MVP', title: 'One connected operating platform', description: 'Admin operations, field installation, site activation and customer monitoring work together.', icon: Layers3, tone: 'bg-energy-pale text-energy-deep' },
  { label: 'Future', title: 'Business operations to multi-company SaaS', description: 'The same foundation can grow from one electrical company into a commercial platform.', icon: Rocket, tone: 'bg-blue-pale text-blue-deep' },
]

export function OverviewPage() {
  const homeSite = sites[0]
  const inverter = devices[0]
  const admin = users.find((user) => user.role === 'admin')
  const technician = users.find((user) => user.role === 'technician')
  const customer = users.find((user) => user.role === 'customer')

  return (
    <div>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge tone="success" showDot>MVP demonstration complete</StatusBadge>
                <span className="text-sm font-medium text-subtle">Prepared for {company.name}</span>
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-[-0.045em] text-ink sm:text-5xl lg:text-[3.8rem] lg:leading-[1.05]">Energy Management Platform</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted sm:text-xl">Manage solar customers, installations, technicians and ongoing energy performance from one connected platform.</p>
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
        <section aria-labelledby="product-story-heading">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-energy-deep">The product story</p><h2 id="product-story-heading" className="mt-2 text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">Today’s business. The MVP foundation. The future product.</h2></div>
            <p className="max-w-md text-sm leading-6 text-muted">The MVP solves SunGrid’s immediate operating needs while establishing a clear path to a broader software platform.</p>
          </div>
          <Card className="mt-8 p-4 sm:p-6">
            <ol className="grid gap-3 lg:grid-cols-3" aria-label="Product evolution from today to future SaaS">
              {productStory.map(({ label, title, description, icon: Icon, tone }, index) => (
                <li key={label} className="relative rounded-2xl bg-canvas p-5">
                  <div className="flex items-start justify-between gap-4"><span className={`flex size-11 items-center justify-center rounded-2xl ${tone}`}><Icon className="size-5" aria-hidden="true" /></span><span className="font-mono text-xs font-bold text-subtle">0{index + 1}</span></div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.13em] text-energy-deep">{label}</p>
                  <h3 className="mt-2 text-lg font-bold tracking-[-0.02em] text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
                  {index < productStory.length - 1 && <span className="absolute -right-2.5 top-1/2 z-10 hidden size-5 items-center justify-center rounded-full border border-line bg-white text-subtle lg:flex"><ArrowRight className="size-3" aria-hidden="true" /></span>}
                </li>
              ))}
            </ol>
          </Card>
        </section>

        <PlatformArchitecture />

        <section className="flex flex-col gap-5 rounded-[1.4rem] border border-energy-soft bg-energy-pale p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7" aria-labelledby="journey-invitation-heading">
          <div className="flex items-start gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-energy-deep shadow-sm"><Layers3 className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-[0.13em] text-energy-deep">MVP Journey</p><h2 id="journey-invitation-heading" className="mt-1 text-xl font-bold tracking-[-0.025em] text-ink">See how every role connects from customer creation to monitoring.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Eight clear steps show the handover between the office, field technician and customer.</p></div></div>
          <Link to="/mvp-journey" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-ink px-4 text-sm font-bold text-white transition hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2">View MVP Journey <ArrowRight className="size-4" aria-hidden="true" /></Link>
        </section>

        <section aria-labelledby="demo-data-heading" className="rounded-[1.75rem] bg-ink p-5 text-white sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-energy">A consistent demonstration</p>
              <h2 id="demo-data-heading" className="mt-2 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">One Brisbane solar scenario across every screen.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/65">The same customer, site, system and SunGrid team carry through the Admin, Technician and Customer experiences.</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><MapPin className="size-5 text-energy" aria-hidden="true" /><p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/65">Customer and site</p><p className="mt-1 font-bold">{customer?.name}</p><p className="mt-1 text-sm text-white/65">{homeSite.name} · {homeSite.address}</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><SunMedium className="size-5 text-energy" aria-hidden="true" /><p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/65">Solar system</p><p className="mt-1 font-bold">{homeSite.solarCapacityKw} kW Solar System</p><p className="mt-1 text-sm text-white/65">{inverter.manufacturer} {inverter.model.split('-')[0]} Inverter</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><BatteryCharging className="size-5 text-energy" aria-hidden="true" /><p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/65">Battery</p><p className="mt-1 font-bold">{homeSite.batteryCapacityKwh} kWh Battery</p><p className="mt-1 text-sm text-white/65">Connected and monitored</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><Wrench className="size-5 text-energy" aria-hidden="true" /><p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/65">SunGrid team</p><p className="mt-1 font-bold">{admin?.name}</p><p className="mt-1 text-sm text-white/65">Admin · {technician?.name}, Technician</p></div>
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs text-white/65"><UsersRound className="size-4" aria-hidden="true" /> Single-company MVP for {company.name}</div>
        </section>
      </div>
    </div>
  )
}
