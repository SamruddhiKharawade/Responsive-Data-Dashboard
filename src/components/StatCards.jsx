import Sparkline from './Sparkline'
import Gauge     from './Gauge'

const SPARK_TOTAL  = [65, 70, 68, 72, 75, 74, 78, 80]
const SPARK_GPA    = [7.1, 7.2, 7.0, 7.3, 7.4, 7.2, 7.35, 7.4]
const SPARK_ACTIVE = [60, 62, 64, 65, 67, 68, 69, 70]

export default function StatCards({ data }) {
  const total      = data.length
  const avgGPA     = (data.reduce((a, b) => a + b.gpa, 0) / total || 0).toFixed(2)
  const avgAtt     = Math.round(data.reduce((a, b) => a + b.att, 0) / total || 0)
  const activeCount = data.filter(s => s.status === 'Active').length

  return (
    <div className="stats-row">

      {/* total students */}
      <div className="stat-card">
        <div className="stat-label">
          Total Students
          <div className="stat-dots">
            <div className="stat-dot" style={{ background: '#4a6fa5' }}/>
            <div className="stat-dot" style={{ background: '#3a7d5c' }}/>
            <div className="stat-dot" style={{ background: '#a0631a' }}/>
          </div>
        </div>
        <div className="stat-value">{total}</div>
        <div className="stat-foot">
          <span className="tag tg">+12%</span> vs last year
        </div>
        <Sparkline data={SPARK_TOTAL} color="#4a6fa5" id="total"/>
      </div>

      {/* average gpa */}
      <div className="stat-card">
        <div className="stat-label">Average GPA</div>
        <div className="stat-value" style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          {avgGPA}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#3a7d5c" strokeWidth="2">
            <path d="M4 12L8 4l4 8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="stat-foot">
          <span className="tag tg">↑ 0.30</span> GPA improvement
        </div>
        <Sparkline data={SPARK_GPA} color="#3a7d5c" id="gpa"/>
      </div>

      {/* attendance + gauge */}
      <div className="stat-card">
        <div className="stat-label">Avg Attendance</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
          <div>
            <div className="stat-value">{avgAtt}%</div>
            <div className="stat-foot">
              <span className={`tag ${avgAtt >= 75 ? 'tg' : 'tr'}`}>
                {avgAtt >= 75 ? 'Above 75%' : 'Below 75%'}
              </span>
            </div>
          </div>
          <Gauge value={avgAtt}/>
        </div>
      </div>

      {/* active students */}
      <div className="stat-card">
        <div className="stat-label">
          Active Students
          <div style={{ fontSize: 11, color: '#3a7d5c', display: 'flex', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3a7d5c' }}/>
            {activeCount} / {total}
          </div>
        </div>
        <div className="stat-value">{activeCount}</div>
        <div className="stat-foot">
          <span className="tag ta">{total - activeCount} inactive</span>
        </div>
        <Sparkline data={SPARK_ACTIVE} color="#a0631a" id="active"/>
      </div>

    </div>
  )
}