import { ArrowUpRight, BatteryCharging, Building2, Headphones, Mail, MapPin, MessageCircle, Phone, ShieldCheck, SunMedium, Zap } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { StatusBadge } from '../components/ui/StatusBadge'
import { useCustomerApp } from '../features/customer-app/CustomerAppContext'
import { getCustomerInitials } from '../features/demo-data/DemoDataContext'

export function CustomerProfilePage() {
  const { customer, site, equipment } = useCustomerApp()
  const [feedback, setFeedback] = useState('')

  const simulateContact = (type: 'contact' | 'support') => {
    setFeedback(type === 'contact'
      ? 'Installer contact opened for this presentation. No message was sent.'
      : 'Support request started for this presentation. No request was submitted.')
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-energy-deep">Your account</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">Profile</h1>
      </div>

      <Card className="mt-6 p-5 sm:p-7">
        <div className="flex items-center gap-4">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-3xl bg-ink text-xl font-extrabold text-energy">{getCustomerInitials(customer)}</span>
          <div className="min-w-0"><h2 className="truncate text-2xl font-extrabold tracking-[-0.035em]">{customer.name}</h2><p className="mt-1 text-sm font-semibold text-energy-deep">Customer account active</p></div>
        </div>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-canvas p-4"><Mail className="size-5 shrink-0 text-subtle" aria-hidden="true" /><div className="min-w-0"><dt className="text-xs font-semibold text-subtle">Email</dt><dd className="mt-1 truncate text-sm font-extrabold">{customer.email}</dd></div></div>
          <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-canvas p-4"><Phone className="size-5 shrink-0 text-subtle" aria-hidden="true" /><div className="min-w-0"><dt className="text-xs font-semibold text-subtle">Phone</dt><dd className="mt-1 text-sm font-extrabold">{customer.phone}</dd></div></div>
        </dl>
      </Card>

      <section className="mt-7" aria-labelledby="installation-heading">
        <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-2xl bg-energy-pale text-energy-deep"><SunMedium className="size-5" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-[0.13em] text-energy-deep">System details</p><h2 id="installation-heading" className="mt-1 text-xl font-extrabold tracking-[-0.025em]">My Installation</h2></div></div>
        <Card className="mt-4 overflow-hidden">
          <div className="border-b border-line bg-ink p-5 text-white sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><h3 className="text-xl font-extrabold tracking-[-0.025em]">{site.name}</h3><p className="mt-2 flex items-start gap-2 text-sm leading-6 text-white/55"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{site.address}</p></div><StatusBadge tone="success" showDot>Active</StatusBadge></div>
          </div>
          <dl className="grid gap-px bg-line sm:grid-cols-2">
            <div className="flex items-center gap-3 bg-white p-5"><SunMedium className="size-5 shrink-0 text-amber-600" aria-hidden="true" /><div><dt className="text-xs font-semibold text-subtle">Solar system</dt><dd className="mt-1 font-extrabold">{site.solarCapacityKw} kW Solar System</dd></div></div>
            <div className="flex items-center gap-3 bg-white p-5"><Zap className="size-5 shrink-0 text-energy-deep" aria-hidden="true" /><div><dt className="text-xs font-semibold text-subtle">Inverter</dt><dd className="mt-1 font-extrabold">{equipment.inverter}</dd></div></div>
            <div className="flex items-center gap-3 bg-white p-5"><BatteryCharging className="size-5 shrink-0 text-energy-deep" aria-hidden="true" /><div><dt className="text-xs font-semibold text-subtle">Battery</dt><dd className="mt-1 font-extrabold">{equipment.battery}</dd></div></div>
            <div className="flex items-center gap-3 bg-white p-5"><ShieldCheck className="size-5 shrink-0 text-emerald-700" aria-hidden="true" /><div><dt className="text-xs font-semibold text-subtle">Installation Status</dt><dd className="mt-1 font-extrabold">Active</dd></div></div>
          </dl>
        </Card>
      </section>

      <section className="mt-7" aria-labelledby="installer-heading">
        <Card className="p-5 sm:p-6">
          <div className="flex items-start gap-4"><span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-pale text-blue-deep"><Building2 className="size-6" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-[0.13em] text-blue-deep">Installer</p><h2 id="installer-heading" className="mt-1 text-lg font-extrabold">SunGrid Electrical &amp; Solar</h2><p className="mt-1 text-sm text-muted">Brisbane, Queensland</p></div></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button variant="outline" size="lg" leadingIcon={<MessageCircle className="size-4" aria-hidden="true" />} onClick={() => simulateContact('contact')}>Contact Installer</Button>
            <Button size="lg" leadingIcon={<Headphones className="size-4" aria-hidden="true" />} onClick={() => simulateContact('support')}>Request Support</Button>
          </div>
          <p className="mt-4 min-h-5 text-center text-xs font-semibold text-energy-deep" role="status" aria-live="polite">{feedback}</p>
        </Card>
      </section>

      <div className="mt-6 text-center">
        <Link to="/overview" className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-xs font-bold text-muted hover:bg-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy" aria-label="Return to the SunGrid demo overview">Demo overview <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
      </div>
    </div>
  )
}
