import { useState, useMemo } from 'react'
import { students, DEPARTMENTS, SEMESTERS } from './data/mockStudents'
import Sidebar        from './components/Sidebar'
import TopNav         from './components/TopNav'
import StatCards      from './components/StatCards'
import BarChartCard   from './components/BarChartCard'
import DonutChart     from './components/DonutChart'
import StudentTable   from './components/StudentTable'
import DeptOverview   from './components/DeptOverview'
import TopPerformers  from './components/TopPerformers'

export default function App() {
  const [deptFilter, setDeptFilter] = useState('All')
  const [semFilter,  setSemFilter]  = useState('All')
  const [search,     setSearch]     = useState('')

  const filtered = useMemo(() => {
    return students.filter(s => {
      if (deptFilter !== 'All' && s.dept !== deptFilter) return false
      if (semFilter  !== 'All' && s.sem  !== parseInt(semFilter)) return false
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.id.includes(search)) return false
      return true
    })
  }, [deptFilter, semFilter, search])

  const resetFilters = () => { setDeptFilter('All'); setSemFilter('All'); setSearch('') }

  const deptChips = [{ label: 'All', value: 'All' }, ...DEPARTMENTS.map(d => ({
    label: { 'Computer Science':'CS', Electronics:'ECE', Mechanical:'Mech', Civil:'Civil', Business:'Business' }[d],
    value: d,
  }))]

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopNav />

        <main style={{ flex: 1, padding: 28, display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>

          {/* page header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px' }}>Student Analytics</h1>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>
                VIVA Institute of Technology · Academic Year 2024–25
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="pill-btn outline" onClick={resetFilters}>Reset filters</button>
              <button className="pill-btn filled">Export CSV</button>
            </div>
          </div>

          {/* filters */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center',
            background: 'var(--white)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '12px 16px',
          }}>
            <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>Dept</span>
            {deptChips.map(c => (
              <button key={c.value}
                onClick={() => setDeptFilter(c.value)}
                style={{
                  padding: '5px 13px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                  cursor: 'pointer', fontFamily: 'var(--font)',
                  background: deptFilter === c.value ? 'var(--text)' : 'var(--white)',
                  border: `1px solid ${deptFilter === c.value ? 'var(--text)' : 'var(--border)'}`,
                  color: deptFilter === c.value ? 'white' : 'var(--muted)',
                }}
              >{c.label}</button>
            ))}

            <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500, marginLeft: 8 }}>Sem</span>
            {['All', ...SEMESTERS.map(String)].map(s => (
              <button key={s}
                onClick={() => setSemFilter(s)}
                style={{
                  padding: '5px 11px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                  cursor: 'pointer', fontFamily: 'var(--font)',
                  background: semFilter === s ? 'var(--text)' : 'var(--white)',
                  border: `1px solid ${semFilter === s ? 'var(--text)' : 'var(--border)'}`,
                  color: semFilter === s ? 'white' : 'var(--muted)',
                }}
              >{s === 'All' ? 'All' : s}</button>
            ))}

            <div style={{ marginLeft: 'auto', position: 'relative' }}>
              <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 13, height: 13, color: 'var(--muted2)', pointerEvents: 'none' }}
                viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3" strokeLinecap="round"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name or ID…"
                style={{
                  padding: '6px 12px 6px 28px', borderRadius: 20, border: '1px solid var(--border)',
                  background: 'var(--white)', fontFamily: 'var(--font)', fontSize: 12.5,
                  color: 'var(--text)', outline: 'none', width: 190,
                }}
              />
            </div>
          </div>

          {/* stat cards */}
          <StatCards data={filtered} />

          {/* charts row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 14 }}>
            <BarChartCard students={filtered} />
            <DonutChart   data={filtered} />
          </div>

          {/* table */}
          <StudentTable data={filtered} />

          {/* bottom row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <DeptOverview />
            <TopPerformers />
          </div>

        </main>
      </div>
    </div>
  )
}