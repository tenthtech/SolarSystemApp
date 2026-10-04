import { Check, CheckCircle2, Router, ShieldCheck, Wrench } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Button, LinkButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { FormSection } from '../components/ui/FormSection'
import { Input } from '../components/ui/Input'
import { PageHeader } from '../components/ui/PageHeader'
import { Textarea } from '../components/ui/Textarea'
import { users } from '../data/mockData'
import { RecordNotFound } from '../features/admin/RecordNotFound'
import { useDemoData } from '../features/demo-data/DemoDataContext'
import { InstallationStatusBadge } from '../features/installations/InstallationStatusBadge'
import type { Customer, Installation, Site } from '../types'

type YesNo = 'yes' | 'no'
type InverterConnection = 'connected' | 'not-connected'
type ModbusConnection = 'not-required' | 'connected' | 'not-connected'

interface CompletionFormState {
  siteName: string
  installationAddress: string
  systemSizeKw: string
  inverterManufacturer: string
  inverterModel: string
  inverterSerial: string
  batteryInstalled: YesNo
  batteryManufacturer: string
  batteryModel: string
  batteryCapacityKwh: string
  batterySerial: string
  smartMeterInstalled: YesNo
  smartMeterManufacturer: string
  smartMeterModel: string
  smartMeterSerial: string
  inverterConnection: InverterConnection
  modbus: ModbusConnection
  notes: string
}

type FormErrors = Partial<Record<keyof CompletionFormState, string>>

function ChoiceGroup<T extends string>({ label, value, options, onChange, error }: { label: string; value: T; options: Array<{ value: T; label: string; description?: string }>; onChange: (value: T) => void; error?: string }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-ink">{label}</legend>
      <div className={`grid gap-3 ${options.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {options.map((option) => {
          const selected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={`flex min-h-16 items-start gap-3 rounded-xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue ${selected ? 'border-energy-deep bg-energy-pale ring-1 ring-energy-deep/20' : 'border-line bg-white hover:border-line-strong'}`}
            >
              <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-energy-deep bg-energy-deep text-white' : 'border-line-strong text-transparent'}`}><Check className="size-3" aria-hidden="true" /></span>
              <span><span className="block text-sm font-bold text-ink">{option.label}</span>{option.description && <span className="mt-1 block text-xs leading-5 text-muted">{option.description}</span>}</span>
            </button>
          )
        })}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </fieldset>
  )
}

function InstallationSubmitted({ installation, customer, site }: { installation: Installation; customer: Customer; site: Site }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Breadcrumbs items={[{ label: 'My Jobs', to: '/technician' }, { label: site.name, to: `/technician/jobs/${installation.id}` }, { label: 'Installation Submitted' }]} />
      <Card className="mt-6 overflow-hidden">
        <div className="bg-ink px-6 py-8 text-center text-white sm:px-10 sm:py-10">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-energy text-ink shadow-lg"><CheckCircle2 className="size-8" aria-hidden="true" /></span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-energy">Job complete</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">Installation Submitted</h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-white/65">The installation has been submitted to the Admin for review.</p>
        </div>
        <div className="p-5 sm:p-8">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-line bg-white p-4"><dt className="text-xs font-bold uppercase tracking-wider text-subtle">Customer</dt><dd className="mt-2 font-bold text-ink">{customer.name}</dd></div>
            <div className="rounded-xl border border-line bg-white p-4"><dt className="text-xs font-bold uppercase tracking-wider text-subtle">Site</dt><dd className="mt-2 font-bold text-ink">{site.name}</dd></div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:col-span-2"><dt className="text-xs font-bold uppercase tracking-wider text-amber-800">Status</dt><dd className="mt-2"><InstallationStatusBadge status={installation.status} /></dd></div>
          </dl>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center"><LinkButton to="/technician" variant="outline">Back to My Jobs</LinkButton><LinkButton to={`/technician/jobs/${installation.id}`}>View Installation</LinkButton></div>
        </div>
      </Card>
    </div>
  )
}

function CompletionForm({ installation, customer, site, technicianId }: { installation: Installation; customer: Customer; site: Site; technicianId: string }) {
  const { submitInstallation } = useDemoData()
  const [form, setForm] = useState<CompletionFormState>({
    siteName: site.name,
    installationAddress: site.address,
    systemSizeKw: String(installation.systemSizeKw),
    inverterManufacturer: installation.inverterBrand,
    inverterModel: installation.inverterModel,
    inverterSerial: '',
    batteryInstalled: installation.batteryInstalled ? 'yes' : 'no',
    batteryManufacturer: installation.batteryInstalled ? installation.inverterBrand : '',
    batteryModel: '',
    batteryCapacityKwh: installation.batteryCapacityKwh ? String(installation.batteryCapacityKwh) : '',
    batterySerial: '',
    smartMeterInstalled: installation.smartMeter ? 'yes' : 'no',
    smartMeterManufacturer: installation.smartMeter ? installation.inverterBrand : '',
    smartMeterModel: '',
    smartMeterSerial: '',
    inverterConnection: 'connected',
    modbus: 'not-required',
    notes: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [reviewOpen, setReviewOpen] = useState(false)
  const [actionError, setActionError] = useState('')
  const confirmationRef = useRef<HTMLDivElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const submitGuard = useRef(false)

  function update<K extends keyof CompletionFormState>(field: K, value: CompletionFormState[K]) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setActionError('')
  }

  function setBatteryInstalled(value: YesNo) {
    setForm((current) => value === 'yes' ? { ...current, batteryInstalled: value } : {
      ...current,
      batteryInstalled: value,
      batteryManufacturer: '',
      batteryModel: '',
      batteryCapacityKwh: '',
      batterySerial: '',
    })
    setErrors((current) => ({ ...current, batteryManufacturer: undefined, batteryModel: undefined, batteryCapacityKwh: undefined, batterySerial: undefined }))
  }

  function setSmartMeterInstalled(value: YesNo) {
    setForm((current) => value === 'yes' ? { ...current, smartMeterInstalled: value } : {
      ...current,
      smartMeterInstalled: value,
      smartMeterManufacturer: '',
      smartMeterModel: '',
      smartMeterSerial: '',
    })
    setErrors((current) => ({ ...current, smartMeterManufacturer: undefined, smartMeterModel: undefined, smartMeterSerial: undefined }))
  }

  function validate() {
    const nextErrors: FormErrors = {}
    if (!form.siteName.trim()) nextErrors.siteName = 'Enter the confirmed site name.'
    if (!form.installationAddress.trim()) nextErrors.installationAddress = 'Enter the confirmed installation address.'
    if (!(Number(form.systemSizeKw) > 0)) nextErrors.systemSizeKw = 'Enter a valid system capacity.'
    if (!form.inverterManufacturer.trim()) nextErrors.inverterManufacturer = 'Enter the inverter manufacturer.'
    if (!form.inverterModel.trim()) nextErrors.inverterModel = 'Enter the inverter model.'
    if (!form.inverterSerial.trim()) nextErrors.inverterSerial = 'Enter the inverter serial number.'
    if (form.batteryInstalled === 'yes') {
      if (!form.batteryManufacturer.trim()) nextErrors.batteryManufacturer = 'Enter the battery manufacturer.'
      if (!form.batteryModel.trim()) nextErrors.batteryModel = 'Enter the battery model.'
      if (!(Number(form.batteryCapacityKwh) > 0)) nextErrors.batteryCapacityKwh = 'Enter a valid battery capacity.'
      if (!form.batterySerial.trim()) nextErrors.batterySerial = 'Enter the battery serial number.'
    }
    if (form.smartMeterInstalled === 'yes') {
      if (!form.smartMeterManufacturer.trim()) nextErrors.smartMeterManufacturer = 'Enter the smart meter manufacturer.'
      if (!form.smartMeterModel.trim()) nextErrors.smartMeterModel = 'Enter the smart meter model.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return false
    }
    return true
  }

  function requestSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) return
    setReviewOpen(true)
    requestAnimationFrame(() => confirmationRef.current?.focus())
  }

  function confirmSubmission() {
    if (submitGuard.current) return
    submitGuard.current = true
    const result = submitInstallation(installation.id, technicianId, {
      siteName: form.siteName,
      installationAddress: form.installationAddress,
      systemSizeKw: Number(form.systemSizeKw),
      inverter: { manufacturer: form.inverterManufacturer, model: form.inverterModel, serialNumber: form.inverterSerial },
      battery: form.batteryInstalled === 'yes' ? {
        installed: true,
        manufacturer: form.batteryManufacturer,
        model: form.batteryModel,
        capacityKwh: Number(form.batteryCapacityKwh),
        serialNumber: form.batterySerial,
      } : { installed: false },
      smartMeter: form.smartMeterInstalled === 'yes' ? {
        installed: true,
        manufacturer: form.smartMeterManufacturer,
        model: form.smartMeterModel,
        serialNumber: form.smartMeterSerial || undefined,
      } : { installed: false },
      inverterConnection: form.inverterConnection,
      modbus: form.modbus,
      notes: form.notes,
    })
    if (!result) {
      submitGuard.current = false
      setActionError('This installation could not be submitted. Return to the job and check its current status.')
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Breadcrumbs items={[{ label: 'My Jobs', to: '/technician' }, { label: site.name, to: `/technician/jobs/${installation.id}` }, { label: 'Complete Installation' }]} />
      <div className="mt-5"><PageHeader eyebrow="On-site completion" title="Complete Installation" description={`${customer.name} · ${site.name}`} action={<InstallationStatusBadge status={installation.status} />} /></div>

      <form className="mt-6" onSubmit={requestSubmission} noValidate>
        <Card className="overflow-hidden">
          <FormSection title="Site Confirmation" description="Confirm the final site information and update it if anything changed on site.">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><Input id="completion-site-name" label="Site Name" value={form.siteName} onChange={(event) => update('siteName', event.target.value)} error={errors.siteName} required /></div>
              <div className="sm:col-span-2"><Input id="completion-address" label="Installation Address" value={form.installationAddress} onChange={(event) => update('installationAddress', event.target.value)} error={errors.installationAddress} required /></div>
              <Input id="completion-capacity" type="number" min="0.1" step="0.1" label="System Capacity" value={form.systemSizeKw} onChange={(event) => update('systemSizeKw', event.target.value)} error={errors.systemSizeKw} hint="Capacity in kilowatts (kW)" required />
            </div>
          </FormSection>

          <FormSection title="Inverter" description="Record the inverter that was installed.">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input id="inverter-manufacturer" label="Manufacturer" value={form.inverterManufacturer} onChange={(event) => update('inverterManufacturer', event.target.value)} error={errors.inverterManufacturer} required />
              <Input id="installed-inverter-model" label="Model" value={form.inverterModel} onChange={(event) => update('inverterModel', event.target.value)} error={errors.inverterModel} required />
              <div className="sm:col-span-2"><Input id="inverter-serial" label="Serial Number" placeholder="HW-AU-30984271" value={form.inverterSerial} onChange={(event) => update('inverterSerial', event.target.value)} error={errors.inverterSerial} required /></div>
            </div>
          </FormSection>

          <FormSection title="Battery" description="Record battery details only when a battery was installed.">
            <ChoiceGroup label="Battery Installed?" value={form.batteryInstalled} options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} onChange={setBatteryInstalled} />
            {form.batteryInstalled === 'yes' && <div className="mt-5 grid gap-5 sm:grid-cols-2"><Input id="battery-manufacturer" label="Manufacturer" value={form.batteryManufacturer} onChange={(event) => update('batteryManufacturer', event.target.value)} error={errors.batteryManufacturer} required /><Input id="battery-model" label="Model" value={form.batteryModel} onChange={(event) => update('batteryModel', event.target.value)} error={errors.batteryModel} required /><Input id="battery-capacity" type="number" min="0.1" step="0.1" label="Capacity" value={form.batteryCapacityKwh} onChange={(event) => update('batteryCapacityKwh', event.target.value)} error={errors.batteryCapacityKwh} hint="Capacity in kilowatt-hours (kWh)" required /><Input id="battery-serial" label="Serial Number" value={form.batterySerial} onChange={(event) => update('batterySerial', event.target.value)} error={errors.batterySerial} required /></div>}
          </FormSection>

          <FormSection title="Smart Meter" description="Record the installed meter. The serial number is optional when unavailable.">
            <ChoiceGroup label="Smart Meter Installed?" value={form.smartMeterInstalled} options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} onChange={setSmartMeterInstalled} />
            {form.smartMeterInstalled === 'yes' && <div className="mt-5 grid gap-5 sm:grid-cols-2"><Input id="meter-manufacturer" label="Manufacturer" value={form.smartMeterManufacturer} onChange={(event) => update('smartMeterManufacturer', event.target.value)} error={errors.smartMeterManufacturer} required /><Input id="meter-model" label="Model" value={form.smartMeterModel} onChange={(event) => update('smartMeterModel', event.target.value)} error={errors.smartMeterModel} required /><div className="sm:col-span-2"><Input id="meter-serial" label="Serial Number" value={form.smartMeterSerial} onChange={(event) => update('smartMeterSerial', event.target.value)} hint="Optional if the serial number is not available." /></div></div>}
          </FormSection>

          <FormSection title="Connectivity" description="These checks are simulated for the client demonstration.">
            <div className="space-y-6">
              <div><ChoiceGroup label="Inverter Connection" value={form.inverterConnection} options={[{ value: 'connected', label: 'Connected' }, { value: 'not-connected', label: 'Not Connected' }]} onChange={(value) => update('inverterConnection', value)} />{form.inverterConnection === 'connected' && <p className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"><ShieldCheck className="size-4" aria-hidden="true" /> Connection verified</p>}</div>
              <div><ChoiceGroup label="Modbus" value={form.modbus} options={[{ value: 'not-required', label: 'Not Required' }, { value: 'connected', label: 'Connected' }, { value: 'not-connected', label: 'Not Connected' }]} onChange={(value) => update('modbus', value)} />{form.modbus === 'connected' && <p className="mt-3 flex items-center gap-2 rounded-xl bg-blue-pale px-4 py-3 text-sm font-semibold text-blue-deep"><Router className="size-4" aria-hidden="true" /> Modbus communication available</p>}</div>
            </div>
          </FormSection>

          <FormSection title="Optional Installation Notes" description="Add any final details the Admin should see during review.">
            <Textarea id="technician-notes" label="Installation Notes" placeholder="Installation completed successfully. Inverter communication tested and customer system is online." value={form.notes} onChange={(event) => update('notes', event.target.value)} />
          </FormSection>

          <div className="border-t border-line bg-ink px-5 py-5 text-white sm:px-6">
            {!reviewOpen ? (
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><p className="flex items-center gap-2 text-sm text-white/65"><Wrench className="size-4 text-energy" aria-hidden="true" /> All details remain editable until submission.</p><Button ref={submitButtonRef} type="submit" variant="secondary">Submit for Admin Review</Button></div>
            ) : (
              <div ref={confirmationRef} tabIndex={-1} className="rounded-xl border border-white/15 bg-white/8 p-4 outline-none focus-visible:ring-2 focus-visible:ring-energy" aria-labelledby="submission-confirmation-heading">
                <div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-energy text-ink"><ShieldCheck className="size-5" aria-hidden="true" /></span><div><h2 id="submission-confirmation-heading" className="font-bold text-white">Ready to submit?</h2><p className="mt-1 text-sm leading-6 text-white/70">Please confirm that the installation details and installed equipment are correct.</p></div></div>
                {actionError && <p className="mt-4 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-100" role="alert">{actionError}</p>}
                <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="ghost" className="text-white/75 hover:bg-white/10 hover:text-white" onClick={() => { setReviewOpen(false); requestAnimationFrame(() => submitButtonRef.current?.focus()) }}>Cancel</Button><Button type="button" variant="secondary" onClick={confirmSubmission} disabled={submitGuard.current}>Confirm & Submit</Button></div>
              </div>
            )}
          </div>
        </Card>
      </form>
    </div>
  )
}

export function CompleteInstallationPage() {
  const { installationId = '' } = useParams()
  const { customers, installations, sites } = useDemoData()
  const technician = users.find((user) => user.role === 'technician')!
  const installation = installations.find((item) => item.id === installationId && item.assignedTechnicianId === technician.id)
  const customer = customers.find((item) => item.id === installation?.customerId)
  const site = sites.find((item) => item.id === installation?.siteId)

  if (!installation || !customer || !site) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumbs items={[{ label: 'My Jobs', to: '/technician' }, { label: 'Installation unavailable' }]} />
        <div className="mt-6"><RecordNotFound title="Installation unavailable" description="This installation is not assigned to Daniel or its linked customer and site could not be found." backTo="/technician" backLabel="Back to My Jobs" /></div>
      </div>
    )
  }

  if (installation.status !== 'technician-assigned') {
    return <InstallationSubmitted installation={installation} customer={customer} site={site} />
  }

  return <CompletionForm installation={installation} customer={customer} site={site} technicianId={technician.id} />
}
