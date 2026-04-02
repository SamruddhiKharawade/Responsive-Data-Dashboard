export default function StatCards({ data }) {
  const avgGPA     = (data.reduce((a, b) => a + b.gpa, 0) / data.length || 0).toFixed(2)
  const avgAtt     = Math.round(data.reduce((a, b) => a + b.att, 0) / data.length || 0)
  const activeCount = data.filter(s => s.status === 'Active').length

  const cards = [
    { label: 'Total Students', value: data.length,  foot: <><span className="tag tag-green">+12%</span> vs last year</> },
    { label: 'Average GPA',    value: avgGPA,        foot: <><span className="tag tag-blue">↑ 0.3</span> improvement</> },
    { label: 'Avg Attendance', value: `${avgAtt}%`,  foot: <span className={`tag ${avgAtt >= 75 ? 'tag-green' : 'tag-red'}`}>{avgAtt >= 75 ? 'Above' : 'Below'} 75%</span> },
    { label: 'Active Students',value: activeCount,   foot: <><span className="tag tag-amber">{data.length - activeCount} inactive</span></> },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
      {cards.map((c, i) => (
        <div key={i} className="card" style={{ padding: '18px 20px' }}>
          <div style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 500, letterSpacing: '0.3px', marginBottom: 10 }}>
            {c.label}
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-1px', lineHeight: 1 }}>
            {c.value}
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            {c.foot}
          </div>
        </div>
      ))}
    </div>
  )
}