import { students } from '../data/mockStudents'

export default function TopPerformers() {
  const top = [...students].sort((a, b) => b.gpa - a.gpa).slice(0, 5)
  const medals = ['🥇', '🥈', '🥉']
  const rankColors = ['#b06a10', '#7a7770', '#7a6a50', 'var(--muted)', 'var(--muted)']

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Top Performers</div>
          <div className="card-sub">Highest GPA this academic year</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {top.map((s, i) => (
          <div key={s.id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '9px 12px', background: 'var(--surface)', borderRadius: 10,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, width: 22, textAlign: 'center', color: rankColors[i] }}>
              {i < 3 ? medals[i] : i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{s.dept} · Sem {s.sem}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--green)' }}>
              {s.gpa.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}