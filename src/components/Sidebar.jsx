export default function Sidebar() {
  const icons = [
    // dashboard (active)
    { active: true,  path: <><rect x="2" y="2" width="5" height="5" rx="1.5"/><rect x="9" y="2" width="5" height="5" rx="1.5"/><rect x="2" y="9" width="5" height="5" rx="1.5"/><rect x="9" y="9" width="5" height="5" rx="1.5" opacity="0.35"/></> },
    // clock
    { active: false, path: <><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></> },
    // doc
    { active: false, path: <><rect x="2" y="2" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8h6M5 5h6M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></> },
    // shield
    { active: false, path: <><path d="M8 2L2 5v4c0 3 2.5 5 6 6 3.5-1 6-3 6-6V5z" fill="none" stroke="currentColor" strokeWidth="1.5"/></> },
  ]

  return (
    <aside style={{
      width: 56, background: 'var(--white)', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '18px 0', gap: 6, flexShrink: 0,
    }}>
      {/* logo */}
      <div style={{
        width: 34, height: 34, background: 'var(--text)', borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
          <rect x="1" y="1" width="6" height="6" rx="1.5"/>
          <rect x="9" y="1" width="6" height="6" rx="1.5"/>
          <rect x="1" y="9" width="6" height="6" rx="1.5"/>
          <rect x="9" y="9" width="6" height="6" rx="1.5" opacity="0.4"/>
        </svg>
      </div>

      {icons.map((ic, i) => (
        <div key={i} style={{
          width: 36, height: 36, borderRadius: 8, display: 'flex',
          alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          background: ic.active ? 'var(--text)' : 'transparent',
          color: ic.active ? 'white' : 'var(--muted)',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">{ic.path}</svg>
        </div>
      ))}

      {/* bottom: profile */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, display: 'flex',
          alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--muted)',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="5" r="3"/>
            <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </aside>
  )
}