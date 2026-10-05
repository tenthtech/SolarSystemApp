import { ArrowDownToLine, Leaf, SunMedium } from 'lucide-react'
import { energyMetrics, energySeries } from '../../data/mockData'
import { Card } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/StatusBadge'

function createPath(values: number[], width: number, height: number) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width
      const y = height - ((value - min) / range) * (height - 22) - 11
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

const linePath = createPath(energySeries, 640, 170)
const areaPath = `${linePath} L 640 180 L 0 180 Z`

export function EnergyPerformancePanel() {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col justify-between gap-4 border-b border-line px-5 py-5 sm:flex-row sm:items-start sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-ink">Portfolio energy performance</h2>
            <StatusBadge tone="success" showDot>Live</StatusBadge>
          </div>
          <p className="mt-1 text-sm text-muted">Generation across 312 monitored sites today</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-2xl font-bold tracking-tight text-ink">4.82 MWh</p>
          <p className="text-sm font-semibold text-energy-deep">+8.4% vs yesterday</p>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="relative h-44 w-full" aria-label="Solar generation rises through the morning, peaks around midday and eases through the afternoon" role="img">
          <div className="absolute inset-0 flex flex-col justify-between" aria-hidden="true">
            {[0, 1, 2, 3].map((line) => <span key={line} className="block border-t border-dashed border-line" />)}
          </div>
          <svg viewBox="0 0 640 180" className="relative h-full w-full overflow-visible" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="energyArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#32B869" stopOpacity="0.26" />
                <stop offset="100%" stopColor="#32B869" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#energyArea)" />
            <path d={linePath} fill="none" stroke="#239455" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="mt-2 flex justify-between text-xs font-medium text-subtle" aria-hidden="true">
          <span>6 am</span><span>9 am</span><span>12 pm</span><span>3 pm</span><span>6 pm</span>
        </div>

        <div className="mt-6 grid gap-3 border-t border-line pt-5 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><SunMedium className="size-4" aria-hidden="true" /></span>
            <div><p className="text-xs text-subtle">Home - Brisbane</p><p className="text-sm font-bold text-ink">{energyMetrics.generatedTodayKwh} kWh</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-blue-pale text-blue-deep"><ArrowDownToLine className="size-4" aria-hidden="true" /></span>
            <div><p className="text-xs text-subtle">Self powered</p><p className="text-sm font-bold text-ink">{energyMetrics.selfPoweredPercent}%</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-energy-pale text-energy-deep"><Leaf className="size-4" aria-hidden="true" /></span>
            <div><p className="text-xs text-subtle">CO₂ avoided</p><p className="text-sm font-bold text-ink">3.34 t</p></div>
          </div>
        </div>
      </div>
    </Card>
  )
}
