import { useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Button, LinkButton } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { FormSection } from '../components/ui/FormSection'
import { Input } from '../components/ui/Input'
import { PageHeader } from '../components/ui/PageHeader'
import { Select } from '../components/ui/Select'
import { useDemoData } from '../features/demo-data/DemoDataContext'
import type { AustralianAddress } from '../types'

interface CustomerFormState {
  name: string
  email: string
  phone: string
  street: string
  suburb: string
  state: AustralianAddress['state']
  postcode: string
}

const initialForm: CustomerFormState = {
  name: '',
  email: '',
  phone: '',
  street: '',
  suburb: '',
  state: 'QLD',
  postcode: '',
}

export function AddCustomerPage() {
  const { addCustomer } = useDemoData()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerFormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const submitGuard = useRef(false)

  function update<K extends keyof CustomerFormState>(field: K, value: CustomerFormState[K]) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function validate() {
    const nextErrors: Partial<Record<keyof CustomerFormState, string>> = {}
    if (!form.name.trim()) nextErrors.name = 'Enter the customer’s full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.'
    const phoneDigits = form.phone.replace(/\D/g, '')
    if (phoneDigits.length < 9 || phoneDigits.length > 12) nextErrors.phone = 'Enter a valid Australian phone number.'
    if (!form.street.trim()) nextErrors.street = 'Enter the street address.'
    if (!form.suburb.trim()) nextErrors.suburb = 'Enter the suburb.'
    if (!/^\d{4}$/.test(form.postcode.trim())) nextErrors.postcode = 'Enter a 4-digit postcode.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitGuard.current || !validate()) return
    submitGuard.current = true
    setSubmitting(true)
    const customer = addCustomer({
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: {
        street: form.street.trim(),
        suburb: form.suburb.trim(),
        state: form.state,
        postcode: form.postcode.trim(),
      },
    })
    navigate(`/admin/customers/${customer.id}`, { replace: true, state: { customerCreated: true } })
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Admin', to: '/admin' }, { label: 'Customers', to: '/admin/customers' }, { label: 'Add Customer' }]} />
      <PageHeader eyebrow="Customer management" title="Add Customer" description="Create the customer record first. Their site and installation can be added next." />

      <form onSubmit={handleSubmit} noValidate>
        <Card className="overflow-hidden">
          <FormSection title="Personal information" description="Primary contact details for installation updates and future account access.">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><Input id="customer-name" label="Full Name" value={form.name} onChange={(event) => update('name', event.target.value)} error={errors.name} autoComplete="name" required /></div>
              <Input id="customer-email" type="email" label="Email" value={form.email} onChange={(event) => update('email', event.target.value)} error={errors.email} autoComplete="email" required />
              <Input id="customer-phone" type="tel" label="Phone Number" placeholder="0412 345 678" value={form.phone} onChange={(event) => update('phone', event.target.value)} error={errors.phone} autoComplete="tel" required />
            </div>
          </FormSection>

          <FormSection title="Address" description="Use the customer’s Australian postal address. Installation details can use a different site address later.">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><Input id="customer-street" label="Street Address" value={form.street} onChange={(event) => update('street', event.target.value)} error={errors.street} autoComplete="street-address" required /></div>
              <Input id="customer-suburb" label="Suburb" value={form.suburb} onChange={(event) => update('suburb', event.target.value)} error={errors.suburb} autoComplete="address-level2" required />
              <div className="grid grid-cols-[1fr_8rem] gap-3">
                <Select id="customer-state" label="State" value={form.state} onChange={(event) => update('state', event.target.value as AustralianAddress['state'])} autoComplete="address-level1">
                  {['QLD', 'NSW', 'VIC', 'SA', 'WA', 'TAS', 'NT', 'ACT'].map((state) => <option key={state} value={state}>{state}</option>)}
                </Select>
                <Input id="customer-postcode" label="Postcode" inputMode="numeric" maxLength={4} value={form.postcode} onChange={(event) => update('postcode', event.target.value.replace(/\D/g, ''))} error={errors.postcode} autoComplete="postal-code" required />
              </div>
            </div>
          </FormSection>

          <div className="flex flex-col-reverse gap-3 bg-canvas/65 px-5 py-5 sm:flex-row sm:justify-end sm:px-6">
            <LinkButton to="/admin/customers" variant="outline">Cancel</LinkButton>
            <Button type="submit" disabled={submitting}>{submitting ? 'Creating customer…' : 'Create Customer'}</Button>
          </div>
        </Card>
      </form>
    </div>
  )
}
