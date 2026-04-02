import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { SEMESTERS } from '../data/mockStudents'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--white)', border: '1px solid var(--border)',
      borderRadius: 8, padding: '10px 14px', fontSize: 12,
      fontFamily: 'var(--font)',
    }}>
      <div style={{ color: 'var(--muted)', marginBottom: 4, fontWeight: 500 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 500 }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

export default function BarChartCard({ students }) {
  const semData = SEMESTERS.map(s => {
    const d = students.filter(x => x.sem === s)
    return {
      sem : `Sem ${s}`,
      'Avg GPA'   : d.length ? parseFloat((d.reduce((a,b)=>a+b.gpa,0)/d.length).toFixed(2)) : 0,
      'Attendance': d.length ? Math.round(d.reduce((a,b)=>a+b.att,0)/d.length) : 0,
    }
  })

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">GPA by Semester</div>
          <div className="card-sub">Average academic performance across semesters</div>
        </div>
        <span className="tag tag-blue">Avg</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={semData} barGap={4} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)"/>
          <XAxis dataKey="sem" tick={{ fill: 'var(--muted)', fontSize: 11 }} axisLine={false} tickLine={false}/>
          <YAxis yAxisId="l" domain={[6,10]} tick={{ fill: 'var(--muted)', fontSize: 11 }} axisLine={false} tickLine={false}/>
          <YAxis yAxisId="r" orientation="right" domain={[50,100]} tick={{ fill: 'var(--muted)', fontSize: 11 }} axisLine={false} tickLine={false}/>
          <Tooltip content={<CustomTooltip />}/>
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, fontFamily: 'var(--font)' }}/>
          <Bar yAxisId="l" dataKey="Avg GPA"    fill="#3b6fd4" radius={[4,4,0,0]}/>
          <Bar yAxisId="r" dataKey="Attendance" fill="#2d8c5e" radius={[4,4,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}