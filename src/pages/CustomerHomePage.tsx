import { Activity, BatteryCharging, CloudSun, Gauge, Home, Leaf, PlugZap, Radio, SunMedium, Zap } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { StatusBadge } from '../components/ui/StatusBadge'
import { useCustomerApp } from '../features/customer-app/CustomerAppContext'
import { LiveEnergyFlow } from '../features/customer-app/LiveEnergyFlow'

export function CustomerHomePage() {
  const { site, energy } = useCustomerApp()
  const metrics = [
    { label: "Today's Generation", value: energy.today.generationKwh, unit: 'kWh', icon: SunMedium, tone: 'bg-amber-50 text-amber-700' },
    { label: "Today's Consumption", value: energy.today.consumptionKwh, unit: 'kWh', icon: Home, tone: 'bg-energy-pale text-energy-deep' },
    { label: 'Grid Imported', value: energy.today.importedKwh, unit: 'kWh', icon: PlugZap, tone: 'bg-blue-pale text-blue-deep' },
    { label: 'Grid Exported', value: energy.today.exportedKwh, unit: 'kWh', icon: Zap, tone: 'bg-violet-50 text-violet-700' },
    { label: 'Self Consumption', value: energy.today.selfConsumptionPercent, unit: '%', icon: Leaf, tone: 'bg-emerald-50 text-emerald-700' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-energy-deep">Your solar home</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-[-0.045em] text-ink sm:text-4xl">{site.name}</h1>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-subtle"><Radio className="size-4 text-energy-deep" aria-hidden="true" />Last updated {energy.lastUpdated}</p>
        </div>
        <StatusBadge tone={energy.systemStatus === 'Healthy' ? 'success' : 'warning'} showDot className="px-3 py-2 text-sm">{energy.systemStatus}</StatusBadge>
      </div>

      <div className="mt-6">
        <LiveEnergyFlow live={energy.live} />
      </div>

      <section className="mt-8" aria-labelledby="today-heading">
        <div className="flex items-center justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.13em] text-energy-deep">Performance</p><h2 id="today-heading" className="mt-1 text-xl font-extrabold tracking-[-0.025em] sm:text-2xl">Today at a glance</h2></div>
          <span className="text-xs font-semibold text-subtle">Since midnight</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {metrics.map(({ label, value, unit, icon: Icon, tone }, index) => (
            <Card key={label} className={`min-w-0 p-4 sm:p-5 ${index === metrics.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}>
              <span className={`flex size-9 items-center justify-center rounded-xl ${tone}`}><Icon className="size-4" aria-hidden="true" /></span>
              <p className="mt-4 text-xs font-semibold leading-5 text-subtle">{label}</p>
              <p className="mt-1 truncate text-2xl font-extrabold tracking-[-0.035em] text-ink">{value}<span className="ml-1 text-sm font-bold text-muted">{unit}</span></p>
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Card className="overflow-hidden p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.13em] text-energy-deep">Storage</p><h2 className="mt-1 text-xl font-extrabold tracking-[-0.025em]">Battery</h2></div>
            <span className="flex size-11 items-center justify-center rounded-2xl bg-energy-pale text-energy-deep"><BatteryCharging className="size-5" aria-hidden="true" /></span>
          </div>
          {energy.battery.installed ? (
            <>
              <div className="mt-6 flex items-end justify-between gap-4">
                <div><p className="text-5xl font-extrabold tracking-[-0.055em]">{energy.battery.percent}<span className="text-2xl text-muted">%</span></p><p className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-energy-deep"><Zap className="size-4 fill-current" aria-hidden="true" />{energy.battery.status}</p></div>
                <div className="h-20 w-10 rounded-lg border-2 border-ink p-1" aria-hidden="true"><div className="flex h-full items-end overflow-hidden rounded-sm bg-canvas"><div className="w-full rounded-sm bg-energy" style={{ height: `${energy.battery.percent}%` }} /></div></div>
              </div>
              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-label="Battery charge" aria-valuemin={0} aria-valuemax={100} aria-valuenow={energy.battery.percent}><div className="h-full rounded-full bg-energy-deep" style={{ width: `${energy.battery.percent}%` }} /></div>
              <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-line pt-5 text-center">
                <div><dt className="text-[0.68rem] font-bold uppercase tracking-wide text-subtle">Capacity</dt><dd className="mt-1 text-sm font-extrabold">{energy.battery.capacityKwh} kWh</dd></div>
                <div><dt className="text-[0.68rem] font-bold uppercase tracking-wide text-subtle">Power</dt><dd className="mt-1 text-sm font-extrabold">+{energy.battery.currentPowerKw} kW</dd></div>
                <div><dt className="text-[0.68rem] font-bold uppercase tracking-wide text-subtle">Estimated Full</dt><dd className="mt-1 text-sm font-extrabold">{energy.battery.estimatedFull}</dd></div>
              </dl>
            </>
          ) : <p className="mt-6 rounded-2xl bg-canvas p-5 text-sm font-medium text-muted">No battery is installed at this site.</p>}
        </Card>

        <Card className="overflow-hidden p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.13em] text-blue-deep">Solar forecast</p><h2 className="mt-1 text-xl font-extrabold tracking-[-0.025em]">{energy.weather.location}</h2></div>
            <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-pale text-blue-deep"><CloudSun className="size-5" aria-hidden="true" /></span>
          </div>
          <div className="mt-6 flex items-center gap-4"><SunMedium className="size-12 text-amber-500" strokeWidth={1.7} aria-hidden="true" /><div><p className="text-4xl font-extrabold tracking-[-0.05em]">{energy.weather.temperatureC}°C</p><p className="mt-1 text-sm font-bold text-muted">{energy.weather.condition}</p></div></div>
          <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-line pt-5 text-center">
            <div><dt className="text-[0.68rem] font-bold uppercase tracking-wide text-subtle">Conditions</dt><dd className="mt-1 text-sm font-extrabold text-energy-deep">{energy.weather.solarConditions}</dd></div>
            <div><dt className="text-[0.68rem] font-bold uppercase tracking-wide text-subtle">Expected Generation</dt><dd className="mt-1 text-sm font-extrabold">{energy.weather.expectedGeneration}</dd></div>
            <div><dt className="text-[0.68rem] font-bold uppercase tracking-wide text-subtle">Tomorrow</dt><dd className="mt-1 text-sm font-extrabold">{energy.weather.tomorrow}</dd></div>
          </dl>
          <p className="mt-5 rounded-2xl bg-blue-pale p-4 text-xs leading-5 text-blue-deep">Weather conditions help provide context for expected solar performance.</p>
        </Card>
      </div>

      <section className="mt-8" aria-labelledby="health-heading">
        <Card className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><Activity className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-[0.13em] text-energy-deep">Equipment</p><h2 id="health-heading" className="mt-1 text-xl font-extrabold tracking-[-0.025em]">System Health</h2></div></div>
            <StatusBadge tone={energy.health.overall === 'Healthy' ? 'success' : 'warning'} showDot>{energy.health.overall}</StatusBadge>
          </div>
          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            {[['Inverter', energy.health.inverter], ['Battery', energy.health.battery], ['Smart Meter', energy.health.smartMeter]].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-line bg-canvas px-4 py-3"><dt className="text-sm font-semibold text-muted">{label}</dt><dd className="flex items-center gap-2 text-sm font-extrabold text-ink"><span className={`size-2 rounded-full ${value === 'Online' ? 'bg-emerald-500' : value === 'Attention needed' ? 'bg-amber-500' : 'bg-slate-400'}`} aria-hidden="true" />{value}</dd></div>
            ))}
          </dl>
          <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-subtle"><Gauge className="size-4" aria-hidden="true" />Last Communication: {energy.health.lastCommunication}</p>
        </Card>
      </section>
    </div>
  )
}
