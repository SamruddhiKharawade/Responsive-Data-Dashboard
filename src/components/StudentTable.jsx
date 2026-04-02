import { useState } from 'react'

const PER_PAGE = 8

function GradeTag({ grade }) {
  const map = {
    A: { bg: '#e8f5ee', color: '#1e7a4e' },
    B: { bg: '#eef2fb', color: '#2a56a4' },
    C: { bg: '#fdf3e3', color: '#9a5e0a' },
    D: { bg: '#fdf0ee', color: '#a83228' },
  }
  const s = map[grade] || map.D
  return (
    <span style={{
      display: 'inline-flex', padding: '2px 9px', borderRadius: 20,
      fontSize: 11.5, fontWeight: 600, background: s.bg, color: s.color,
    }}>{grade}</span>
  )
}

function AttBar({ value }) {
  const color = value >= 75 ? '#2d8c5e' : '#c0392b'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 56, height: 4, background: '#eeece8', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 4 }}/>
      </div>
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{value}%</span>
    </div>
  )
}

export default function StudentTable({ data }) {
  const [sortKey, setSortKey] = useState('id')
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage]       = useState(1)

  const handleSort = key => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
    setPage(1)
  }

  const sorted = [...data].sort((a, b) => {
    let va = a[sortKey], vb = b[sortKey]
    if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase() }
    return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1)
  })

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE))
  const safePage   = Math.min(page, totalPages)
  const paged      = sorted.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  const Th = ({ k, label }) => {
    const active = sortKey === k
    return (
      <th
        onClick={() => handleSort(k)}
        style={{
          textAlign: 'left', padding: '9px 14px', fontSize: 11.5, fontWeight: 600,
          color: active ? 'var(--text)' : 'var(--muted)', letterSpacing: '0.3px',
          cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none',
          background: 'var(--surface)', borderBottom: '1px solid var(--border)',
        }}
      >
        {label} {active ? (sortDir === 'asc' ? '↑' : '↓') : ''}
      </th>
    )
  }

  return (
    <div className="card" style={{ padding: 0 }}>
      {/* header */}
      <div style={{
        padding: '18px 20px 14px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', borderBottom: '1px solid var(--border)',
      }}>
        <div>
          <div className="card-title">Student Records</div>
          <div className="card-sub">Showing {data.length} student{data.length !== 1 ? 's' : ''}</div>
        </div>
      </div>

      {/* table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <Th k="id"         label="ID"         />
              <Th k="name"       label="Name"       />
              <Th k="dept"       label="Department" />
              <Th k="sem"        label="Sem"        />
              <Th k="gpa"        label="GPA"        />
              <Th k="att"        label="Attendance" />
              <Th k="grade"      label="Grade"      />
              <Th k="status"     label="Status"     />
            </tr>
          </thead>
          <tbody>
            {paged.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.background = '#faf9f7'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)' }}>{s.id}</td>
                <td style={{ padding: '10px 14px', fontWeight: 500 }}>{s.name}</td>
                <td style={{ padding: '10px 14px', fontSize: 12.5, color: 'var(--muted)' }}>{s.dept}</td>
                <td style={{ padding: '10px 14px', textAlign: 'center' }}>{s.sem}</td>
                <td style={{ padding: '10px 14px', fontWeight: 600, fontSize: 13.5 }}>{s.gpa.toFixed(2)}</td>
                <td style={{ padding: '10px 14px' }}><AttBar value={s.att}/></td>
                <td style={{ padding: '10px 14px' }}><GradeTag grade={s.grade}/></td>
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5 }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: s.status === 'Active' ? '#2d8c5e' : '#b0aca4',
                    }}/>
                    <span style={{ color: s.status === 'Active' ? 'var(--green)' : 'var(--muted)' }}>
                      {s.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', borderTop: '1px solid var(--border)',
      }}>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          Page {safePage} of {totalPages}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <PageBtn label="←" onClick={() => setPage(p => Math.max(1, p-1))} disabled={safePage === 1}/>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
            <PageBtn key={p} label={p} onClick={() => setPage(p)} active={p === safePage}/>
          ))}
          <PageBtn label="→" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={safePage === totalPages}/>
        </div>
      </div>
    </div>
  )
}

function PageBtn({ label, onClick, active, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '4px 10px', borderRadius: 7, fontSize: 12, cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font)', border: '1px solid var(--border)',
        background: active ? 'var(--text)' : 'var(--white)',
        color: active ? 'white' : disabled ? 'var(--muted2)' : 'var(--muted)',
        opacity: disabled ? 0.4 : 1,
      }}
    >{label}</button>
  )
}