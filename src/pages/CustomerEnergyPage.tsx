import { ArrowDownToLine, ArrowUpFromLine, Home, Leaf, SunMedium } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import type { EnergyRange } from '../data/customerEnergyData'
import { useCustomerApp } from '../features/customer-app/CustomerAppContext'
import { EnergyHistoryChart } from '../features/customer-app/EnergyHistoryChart'

const ranges: { value: EnergyRange; label: string }[] = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
]

export function CustomerEnergyPage() {
  const { energy } = useCustomerApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedRange = searchParams.get('range')
  const range: EnergyRange = ranges.some((item) => item.value === requestedRange) ? requestedRange as EnergyRange : 'day'
  const history = energy.history[range]
  const summary = [
    { label: 'Generated', value: energy.monthlySummary.generated, icon: SunMedium, tone: 'bg-amber-50 text-amber-700' },
    { label: 'Consumed', value: energy.monthlySummary.consumed, icon: Home, tone: 'bg-energy-pale text-energy-deep' },
    { label: 'Exported', value: energy.monthlySummary.exported, icon: ArrowUpFromLine, tone: 'bg-violet-50 text-violet-700' },
    { label: 'Imported', value: energy.monthlySummary.imported, icon: ArrowDownToLine, tone: 'bg-blue-pale text-blue-deep' },
    { label: 'Self-powered', value: energy.monthlySummary.selfPowered, icon: Leaf, tone: 'bg-emerald-50 text-emerald-700' },
  ]

  const changeRange = (nextRange: EnergyRange) => {
    const next = new URLSearchParams(searchParams)
    next.set('range', nextRange)
    setSearchParams(next, { replace: true })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-energy-deep">Performance history</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">Energy</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">See how your solar, home, battery and grid work together over time.</p>
      </div>

      <div className="mt-6 grid grid-cols-4 rounded-2xl border border-line bg-white p-1.5 shadow-card" aria-label="Energy history range">
        {ranges.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={range === item.value}
            onClick={() => changeRange(item.value)}
            className={`min-h-11 rounded-xl px-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy ${range === item.value ? 'bg-ink text-white' : 'text-muted hover:bg-canvas hover:text-ink'}`}
          >{item.label}</button>
        ))}
      </div>

      <Card className="mt-5 p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-xs font-bold uppercase tracking-[0.13em] text-energy-deep">{range} view</p><h2 className="mt-1 text-xl font-extrabold tracking-[-0.025em] sm:text-2xl">{history.title}</h2></div>
          <p className="text-xs font-semibold text-subtle">{history.subtitle}</p>
        </div>
        <div className="mt-6"><EnergyHistoryChart series={history} /></div>
      </Card>

      <section className="mt-8" aria-labelledby="monthly-summary-heading">
        <div><p className="text-xs font-bold uppercase tracking-[0.13em] text-energy-deep">September 2026</p><h2 id="monthly-summary-heading" className="mt-1 text-xl font-extrabold tracking-[-0.025em] sm:text-2xl">Monthly summary</h2></div>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {summary.map(({ label, value, icon: Icon, tone }, index) => (
            <Card key={label} className={`min-w-0 p-4 sm:p-5 ${index === summary.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}>
              <span className={`flex size-9 items-center justify-center rounded-xl ${tone}`}><Icon className="size-4" aria-hidden="true" /></span>
              <p className="mt-4 text-xs font-semibold text-subtle">{label}</p>
              <p className="mt-1 truncate text-xl font-extrabold tracking-[-0.03em] sm:text-2xl">{value}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
