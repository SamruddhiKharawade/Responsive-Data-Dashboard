export default function Sparkline({ data, color, id }) {
  const max   = Math.max(...data)
  const min   = Math.min(...data)
  const range = max - min || 1
  const pts   = data.map((v, i) => `${(i / (data.length - 1)) * 80},${40 - ((v - min) / range) * 32}`)
  const line  = `M${pts.join('L')}`
  const area  = `M${pts.join('L')}L80,40L0,40Z`

  return (
    <svg
      viewBox="0 0 80 40"
      preserveAspectRatio="none"
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 52 }}
    >
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.28"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spark-${id})`}/>
      <path d={line} stroke={color} strokeWidth="1.5" fill="none"/>
    </svg>
  )
}