const TABS = ['Dashboard', 'Students', 'Performance', 'Courses']

export default function TopNav({ activeTab, onTabChange, onSearch, onBell, onAvatar }) {
  return (
    <nav className="topnav">
      <div style={{ display: 'flex', height: '100%' }}>
        {TABS.map(t => (
          <div
            key={t}
            className={`nav-tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => onTabChange(t)}
          >
            {t}
          </div>
        ))}
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* search */}
        <div className="icon-btn" onClick={onSearch} title="Search">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="5"/>
            <path d="M11 11l3 3" strokeLinecap="round"/>
          </svg>
        </div>

        {/* bell */}
        <div className="icon-btn" onClick={onBell} title="Notifications">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2a5 5 0 015 5c0 2-.5 3.5-1.5 4.5H4.5C3.5 10.5 3 9 3 7a5 5 0 015-5z"/>
            <path d="M6 13.5a2 2 0 004 0" strokeLinecap="round"/>
          </svg>
        </div>

        {/* avatar */}
        <div className="avatar" onClick={onAvatar} title="Profile">AK</div>
      </div>
    </nav>
  )
}