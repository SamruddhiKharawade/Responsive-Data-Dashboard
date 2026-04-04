export default function Gauge({ value, max = 100 }) {
  const pct = value / max
  const r   = 38
  const cx  = 50
  const cy  = 52
  const sw  = 8

  const arcPath = (p) => {
    const angle = Math.PI * p
    const x = cx + r * Math.cos(Math.PI - angle)
    const y = cy - r * Math.sin(Math.PI - angle)
    return `M${cx - r},${cy} A${r},${r} 0 0,1 ${x},${y}`
  }

  const color  = value >= 75 ? '#3a7d5c' : value >= 60 ? '#a0631a' : '#b03a2a'
  const nx     = cx + 28 * Math.cos(Math.PI - Math.PI * pct)
  const ny     = cy - 28 * Math.sin(Math.PI - Math.PI * pct)

  return (
    <svg width="100" height="58" viewBox="0 0 100 58">
      {/* track */}
      <path
        d={`M${cx - r},${cy} A${r},${r} 0 0,1 ${cx + r},${cy}`}
        stroke="#eeece8" strokeWidth={sw} fill="none" strokeLinecap="round"
      />
      {/* fill */}
      <path
        d={arcPath(pct)}
        stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round"
      />
      {/* needle */}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#1a1814" strokeWidth="2" strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r="3" fill="#1a1814"/>
      {/* label */}
      <text
        x={cx} y={cy - 14}
        textAnchor="middle"
        fontSize="13" fontWeight="600" fill="#1a1814"
        fontFamily="Instrument Sans, sans-serif"
      >
        {value}%
      </text>
    </svg>
  )
}