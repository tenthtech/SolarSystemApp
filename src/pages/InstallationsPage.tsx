import { Search, Wrench } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { LinkButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { Input } from '../components/ui/Input'
import { PageHeader } from '../components/ui/PageHeader'
import { InstallationsTable } from '../features/admin/InstallationsTable'
import { useDemoData } from '../features/demo-data/DemoDataContext'
import { formatInstallationStatus } from '../lib/formatters'

export function InstallationsPage() {
  const { customers, sites, installations } = useDemoData()
  const [search, setSearch] = useState('')

  const filteredInstallations = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return installations
    return installations.filter((installation) => {
      const customer = customers.find((item) => item.id === installation.customerId)
      const site = sites.find((item) => item.id === installation.siteId)
      return [customer?.name, site?.name, installation.inverterBrand, installation.inverterModel, formatInstallationStatus(installation.status)]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query))
    })
  }, [customers, installations, search, sites])

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Admin', to: '/admin' }, { label: 'Installations' }]} />
      <PageHeader
        eyebrow="Installation management"
        title="Installations"
        description="Review assigned work, technician submissions and active solar systems."
        action={<LinkButton to="/admin/installations/new">Create Installation</LinkButton>}
      />

      <Card className="overflow-hidden">
        <div className="border-b border-line p-4 sm:p-5">
          <div className="max-w-xl"><Input id="installation-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customer, site or equipment" aria-label="Search installations" leadingIcon={<Search className="size-4" />} /></div>
        </div>
        <div className="flex items-center justify-between border-b border-line px-5 py-3 text-sm"><span className="font-semibold text-ink">{filteredInstallations.length} {filteredInstallations.length === 1 ? 'installation' : 'installations'}</span>{search && <button type="button" onClick={() => setSearch('')} className="min-h-9 rounded-lg px-2 font-semibold text-blue-deep hover:bg-blue-pale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue">Clear search</button>}</div>
        <InstallationsTable
          installations={filteredInstallations}
          emptyState={<EmptyState compact icon={Wrench} title="No installations found" description="Try a different search, or create a new installation." />}
        />
      </Card>
    </div>
  )
}
