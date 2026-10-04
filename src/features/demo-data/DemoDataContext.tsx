import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { customers as seedCustomers, installations as seedInstallations, sites as seedSites } from '../../data/mockData'
import type { AustralianAddress, Customer, Installation, Site, TechnicianSubmission } from '../../types'
import { formatAddress } from '../../lib/formatters'

const STORAGE_KEY = 'sungrid-energy-demo-data-v1'
const STORAGE_VERSION = 2

interface DemoDataState {
  customers: Customer[]
  sites: Site[]
  installations: Installation[]
}

interface StoredDemoData {
  version: number
  data: DemoDataState
}

export interface AddCustomerInput {
  name: string
  email: string
  phone: string
  address: AustralianAddress
}

export interface AddInstallationInput {
  customerId: string
  siteName: string
  installationAddress: AustralianAddress
  siteType: Site['type']
  systemSizeKw: number
  inverterBrand: Installation['inverterBrand']
  inverterModel: string
  batteryInstalled: boolean
  batteryCapacityKwh?: number
  smartMeter: boolean
  scheduledDate: string
  notes: string
  assignedTechnicianId: string
}

export type SubmitInstallationInput = Omit<TechnicianSubmission, 'submittedAt'>

interface ActivationResult {
  installation: Installation
  site: Site
  customer: Customer
}

interface DemoDataContextValue extends DemoDataState {
  addCustomer: (input: AddCustomerInput) => Customer
  addInstallation: (input: AddInstallationInput) => { site: Site; installation: Installation }
  submitInstallation: (installationId: string, technicianId: string, input: SubmitInstallationInput) => Installation | null
  activateInstallation: (installationId: string) => ActivationResult | null
  resetDemoData: () => void
}

const DemoDataContext = createContext<DemoDataContextValue | null>(null)

function createInitialState(): DemoDataState {
  return {
    customers: seedCustomers.map((customer) => ({ ...customer, address: { ...customer.address }, siteIds: [...customer.siteIds] })),
    sites: seedSites.map((site) => ({ ...site })),
    installations: seedInstallations.map((installation) => ({ ...installation })),
  }
}

function migrateStoredState(value: unknown): DemoDataState | null {
  const stored = value as Partial<StoredDemoData> | null
  if (!stored || (stored.version !== 1 && stored.version !== STORAGE_VERSION)) return null
  const data = stored.data as DemoDataState | undefined
  if (!data || !Array.isArray(data.customers) || !Array.isArray(data.sites) || !Array.isArray(data.installations)) return null

  return {
    customers: data.customers.map((customer) => ({
      ...customer,
      accountStatus: customer.accountStatus ?? (customer.status === 'active' ? 'active' : 'not-activated'),
      mobileAccessEnabled: customer.mobileAccessEnabled ?? customer.status === 'active',
    })),
    sites: data.sites.map((site) => ({
      ...site,
      status: (site.status as string) === 'online' ? 'active' : site.status,
    })),
    installations: data.installations.map((installation) => ({
      ...installation,
      status: ['technician-assigned', 'awaiting-admin-review', 'active'].includes(installation.status)
        ? installation.status
        : 'technician-assigned',
    })),
  }
}

function loadStoredState(): DemoDataState {
  if (typeof window === 'undefined') return createInitialState()

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return createInitialState()
    return migrateStoredState(JSON.parse(raw)) ?? createInitialState()
  } catch {
    return createInitialState()
  }
}

function createToken() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID().split('-')[0].toUpperCase()
  }
  return Math.random().toString(36).slice(2, 10).toUpperCase()
}

function initialsFor(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DemoDataState>(loadStoredState)

  useEffect(() => {
    try {
      const stored: StoredDemoData = { version: STORAGE_VERSION, data }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    } catch {
      // The demo remains fully usable in memory when browser storage is unavailable.
    }
  }, [data])

  const value = useMemo<DemoDataContextValue>(() => ({
    ...data,
    resetDemoData() {
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      } catch {
        // Resetting in-memory data still works when browser storage is unavailable.
      }
      setData(createInitialState())
    },
    addCustomer(input) {
      const customer: Customer = {
        id: `cus-${createToken().toLowerCase()}`,
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        phone: input.phone.trim(),
        address: input.address,
        siteIds: [],
        status: 'pending',
        accountStatus: 'not-activated',
        mobileAccessEnabled: false,
        createdAt: new Date().toISOString(),
      }
      setData((current) => ({ ...current, customers: [customer, ...current.customers] }))
      return customer
    },
    addInstallation(input) {
      const token = createToken()
      const site: Site = {
        id: `site-${token.toLowerCase()}`,
        customerId: input.customerId,
        name: input.siteName.trim(),
        address: formatAddress(input.installationAddress),
        type: input.siteType,
        status: 'pending',
        solarCapacityKw: input.systemSizeKw,
        batteryCapacityKwh: input.batteryInstalled ? input.batteryCapacityKwh : undefined,
      }
      const installation: Installation = {
        id: `INS-${token.slice(0, 6)}`,
        siteId: site.id,
        customerId: input.customerId,
        assignedTechnicianId: input.assignedTechnicianId,
        status: 'technician-assigned',
        scheduledDate: input.scheduledDate,
        systemSizeKw: input.systemSizeKw,
        inverterBrand: input.inverterBrand,
        inverterModel: input.inverterModel.trim(),
        batteryInstalled: input.batteryInstalled,
        batteryCapacityKwh: input.batteryInstalled ? input.batteryCapacityKwh : undefined,
        smartMeter: input.smartMeter,
        notes: input.notes.trim(),
        createdAt: new Date().toISOString(),
      }

      setData((current) => ({
        customers: current.customers.map((customer) => customer.id === input.customerId
          ? { ...customer, siteIds: [...customer.siteIds, site.id] }
          : customer),
        sites: [site, ...current.sites],
        installations: [installation, ...current.installations],
      }))

      return { site, installation }
    },
    submitInstallation(installationId, technicianId, input) {
      const currentInstallation = data.installations.find((installation) => installation.id === installationId)
      const hasLinkedCustomer = data.customers.some((customer) => customer.id === currentInstallation?.customerId)
      const hasLinkedSite = data.sites.some((site) => site.id === currentInstallation?.siteId && site.customerId === currentInstallation.customerId)
      if (
        !currentInstallation
        || currentInstallation.status !== 'technician-assigned'
        || currentInstallation.assignedTechnicianId !== technicianId
        || !hasLinkedCustomer
        || !hasLinkedSite
      ) return null

      const technicianSubmission: TechnicianSubmission = {
        ...input,
        submittedAt: new Date().toISOString(),
        siteName: input.siteName.trim(),
        installationAddress: input.installationAddress.trim(),
        inverter: {
          manufacturer: input.inverter.manufacturer.trim(),
          model: input.inverter.model.trim(),
          serialNumber: input.inverter.serialNumber.trim(),
        },
        battery: input.battery.installed ? {
          installed: true,
          manufacturer: input.battery.manufacturer?.trim(),
          model: input.battery.model?.trim(),
          capacityKwh: input.battery.capacityKwh,
          serialNumber: input.battery.serialNumber?.trim() || undefined,
        } : { installed: false },
        smartMeter: input.smartMeter.installed ? {
          installed: true,
          manufacturer: input.smartMeter.manufacturer?.trim(),
          model: input.smartMeter.model?.trim(),
          serialNumber: input.smartMeter.serialNumber?.trim() || undefined,
        } : { installed: false },
        notes: input.notes.trim(),
      }
      const installation: Installation = {
        ...currentInstallation,
        status: 'awaiting-admin-review',
        technicianSubmission,
      }

      setData((current) => ({
        ...current,
        installations: current.installations.map((item) => item.id === installationId ? installation : item),
      }))
      return installation
    },
    activateInstallation(installationId) {
      const currentInstallation = data.installations.find((installation) => installation.id === installationId)
      const currentSite = data.sites.find((site) => site.id === currentInstallation?.siteId)
      const currentCustomer = data.customers.find((customer) => customer.id === currentInstallation?.customerId)
      const submission = currentInstallation?.technicianSubmission
      if (
        !currentInstallation
        || currentInstallation.status !== 'awaiting-admin-review'
        || !submission
        || !currentSite
        || !currentCustomer
        || currentSite.customerId !== currentInstallation.customerId
      ) return null

      const activatedAt = new Date().toISOString()
      const installation: Installation = { ...currentInstallation, status: 'active', activatedAt }
      const site: Site = {
        ...currentSite,
        name: submission.siteName,
        address: submission.installationAddress,
        status: 'active',
        solarCapacityKw: submission.systemSizeKw,
        batteryCapacityKwh: submission.battery.installed ? submission.battery.capacityKwh : undefined,
      }
      const customer: Customer = {
        ...currentCustomer,
        status: 'active',
        accountStatus: 'active',
        mobileAccessEnabled: true,
        activatedAt: currentCustomer.activatedAt ?? activatedAt,
      }

      setData((current) => {
        const currentRecord = current.installations.find((item) => item.id === installationId)
        if (currentRecord?.status !== 'awaiting-admin-review') return current
        return {
          installations: current.installations.map((item) => item.id === installationId ? installation : item),
          sites: current.sites.map((item) => item.id === site.id ? site : item),
          customers: current.customers.map((item) => item.id === customer.id ? customer : item),
        }
      })
      return { installation, site, customer }
    },
  }), [data])

  return <DemoDataContext.Provider value={value}>{children}</DemoDataContext.Provider>
}

export function useDemoData() {
  const context = useContext(DemoDataContext)
  if (!context) throw new Error('useDemoData must be used inside DemoDataProvider')
  return context
}

export function getCustomerInitials(customer: Customer) {
  return initialsFor(customer.name)
}
