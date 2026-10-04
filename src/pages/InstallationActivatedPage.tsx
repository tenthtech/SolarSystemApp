import { Check, CheckCircle2, HousePlug, KeyRound, Mail, Smartphone, SunMedium, UserRound } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { LinkButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { RecordNotFound } from '../features/admin/RecordNotFound'
import { useDemoData } from '../features/demo-data/DemoDataContext'
import { InstallationStatusBadge } from '../features/installations/InstallationStatusBadge'
import { buildCustomerAppQuery } from '../features/customer-app/CustomerAppContext'

export function InstallationActivatedPage() {
  const { installationId = '' } = useParams()
  const { customers, installations, sites } = useDemoData()
  const installation = installations.find((item) => item.id === installationId && item.status === 'active')
  const customer = customers.find((item) => item.id === installation?.customerId)
  const site = sites.find((item) => item.id === installation?.siteId)

  if (!installation || !customer || !site) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Admin', to: '/admin' }, { label: 'Installations', to: '/admin/installations' }, { label: 'Activation unavailable' }]} />
        <RecordNotFound title="Activation unavailable" description="This installation has not been activated or its linked customer and site could not be found." backTo="/admin/installations" backLabel="Back to Installations" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Admin', to: '/admin' }, { label: 'Installations', to: '/admin/installations' }, { label: 'Installation Activated' }]} />
      <Card className="mx-auto max-w-4xl overflow-hidden">
        <div className="bg-ink px-6 py-8 text-center text-white sm:px-10 sm:py-10">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-energy text-ink shadow-lg"><CheckCircle2 className="size-8" aria-hidden="true" /></span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-energy">Site ready</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">Installation Activated</h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-white/65">The installation is confirmed, the site is active and customer mobile access is enabled.</p>
        </div>

        <div className="p-5 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-line bg-white p-4"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><UserRound className="size-4" aria-hidden="true" /> Customer</p><p className="mt-2 font-bold text-ink">{customer.name}</p></div>
            <div className="rounded-xl border border-line bg-white p-4"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><HousePlug className="size-4" aria-hidden="true" /> Site</p><p className="mt-2 font-bold text-ink">{site.name}</p></div>
            <div className="rounded-xl border border-line bg-white p-4"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><SunMedium className="size-4" aria-hidden="true" /> System</p><p className="mt-2 font-bold text-ink">{site.solarCapacityKw} kW Solar System</p></div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Status</p><div className="mt-2"><InstallationStatusBadge status={installation.status} /></div></div>
          </div>

          <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5" aria-labelledby="mobile-access-heading">
            <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700"><Smartphone className="size-5" aria-hidden="true" /></span><h2 id="mobile-access-heading" className="text-lg font-bold text-ink">Customer Mobile Access</h2></div>
            <ul className="mt-5 space-y-3">
              {['Customer account activated', 'Site linked to customer account', 'Mobile application access enabled'].map((item) => <li key={item} className="flex items-center gap-3 text-sm font-semibold text-ink"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white"><Check className="size-4" aria-hidden="true" /></span>{item}</li>)}
            </ul>
          </section>

          <section className="mt-6 rounded-2xl border border-line bg-canvas p-5" aria-labelledby="credentials-heading">
            <div className="flex items-center gap-3"><KeyRound className="size-5 text-muted" aria-hidden="true" /><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-subtle">Demo credentials</p><h2 id="credentials-heading" className="mt-0.5 font-bold text-ink">Customer sign-in preview</h2></div></div>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2"><div><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-subtle"><Mail className="size-4" aria-hidden="true" /> Email</dt><dd className="mt-2 break-all text-sm font-semibold text-ink">{customer.email}</dd></div><div><dt className="text-xs font-bold uppercase tracking-wider text-subtle">Temporary Password</dt><dd className="mt-2 font-mono text-lg font-bold tracking-[0.2em] text-ink" aria-label="Temporary password hidden">••••••••</dd></div></dl>
            <p className="mt-4 text-xs leading-5 text-subtle">Presentation only. No password is generated or stored in the demo.</p>
          </section>

          <section className="mt-6 rounded-2xl border border-blue/20 bg-blue-pale p-5" aria-labelledby="invitation-heading">
            <h2 id="invitation-heading" className="font-bold text-ink">Customer invitation ready</h2>
            <p className="mt-2 text-sm leading-6 text-muted">In production, the customer would automatically receive an email or SMS with instructions to set their password and download the mobile application.</p>
          </section>

          <div className="mt-7 grid gap-3 sm:grid-cols-3"><LinkButton to={`/admin/customers/${customer.id}`} variant="outline">View Customer</LinkButton><LinkButton to={`/admin/sites/${site.id}`} variant="outline">View Active Site</LinkButton><LinkButton to={`/customer${buildCustomerAppQuery(customer.id, site.id)}`}>Preview Customer App</LinkButton></div>
        </div>
      </Card>
    </div>
  )
}
