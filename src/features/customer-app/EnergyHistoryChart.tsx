import type { EnergyHistorySeries } from '../../data/customerEnergyData'

interface EnergyHistoryChartProps {
  series: EnergyHistorySeries
}

const chartSeries = [
  { key: 'solar', label: 'Solar Production', color: '#d99a00', dash: undefined },
  { key: 'consumption', label: 'Home Consumption', color: '#167b45', dash: undefined },
  { key: 'imported', label: 'Grid Import', color: '#4f8cf7', dash: '8 6' },
  { key: 'exported', label: 'Grid Export', color: '#7c5ce7', dash: '3 6' },
] as const

function ChartGraphic({ series, compact }: { series: EnergyHistorySeries; compact: boolean }) {
  const width = compact ? 360 : 720
  const height = compact ? 260 : 310
  const left = compact ? 36 : 48
  const right = compact ? 10 : 18
  const top = compact ? 20 : 22
  const bottom = compact ? 42 : 48
  const chartWidth = width - left - right
  const chartHeight = height - top - bottom
  const maxValue = Math.max(...series.points.flatMap((point) => chartSeries.map(({ key }) => point[key])), 1)
  const roundedMax = Math.ceil(maxValue / 5) * 5
  const xFor = (index: number) => left + (index / Math.max(series.points.length - 1, 1)) * chartWidth
  const yFor = (value: number) => top + chartHeight - (value / roundedMax) * chartHeight
  const pathFor = (key: typeof chartSeries[number]['key']) => series.points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${xFor(index).toFixed(1)} ${yFor(point[key]).toFixed(1)}`)
    .join(' ')
  const labelStep = series.points.length > 8 ? 2 : 1
  const titleId = `energy-chart-title-${compact ? 'mobile' : 'desktop'}`
  const descriptionId = `energy-chart-description-${compact ? 'mobile' : 'desktop'}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={compact ? 'block h-auto w-full sm:hidden' : 'mx-auto hidden h-auto w-full max-w-[720px] sm:block'}
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
    >
      <title id={titleId}>{series.title}</title>
      <desc id={descriptionId}>{series.subtitle}. Lines compare solar production, home consumption, grid import and grid export in {series.unit}.</desc>

      {[0, 0.5, 1].map((ratio) => {
        const value = roundedMax * (1 - ratio)
        const y = top + chartHeight * ratio
        return (
          <g key={ratio}>
            <line x1={left} x2={width - right} y1={y} y2={y} stroke="#dfe6e2" strokeWidth="1" strokeDasharray="4 5" />
            <text x={left - (compact ? 6 : 9)} y={y + (compact ? 4 : 5)} textAnchor="end" fill="#586860" fontSize={compact ? 10 : 14} fontWeight="700">{value}</text>
          </g>
        )
      })}
      <text x={compact ? 5 : 10} y={compact ? 13 : 18} fill="#586860" fontSize={compact ? 10 : 12} fontWeight="700">{series.unit}</text>

      {chartSeries.map(({ key, color, dash }) => (
        <g key={key}>
          <path d={pathFor(key)} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash} vectorEffect="non-scaling-stroke" />
          {series.points.map((point, index) => <circle key={`${key}-${point.label}`} cx={xFor(index)} cy={yFor(point[key])} r={compact ? 2.5 : 3.5} fill="white" stroke={color} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />)}
        </g>
      ))}

      {series.points.map((point, index) => (index % labelStep === 0 || index === series.points.length - 1) && (
        <text key={point.label} x={xFor(index)} y={height - (compact ? 12 : 16)} textAnchor="middle" fill="#586860" fontSize={compact ? 11 : 13} fontWeight="700">{point.label}</text>
      ))}
    </svg>
  )
}

export function EnergyHistoryChart({ series }: EnergyHistoryChartProps) {

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-4" aria-label="Energy chart legend">
        {chartSeries.map((item) => (
          <div key={item.key} className="flex min-w-0 items-center gap-2 text-xs font-bold text-muted">
            <svg width="24" height="8" aria-hidden="true" className="shrink-0"><line x1="1" x2="23" y1="4" y2="4" stroke={item.color} strokeWidth="3" strokeLinecap="round" strokeDasharray={item.dash} /></svg>
            <span className="truncate">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-canvas px-1 py-3 sm:px-3">
        <ChartGraphic series={series} compact />
        <ChartGraphic series={series} compact={false} />
      </div>

      <div className="sr-only">
        <table>
          <caption>{series.title} energy data</caption>
          <thead><tr><th>Period</th><th>Solar Production</th><th>Home Consumption</th><th>Grid Import</th><th>Grid Export</th></tr></thead>
          <tbody>{series.points.map((point) => <tr key={point.label}><th>{point.label}</th><td>{point.solar} {series.unit}</td><td>{point.consumption} {series.unit}</td><td>{point.imported} {series.unit}</td><td>{point.exported} {series.unit}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  )
}
