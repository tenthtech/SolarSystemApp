export type UserRole = 'admin' | 'technician' | 'customer'

export interface AustralianAddress {
  street: string
  suburb: string
  state: 'QLD' | 'NSW' | 'VIC' | 'SA' | 'WA' | 'TAS' | 'NT' | 'ACT'
  postcode: string
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  initials: string
  availability?: 'available' | 'on-job' | 'offline'
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: AustralianAddress
  siteIds: string[]
  status: 'active' | 'pending' | 'inactive'
  accountStatus: 'not-activated' | 'active'
  mobileAccessEnabled: boolean
  activatedAt?: string
  createdAt: string
}

export interface Site {
  id: string
  customerId: string
  name: string
  address: string
  type: 'residential' | 'commercial'
  status: 'active' | 'pending' | 'offline'
  solarCapacityKw: number
  batteryCapacityKwh?: number
}

export type InstallationStatus = 'technician-assigned' | 'awaiting-admin-review' | 'active'

export interface TechnicianSubmission {
  submittedAt: string
  siteName: string
  installationAddress: string
  systemSizeKw: number
  inverter: {
    manufacturer: string
    model: string
    serialNumber: string
  }
  battery: {
    installed: boolean
    manufacturer?: string
    model?: string
    capacityKwh?: number
    serialNumber?: string
  }
  smartMeter: {
    installed: boolean
    manufacturer?: string
    model?: string
    serialNumber?: string
  }
  inverterConnection: 'connected' | 'not-connected'
  modbus: 'not-required' | 'connected' | 'not-connected'
  notes: string
}

export interface Installation {
  id: string
  siteId: string
  customerId: string
  assignedTechnicianId: string
  status: InstallationStatus
  scheduledDate: string
  systemSizeKw: number
  inverterBrand: 'Huawei' | 'Sungrow' | 'Fronius' | 'GoodWe' | 'SolarEdge'
  inverterModel: string
  batteryInstalled: boolean
  batteryCapacityKwh?: number
  smartMeter: boolean
  notes: string
  createdAt: string
  technicianSubmission?: TechnicianSubmission
  activatedAt?: string
  progress?: number
}

export interface Device {
  id: string
  siteId: string
  name: string
  manufacturer: string
  model: string
  category: 'inverter' | 'battery' | 'meter'
  status: 'connected' | 'commissioning' | 'offline'
}

export interface EnergyMetrics {
  siteId: string
  solarProductionKw: number
  consumptionKw: number
  batteryPercent: number
  gridFlowKw: number
  generatedTodayKwh: number
  selfPoweredPercent: number
}

export interface Alert {
  id: string
  siteId: string
  title: string
  message: string
  severity: 'critical' | 'warning' | 'info'
  status: 'open' | 'acknowledged' | 'resolved'
  createdAt: string
}

export interface ProductExperience {
  id: UserRole
  name: string
  audience: string
  description: string
  capabilities: string[]
  route: string
}

export interface RoadmapPhase {
  number: number
  name: string
  status?: string
  description: string
  items: string[]
}
