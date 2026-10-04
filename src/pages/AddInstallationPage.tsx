import { BatteryCharging, CalendarDays, Check, HardHat, MapPin, RadioTower, Zap } from 'lucide-react'
import { useMemo, useRef, useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Button, LinkButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { FormSection } from '../components/ui/FormSection'
import { Input } from '../components/ui/Input'
import { PageHeader } from '../components/ui/PageHeader'
import { Select } from '../components/ui/Select'
import { Textarea } from '../components/ui/Textarea'
import { StatusBadge } from '../components/ui/StatusBadge'
import { users } from '../data/mockData'
import { useDemoData } from '../features/demo-data/DemoDataContext'
import type { AustralianAddress, Installation, Site } from '../types'

type YesNo = 'yes' | 'no'
type BatteryChoice = 'none' | 'installed'

interface InstallationFormState {
  customerId: string
  siteName: string
  street: string
  suburb: string
  state: AustralianAddress['state']
  postcode: string
  siteType: Site['type']
  systemSizeKw: string
  inverterBrand: Installation['inverterBrand']
  inverterModel: string
  battery: BatteryChoice
  batteryCapacityKwh: string
  smartMeter: YesNo
  scheduledDate: string
  notes: string
  assignedTechnicianId: string
}

function dateOneWeekFromNow() {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toISOString().slice(0, 10)
}

function ChoiceCard({ selected, title, description, onSelect }: { selected: boolean; title: string; description?: string; onSelect: () => void }) {
  return (
    <button type="button" role="radio" aria-checked={selected} onClick={onSelect} className={`flex min-h-20 w-full items-start gap-3 rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue ${selected ? 'border-energy-deep bg-energy-pale ring-1 ring-energy-deep/20' : 'border-line bg-white hover:border-line-strong'}`}>
      <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-energy-deep bg-energy-deep text-white' : 'border-line-strong text-transparent'}`}><Check className="size-3" aria-hidden="true" /></span>
      <span><span className="block text-sm font-bold text-ink">{title}</span>{description && <span className="mt-1 block text-xs leading-5 text-muted">{description}</span>}</span>
    </button>
  )
}

export function AddInstallationPage() {
  const { customers, addInstallation } = useDemoData()
  const technicians = users.filter((user) => user.role === 'technician')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const requestedCustomerId = searchParams.get('customerId') ?? ''
  const preselectedCustomer = customers.find((customer) => customer.id === requestedCustomerId)
  const [form, setForm] = useState<InstallationFormState>(() => ({
    customerId: preselectedCustomer?.id ?? '',
    siteName: preselectedCustomer ? 'Home - Brisbane' : '',
    street: preselectedCustomer?.address.street ?? '',
    suburb: preselectedCustomer?.address.suburb ?? '',
    state: preselectedCustomer?.address.state ?? 'QLD',
    postcode: preselectedCustomer?.address.postcode ?? '',
    siteType: 'residential',
    systemSizeKw: '',
    inverterBrand: 'Huawei',
    inverterModel: '',
    battery: 'none',
    batteryCapacityKwh: '',
    smartMeter: 'yes',
    scheduledDate: dateOneWeekFromNow(),
    notes: '',
    assignedTechnicianId: technicians[0]?.id ?? '',
  }))
  const [errors, setErrors] = useState<Partial<Record<keyof InstallationFormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const submitGuard = useRef(false)

  const selectedCustomer = useMemo(() => customers.find((customer) => customer.id === form.customerId), [customers, form.customerId])
  const selectedTechnician = technicians.find((technician) => technician.id === form.assignedTechnicianId)

  function update<K extends keyof InstallationFormState>(field: K, value: InstallationFormState[K]) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function selectCustomer(customerId: string) {
    const customer = customers.find((item) => item.id === customerId)
    setForm((current) => ({
      ...current,
      customerId,
      street: customer?.address.street ?? current.street,
      suburb: customer?.address.suburb ?? current.suburb,
      state: customer?.address.state ?? current.state,
      postcode: customer?.address.postcode ?? current.postcode,
    }))
    setErrors((current) => ({ ...current, customerId: undefined }))
  }

  function validate() {
    const nextErrors: Partial<Record<keyof InstallationFormState, string>> = {}
    if (!customers.some((customer) => customer.id === form.customerId)) nextErrors.customerId = 'Select a customer.'
    if (!form.siteName.trim()) nextErrors.siteName = 'Enter a site name.'
    if (!form.street.trim()) nextErrors.street = 'Enter the installation street address.'
    if (!form.suburb.trim()) nextErrors.suburb = 'Enter the suburb.'
    if (!/^\d{4}$/.test(form.postcode)) nextErrors.postcode = 'Enter a 4-digit postcode.'
    if (!(Number(form.systemSizeKw) > 0)) nextErrors.systemSizeKw = 'Enter the planned solar capacity.'
    if (!form.inverterModel.trim()) nextErrors.inverterModel = 'Enter the inverter model.'
    if (form.battery === 'installed' && !(Number(form.batteryCapacityKwh) > 0)) nextErrors.batteryCapacityKwh = 'Enter the battery capacity.'
    if (!form.scheduledDate) nextErrors.scheduledDate = 'Select the planned installation date.'
    if (!technicians.some((technician) => technician.id === form.assignedTechnicianId)) nextErrors.assignedTechnicianId = 'Select a technician.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitGuard.current || !validate()) return
    submitGuard.current = true
    setSubmitting(true)
    const { installation } = addInstallation({
      customerId: form.customerId,
      siteName: form.siteName,
      installationAddress: { street: form.street.trim(), suburb: form.suburb.trim(), state: form.state, postcode: form.postcode },
      siteType: form.siteType,
      systemSizeKw: Number(form.systemSizeKw),
      inverterBrand: form.inverterBrand,
      inverterModel: form.inverterModel,
      batteryInstalled: form.battery === 'installed',
      batteryCapacityKwh: form.battery === 'installed' ? Number(form.batteryCapacityKwh) : undefined,
      smartMeter: form.smartMeter === 'yes',
      scheduledDate: form.scheduledDate,
      notes: form.notes,
      assignedTechnicianId: form.assignedTechnicianId,
    })
    navigate(`/admin/installations/${installation.id}/created`, { replace: true })
  }

  const cancelUrl = preselectedCustomer ? `/admin/customers/${preselectedCustomer.id}` : '/admin/installations'

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Admin', to: '/admin' }, { label: 'Installations', to: '/admin/installations' }, { label: 'Create Installation' }]} />
      <PageHeader eyebrow="Installation management" title="Create Installation" description="Create the site, specify the planned equipment and assign a technician." />

      <form onSubmit={handleSubmit} noValidate>
        <Card className="overflow-hidden">
          <FormSection title="Customer" description="Link this installation to an existing customer record.">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <Select id="installation-customer" label="Customer" value={form.customerId} onChange={(event) => selectCustomer(event.target.value)} error={errors.customerId} disabled={Boolean(preselectedCustomer)} required>
                <option value="">Select a customer</option>
                {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
              </Select>
              {preselectedCustomer && <StatusBadge tone="success">Selected from customer record</StatusBadge>}
            </div>
            {selectedCustomer && <div className="mt-4 flex items-start gap-3 rounded-xl bg-canvas p-4"><MapPin className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" /><div><p className="text-sm font-bold text-ink">{selectedCustomer.name}</p><p className="mt-1 text-sm text-muted">{selectedCustomer.address.street}, {selectedCustomer.address.suburb} {selectedCustomer.address.state} {selectedCustomer.address.postcode}</p></div></div>}
          </FormSection>

          <FormSection title="Site" description="The location and planned solar capacity for this installation.">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><Input id="site-name" label="Site Name" placeholder="Home - Brisbane" value={form.siteName} onChange={(event) => update('siteName', event.target.value)} error={errors.siteName} required /></div>
              <div className="sm:col-span-2"><Input id="installation-street" label="Installation Address" value={form.street} onChange={(event) => update('street', event.target.value)} error={errors.street} required /></div>
              <Input id="installation-suburb" label="Suburb" value={form.suburb} onChange={(event) => update('suburb', event.target.value)} error={errors.suburb} required />
              <div className="grid grid-cols-[1fr_8rem] gap-3"><Select id="installation-state" label="State" value={form.state} onChange={(event) => update('state', event.target.value as AustralianAddress['state'])}>{['QLD', 'NSW', 'VIC', 'SA', 'WA', 'TAS', 'NT', 'ACT'].map((state) => <option key={state}>{state}</option>)}</Select><Input id="installation-postcode" label="Postcode" inputMode="numeric" maxLength={4} value={form.postcode} onChange={(event) => update('postcode', event.target.value.replace(/\D/g, ''))} error={errors.postcode} required /></div>
              <fieldset className="sm:col-span-2"><legend className="mb-2 text-sm font-semibold text-ink">System Type</legend><div role="radiogroup" className="grid gap-3 sm:grid-cols-2"><ChoiceCard selected={form.siteType === 'residential'} title="Residential" description="Home or residential property" onSelect={() => update('siteType', 'residential')} /><ChoiceCard selected={form.siteType === 'commercial'} title="Commercial" description="Business or commercial premises" onSelect={() => update('siteType', 'commercial')} /></div></fieldset>
              <Input id="system-capacity" type="number" min="0.1" step="0.1" label="Solar System Capacity" placeholder="10" value={form.systemSizeKw} onChange={(event) => update('systemSizeKw', event.target.value)} error={errors.systemSizeKw} hint="Capacity in kilowatts (kW)" required />
            </div>
          </FormSection>

          <FormSection title="Planned equipment" description="Record the equipment selected for the proposed system.">
            <div className="grid gap-5 sm:grid-cols-2">
              <Select id="inverter-brand" label="Inverter Brand" value={form.inverterBrand} onChange={(event) => update('inverterBrand', event.target.value as Installation['inverterBrand'])}>{['Huawei', 'Sungrow', 'Fronius', 'GoodWe', 'SolarEdge'].map((brand) => <option key={brand}>{brand}</option>)}</Select>
              <Input id="inverter-model" label="Inverter Model" placeholder="SUN2000-10KTL-M1" value={form.inverterModel} onChange={(event) => update('inverterModel', event.target.value)} error={errors.inverterModel} required />
              <fieldset className="sm:col-span-2"><legend className="mb-2 text-sm font-semibold text-ink">Battery</legend><div role="radiogroup" className="grid gap-3 sm:grid-cols-2"><ChoiceCard selected={form.battery === 'none'} title="None" description="No battery planned" onSelect={() => { update('battery', 'none'); update('batteryCapacityKwh', '') }} /><ChoiceCard selected={form.battery === 'installed'} title="Installed" description="Battery included in the installation" onSelect={() => update('battery', 'installed')} /></div></fieldset>
              {form.battery === 'installed' && <Input id="battery-capacity" type="number" min="0.1" step="0.1" label="Battery Capacity" placeholder="13.5" value={form.batteryCapacityKwh} onChange={(event) => update('batteryCapacityKwh', event.target.value)} error={errors.batteryCapacityKwh} hint="Capacity in kilowatt-hours (kWh)" required />}
              <fieldset className="sm:col-span-2"><legend className="mb-2 text-sm font-semibold text-ink">Smart Meter</legend><div role="radiogroup" className="grid gap-3 sm:grid-cols-2"><ChoiceCard selected={form.smartMeter === 'yes'} title="Yes" description="Include smart meter monitoring" onSelect={() => update('smartMeter', 'yes')} /><ChoiceCard selected={form.smartMeter === 'no'} title="No" description="No smart meter planned" onSelect={() => update('smartMeter', 'no')} /></div></fieldset>
            </div>
          </FormSection>

          <FormSection title="Installation" description="Set the planned date and any information the field team needs.">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input id="installation-date" type="date" label="Planned Installation Date" value={form.scheduledDate} onChange={(event) => update('scheduledDate', event.target.value)} error={errors.scheduledDate} required />
              <div className="sm:col-span-2"><Textarea id="installation-notes" label="Notes" placeholder="Access details, switchboard notes or customer preferences" value={form.notes} onChange={(event) => update('notes', event.target.value)} hint="Optional information for the assigned technician." /></div>
            </div>
          </FormSection>

          <FormSection title="Assign technician" description="Choose the field technician responsible for this installation.">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(16rem,0.8fr)]">
              <Select id="assigned-technician" label="Assigned Technician" value={form.assignedTechnicianId} onChange={(event) => update('assignedTechnicianId', event.target.value)} error={errors.assignedTechnicianId} required><option value="">Select a technician</option>{technicians.map((technician) => <option key={technician.id} value={technician.id}>{technician.name}</option>)}</Select>
              {selectedTechnician && <div className="flex items-center gap-3 rounded-xl border border-line bg-canvas p-4"><span className="flex size-10 items-center justify-center rounded-xl bg-blue-pale text-xs font-bold text-blue-deep">{selectedTechnician.initials}</span><div className="flex-1"><p className="text-sm font-bold text-ink">{selectedTechnician.name}</p><p className="mt-0.5 flex items-center gap-1.5 text-xs text-energy-deep"><span className="size-1.5 rounded-full bg-energy-deep" aria-hidden="true" /> Available</p></div></div>}
            </div>
          </FormSection>

          <div className="border-t border-line bg-ink px-5 py-5 text-white sm:px-6">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/62"><span className="flex items-center gap-2"><Zap className="size-4 text-energy" aria-hidden="true" />{form.systemSizeKw || '—'} kW solar</span><span className="flex items-center gap-2"><RadioTower className="size-4 text-energy" aria-hidden="true" />{form.inverterBrand}</span><span className="flex items-center gap-2"><BatteryCharging className="size-4 text-energy" aria-hidden="true" />{form.battery === 'installed' ? `${form.batteryCapacityKwh || '—'} kWh battery` : 'No battery'}</span><span className="flex items-center gap-2"><CalendarDays className="size-4 text-energy" aria-hidden="true" />{form.scheduledDate || 'Date required'}</span><span className="flex items-center gap-2"><HardHat className="size-4 text-energy" aria-hidden="true" />{selectedTechnician?.name ?? 'Technician required'}</span></div>
              <div className="flex flex-col-reverse gap-3 sm:flex-row"><LinkButton to={cancelUrl} variant="ghost" className="text-white/70 hover:bg-white/10 hover:text-white">Cancel</LinkButton><Button type="submit" variant="secondary" disabled={submitting}>{submitting ? 'Creating installation…' : 'Create Installation'}</Button></div>
            </div>
          </div>
        </Card>
      </form>
    </div>
  )
}
