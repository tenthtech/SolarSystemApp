import { Check, Compass, Layers3, Rocket, Sparkles } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import { roadmapPhases } from '../data/mockData'

const phaseIcons = [Rocket, Layers3, Sparkles]

export function RoadmapPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <PageHeader
        eyebrow="Product roadmap"
        title="Build the operational core. Then scale with confidence."
        description="A focused three-phase path from the first connected customer experience to a commercial multi-company platform."
      />

      <div className="mt-10 rounded-2xl border border-line bg-white p-4 shadow-card sm:p-6">
        <div className="relative grid gap-3 md:grid-cols-3" aria-label="Roadmap progression">
          <div className="absolute left-[16.66%] right-[16.66%] top-5 hidden h-px bg-line md:block" aria-hidden="true" />
          {roadmapPhases.map((phase) => (
            <div key={phase.number} className="relative z-10 flex items-center gap-3 md:flex-col md:text-center">
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-full border-4 border-white text-sm font-extrabold ${phase.number === 1 ? 'bg-energy text-ink shadow-[0_0_0_1px_#9adfb5]' : 'bg-slate-200 text-slate-600 shadow-[0_0_0_1px_#d9e0dc]'}`}>{phase.number}</span>
              <div><p className="text-sm font-bold text-ink">Phase {phase.number}</p><p className="text-xs text-subtle">{phase.name}</p></div>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-6 grid gap-5 lg:grid-cols-3" aria-label="Roadmap phases">
        {roadmapPhases.map((phase, index) => {
          const Icon = phaseIcons[index]
          const current = phase.number === 1
          return (
            <article key={phase.number} className={`relative overflow-hidden rounded-[1.4rem] border bg-white p-5 shadow-card sm:p-6 ${current ? 'border-energy/60 ring-4 ring-energy/8' : 'border-line'}`}>
              {current && <span className="absolute inset-x-0 top-0 h-1 bg-energy" aria-hidden="true" />}
              <div className="flex items-start justify-between gap-4">
                <span className={`flex size-11 items-center justify-center rounded-2xl ${current ? 'bg-energy text-ink' : 'bg-canvas text-muted'}`}><Icon className="size-5" aria-hidden="true" /></span>
                <span className="font-mono text-xs font-bold tracking-[0.12em] text-subtle">0{phase.number}</span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-subtle">Phase {phase.number}</p>
                {phase.status && <StatusBadge tone="success" showDot>{phase.status}</StatusBadge>}
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-ink">{phase.name}</h2>
              <p className="mt-3 min-h-[72px] text-sm leading-6 text-muted">{phase.description}</p>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                    <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${current ? 'bg-energy-pale text-energy-deep' : 'bg-canvas text-subtle'}`}><Check className="size-3" strokeWidth={2.7} aria-hidden="true" /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </section>

      <section className="mt-8 flex flex-col gap-5 rounded-2xl border border-blue/20 bg-blue-pale/55 p-5 sm:flex-row sm:items-center sm:p-6" aria-label="Roadmap principle">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-deep shadow-sm"><Compass className="size-5" aria-hidden="true" /></span>
        <div><h2 className="text-base font-bold text-ink">The MVP stays intentionally focused.</h2><p className="mt-1 text-sm leading-6 text-muted">One electrical company, clear role ownership and proven energy integrations come first. Company registration, subscriptions and multi-tenant complexity remain in Phase 3.</p></div>
      </section>
    </div>
  )
}
