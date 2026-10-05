import {
  Activity,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  ClipboardPlus,
  CloudCog,
  DatabaseZap,
  HardHat,
  Power,
  Smartphone,
  UserRoundPlus,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { StatusBadge } from '../components/ui/StatusBadge'

const journeySteps = [
  { title: 'Customer Created', description: 'Admin records the customer and their account details.', icon: UserRoundPlus },
  { title: 'Installation Created', description: 'The site, solar system and installation job are prepared.', icon: ClipboardPlus },
  { title: 'Technician Assigned', description: 'The job and site information are shared with the field team.', icon: HardHat },
  { title: 'Installation Completed', description: 'The technician records equipment and connection checks.', icon: CheckCircle2 },
  { title: 'Admin Review', description: 'The office reviews the completed installation before approval.', icon: ClipboardCheck },
  { title: 'Site Activated', description: 'The approved site is enabled for ongoing monitoring.', icon: Power },
  { title: 'Customer Mobile Access', description: 'The customer can open their solar monitoring experience.', icon: Smartphone },
  { title: 'Continuous Energy Monitoring', description: 'Energy, weather, alerts and reports remain available.', icon: Activity },
]

const deliverables = [
  {
    title: 'Backend Platform',
    description: 'The shared foundation connecting every product experience.',
    icon: DatabaseZap,
    dark: true,
    items: [
      'Authentication foundation',
      'Role management',
      'Customer data',
      'Site data',
      'Installation data',
      'API layer',
      'Inverter integration architecture',
      'Weather integration architecture',
      'Basic Modbus architecture',
      'Historical energy data',
      'Cloud deployment foundation',
    ],
  },
  {
    title: 'Admin Web Platform',
    description: 'Operations for the electrical contractor.',
    icon: Building2,
    items: ['Dashboard', 'Customers', 'Installations', 'Sites', 'Staff', 'Device information', 'Monitoring', 'Alerts', 'Reports'],
  },
  {
    title: 'Technician Portal',
    description: 'A focused field workflow for installation teams.',
    icon: HardHat,
    items: ['Assigned jobs', 'Site information', 'Equipment registration', 'Connectivity status', 'Installation submission'],
  },
  {
    title: 'Customer Mobile App',
    description: 'Clear solar monitoring for the customer.',
    icon: Smartphone,
    items: ['Solar dashboard', 'Energy production', 'Consumption', 'Battery', 'Grid import/export', 'Weather', 'History', 'Alerts', 'Reports'],
  },
]

const experienceLinks = [
  { label: 'Open Admin Platform', to: '/admin', icon: Building2, tone: 'bg-energy-pale text-energy-deep' },
  { label: 'Open Technician Portal', to: '/technician', icon: HardHat, tone: 'bg-blue-pale text-blue-deep' },
  { label: 'Open Customer App', to: '/customer', icon: Smartphone, tone: 'bg-violet-50 text-violet-700' },
]

export function MvpJourneyPage() {
  return (
    <div>
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8 lg:py-20">
          <div>
            <StatusBadge tone="success" showDot>MVP demonstration complete</StatusBadge>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-energy-deep">One connected operating journey</p>
            <h1 className="mt-2 max-w-4xl text-4xl font-bold tracking-[-0.045em] text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">From new customer to live solar monitoring.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">The MVP connects office operations, field installation and the customer experience without losing context between teams.</p>
          </div>
          <div className="grid grid-cols-2 divide-x divide-line rounded-2xl border border-line bg-canvas p-4 lg:w-72">
            <div className="px-3"><p className="text-2xl font-bold text-ink">8</p><p className="mt-1 text-xs leading-5 text-muted">Connected steps</p></div>
            <div className="px-3"><p className="text-2xl font-bold text-ink">4</p><p className="mt-1 text-xs leading-5 text-muted">MVP areas</p></div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] space-y-20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <section className="scroll-mt-24 overflow-hidden rounded-[1.75rem] bg-ink p-5 text-white shadow-hub sm:p-8 lg:p-10" aria-labelledby="journey-heading">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-energy">MVP Journey</p><h2 id="journey-heading" className="mt-2 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">A clear handover at every step.</h2></div>
            <p className="max-w-lg text-sm leading-6 text-white/60">Each role sees what it needs, and the customer gains access only after the installation is reviewed and activated.</p>
          </div>

          <ol className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="MVP customer and installation journey">
            {journeySteps.map(({ title, description, icon: Icon }, index) => (
              <li key={title} className="relative min-w-0 rounded-2xl border border-white/10 bg-white/6 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-energy text-ink"><Icon className="size-5" aria-hidden="true" /></span>
                  <span className="font-mono text-xs font-bold tracking-[0.12em] text-white/55" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-5 text-base font-bold leading-6">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/58">{description}</p>
                {index < journeySteps.length - 1 && index % 4 !== 3 && <span className="absolute -right-2.5 top-1/2 z-10 hidden size-5 items-center justify-center rounded-full bg-energy text-ink xl:flex"><ArrowRight className="size-3" aria-hidden="true" /></span>}
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="deliverables-heading">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-energy-deep">MVP Deliverables</p><h2 id="deliverables-heading" className="mt-2 text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">What the first product foundation delivers.</h2></div>
            <p className="max-w-md text-sm leading-6 text-muted">A shared backend foundation supports three focused experiences for the office, field team and customer.</p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {deliverables.map(({ title, description, icon: Icon, items, dark }) => (
              <article key={title} className={`rounded-[1.4rem] border p-5 shadow-card sm:p-6 ${dark ? 'border-energy/30 bg-ink text-white' : 'border-line bg-white text-ink'}`}>
                <div className="flex items-start gap-4">
                  <span className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${dark ? 'bg-energy text-ink' : 'bg-energy-pale text-energy-deep'}`}><Icon className="size-5" aria-hidden="true" /></span>
                  <div><h3 className="text-xl font-bold tracking-[-0.025em]">{title}</h3><p className={`mt-1 text-sm leading-6 ${dark ? 'text-white/58' : 'text-muted'}`}>{description}</p></div>
                </div>
                <ul className={`mt-6 grid gap-x-5 gap-y-2.5 border-t pt-5 sm:grid-cols-2 ${dark ? 'border-white/10' : 'border-line'}`}>
                  {items.map((item) => (
                    <li key={item} className={`flex items-start gap-2.5 text-sm leading-6 ${dark ? 'text-white/70' : 'text-muted'}`}><span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${dark ? 'bg-white/8 text-energy' : 'bg-canvas text-energy-deep'}`}><Check className="size-3" strokeWidth={2.7} aria-hidden="true" /></span>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="experience-links-heading">
          <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-2xl bg-blue-pale text-blue-deep"><CloudCog className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-[0.13em] text-blue-deep">Working demonstration</p><h2 id="experience-links-heading" className="mt-1 text-xl font-bold text-ink">Follow the journey through each product experience.</h2></div></div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {experienceLinks.map(({ label, to, icon: Icon, tone }) => (
              <Link key={to} to={to} className="group flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy">
                <span className="flex items-center gap-3"><span className={`flex size-10 items-center justify-center rounded-xl ${tone}`}><Icon className="size-5" aria-hidden="true" /></span><span className="text-sm font-bold text-ink">{label}</span></span>
                <ArrowRight className="size-4 text-subtle transition group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
