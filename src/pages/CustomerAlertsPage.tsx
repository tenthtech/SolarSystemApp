import { BatteryCharging, Bell, Check, CheckCircle2, RadioTower, SunMedium } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { StatusBadge } from '../components/ui/StatusBadge'
import type { CustomerEnergyAlert } from '../data/customerEnergyData'
import { useCustomerApp } from '../features/customer-app/CustomerAppContext'

const alertPresentation: Record<CustomerEnergyAlert['tone'], { icon: typeof Bell; iconClass: string; borderClass: string }> = {
  success: { icon: CheckCircle2, iconClass: 'bg-emerald-50 text-emerald-700', borderClass: 'border-emerald-200' },
  info: { icon: SunMedium, iconClass: 'bg-blue-pale text-blue-deep', borderClass: 'border-line' },
  resolved: { icon: RadioTower, iconClass: 'bg-slate-100 text-slate-600', borderClass: 'border-line' },
}

export function CustomerAlertsPage() {
  const { energy } = useCustomerApp()

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-energy-deep">Stay informed</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">Alerts</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">Friendly updates about your system, with no technical error codes.</p>
      </div>

      <div className={`mt-6 flex items-start gap-3 rounded-2xl border p-4 sm:p-5 ${energy.systemStatus === 'Healthy' ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
        <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${energy.systemStatus === 'Healthy' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}><Check className="size-5" aria-hidden="true" /></span>
        <div>{energy.systemStatus === 'Healthy' ? <><p className="font-extrabold text-emerald-950">Nothing needs your attention</p><p className="mt-1 text-sm leading-6 text-emerald-800">Your system is healthy. We’ll keep you informed when something useful happens.</p></> : <><p className="font-extrabold text-amber-950">An update is being reviewed</p><p className="mt-1 text-sm leading-6 text-amber-800">Your installer is checking the system connection. No action is required from you.</p></>}</div>
      </div>

      <section className="mt-7 space-y-3" aria-label="System notifications">
        {energy.alerts.map((alert) => {
          const presentation = alertPresentation[alert.tone]
          const Icon = alert.id === 'battery-full' ? BatteryCharging : presentation.icon
          return (
            <Card key={alert.id} className={`p-5 sm:p-6 ${presentation.borderClass}`}>
              <div className="flex items-start gap-4">
                <span className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${presentation.iconClass}`}><Icon className="size-5" aria-hidden="true" /></span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2"><h2 className="text-base font-extrabold tracking-[-0.015em] sm:text-lg">{alert.title}</h2><div className="flex items-center gap-2">{alert.status && <StatusBadge tone="neutral">{alert.status}</StatusBadge>}<span className="text-xs font-semibold text-subtle">{alert.time}</span></div></div>
                  <p className="mt-2 text-sm leading-6 text-muted">{alert.message}</p>
                  {alert.detail && <p className="mt-3 rounded-xl bg-canvas p-3 text-xs leading-5 text-muted">{alert.detail}</p>}
                </div>
              </div>
            </Card>
          )
        })}
      </section>
    </div>
  )
}
