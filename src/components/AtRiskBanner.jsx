export default function AtRiskBanner({ data, onViewAll }) {
  const atRisk = data.filter(s => s.att < 75 && s.gpa < 7)
  if (atRisk.length === 0) return null

  return (
    <div style={{
      background: '#fbeae8',
      border: '1px solid #f0c4be',
      borderRadius: 12,
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      position: 'relative',
      zIndex: 1,
    }}>
      {/* icon */}
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: '#f0d0cc', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#b03a2a" strokeWidth="1.5">
          <path d="M8 2L1 14h14L8 2z" strokeLinejoin="round"/>
          <path d="M8 7v3" strokeLinecap="round"/>
          <circle cx="8" cy="12" r=".5" fill="#b03a2a"/>
        </svg>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: '#922418' }}>
          {atRisk.length} at-risk student{atRisk.length > 1 ? 's' : ''} detected
        </div>
        <div style={{ fontSize: 11.5, color: '#b03a2a', marginTop: 1 }}>
          Attendance below 75% and GPA below 7.0 — immediate attention needed
        </div>
      </div>

      {/* avatars preview */}
      <div style={{ display: 'flex' }}>
        {atRisk.slice(0, 4).map((s, i) => (
          <div key={s.id} style={{
            width: 26, height: 26, borderRadius: '50%',
            background: '#d4a9a4', border: '2px solid white',
            marginLeft: i === 0 ? 0 : -8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 600, color: '#7a3028',
          }}>
            {s.name.split(' ').map(n => n[0]).join('')}
          </div>
        ))}
        {atRisk.length > 4 && (
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: '#f0c4be', border: '2px solid white',
            marginLeft: -8, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 9, fontWeight: 600, color: '#922418',
          }}>+{atRisk.length - 4}</div>
        )}
      </div>

      <button
        onClick={onViewAll}
        style={{
          padding: '5px 12px', borderRadius: 20, border: '1px solid #e0b0aa',
          background: 'white', fontSize: 11.5, fontWeight: 500,
          color: '#b03a2a', cursor: 'pointer', fontFamily: 'var(--font)',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}
      >
        View all
      </button>
    </div>
  )
}