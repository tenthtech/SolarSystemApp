import type { Installation, Site } from '../types'

export type EnergyRange = 'day' | 'week' | 'month' | 'year'

export interface EnergyHistoryPoint {
  label: string
  solar: number
  consumption: number
  imported: number
  exported: number
}

export interface EnergyHistorySeries {
  title: string
  subtitle: string
  unit: 'kW' | 'kWh'
  points: EnergyHistoryPoint[]
}

export interface CustomerEnergyAlert {
  id: string
  title: string
  message: string
  detail?: string
  time: string
  tone: 'success' | 'info' | 'resolved'
  status?: 'Resolved'
}

export interface CustomerEnergyReport {
  period: string
  title: string
  generated: string
  consumed: string
  exported: string
  imported: string
  availability: string
  highlights: string[]
}

export interface CustomerEnergyProfile {
  siteId: string
  systemStatus: 'Healthy' | 'Needs attention'
  lastUpdated: string
  live: {
    solarKw: number
    homeKw: number
    batteryPercent: number
    batteryState: 'Charging' | 'Not installed'
    batteryPowerKw: number
    gridDirection: 'Exporting' | 'Importing'
    gridKw: number
  }
  today: {
    generationKwh: number
    consumptionKwh: number
    importedKwh: number
    exportedKwh: number
    selfConsumptionPercent: number
  }
  battery: {
    installed: boolean
    percent: number
    status: 'Charging' | 'Not installed'
    capacityKwh?: number
    currentPowerKw?: number
    estimatedFull?: string
  }
  weather: {
    location: string
    condition: string
    temperatureC: number
    solarConditions: string
    expectedGeneration: string
    tomorrow: string
  }
  health: {
    overall: 'Healthy' | 'Needs attention'
    inverter: 'Online' | 'Attention needed'
    battery: 'Online' | 'Not installed'
    smartMeter: 'Online' | 'Not installed'
    lastCommunication: string
  }
  history: Record<EnergyRange, EnergyHistorySeries>
  monthlySummary: {
    generated: string
    consumed: string
    exported: string
    imported: string
    selfPowered: string
  }
  alerts: CustomerEnergyAlert[]
  report: CustomerEnergyReport
}

const history: Record<EnergyRange, EnergyHistorySeries> = {
  day: {
    title: 'Today’s energy',
    subtitle: 'Power across the day',
    unit: 'kW',
    points: [
      { label: '6 AM', solar: 0.3, consumption: 1.2, imported: 0.9, exported: 0 },
      { label: '8 AM', solar: 1.8, consumption: 2.4, imported: 0.6, exported: 0 },
      { label: '10 AM', solar: 4.2, consumption: 2.1, imported: 0, exported: 1.2 },
      { label: '12 PM', solar: 7.5, consumption: 2.8, imported: 0, exported: 3.1 },
      { label: '2 PM', solar: 6.8, consumption: 2.5, imported: 0, exported: 2.7 },
      { label: '4 PM', solar: 3.9, consumption: 2.7, imported: 0, exported: 0.7 },
      { label: '6 PM', solar: 0.8, consumption: 3.4, imported: 1.7, exported: 0 },
    ],
  },
  week: {
    title: 'This week',
    subtitle: 'Daily energy totals',
    unit: 'kWh',
    points: [
      { label: 'Mon', solar: 34.8, consumption: 23.2, imported: 3.8, exported: 14.4 },
      { label: 'Tue', solar: 39.4, consumption: 24.1, imported: 2.9, exported: 18.2 },
      { label: 'Wed', solar: 31.7, consumption: 25.6, imported: 5.1, exported: 11.2 },
      { label: 'Thu', solar: 42.8, consumption: 23.9, imported: 2.4, exported: 21.3 },
      { label: 'Fri', solar: 38.2, consumption: 24.5, imported: 3.2, exported: 16.8 },
      { label: 'Sat', solar: 40.6, consumption: 27.1, imported: 3.6, exported: 16.1 },
      { label: 'Sun', solar: 36.9, consumption: 26.3, imported: 4.2, exported: 14.8 },
    ],
  },
  month: {
    title: 'September 2026',
    subtitle: 'Daily energy totals',
    unit: 'kWh',
    points: [
      { label: '1 Sep', solar: 37, consumption: 24, imported: 3, exported: 16 },
      { label: '4 Sep', solar: 41, consumption: 25, imported: 2, exported: 19 },
      { label: '7 Sep', solar: 29, consumption: 23, imported: 6, exported: 10 },
      { label: '10 Sep', solar: 43, consumption: 26, imported: 3, exported: 20 },
      { label: '13 Sep', solar: 39, consumption: 24, imported: 2, exported: 18 },
      { label: '16 Sep', solar: 35, consumption: 25, imported: 4, exported: 14 },
      { label: '19 Sep', solar: 44, consumption: 27, imported: 2, exported: 21 },
      { label: '22 Sep', solar: 40, consumption: 24, imported: 3, exported: 19 },
      { label: '25 Sep', solar: 36, consumption: 26, imported: 4, exported: 14 },
      { label: '28 Sep', solar: 42, consumption: 25, imported: 2, exported: 20 },
      { label: '30 Sep', solar: 38, consumption: 24, imported: 3, exported: 17 },
    ],
  },
  year: {
    title: 'Last 12 months',
    subtitle: 'Monthly energy totals',
    unit: 'kWh',
    points: [
      { label: 'Oct', solar: 1080, consumption: 720, imported: 92, exported: 452 },
      { label: 'Nov', solar: 1160, consumption: 736, imported: 84, exported: 508 },
      { label: 'Dec', solar: 1240, consumption: 782, imported: 78, exported: 548 },
      { label: 'Jan', solar: 1295, consumption: 814, imported: 82, exported: 563 },
      { label: 'Feb', solar: 1170, consumption: 768, imported: 79, exported: 481 },
      { label: 'Mar', solar: 1098, consumption: 744, imported: 88, exported: 442 },
      { label: 'Apr', solar: 926, consumption: 716, imported: 106, exported: 316 },
      { label: 'May', solar: 792, consumption: 702, imported: 138, exported: 228 },
      { label: 'Jun', solar: 685, consumption: 718, imported: 176, exported: 143 },
      { label: 'Jul', solar: 742, consumption: 724, imported: 158, exported: 176 },
      { label: 'Aug', solar: 968, consumption: 731, imported: 112, exported: 349 },
      { label: 'Sep', solar: 1180, consumption: 742, imported: 81, exported: 518 },
    ],
  },
}

const defaultAlerts: CustomerEnergyAlert[] = [
  {
    id: 'system-normal',
    title: 'System Operating Normally',
    message: 'All devices are connected.',
    time: 'Now',
    tone: 'success',
  },
  {
    id: 'battery-full',
    title: 'Battery Fully Charged',
    message: 'Your battery reached 100% at 1:42 PM.',
    time: 'Yesterday',
    tone: 'info',
  },
  {
    id: 'high-production',
    title: 'High Solar Production',
    message: 'Your system generated 42.8 kWh yesterday.',
    time: 'Yesterday',
    tone: 'info',
  },
  {
    id: 'inverter-restored',
    title: 'Inverter Communication Interrupted',
    message: 'Connection restored automatically.',
    detail: 'The system reconnected after a brief interruption. No action is required.',
    time: '18 Sep 2026',
    tone: 'resolved',
    status: 'Resolved',
  },
]

const jamesProfile: CustomerEnergyProfile = {
  siteId: 'site-brisbane-home',
  systemStatus: 'Healthy',
  lastUpdated: '2 minutes ago',
  live: {
    solarKw: 4.8,
    homeKw: 2.1,
    batteryPercent: 82,
    batteryState: 'Charging',
    batteryPowerKw: 2.4,
    gridDirection: 'Exporting',
    gridKw: 2.7,
  },
  today: {
    generationKwh: 38.2,
    consumptionKwh: 24.5,
    importedKwh: 3.2,
    exportedKwh: 16.8,
    selfConsumptionPercent: 68,
  },
  battery: {
    installed: true,
    percent: 82,
    status: 'Charging',
    capacityKwh: 13.5,
    currentPowerKw: 2.4,
    estimatedFull: '1 hr 20 min',
  },
  weather: {
    location: 'Brisbane',
    condition: 'Sunny',
    temperatureC: 29,
    solarConditions: 'Excellent',
    expectedGeneration: 'High',
    tomorrow: 'Partly Cloudy',
  },
  health: {
    overall: 'Healthy',
    inverter: 'Online',
    battery: 'Online',
    smartMeter: 'Online',
    lastCommunication: '2 minutes ago',
  },
  history,
  monthlySummary: {
    generated: '1.18 MWh',
    consumed: '742 kWh',
    exported: '518 kWh',
    imported: '81 kWh',
    selfPowered: '89%',
  },
  alerts: defaultAlerts,
  report: {
    period: 'September 2026',
    title: 'Monthly Energy Report',
    generated: '1.18 MWh',
    consumed: '742 kWh',
    exported: '518 kWh',
    imported: '81 kWh',
    availability: '99.8%',
    highlights: [
      'Solar generation covered most household energy needs.',
      'Grid imports remained low throughout the month.',
      'System availability remained above 99%.',
    ],
  },
}

function roundOne(value: number) {
  return Math.round(value * 10) / 10
}

function scaleHistory(factor: number) {
  return Object.fromEntries(Object.entries(history).map(([range, series]) => [range, {
    ...series,
    points: series.points.map((point) => ({
      ...point,
      solar: roundOne(point.solar * factor),
      exported: roundOne(point.exported * factor),
    })),
  }])) as Record<EnergyRange, EnergyHistorySeries>
}

function equipmentHasBattery(site: Site, installation?: Installation) {
  if (installation?.technicianSubmission) return installation.technicianSubmission.battery.installed
  return Boolean(site.batteryCapacityKwh ?? installation?.batteryCapacityKwh)
}

function locationForSite(site: Site) {
  const namedLocation = site.name.split(' - ')[1]?.trim()
  if (namedLocation) return namedLocation

  const addressLocation = site.address
    .split(',')[1]
    ?.trim()
    .replace(/\s+(QLD|NSW|VIC|SA|WA|TAS|NT|ACT)\s+\d{4}$/i, '')

  return addressLocation || site.name
}

export function getCustomerEnergyProfile(site: Site, installation?: Installation): CustomerEnergyProfile {
  if (site.id === jamesProfile.siteId) return jamesProfile

  const factor = Math.max(0.55, Math.min(2.5, site.solarCapacityKw / 10))
  const hasBattery = equipmentHasBattery(site, installation)
  const submission = installation?.technicianSubmission
  const connectionNeedsAttention = Boolean(submission && (submission.inverterConnection !== 'connected' || submission.modbus === 'not-connected'))
  const systemStatus: CustomerEnergyProfile['systemStatus'] = connectionNeedsAttention ? 'Needs attention' : 'Healthy'
  const solarKw = roundOne(4.8 * factor)
  const homeKw = roundOne(Math.max(1.6, Math.min(solarKw, 2.1 * Math.sqrt(factor))))
  const batteryPowerKw = hasBattery ? roundOne(Math.min(2.4 * factor, Math.max(0, solarKw - homeKw) * 0.55)) : 0
  const gridKw = roundOne(Math.max(0.2, solarKw - homeKw - batteryPowerKw))
  const generationKwh = roundOne(38.2 * factor)
  const consumptionKwh = roundOne(24.5 * Math.max(0.8, Math.sqrt(factor)))
  const location = locationForSite(site)
  const generatedMwh = (1.18 * factor).toFixed(2)
  const consumedKwh = Math.round(742 * Math.max(0.8, Math.sqrt(factor)))
  const exportedKwh = Math.round(518 * factor)
  const importedKwh = Math.max(54, Math.round(81 / Math.max(0.75, factor)))
  const contextualAlerts = defaultAlerts
    .filter((alert) => hasBattery || alert.id !== 'battery-full')
    .map((alert) => alert.id === 'high-production'
      ? { ...alert, message: `Your system generated ${roundOne(42.8 * factor)} kWh yesterday.` }
      : alert)

  if (connectionNeedsAttention) {
    contextualAlerts.splice(0, 1, {
      id: 'connection-review',
      title: 'System Connection Needs Attention',
      message: 'Your installer is reviewing the system connection.',
      time: 'Now',
      tone: 'info',
    })
  }

  return {
    ...jamesProfile,
    siteId: site.id,
    systemStatus,
    live: {
      solarKw,
      homeKw,
      batteryPercent: hasBattery ? 76 : 0,
      batteryState: hasBattery ? 'Charging' : 'Not installed',
      batteryPowerKw,
      gridDirection: 'Exporting',
      gridKw,
    },
    today: {
      generationKwh,
      consumptionKwh,
      importedKwh: roundOne(3.2 / Math.max(0.75, factor)),
      exportedKwh: roundOne(Math.max(2.4, generationKwh - consumptionKwh - (hasBattery ? 5.2 : 0))),
      selfConsumptionPercent: hasBattery ? 68 : 54,
    },
    battery: hasBattery ? {
      installed: true,
      percent: 76,
      status: 'Charging',
      capacityKwh: site.batteryCapacityKwh ?? installation?.technicianSubmission?.battery.capacityKwh ?? installation?.batteryCapacityKwh ?? 10,
      currentPowerKw: batteryPowerKw,
      estimatedFull: '1 hr 40 min',
    } : {
      installed: false,
      percent: 0,
      status: 'Not installed',
    },
    weather: {
      ...jamesProfile.weather,
      location,
    },
    health: {
      ...jamesProfile.health,
      overall: systemStatus,
      inverter: connectionNeedsAttention ? 'Attention needed' : 'Online',
      battery: hasBattery ? 'Online' : 'Not installed',
      smartMeter: submission && !submission.smartMeter.installed ? 'Not installed' : 'Online',
    },
    history: scaleHistory(factor),
    monthlySummary: {
      generated: `${generatedMwh} MWh`,
      consumed: `${consumedKwh} kWh`,
      exported: `${exportedKwh} kWh`,
      imported: `${importedKwh} kWh`,
      selfPowered: hasBattery ? '88%' : '72%',
    },
    alerts: contextualAlerts,
    report: {
      ...jamesProfile.report,
      generated: `${generatedMwh} MWh`,
      consumed: `${consumedKwh} kWh`,
      exported: `${exportedKwh} kWh`,
      imported: `${importedKwh} kWh`,
      highlights: [
        'Solar generation covered most site energy needs.',
        'Grid imports remained low throughout the month.',
        'System availability remained above 99%.',
      ],
    },
  }
}
