import { MapPin, ShieldCheck, SunMedium, Zap } from 'lucide-react'
import { useEffect, useMemo, useRef } from 'react'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getCustomerEnergyProfile } from '../data/customerEnergyData'
import { devices } from '../data/mockData'
import { CustomerAppProvider, buildCustomerAppQuery, type CustomerEquipmentSummary } from '../features/customer-app/CustomerAppContext'
import { CustomerBottomNavigation } from '../features/customer-app/CustomerBottomNavigation'
import { useDemoData } from '../features/demo-data/DemoDataContext'
import type { Installation, Site } from '../types'

function newestInstallation(installations: Installation[], siteId: string) {
  return installations
    .filter((installation) => installation.siteId === siteId)
    .sort((left, right) => {
      const statusDifference = Number(right.status === 'active') - Number(left.status === 'active')
      if (statusDifference !== 0) return statusDifference
      return new Date(right.activatedAt ?? right.createdAt).getTime() - new Date(left.activatedAt ?? left.createdAt).getTime()
    })[0]
}

function equipmentFor(site: Site, installation?: Installation): CustomerEquipmentSummary {
  const siteDevices = devices.filter((device) => device.siteId === site.id)
  const inverterDevice = siteDevices.find((device) => device.category === 'inverter')
  const batteryDevice = siteDevices.find((device) => device.category === 'battery')
  const submission = installation?.technicianSubmission

  const inverter = submission
    ? `${submission.inverter.manufacturer} ${submission.inverter.model}`
    : inverterDevice
      ? `${inverterDevice.manufacturer} ${inverterDevice.model.startsWith('SUN2000') ? 'SUN2000' : inverterDevice.model}`
      : installation
        ? `${installation.inverterBrand} ${installation.inverterModel}`
        : 'Solar inverter'

  const batteryCapacity = submission?.battery.capacityKwh ?? site.batteryCapacityKwh ?? installation?.batteryCapacityKwh
  const battery = batteryCapacity
    ? `${batteryCapacity} kWh Battery`
    : batteryDevice
      ? batteryDevice.model
      : 'Not installed'

  const smartMeter = submission
    ? submission.smartMeter.installed
      ? [submission.smartMeter.manufacturer, submission.smartMeter.model].filter(Boolean).join(' ') || 'Smart Meter'
      : 'Not installed'
    : installation?.smartMeter
      ? 'Smart Meter'
      : 'Not installed'

  return { inverter, battery, smartMeter }
}

function CustomerEntryState({ title, description }: { title: string; description: string }) {
  return (
    <div className="min-h-screen bg-canvas px-4 py-12 text-ink sm:px-6">
      <div className="mx-auto max-w-lg">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-ink text-energy"><Zap className="size-6 fill-current" aria-hidden="true" /></span>
          <div><p className="font-extrabold tracking-[-0.02em]">SunGrid</p><p className="text-xs font-medium text-subtle">Customer Energy</p></div>
        </div>
        <section className="mt-12 rounded-3xl border border-line bg-white p-7 text-center shadow-card sm:p-9" aria-labelledby="customer-entry-title">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-energy-pale text-energy-deep"><SunMedium className="size-7" aria-hidden="true" /></span>
          <h1 id="customer-entry-title" className="mt-5 text-2xl font-extrabold tracking-[-0.035em]">{title}</h1>
          <p className="mt-3 text-base leading-7 text-muted">{description}</p>
        </section>
      </div>
    </div>
  )
}

export function CustomerAppLayout() {
  const { customers, sites, installations } = useDemoData()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const mainRef = useRef<HTMLElement>(null)
  const requestedCustomerId = searchParams.get('customerId')
  const requestedSiteId = searchParams.get('siteId')

  const customer = useMemo(() => {
    if (requestedCustomerId) return customers.find((item) => item.id === requestedCustomerId)
    return customers.find((item) => item.id === 'cus-1048')
      ?? customers.find((item) => item.accountStatus === 'active' && item.mobileAccessEnabled)
  }, [customers, requestedCustomerId])

  const activeSites = useMemo(() => customer
    ? sites.filter((site) => site.customerId === customer.id && site.status === 'active')
    : [], [customer, sites])

  const site = activeSites.find((item) => item.id === requestedSiteId) ?? activeSites[0]
  const installation = site ? newestInstallation(installations, site.id) : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    mainRef.current?.focus({ preventScroll: true })
  }, [location.pathname])

  if (requestedCustomerId && !customer) {
    return <CustomerEntryState title="Customer app unavailable" description="We could not find an account for this customer app preview." />
  }

  if (!customer || customer.accountStatus !== 'active' || !customer.mobileAccessEnabled) {
    return <CustomerEntryState title={customer ? `Welcome, ${customer.name.split(' ')[0]}` : 'Welcome'} description="Your solar system is not yet active." />
  }

  if (!site) {
    return <CustomerEntryState title="No active site" description="Your account is active, but no active solar site is available yet." />
  }

  const queryString = buildCustomerAppQuery(customer.id, site.id)
  const energy = getCustomerEnergyProfile(site, installation)
  const equipment = equipmentFor(site, installation)

  const selectSite = (siteId: string) => {
    const nextSite = activeSites.find((item) => item.id === siteId)
    if (!nextSite) return
    const nextSearch = new URLSearchParams(searchParams)
    nextSearch.set('customerId', customer.id)
    nextSearch.set('siteId', nextSite.id)
    navigate({ pathname: location.pathname, search: nextSearch.toString() })
  }

  return (
    <CustomerAppProvider value={{ customer, site, activeSites, installation, equipment, energy, queryString, selectSite }}>
      <div className="min-h-screen bg-canvas text-ink">
        <a href="#customer-app-main" className="skip-link">Skip to content</a>
        <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
          <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-ink text-energy"><Zap className="size-5 fill-current" aria-hidden="true" /></span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-subtle">Welcome back, {customer.name.split(' ')[0]}</p>
                <p className="truncate text-sm font-extrabold tracking-[-0.02em] sm:text-base">SunGrid Energy</p>
              </div>
            </div>

            {activeSites.length > 1 ? (
              <label className="relative min-w-0 max-w-[12rem] sm:max-w-xs">
                <span className="sr-only">Select solar site</span>
                <select
                  value={site.id}
                  onChange={(event) => selectSite(event.target.value)}
                  className="min-h-11 w-full appearance-none truncate rounded-xl border border-line bg-white py-2 pl-9 pr-8 text-sm font-bold text-ink outline-none focus:border-energy-deep focus:ring-2 focus:ring-energy-soft"
                >
                  {activeSites.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
                <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-energy-deep" aria-hidden="true" />
              </label>
            ) : (
              <div className={`flex min-w-0 items-center gap-2 rounded-xl px-3 py-2 ${energy.systemStatus === 'Healthy' ? 'bg-energy-pale text-energy-deep' : 'bg-amber-50 text-amber-800'}`} aria-label={`${site.name}, ${site.solarCapacityKw} kilowatt solar system, ${energy.systemStatus}`}>
                <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
                <div className="min-w-0 max-w-28 text-right sm:max-w-none"><p className="truncate text-xs font-bold">{site.name}</p><p className="truncate text-[0.68rem] font-semibold opacity-75">{site.solarCapacityKw} kW · {energy.systemStatus}</p></div>
              </div>
            )}
          </div>
        </header>

        <main id="customer-app-main" ref={mainRef} tabIndex={-1} className="pb-28 outline-none">
          <Outlet />
        </main>
        <CustomerBottomNavigation />
      </div>
    </CustomerAppProvider>
  )
}
