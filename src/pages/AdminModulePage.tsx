import { Boxes, FileChartColumn, HousePlug, Settings, ShieldCheck, Users, Wrench, BellRing } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { EmptyState } from '../components/ui/EmptyState'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import type { LucideIcon } from 'lucide-react'

const modules: Record<string, { title: string; description: string; icon: LucideIcon }> = {
  customers: { title: 'Customers', description: 'Customer records, contacts and connected solar sites will live here.', icon: Users },
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
      <Card>
        <EmptyState
          icon={Icon}
          title={`${currentModule.title} workspace foundation`}
          description="This module is intentionally held at presentation level for Phase 1 foundation. Detailed workflows will be added in the next build stage."
        />
      </Card>
    </div>
  )
}
