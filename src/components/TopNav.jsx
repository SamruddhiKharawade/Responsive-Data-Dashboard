const tabs = ['Dashboard', 'Students', 'Performance', 'Courses']

export default function TopNav() {
  return (
    <nav style={{
      background: 'var(--white)', borderBottom: '1px solid var(--border)',
      padding: '0 28px', display: 'flex', alignItems: 'center', height: 52,
    }}>
      <div style={{ display: 'flex', height: '100%' }}>
        {tabs.map(t => (
          <div key={t} style={{
            padding: '0 18px', height: '100%', display: 'flex', alignItems: 'center',
            fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap',
            color: t === 'Dashboard' ? 'var(--text)' : 'var(--muted)',
            fontWeight: t === 'Dashboard' ? 500 : 400,
            borderBottom: t === 'Dashboard' ? '2px solid var(--text)' : '2px solid transparent',
          }}>{t}</div>
        ))}
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* search icon */}
        <div style={{
          width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)',
          background: 'var(--white)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', cursor: 'pointer', color: 'var(--muted)',
        }}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="5"/>
            <path d="M11 11l3 3" strokeLinecap="round"/>
          </svg>
        </div>
        {/* bell */}
        <div style={{
          width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)',
          background: 'var(--white)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', cursor: 'pointer', color: 'var(--muted)',
        }}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2a5 5 0 015 5c0 2-.5 3.5-1.5 4.5H4.5C3.5 10.5 3 9 3 7a5 5 0 015-5z"/>
            <path d="M6 13.5a2 2 0 004 0" strokeLinecap="round"/>
          </svg>
        </div>
        {/* avatar */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: '#d4c9b8',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 600, color: '#7a6a5a',
        }}>AK</div>
      </div>
    </nav>
  )
}