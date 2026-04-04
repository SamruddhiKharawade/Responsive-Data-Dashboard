const NAV_ITEMS = [
  {
    label: 'Dashboard',
    icon: (
      <path
        d="M2 2h5v5H2zm7 0h5v5H9zM2 9h5v5H2zm7 0h5v5H9z"
        fill="currentColor"
      />
    ),
  },
  {
    label: 'Students',
    icon: (
      <>
        <circle cx="8" cy="5" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </>
    ),
  },
  {
    label: 'Performance',
    icon: (
      <>
        <polyline points="2,12 6,8 9,10 14,4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 4h-4m4 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ),
  },
  {
    label: 'Reports',
    icon: (
      <>
        <rect x="2" y="2" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 8h6M5 5h6M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </>
    ),
  },
  {
    label: 'Departments',
    icon: (
      <path d="M8 2L2 5v4c0 3 2.5 5 6 6 3.5-1 6-3 6-6V5z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    ),
  },
  {
    label: 'Settings',
    icon: (
      <>
        <circle cx="8" cy="8" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path
          d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        />
      </>
    ),
  },
]

export default function Sidebar({ activeIndex, onSelect }) {
  return (
    <aside className="sb">
      {/* logo */}
      <div className="sb-logo">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
          <rect x="1" y="1" width="6" height="6" rx="1.5"/>
          <rect x="9" y="1" width="6" height="6" rx="1.5"/>
          <rect x="1" y="9" width="6" height="6" rx="1.5"/>
          <rect x="9" y="9" width="6" height="6" rx="1.5" opacity="0.4"/>
        </svg>
      </div>

      {NAV_ITEMS.map((item, i) => (
        <div
          key={i}
          className={`sb-item ${activeIndex === i ? 'active' : ''}`}
          onClick={() => onSelect(i, item.label)}
          title={item.label}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            {item.icon}
          </svg>
          <span className="sb-tooltip">{item.label}</span>
        </div>
      ))}
    </aside>
  )
}