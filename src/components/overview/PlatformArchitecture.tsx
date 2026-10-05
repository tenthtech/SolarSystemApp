import { CloudSun, Cpu, DatabaseZap, Network, RadioTower, ShieldCheck } from 'lucide-react'
import { productExperiences } from '../../data/mockData'
import { ProductExperienceCard } from './ProductExperienceCard'

const integrations = [
  { label: 'Inverter APIs', detail: 'Solar system performance', icon: RadioTower },
  { label: 'Weather', detail: 'Forecast and solar context', icon: CloudSun },
  { label: 'Modbus', detail: 'Local equipment connection', icon: Cpu },
]

export function PlatformArchitecture() {
  return (
    <section aria-labelledby="platform-map-heading">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-energy-deep">One connected product</p>
          <h2 id="platform-map-heading" className="mt-2 text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">Three experiences. One connected foundation.</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">Customer, installation, site and energy information stays connected from the office to the field and customer.</p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-5">
        {productExperiences.map((experience) => (
          <ProductExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>

      <div className="architecture-connector architecture-connector--green" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[1.4rem] border border-energy/35 bg-ink px-5 py-6 text-white shadow-hub sm:px-7">
        <div className="absolute inset-y-0 left-0 w-1 bg-energy" aria-hidden="true" />
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-energy text-ink">
            <DatabaseZap className="size-6" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-energy">Connected foundation</p>
            <h3 className="mt-1 text-xl font-bold">Energy Platform Backend</h3>
            <p className="mt-1 text-sm leading-6 text-white/58">Customer, installation, site and energy information coordinated through one secure platform layer.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/75">
            <ShieldCheck className="size-4 text-energy" aria-hidden="true" />
            Shared and secure
          </div>
        </div>
      </div>

      <div className="architecture-connector architecture-connector--blue" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="grid gap-3 sm:grid-cols-3" aria-label="Backend data connections">
        {integrations.map(({ label, detail, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl border border-blue/18 bg-blue-pale/55 p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-deep shadow-sm">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">{label}</p>
              <p className="mt-0.5 text-xs text-muted">{detail}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="sr-only">Admin, technician and customer experiences connect to the Energy Platform Backend, which receives information from inverter APIs, weather services and Modbus connections.</p>
      <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-subtle">
        <Network className="size-4" aria-hidden="true" />
        Integration points prepared for technical discovery
      </div>
    </section>
  )
}
