import { students, DEPARTMENTS } from '../data/mockStudents'

const COLORS = ['#4a6fa5', '#3a7d5c', '#a0631a', '#b03a2a', '#5a6ea0']

export default function DeptOverview() {
  const max = Math.max(...DEPARTMENTS.map(d => students.filter(s => s.dept === d).length))

  return (
    <div className="card">
      <div className="card-hdr">
        <div>
          <div className="card-title">Department Overview</div>
          <div className="card-sub">Students and average GPA per department</div>
        </div>
      </div>
      {DEPARTMENTS.map((d, i) => {
        const cnt = students.filter(s => s.dept === d).length
        const avg = (students.filter(s => s.dept === d).reduce((a, b) => a + b.gpa, 0) / cnt || 0).toFixed(1)
        return (
          <div key={d} className="dept-item">
            <div className="dept-lbl">
              <span style={{ fontWeight: 500 }}>{d}</span>
              <span style={{ color: 'var(--muted)' }}>{cnt} · {avg} GPA</span>
            </div>
            <div className="dept-bg">
              <div
                className="dept-fill"
                style={{ width: `${(cnt / max * 100).toFixed(1)}%`, background: COLORS[i] }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}