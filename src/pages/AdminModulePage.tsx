import { Boxes, FileChartColumn, HousePlug, Settings, ShieldCheck, Users, Wrench, BellRing } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import type { LucideIcon } from 'lucide-react'

const modules: Record<string, { title: string; description: string; icon: LucideIcon }> = {
  customers: { title: 'Customers', description: 'Manage customer records, contacts and connected solar sites.', icon: Users },
  installations: { title: 'Installations', description: 'Plan, assign, review and confirm new solar installations.', icon: Wrench },
  sites: { title: 'Sites', description: 'Monitor residential and commercial energy sites from one portfolio.', icon: HousePlug },
  devices: { title: 'Devices', description: 'Track inverters, batteries and meters connected to each site.', icon: Boxes },
  staff: { title: 'Staff', description: 'Manage administrator and technician access for the SunGrid team.', icon: ShieldCheck },
  alerts: { title: 'Alerts', description: 'Review operational issues and energy performance notifications.', icon: BellRing },
  reports: { title: 'Reports', description: 'Turn installation and energy data into clear business reporting.', icon: FileChartColumn },
  settings: { title: 'Settings', description: 'Configure company details, integrations and platform preferences.', icon: Settings },
}

export function AdminModulePage() {
  const { module = '' } = useParams()
  const currentModule = modules[module] ?? modules.settings
  const Icon = currentModule.icon

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Admin platform" title={currentModule.title} description={currentModule.description} />
      <Card className="p-6 sm:p-8">
        <div className="max-w-2xl">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-energy-pale text-energy-deep"><Icon className="size-6" aria-hidden="true" /></span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-energy-deep">MVP capability</p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-ink">{currentModule.title} in the connected platform</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{currentModule.description} The guided presentation stays focused on the complete customer, installation, activation and monitoring journey.</p>
        </div>
      </Card>
    </div>
  )
}
