import { ArrowRight, BatteryCharging, House, PlugZap, SunMedium } from 'lucide-react'
import type { CustomerEnergyProfile } from '../../data/customerEnergyData'

interface LiveEnergyFlowProps {
  live: CustomerEnergyProfile['live']
}

export function LiveEnergyFlow({ live }: LiveEnergyFlowProps) {
  const items = [
    { label: 'Solar', value: `${live.solarKw} kW`, detail: 'Producing', icon: SunMedium, iconClass: 'bg-amber-400/15 text-amber-300' },
    { label: 'Home', value: `${live.homeKw} kW`, detail: 'Using now', icon: House, iconClass: 'bg-energy/15 text-energy' },
    ...(live.batteryState === 'Not installed' ? [] : [{ label: 'Battery', value: `${live.batteryPercent}%`, detail: live.batteryState, icon: BatteryCharging, iconClass: 'bg-emerald-400/15 text-emerald-300' }]),
    { label: 'Grid', value: `${live.gridKw} kW`, detail: live.gridDirection, icon: PlugZap, iconClass: 'bg-blue-400/15 text-blue-300' },
  ]

  return (
    <section className="overflow-hidden rounded-3xl bg-ink p-5 text-white shadow-hub sm:p-7" aria-labelledby="live-energy-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-energy">Live now</p>
          <h2 id="live-energy-heading" className="mt-1 text-xl font-extrabold tracking-[-0.025em] sm:text-2xl">Your energy is flowing</h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-xs font-bold text-white/70"><span className="size-2 rounded-full bg-energy" aria-hidden="true" />Live estimate</span>
      </div>

      <p className="sr-only">Solar is producing {live.solarKw} kilowatts. The home is using {live.homeKw} kilowatts. {live.batteryState !== 'Not installed' && `The battery is at ${live.batteryPercent} percent and ${live.batteryState.toLowerCase()}. `}The grid is {live.gridDirection.toLowerCase()} {live.gridKw} kilowatts.</p>

      <div className="mt-6 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {items.map(({ label, value, detail, icon: Icon, iconClass }, index) => (
          <div key={label} className="contents">
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/6 p-4 md:flex-col md:items-start md:p-4">
              <span className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${iconClass}`}><Icon className="size-5" strokeWidth={2.1} aria-hidden="true" /></span>
              <div className="min-w-0 md:mt-1">
                <p className="text-xs font-semibold text-white/50">{label}</p>
                <p className="mt-0.5 text-xl font-extrabold tracking-[-0.03em] sm:text-2xl">{value}</p>
                <p className="mt-0.5 text-xs font-bold text-white/65">{detail}</p>
              </div>
            </div>
            {index < items.length - 1 && <ArrowRight className="mx-auto size-5 shrink-0 rotate-90 text-energy/70 md:rotate-0" aria-hidden="true" />}
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm leading-6 text-white/60">{live.batteryState === 'Not installed' ? 'Solar is powering your home. The remaining energy is being sent to the grid.' : 'Solar is powering your home and charging the battery. The remaining energy is being sent to the grid.'}</p>
    </section>
  )
}
