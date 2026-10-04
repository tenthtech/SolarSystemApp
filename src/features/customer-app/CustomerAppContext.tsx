import { createContext, useContext, type ReactNode } from 'react'
import type { CustomerEnergyProfile } from '../../data/customerEnergyData'
import type { Customer, Installation, Site } from '../../types'

export interface CustomerEquipmentSummary {
  inverter: string
  battery: string
  smartMeter: string
}

export interface CustomerAppContextValue {
  customer: Customer
  site: Site
  activeSites: Site[]
  installation?: Installation
  equipment: CustomerEquipmentSummary
  energy: CustomerEnergyProfile
  queryString: string
  selectSite: (siteId: string) => void
}

const CustomerAppContext = createContext<CustomerAppContextValue | null>(null)

export function CustomerAppProvider({ value, children }: { value: CustomerAppContextValue; children: ReactNode }) {
  return <CustomerAppContext.Provider value={value}>{children}</CustomerAppContext.Provider>
}

export function useCustomerApp() {
  const context = useContext(CustomerAppContext)
  if (!context) throw new Error('useCustomerApp must be used inside CustomerAppProvider')
  return context
}

export function buildCustomerAppQuery(customerId: string, siteId: string) {
  return `?customerId=${encodeURIComponent(customerId)}&siteId=${encodeURIComponent(siteId)}`
}
