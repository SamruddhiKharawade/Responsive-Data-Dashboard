import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const GRADE_COLORS = ['#6aab8e', '#7a9fc4', '#d4a96a', '#c97a72']

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'white', border: '1px solid #e2ded6',
      borderRadius: 8, padding: '8px 12px',
      fontSize: 12, fontFamily: 'Instrument Sans, sans-serif',
    }}>
      <span style={{ fontWeight: 600 }}>{payload[0].name}</span>: {payload[0].value} students
    </div>
  )
}

export default function DonutChart({ data }) {
  const chartData = ['A', 'B', 'C', 'D'].map((g, i) => ({
    name : `Grade ${g}`,
    value: data.filter(s => s.grade === g).length,
    color: GRADE_COLORS[i],
  }))

  return (
    <div className="card">
      <div className="card-hdr">
        <div>
          <div className="card-title">Grade Distribution</div>
          <div className="card-sub">Breakdown by letter grade</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={190}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%" cy="45%"
            innerRadius={46} outerRadius={72}
            paddingAngle={3} dataKey="value"
          >
            {chartData.map((e, i) => <Cell key={i} fill={e.color}/>)}
          </Pie>
          <Tooltip content={<CustomTooltip/>}/>
          <Legend
            iconType="circle" iconSize={7}
            wrapperStyle={{ fontSize: 11.5, fontFamily: 'Instrument Sans, sans-serif' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}