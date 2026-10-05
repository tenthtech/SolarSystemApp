import { BatteryCharging, CloudSun, Gauge, Home, Leaf, PlugZap, Smartphone, SunMedium, Zap } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import { energyMetrics, sites, users } from '../data/mockData'

const appCapabilities = [
  'Live production & consumption',
  'Battery and grid flow',
  'Weather context',
  'Historical performance',
]

export function CustomerAppPage() {
  const customer = users.find((user) => user.role === 'customer')!
  const site = sites[0]

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <PageHeader
        eyebrow="Customer experience"
        title="Customer Mobile App"
        description="A calm, everyday view of solar performance that helps customers understand where their energy comes from."
        action={<StatusBadge tone="success">MVP experience</StatusBadge>}
      />

      <div className="mt-10 grid min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-energy-deep">Clarity, not complexity</p>
          <h2 className="mt-2 max-w-xl text-3xl font-bold tracking-[-0.035em] text-ink">Make clean energy feel tangible every day.</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">The mobile experience turns inverter, battery, grid and weather data into a simple story customers can check in seconds.</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {appCapabilities.map((capability, index) => {
              const icons = [SunMedium, BatteryCharging, CloudSun, Gauge]
              const Icon = icons[index]
              return <Card key={capability} className="flex items-center gap-3 p-4"><span className="flex size-9 items-center justify-center rounded-xl bg-energy-pale text-energy-deep"><Icon className="size-4" aria-hidden="true" /></span><span className="text-sm font-semibold text-ink">{capability}</span></Card>
            })}
          </div>

          <div className="mt-7 flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
            <Smartphone className="mt-0.5 size-5 shrink-0 text-subtle" aria-hidden="true" />
            <p className="text-sm leading-6 text-muted"><span className="font-bold text-ink">Connected experience:</span> live energy, history, alerts and reports stay available through clear customer navigation.</p>
          </div>
        </div>

        <div className="order-1 mx-auto min-w-0 w-full max-w-[22rem] sm:max-w-[25rem] lg:order-2">
          <div className="rounded-[2.8rem] bg-ink p-2.5 shadow-device">
            <div className="overflow-hidden rounded-[2.25rem] bg-canvas">
              <div className="relative bg-ink px-5 pb-6 pt-5 text-white">
                <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/16" aria-hidden="true" />
                <div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-2"><span className="flex size-8 items-center justify-center rounded-xl bg-energy text-ink"><Zap className="size-4 fill-current" aria-hidden="true" /></span><span className="text-sm font-bold">SunGrid</span></div><span className="flex size-8 items-center justify-center rounded-xl bg-white/10 text-xs font-bold">{customer.initials}</span></div>
                <p className="mt-7 text-sm text-white/55">Good afternoon, James</p>
                <h2 className="mt-1 text-xl font-bold">Your home is running on sunshine.</h2>
              </div>
              <div className="space-y-4 p-4">
                <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-subtle">{site.name}</p><p className="mt-1 text-sm font-semibold text-ink">Live energy flow</p></div><StatusBadge tone="success" showDot>Online</StatusBadge></div>
                <Card className="p-4">
                  <div className="grid grid-cols-3 items-center gap-2 text-center">
                    <div><span className="mx-auto flex size-11 items-center justify-center rounded-full bg-amber-50 text-amber-600"><SunMedium className="size-5" aria-hidden="true" /></span><p className="mt-2 text-xs text-subtle">Solar</p><p className="text-base font-bold text-ink">{energyMetrics.solarProductionKw} kW</p></div>
                    <div className="relative"><span className="absolute inset-x-[-1rem] top-5 border-t border-dashed border-energy/45" aria-hidden="true" /><span className="relative mx-auto flex size-12 items-center justify-center rounded-2xl bg-energy text-ink shadow-sm"><Home className="size-5" aria-hidden="true" /></span><p className="mt-2 text-xs text-subtle">Home</p><p className="text-base font-bold text-ink">{energyMetrics.consumptionKw} kW</p></div>
                    <div><span className="mx-auto flex size-11 items-center justify-center rounded-full bg-blue-pale text-blue-deep"><PlugZap className="size-5" aria-hidden="true" /></span><p className="mt-2 text-xs text-subtle">Grid</p><p className="text-base font-bold text-ink">1.8 kW out</p></div>
                  </div>
                </Card>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-line bg-white p-4"><BatteryCharging className="size-5 text-energy-deep" aria-hidden="true" /><p className="mt-3 text-xs text-subtle">Battery</p><p className="text-xl font-bold text-ink">{energyMetrics.batteryPercent}%</p></div>
                  <div className="rounded-2xl border border-line bg-white p-4"><Leaf className="size-5 text-energy-deep" aria-hidden="true" /><p className="mt-3 text-xs text-subtle">Self powered</p><p className="text-xl font-bold text-ink">{energyMetrics.selfPoweredPercent}%</p></div>
                </div>
                <nav className="flex items-center justify-around rounded-2xl border border-line bg-white p-2" aria-label="Customer app navigation"><span className="flex min-h-10 flex-col items-center justify-center gap-0.5 rounded-xl bg-energy-pale px-4 text-[11px] font-bold text-energy-deep"><Home className="size-4" aria-hidden="true" />Home</span><span className="flex min-h-10 flex-col items-center justify-center gap-0.5 px-4 text-[11px] font-semibold text-subtle"><Gauge className="size-4" aria-hidden="true" />History</span><span className="flex min-h-10 flex-col items-center justify-center gap-0.5 px-4 text-[11px] font-semibold text-subtle"><CloudSun className="size-4" aria-hidden="true" />Weather</span></nav>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs font-medium text-subtle">Customer access begins after administrator confirmation.</p>
        </div>
      </div>
    </div>
  )
}
