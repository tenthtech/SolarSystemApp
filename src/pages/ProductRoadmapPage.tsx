import {
  ArrowDown,
  ArrowRight,
  Building2,
  Check,
  CreditCard,
  Layers3,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  UserPlus,
  UsersRound,
  Wrench,
} from 'lucide-react'
import { StatusBadge } from '../components/ui/StatusBadge'
import { roadmapPhases } from '../data/mockData'

const phaseIcons = [Rocket, Wrench, Layers3]

const phaseMeta = [
  { badge: 'Current Product Foundation', tone: 'success' as const, listLabel: 'What is included' },
  { badge: 'Future Enhancements', tone: 'info' as const, listLabel: 'Potential features' },
  { badge: 'Future SaaS', tone: 'neutral' as const, listLabel: 'Future capabilities' },
]

const registrationSteps = [
  { label: 'Company creates account', icon: UserPlus },
  { label: 'Selects subscription', icon: CreditCard },
  { label: 'Creates company workspace', icon: Building2 },
  { label: 'Adds staff', icon: UsersRound },
  { label: 'Adds customers', icon: UserPlus },
  { label: 'Connects solar systems', icon: Sparkles },
  { label: 'Uses branded platform', icon: Palette },
]

const companyWorkspace = ['Own Admin', 'Own Staff', 'Own Customers', 'Own Sites', 'Secure separated data']

const visionStages = [
  { label: 'Stage 1', title: 'Internal Energy Management Platform', icon: Building2 },
  { label: 'Stage 2', title: 'Complete Solar Business Operations Platform', icon: Wrench },
  { label: 'Stage 3', title: 'Commercial Multi-Company SaaS', icon: Layers3 },
]

export function ProductRoadmapPage() {
  return (
    <div>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <StatusBadge tone="info">Product roadmap</StatusBadge>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-[-0.045em] text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">Build the operational core. Then scale with confidence.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">A three-stage path from SunGrid’s internal energy platform to a complete business operations system and, eventually, commercial multi-company software.</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] space-y-20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <section aria-labelledby="roadmap-stages-heading">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-energy-deep">Three clear stages</p><h2 id="roadmap-stages-heading" className="mt-2 text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">Start focused. Grow deliberately.</h2></div>
            <p className="max-w-md text-sm leading-6 text-muted">Phase 1 proves the connected product internally. Later stages remain future opportunities, not MVP commitments.</p>
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-white p-4 shadow-card sm:p-6">
            <ol className="relative grid gap-3 before:absolute before:left-[16.66%] before:right-[16.66%] before:top-5 before:hidden before:h-px before:bg-line before:content-[''] md:grid-cols-3 md:before:block" aria-label="Roadmap progression">
              {roadmapPhases.map((phase) => (
                <li key={phase.number} className="relative z-10 flex items-center gap-3 md:flex-col md:text-center">
                  <span className={`flex size-10 shrink-0 items-center justify-center rounded-full border-4 border-white text-sm font-extrabold ${phase.number === 1 ? 'bg-energy text-ink shadow-[0_0_0_1px_#9adfb5]' : 'bg-slate-200 text-slate-600 shadow-[0_0_0_1px_#d9e0dc]'}`}>{phase.number}</span>
                  <div><p className="text-sm font-bold text-ink">Phase {phase.number}</p><p className="text-xs text-muted">{phase.name}</p></div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {roadmapPhases.map((phase, index) => {
              const Icon = phaseIcons[index]
              const meta = phaseMeta[index]
              const current = phase.number === 1
              return (
                <article key={phase.number} className={`relative overflow-hidden rounded-[1.4rem] border bg-white p-5 shadow-card sm:p-6 ${current ? 'border-energy/60 ring-4 ring-energy/8' : 'border-line'}`}>
                  {current && <span className="absolute inset-x-0 top-0 h-1 bg-energy" aria-hidden="true" />}
                  <div className="flex items-start justify-between gap-4"><span className={`flex size-11 items-center justify-center rounded-2xl ${current ? 'bg-energy text-ink' : 'bg-canvas text-muted'}`}><Icon className="size-5" aria-hidden="true" /></span><span className="font-mono text-xs font-bold tracking-[0.12em] text-subtle" aria-hidden="true">0{phase.number}</span></div>
                  <div className="mt-6"><StatusBadge tone={meta.tone} showDot={current}>{meta.badge}</StatusBadge></div>
                  {!current && <p className="mt-5 text-xs font-bold uppercase tracking-[0.13em] text-muted">Phase {phase.number}</p>}
                  <h3 className={`${current ? 'mt-5' : 'mt-2'} text-2xl font-bold tracking-[-0.03em] text-ink`}>{current ? 'Phase 1 – MVP' : phase.name}</h3>
                  <p className="mt-3 min-h-[96px] text-sm leading-6 text-muted"><span className="font-bold text-ink">Goal:</span> {phase.description}</p>
                  {current && (
                    <section className="rounded-2xl border border-energy-soft bg-energy-pale/70 p-4" aria-label="Phase 1 MVP pricing estimate">
                      <h4 className="sr-only">Phase 1 – MVP pricing</h4>
                      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        <div className="rounded-xl border border-energy-soft bg-white/80 p-3.5">
                          <dt className="text-xs font-bold uppercase tracking-[0.11em] text-energy-deep">Estimated Timeline</dt>
                          <dd className="mt-1.5 text-sm font-bold leading-6 text-ink">Approximately 3 months</dd>
                        </div>
                        <div className="rounded-xl border border-energy-soft bg-white/80 p-3.5">
                          <dt className="text-xs font-bold uppercase tracking-[0.11em] text-energy-deep">Estimated Development Effort</dt>
                          <dd className="mt-1.5 text-sm font-bold leading-6 text-ink">Approximately 580–700 hours</dd>
                        </div>
                      </dl>

                      <div className="mt-3 rounded-xl bg-ink p-4 text-white shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-energy">Fixed MVP Investment</p>
                        <p className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">AUD $11,000</p>
                      </div>

                      <p className="mt-3 text-xs leading-5 text-muted">Based on the estimated 580–700 development hours, the fixed MVP investment represents an approximate blended development rate of <strong className="font-bold text-ink">AUD $16–19/hour</strong>.</p>
                      <p className="mt-4 border-t border-energy-soft pt-4 text-xs leading-5 text-muted">This pricing is based on the current MVP understanding. The final deliverables, milestones, integration requirements, and development schedule will be confirmed during the discovery and technical scoping process before development begins.</p>
                    </section>
                  )}
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.13em] text-muted">{meta.listLabel}</p>
                  <ul className="mt-3 space-y-2.5 border-t border-line pt-5">
                    {phase.items.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-muted"><span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${current ? 'bg-energy-pale text-energy-deep' : 'bg-canvas text-subtle'}`}><Check className="size-3" strokeWidth={2.7} aria-hidden="true" /></span>{item}</li>)}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-blue/20 bg-blue-pale/55 p-5 sm:p-8 lg:p-10" aria-labelledby="saas-transformation-heading">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><StatusBadge tone="info">Future SaaS Experience</StatusBadge><h2 id="saas-transformation-heading" className="mt-4 text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">From one electrical company to many.</h2></div><p className="max-w-lg text-sm leading-6 text-muted">This is a conceptual preview of a future commercial experience. It is not available in the MVP.</p></div>

          <div className="mt-8 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-2xl border border-line bg-white p-5 text-center shadow-card"><span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-energy-pale text-energy-deep"><Building2 className="size-6" aria-hidden="true" /></span><p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-subtle">MVP</p><h3 className="mt-1 text-lg font-bold text-ink">One Electrical Company</h3><p className="mt-2 text-sm text-muted">SunGrid operates one connected workspace.</p></div>
            <ArrowRight className="mx-auto hidden size-5 text-blue-deep md:block" aria-hidden="true" /><ArrowDown className="mx-auto size-5 text-blue-deep md:hidden" aria-hidden="true" />
            <div className="rounded-2xl border border-blue/25 bg-white p-5 text-center shadow-card"><span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-pale text-blue-deep"><UsersRound className="size-6" aria-hidden="true" /></span><p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-blue-deep">Future SaaS</p><h3 className="mt-1 text-lg font-bold text-ink">Multiple Electrical Companies</h3><p className="mt-2 text-sm text-muted">Each company operates its own secure workspace.</p></div>
          </div>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5" aria-label="Future company workspace capabilities">
            {companyWorkspace.map((item) => <li key={item} className="flex items-center gap-2 rounded-xl border border-blue/15 bg-white/80 px-3 py-3 text-sm font-bold text-ink"><ShieldCheck className="size-4 shrink-0 text-blue-deep" aria-hidden="true" />{item}</li>)}
          </ul>

          <div className="mt-10 border-t border-blue/15 pt-8">
            <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-deep">Concept preview · Not available in the MVP</p><h3 className="mt-2 text-xl font-bold tracking-[-0.025em] text-ink">How another electrical company could join.</h3></div>
            <ol className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-7" aria-label="Future company registration preview">
              {registrationSteps.map(({ label, icon: Icon }, index) => <li key={label} className="relative rounded-xl border border-blue/15 bg-white p-3"><div className="flex items-center justify-between gap-2"><span className="flex size-8 items-center justify-center rounded-lg bg-blue-pale text-blue-deep"><Icon className="size-4" aria-hidden="true" /></span><span className="font-mono text-[0.68rem] font-bold text-subtle" aria-hidden="true">0{index + 1}</span></div><p className="mt-3 text-sm font-bold leading-5 text-ink">{label}</p>{index < registrationSteps.length - 1 && <ArrowRight className="absolute -right-2 top-1/2 z-10 hidden size-4 -translate-y-1/2 text-blue/40 lg:block" aria-hidden="true" />}</li>)}
            </ol>
          </div>
        </section>

        <section className="overflow-hidden rounded-[1.75rem] bg-ink p-5 text-white shadow-hub sm:p-8 lg:p-10" aria-labelledby="end-vision-heading">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-energy">End Product Vision</p>
          <h2 id="end-vision-heading" className="mt-2 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">From Internal Platform to Energy SaaS</h2>
          <div className="mt-8 grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {visionStages.map(({ label, title, icon: Icon }, index) => (
              <div key={label} className="contents">
                <div className="rounded-2xl border border-white/10 bg-white/6 p-5"><span className="flex size-10 items-center justify-center rounded-xl bg-energy text-ink"><Icon className="size-5" aria-hidden="true" /></span><p className="mt-4 text-xs font-bold uppercase tracking-[0.13em] text-energy">{label}</p><h3 className="mt-2 text-lg font-bold leading-6">{title}</h3></div>
                {index < visionStages.length - 1 && <><ArrowRight className="mx-auto hidden size-5 text-energy lg:block" aria-hidden="true" /><ArrowDown className="mx-auto size-5 text-energy lg:hidden" aria-hidden="true" /></>}
              </div>
            ))}
          </div>
          <blockquote className="mt-8 max-w-3xl text-lg font-semibold leading-8 text-white/75">“The MVP is designed as the foundation of the eventual product rather than a disposable prototype.”</blockquote>
        </section>
      </div>
    </div>
  )
}
