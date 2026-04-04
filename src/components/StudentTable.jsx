import { useState } from 'react'

const PER_PAGE = 8

function GradeTag({ grade }) {
  return (
    <span className={`grade-tag g${grade}`}>{grade}</span>
  )
}

function AttBar({ value }) {
  const color = value >= 75 ? '#3a7d5c' : '#b03a2a'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <div style={{ width: 52, height: 4, background: '#eeece8', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 4 }}/>
      </div>
      <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>{value}%</span>
    </div>
  )
}

function PageBtn({ label, onClick, active, disabled }) {
  return (
    <button
      className={`pg-btn ${active ? 'pa' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default function StudentTable({ data , onRowClick}) {
  const [sortKey, setSortKey] = useState('id')
  const [sortDir, setSortDir] = useState('asc')
  const [page,    setPage]    = useState(1)

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

  const Th = ({ k, label }) => (
    <th onClick={() => handleSort(k)}>
      {label}{sortKey === k ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
    </th>
  )

  return (
    <div className="table-card">
      <div className="tbl-hdr">
        <div>
          <div className="card-title">Student Records</div>
          <div className="card-sub">{data.length} students</div>
        </div>
        <select
          onChange={e => {
            const [k, d] = e.target.value.split('-')
            setSortKey(k); setSortDir(d); setPage(1)
          }}
          style={{
            padding: '4px 10px', borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'var(--white)',
            fontFamily: 'var(--font)', fontSize: 11.5,
            color: 'var(--text)', outline: 'none', cursor: 'pointer',
          }}
        >
          <option value="id-asc">Sort: ID ↑</option>
          <option value="name-asc">Name A–Z</option>
          <option value="gpa-desc">GPA ↓</option>
          <option value="att-desc">Attendance ↓</option>
        </select>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <Th k="id"     label="ID"         />
              <Th k="name"   label="Name"       />
              <Th k="dept"   label="Department" />
              <Th k="sem"    label="Sem"        />
              <Th k="gpa"    label="GPA"        />
              <Th k="att"    label="Attendance" />
              <Th k="grade"  label="Grade"      />
              <Th k="status" label="Status"     />
            </tr>
          </thead>
          <tbody>
            {paged.map(s => (
              <tr key={s.id}
              onClick={() => onRowClick(s)}
  style={{ cursor: 'pointer' }}>
                <td style={{ color: 'var(--muted)', fontSize: 11.5 }}>{s.id}</td>
                <td style={{ fontWeight: 500 }}>{s.name}</td>
                <td style={{ color: 'var(--muted)', fontSize: 12 }}>{s.dept}</td>
                <td style={{ textAlign: 'center' }}>{s.sem}</td>
                <td style={{ fontWeight: 600 }}>{s.gpa.toFixed(2)}</td>
                <td><AttBar value={s.att}/></td>
                <td><GradeTag grade={s.grade}/></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: s.status === 'Active' ? '#3a7d5c' : '#b5b0a8',
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

      <div className="pg">
        <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>
          Page {safePage} of {totalPages}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <PageBtn label="←" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1}/>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
            <PageBtn key={p} label={p} onClick={() => setPage(p)} active={p === safePage}/>
          ))}
          <PageBtn label="→" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}/>
        </div>
      </div>
    </div>
  )
}