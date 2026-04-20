import { useState, useMemo } from 'react'
import { students, DEPARTMENTS, SEMESTERS } from './data/mockStudents'

import Sidebar        from './components/Sidebar'
import TopNav         from './components/TopNav'
import TopoBackground from './components/TopoBackground'
import StatCards      from './components/StatCards'
import AreaChartCard  from './components/AreaChartCard'
import GradeChart     from './components/GradeChart'
import StudentTable   from './components/StudentTable'
import DeptOverview   from './components/DeptOverview'
import TopPerformers  from './components/TopPerformers'
import AtRiskBanner   from './components/AtRiskBanner'
import StudentDrawer  from './components/StudentDrawer'
import Modal          from './components/Modal'
import Toast          from './components/Toast'

const DEPT_CHIPS = [
  { label: 'All',      value: 'All' },
  { label: 'CS',       value: 'Computer Science' },
  { label: 'ECE',      value: 'Electronics' },
  { label: 'Mech',     value: 'Mechanical' },
  { label: 'Civil',    value: 'Civil' },
  { label: 'Business', value: 'Business' },
]

export default function App() {

  // ── nav state ──────────────────────────────────────────────
  const [activeSb,  setActiveSb]  = useState(0)
  const [activeTab, setActiveTab] = useState('Dashboard')

  // ── filter state ───────────────────────────────────────────
  const [deptF,  setDeptF]  = useState('All')
  const [semF,   setSemF]   = useState('All')
  const [search, setSearch] = useState('')

  // ── ui state ───────────────────────────────────────────────
  const [modal,           setModal]           = useState(null)
  const [toast,           setToast]           = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)

  const showToast = msg => setToast(msg)

  // ── filtered data ──────────────────────────────────────────
  const filtered = useMemo(() => students.filter(s => {
    if (deptF !== 'All' && s.dept !== deptF) return false
    if (semF  !== 'All' && s.sem  !== parseInt(semF)) return false
    if (search &&
        !s.name.toLowerCase().includes(search.toLowerCase()) &&
        !s.id.includes(search)
    ) return false
    return true
  }), [deptF, semF, search])

  // ── export CSV ─────────────────────────────────────────────
  const exportCSV = () => {
    const rows = [
      ['ID', 'Name', 'Department', 'Semester', 'GPA', 'Attendance', 'Grade', 'Status', 'Backlogs'],
      ...filtered.map(s => [
        s.id, s.name, s.dept, s.sem,
        s.gpa, s.att, s.grade, s.status, s.backlogs,
      ]),
    ]
    const csv  = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url
    a.download = 'students.csv'
    a.click()
    URL.revokeObjectURL(url)
    showToast(`Exported ${filtered.length} records`)
  }

  const resetFilters = () => {
    setDeptF('All')
    setSemF('All')
    setSearch('')
    showToast('Filters cleared')
  }

  // ── sidebar handler ────────────────────────────────────────
  const handleSbSelect = (index, label) => {
    setActiveSb(index)
    if (label === 'Settings') {
      setModal('settings')
      return
    }
    showToast(`Navigated to ${label}`)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

      {/* ── SIDEBAR ── */}
      <Sidebar activeIndex={activeSb} onSelect={handleSbSelect}/>

      {/* ── MAIN ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}>

        {/* ── TOPNAV ── */}
        <TopNav
          activeTab={activeTab}
          onTabChange={tab => { setActiveTab(tab); showToast(`Viewing ${tab}`) }}
          onSearch={() => setModal('search')}
          onBell={() => showToast('No new notifications')}
          onAvatar={() => setModal('profile')}
        />

        {/* ── CONTENT ── */}
        <main style={{
          flex: 1,
          padding: '22px 24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          position: 'relative',
        }}>

          <TopoBackground/>

          {/* ── PAGE HEADER ── */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1,
          }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.5px' }}>
                Student Analytics
              </h1>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                Academic Year 2024–25
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline" onClick={resetFilters}>
                Reset filters
              </button>
              <button className="btn btn-filled" onClick={exportCSV}>
                Export CSV
                <span className="dot"/>
              </button>
            </div>
          </div>

          {/* ── FILTERS ── */}
          <div style={{
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            alignItems: 'center',
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '10px 14px',
            position: 'relative',
            zIndex: 1,
          }}>
            <span style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 500 }}>Dept</span>
            {DEPT_CHIPS.map(c => (
              <div
                key={c.value}
                className={`chip ${deptF === c.value ? 'on' : ''}`}
                onClick={() => setDeptF(c.value)}
              >
                {c.label}
              </div>
            ))}

            <span style={{
              fontSize: 11.5,
              color: 'var(--muted)',
              fontWeight: 500,
              marginLeft: 8,
            }}>
              Sem
            </span>
            {['All', ...SEMESTERS.map(String)].map(s => (
              <div
                key={s}
                className={`chip ${semF === s ? 'on' : ''}`}
                onClick={() => setSemF(s)}
              >
                {s}
              </div>
            ))}

            {/* search input */}
            <div style={{ marginLeft: 'auto', position: 'relative' }}>
              <svg
                style={{
                  position: 'absolute', left: 9, top: '50%',
                  transform: 'translateY(-50%)',
                  width: 13, height: 13,
                  color: 'var(--muted2)',
                  pointerEvents: 'none',
                }}
                viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <circle cx="7" cy="7" r="5"/>
                <path d="M11 11l3 3" strokeLinecap="round"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name or ID…"
                style={{
                  padding: '5px 12px 5px 28px',
                  borderRadius: 20,
                  border: '1px solid var(--border)',
                  background: 'var(--white)',
                  fontFamily: 'var(--font)',
                  fontSize: 12,
                  color: 'var(--text)',
                  outline: 'none',
                  width: 180,
                }}
              />
            </div>
          </div>

          {/* ── AT-RISK BANNER ── */}
          <AtRiskBanner
            data={filtered}
            onViewAll={() => showToast('Showing at-risk students — filter by GPA < 7 and Attendance < 75%')}
          />

          {/* ── STAT CARDS ── */}
          <StatCards data={filtered}/>

          {/* ── CHARTS ROW ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 12 }}>
            <AreaChartCard students={filtered}/>
            <GradeChart    data={filtered}/>
          </div>

          {/* ── STUDENT TABLE ── */}
          <StudentTable
            data={filtered}
            onRowClick={s => setSelectedStudent(s)}
          />

          {/* ── BOTTOM ROW ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <DeptOverview  data={filtered}/>
            <TopPerformers data={filtered}/>
          </div>

        </main>
      </div>

      {/* ── STUDENT DRAWER ── */}
      <StudentDrawer
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />

      {/* ── MODAL: SEARCH ── */}
      {modal === 'search' && (
        <Modal onClose={() => setModal(null)}>
          <div className="modal-title">Quick Search</div>
          <div className="modal-sub">Search across all student records</div>
          <input
            autoFocus
            placeholder="Name, ID, department…"
            defaultValue={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 14px',
              borderRadius: 9,
              border: '1px solid var(--border)',
              fontFamily: 'var(--font)',
              fontSize: 13,
              outline: 'none',
            }}
          />
          <div style={{ marginTop: 10, fontSize: 12, color: 'var(--muted)' }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
          </div>
          <button
            className="btn btn-filled"
            style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}
            onClick={() => setModal(null)}
          >
            Done
          </button>
        </Modal>
      )}

      {/* ── MODAL: PROFILE ── */}
      {modal === 'profile' && (
        <Modal onClose={() => setModal(null)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <div style={{
              width: 48, height: 48,
              borderRadius: '50%',
              background: '#d4c9b8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 600, color: '#7a6a5a',
            }}>
              AK
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>Arjun Kumar</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>
                Administrator 
              </div>
            </div>
          </div>
          {[
            ['Role',       'Admin'],
            ['Department', 'Computer Science'],
            ['Year',       '2024–25'],
            ['Access',     'Full'],
          ].map(([k, v]) => (
            <div key={k} className="csv-row">
              <span style={{ color: 'var(--muted)' }}>{k}</span>
              <span style={{ fontWeight: 500 }}>{v}</span>
            </div>
          ))}
          <button
            className="btn btn-outline"
            style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}
            onClick={() => { setModal(null); showToast('Signed out') }}
          >
            Sign out
          </button>
        </Modal>
      )}

      {/* ── MODAL: SETTINGS ── */}
      {modal === 'settings' && (
        <Modal onClose={() => setModal(null)}>
          <div className="modal-title">Settings</div>
          <div className="modal-sub">Dashboard preferences</div>
          {[
            ['Academic Year',    '2024–25'],
            ['Default View',     'All Departments'],
            ['Records per page', '8'],
            ['Theme',            'Light'],
          ].map(([k, v]) => (
            <div key={k} className="csv-row">
              <span style={{ color: 'var(--muted)' }}>{k}</span>
              <span style={{ fontWeight: 500, color: 'var(--blue)' }}>{v}</span>
            </div>
          ))}
          <button
            className="btn btn-filled"
            style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}
            onClick={() => { setModal(null); showToast('Settings saved') }}
          >
            Save
          </button>
        </Modal>
      )}

      {/* ── TOAST ── */}
      {toast && <Toast message={toast} onDone={() => setToast('')}/>}

    </div>
  )
}