import { students, DEPARTMENTS } from '../data/mockStudents'

const COLORS = ['#3b6fd4','#2d8c5e','#b06a10','#c0392b','#6b5ea8']

export default function DeptOverview() {
  const max = Math.max(...DEPARTMENTS.map(d => students.filter(s => s.dept === d).length))

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Department Overview</div>
          <div className="card-sub">Students and average GPA per department</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {DEPARTMENTS.map((d, i) => {
          const cnt = students.filter(s => s.dept === d).length
          const avg = (students.filter(s => s.dept === d).reduce((a, b) => a + b.gpa, 0) / cnt || 0).toFixed(1)
          return (
            <div key={d}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 5 }}>
                <span style={{ fontWeight: 500 }}>{d}</span>
                <span style={{ color: 'var(--muted)' }}>{cnt} students · {avg} GPA</span>
              </div>
              <div style={{ height: 5, background: '#eeece8', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  width: `${(cnt / max * 100).toFixed(1)}%`,
                  height: '100%', borderRadius: 4,
                  background: COLORS[i],
                  transition: 'width 0.4s ease',
                }}/>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}