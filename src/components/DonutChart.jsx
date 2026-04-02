import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const GRADES  = ['A', 'B', 'C', 'D']
const COLORS  = ['#2d8c5e', '#3b6fd4', '#b06a10', '#c0392b']
const BG      = ['#e8f5ee',  '#eef2fb',  '#fdf3e3',  '#fdf0ee']

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--white)', border: '1px solid var(--border)',
      borderRadius: 8, padding: '8px 12px', fontSize: 12, fontFamily: 'var(--font)',
    }}>
      <span style={{ fontWeight: 600 }}>{payload[0].name}</span>: {payload[0].value} students
    </div>
  )
}

export default function DonutChart({ data }) {
  const chartData = GRADES.map((g, i) => ({
    name  : `Grade ${g}`,
    value : data.filter(s => s.grade === g).length,
    color : COLORS[i],
  }))

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Grade Distribution</div>
          <div className="card-sub">Breakdown by letter grade</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={chartData} cx="50%" cy="50%"
            innerRadius={48} outerRadius={72}
            paddingAngle={3} dataKey="value"
          >
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} opacity={0.88}/>
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />}/>
          <Legend
            iconType="circle" iconSize={8}
            wrapperStyle={{ fontSize: 12, fontFamily: 'var(--font)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}