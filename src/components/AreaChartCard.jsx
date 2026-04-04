import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { SEMESTERS } from '../data/mockStudents'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'white', border: '1px solid #e2ded6',
      borderRadius: 8, padding: '8px 12px',
      fontSize: 12, fontFamily: 'Instrument Sans, sans-serif',
    }}>
      <div style={{ color: '#847e76', marginBottom: 3, fontWeight: 500 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 500 }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

export default function AreaChartCard({ students }) {
  const semData = SEMESTERS.map(s => {
    const d = students.filter(x => x.sem === s)
    return {
      name       : `Sem ${s}`,
      'Avg GPA'  : d.length ? parseFloat((d.reduce((a, b) => a + b.gpa, 0) / d.length).toFixed(2)) : 0,
      'Attendance': d.length ? Math.round(d.reduce((a, b) => a + b.att, 0) / d.length) : 0,
    }
  })

  return (
    <div className="card">
      <div className="card-hdr">
        <div>
          <div className="card-title">GPA by Semester</div>
          <div className="card-sub">Average academic performance across semesters</div>
        </div>
        <span className="tag tb">Avg</span>
      </div>

      <div className="legend">
        <div className="leg-item">
          <div className="leg-dot" style={{ background: '#7a9fc4' }}/> Attendance
        </div>
        <div className="leg-item">
          <div className="leg-dot" style={{ background: '#6aab8e' }}/> Avg GPA
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={semData} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
          <defs>
            <linearGradient id="grad-att" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#7a9fc4" stopOpacity=".3"/>
              <stop offset="100%" stopColor="#7a9fc4" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="grad-gpa" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#6aab8e" stopOpacity=".3"/>
              <stop offset="100%" stopColor="#6aab8e" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2ded6"/>
          <XAxis dataKey="name" tick={{ fill: '#847e76', fontSize: 11 }} axisLine={false} tickLine={false}/>
          <YAxis yAxisId="l" domain={[6, 10]} tick={{ fill: '#847e76', fontSize: 11 }} axisLine={false} tickLine={false}/>
          <YAxis yAxisId="r" orientation="right" domain={[50, 100]} tick={{ fill: '#847e76', fontSize: 10 }} axisLine={false} tickLine={false}/>
          <Tooltip content={<CustomTooltip/>}/>
          <Area
            yAxisId="r" type="monotone" dataKey="Attendance"
            stroke="#7a9fc4" strokeWidth={2} fill="url(#grad-att)"
            dot={{ r: 3, fill: '#7a9fc4', stroke: 'white', strokeWidth: 1.5 }}
          />
          <Area
            yAxisId="l" type="monotone" dataKey="Avg GPA"
            stroke="#6aab8e" strokeWidth={2} fill="url(#grad-gpa)"
            dot={{ r: 3, fill: '#6aab8e', stroke: 'white', strokeWidth: 1.5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}