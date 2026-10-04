import type {
  Alert,
  Customer,
  Device,
  EnergyMetrics,
  Installation,
  ProductExperience,
  RoadmapPhase,
  Site,
  User,
} from '../types'

export const company = {
  name: 'SunGrid Electrical & Solar',
  location: 'Brisbane, Queensland',
}

export const users: User[] = [
  {
    id: 'usr-admin-01',
    name: 'Michael Carter',
    email: 'michael@sungridelectrical.com.au',
    role: 'admin',
    initials: 'MC',
  },
  {
    id: 'usr-tech-01',
    name: 'Daniel Brooks',
    email: 'daniel@sungridelectrical.com.au',
    role: 'technician',
    initials: 'DB',
    availability: 'available',
  },
  {
    id: 'usr-customer-01',
    name: 'James Wilson',
    email: 'james.wilson@example.com.au',
    role: 'customer',
    initials: 'JW',
  },
]

export const customers: Customer[] = [
  {
    id: 'cus-1048',
    name: 'James Wilson',
    email: 'james.wilson@example.com.au',
    phone: '0412 555 184',
    address: {
      street: '18 Cedar Street',
      suburb: 'Carindale',
      state: 'QLD',
      postcode: '4152',
    },
    siteIds: ['site-brisbane-home'],
    status: 'active',
    accountStatus: 'active',
    mobileAccessEnabled: true,
    activatedAt: '2026-02-21T04:30:00.000Z',
    createdAt: '2026-02-14T09:30:00.000Z',
  },
  {
    id: 'cus-1049',
    name: 'Olivia Patel',
    email: 'olivia.patel@example.com.au',
    phone: '0438 221 907',
    address: {
      street: '42 Fernberg Road',
      suburb: 'Paddington',
      state: 'QLD',
      postcode: '4064',
    },
    siteIds: ['site-paddington-home'],
    status: 'pending',
    accountStatus: 'not-activated',
    mobileAccessEnabled: false,
    createdAt: '2026-09-26T02:15:00.000Z',
  },
  {
    id: 'cus-1050',
    name: 'Northbank Dental Pty Ltd',
    email: 'facilities@northbankdental.com.au',
    phone: '07 3122 4180',
    address: {
      street: '76 Commercial Road',
      suburb: 'Newstead',
      state: 'QLD',
      postcode: '4006',
    },
    siteIds: ['site-newstead-clinic'],
    status: 'active',
    accountStatus: 'active',
    mobileAccessEnabled: true,
    activatedAt: '2025-11-18T01:45:00.000Z',
    createdAt: '2025-11-08T01:45:00.000Z',
  },
]

export const sites: Site[] = [
  {
    id: 'site-brisbane-home',
    customerId: 'cus-1048',
    name: 'Home - Brisbane',
    address: '18 Cedar Street, Carindale QLD 4152',
    type: 'residential',
    status: 'active',
    solarCapacityKw: 10,
    batteryCapacityKwh: 13.5,
  },
  {
    id: 'site-paddington-home',
    customerId: 'cus-1049',
    name: 'Paddington Residence',
    address: '42 Fernberg Road, Paddington QLD 4064',
    type: 'residential',
    status: 'pending',
    solarCapacityKw: 8.2,
  },
  {
    id: 'site-newstead-clinic',
    customerId: 'cus-1050',
    name: 'Newstead Clinic',
    address: '76 Commercial Road, Newstead QLD 4006',
    type: 'commercial',
    status: 'active',
    solarCapacityKw: 32,
  },
]

export const installations: Installation[] = [
  {
    id: 'INS-2841',
    siteId: 'site-paddington-home',
    customerId: 'cus-1049',
    assignedTechnicianId: 'usr-tech-01',
    status: 'technician-assigned',
    scheduledDate: '7 Oct 2026',
    systemSizeKw: 8.2,
    inverterBrand: 'Sungrow',
    inverterModel: 'SG8.0RS',
    batteryInstalled: false,
    smartMeter: true,
    notes: 'Confirm meter board access with the customer on arrival.',
    createdAt: '2026-09-28T03:10:00.000Z',
  },
  {
    id: 'INS-2837',
    siteId: 'site-brisbane-home',
    customerId: 'cus-1048',
    assignedTechnicianId: 'usr-tech-01',
    status: 'technician-assigned',
    scheduledDate: '3 Oct 2026',
    systemSizeKw: 10,
    inverterBrand: 'Huawei',
    inverterModel: 'SUN2000-10KTL-M1',
    batteryInstalled: true,
    batteryCapacityKwh: 13.5,
    smartMeter: true,
    notes: 'Residential installation. Customer prefers equipment mounted inside the garage.',
    createdAt: '2026-09-22T05:20:00.000Z',
  },
  {
    id: 'INS-2845',
    siteId: 'site-newstead-clinic',
    customerId: 'cus-1050',
    assignedTechnicianId: 'usr-tech-01',
    status: 'technician-assigned',
    scheduledDate: '12 Oct 2026',
    systemSizeKw: 32,
    inverterBrand: 'Fronius',
    inverterModel: 'Tauro ECO 50-3-D',
    batteryInstalled: false,
    smartMeter: true,
    notes: 'Commercial roof access induction required before work begins.',
    createdAt: '2026-10-01T00:40:00.000Z',
  },
]

export const devices: Device[] = [
  {
    id: 'dev-inverter-01',
    siteId: 'site-brisbane-home',
    name: 'Main solar inverter',
    manufacturer: 'Huawei',
    model: 'SUN2000-10KTL-M1',
    category: 'inverter',
    status: 'connected',
  },
  {
    id: 'dev-battery-01',
    siteId: 'site-brisbane-home',
    name: 'Home battery',
    manufacturer: 'Huawei',
    model: 'LUNA2000 13.5 kWh',
    category: 'battery',
    status: 'connected',
  },
]

export const energyMetrics: EnergyMetrics = {
  siteId: 'site-brisbane-home',
  solarProductionKw: 7.4,
  consumptionKw: 3.1,
  batteryPercent: 82,
  gridFlowKw: -1.8,
  generatedTodayKwh: 48.6,
  selfPoweredPercent: 91,
}

export const alerts: Alert[] = [
  {
    id: 'alt-1001',
    siteId: 'site-newstead-clinic',
    title: 'Meter data delayed',
    message: 'Latest interval data is 18 minutes behind schedule.',
    severity: 'warning',
    status: 'open',
    createdAt: '24 min ago',
  },
  {
    id: 'alt-1002',
    siteId: 'site-brisbane-home',
    title: 'Battery firmware available',
    message: 'A recommended firmware update is ready for review.',
    severity: 'info',
    status: 'acknowledged',
    createdAt: '2 hrs ago',
  },
]

export const productExperiences: ProductExperience[] = [
  {
    id: 'admin',
    name: 'Admin Web Platform',
    audience: 'For the electrical contractor',
    description: 'Run customer operations, installations and fleet-wide energy performance from one workspace.',
    capabilities: [
      'Customer Management',
      'Installation Management',
      'Site Monitoring',
      'Staff Management',
      'Reports',
      'Alerts',
    ],
    route: '/admin',
  },
  {
    id: 'technician',
    name: 'Technician Portal',
    audience: 'Responsive field portal',
    description: 'Give field teams the details and tools they need to complete a quality installation.',
    capabilities: [
      'Assigned Installations',
      'Customer & Site Details',
      'Register Equipment',
      'Submit Completed Installation',
    ],
    route: '/technician',
  },
  {
    id: 'customer',
    name: 'Customer Mobile App',
    audience: 'For solar customers',
    description: 'Turn complex energy flows into a clear, reassuring view of home performance.',
    capabilities: [
      'Live Production',
      'Consumption',
      'Battery',
      'Grid Import / Export',
      'Weather',
      'Historical Performance',
    ],
    route: '/customer',
  },
]

export const roadmapPhases: RoadmapPhase[] = [
  {
    number: 1,
    name: 'MVP',
    status: 'Current Focus',
    description: 'Deliver the connected operational core for one electrical company.',
    items: [
      'Backend Platform',
      'Admin Web Platform',
      'Technician Responsive Portal',
      'Customer Mobile App',
      'Initial Inverter Integration',
      'Weather Integration',
      'Basic Modbus',
      'Energy Monitoring',
      'Alerts',
      'Reports',
    ],
  },
  {
    number: 2,
    name: 'Business Growth',
    description: 'Deepen operational capability and expand the supported energy ecosystem.',
    items: [
      'Additional Inverter Brands',
      'Advanced Analytics',
      'Maintenance Management',
      'Enhanced Technician Tools',
      'Advanced Reporting',
      'Improved Notifications',
      'Automation',
    ],
  },
  {
    number: 3,
    name: 'SaaS Platform',
    description: 'Evolve the proven product into a multi-company commercial platform.',
    items: [
      'Multiple Electrical Companies',
      'Company Registration',
      'Company Onboarding',
      'Subscription Plans',
      'Billing',
      'White-Label Branding',
      'Advanced Permissions',
      'Commercial SaaS Infrastructure',
    ],
  },
]

export const dashboardMetrics = [
  { label: 'Active customers', value: '284', context: '+12 this month', tone: 'green' as const },
  { label: 'Monitored sites', value: '312', context: '98.7% reporting', tone: 'blue' as const },
  { label: 'Installations in progress', value: '7', context: '3 due this week', tone: 'amber' as const },
  { label: 'Open alerts', value: '4', context: 'No critical alerts', tone: 'slate' as const },
]

export const energySeries = [12, 18, 16, 29, 41, 48, 55, 63, 60, 68, 58, 52, 47]
