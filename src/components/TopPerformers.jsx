const RANK_COLORS = ['#a0631a', '#7a7770', '#7a6a50', 'var(--muted)', 'var(--muted)']
const MEDALS      = ['🥇', '🥈', '🥉']

export default function TopPerformers({ data }) {
  const top = [...data].sort((a, b) => b.gpa - a.gpa).slice(0, 5)

  return (
    <div className="card">
      <div className="card-hdr">
        <div>
          <div className="card-title">Top Performers</div>
          <div className="card-sub">Highest GPA in current filter</div>
        </div>
      </div>
      {top.length === 0 ? (
        <div style={{ fontSize: 12.5, color: 'var(--muted)', padding: '8px 0' }}>No students match current filters.</div>
      ) : top.map((s, i) => (
        <div key={s.id} className="top-item">
          <div className="top-rank" style={{ color: RANK_COLORS[i] }}>
            {i < 3 ? MEDALS[i] : i + 1}
          </div>
          <div style={{ flex: 1 }}>
            <div className="top-name">{s.name}</div>
            <div className="top-dept">{s.dept} · Sem {s.sem}</div>
          </div>
          <div className="top-gpa">{s.gpa.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}