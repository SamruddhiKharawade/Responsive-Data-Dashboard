export default function StudentDrawer({ student, onClose }) {
  if (!student) return null

  const gpaColor = student.gpa >= 9 ? '#3a7d5c' : student.gpa >= 8 ? '#4a6fa5' : student.gpa >= 7 ? '#a0631a' : '#b03a2a'
  const attColor = student.att >= 75 ? '#3a7d5c' : '#b03a2a'

  const mockHistory = [
    { sem: 'Sem 1', gpa: +(student.gpa - 0.4 + Math.random() * 0.8).toFixed(2) },
    { sem: 'Sem 2', gpa: +(student.gpa - 0.3 + Math.random() * 0.6).toFixed(2) },
    { sem: 'Sem 3', gpa: +(student.gpa - 0.2 + Math.random() * 0.4).toFixed(2) },
    { sem: `Sem ${student.sem}`, gpa: student.gpa },
  ]

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.2)',
          zIndex: 150,
        }}
      />

      {/* drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0,
        width: 360, height: '100vh',
        background: 'white',
        borderLeft: '1px solid #e2ded6',
        zIndex: 160,
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>
        {/* header */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #e2ded6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#847e76', letterSpacing: '.4px' }}>STUDENT PROFILE</span>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#847e76', fontSize: 18, lineHeight: 1 }}>×</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: '#d4c9b8', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 600, color: '#7a6a5a',
            }}>
              {student.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{student.name}</div>
              <div style={{ fontSize: 12, color: '#847e76' }}>{student.id} · {student.dept}</div>
            </div>
          </div>
        </div>

        {/* stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, padding: 16 }}>
          {[
            { label: 'GPA',       value: student.gpa.toFixed(2), color: gpaColor },
            { label: 'Attendance',value: `${student.att}%`,      color: attColor },
            { label: 'Backlogs',  value: student.backlogs,       color: student.backlogs > 0 ? '#b03a2a' : '#3a7d5c' },
          ].map(s => (
            <div key={s.label} style={{ background: '#f7f5f0', borderRadius: 10, padding: '12px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#847e76', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* details */}
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#847e76', letterSpacing: '.5px', marginBottom: 10 }}>DETAILS</div>
          {[
            ['Semester',   `Semester ${student.sem}`],
            ['Year',       student.year],
            ['Grade',      student.grade],
            ['Status',     student.status],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0ede6', fontSize: 13 }}>
              <span style={{ color: '#847e76' }}>{k}</span>
              <span style={{ fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </div>

        {/* GPA mini chart */}
        <div style={{ padding: '0 16px 20px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#847e76', letterSpacing: '.5px', marginBottom: 12 }}>GPA HISTORY</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 70 }}>
            {mockHistory.map((h, i) => {
              const height = Math.round(((h.gpa - 6) / 4) * 60) + 10
              const isLast = i === mockHistory.length - 1
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 10, color: isLast ? gpaColor : '#b5b0a8', fontWeight: isLast ? 600 : 400 }}>{h.gpa}</span>
                  <div style={{ width: '100%', height, background: isLast ? gpaColor : '#d8d5cd', borderRadius: '4px 4px 0 0', transition: 'height .4s' }}/>
                  <span style={{ fontSize: 10, color: '#b5b0a8' }}>{h.sem}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* actions */}
        <div style={{ padding: '16px', borderTop: '1px solid #e2ded6', marginTop: 'auto', display: 'flex', gap: 8 }}>
          <button style={{
            flex: 1, padding: '8px', borderRadius: 20, border: '1px solid #e2ded6',
            background: 'white', fontFamily: 'inherit', fontSize: 12.5,
            fontWeight: 500, cursor: 'pointer', color: '#1a1814',
          }}>Send notice</button>
          <button style={{
            flex: 1, padding: '8px', borderRadius: 20, border: 'none',
            background: '#1a1814', fontFamily: 'inherit', fontSize: 12.5,
            fontWeight: 500, cursor: 'pointer', color: 'white',
          }}>Full report</button>
        </div>
      </div>
    </>
  )
}