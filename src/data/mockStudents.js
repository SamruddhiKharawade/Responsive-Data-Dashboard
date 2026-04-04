const DEPTS = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Business']
const SEMS  = [1, 2, 3, 4, 5, 6, 7, 8]

const FIRST = [
  'Aarav','Priya','Rohan','Sneha','Arjun','Kavya','Dev','Ananya',
  'Karan','Riya','Siddharth','Pooja','Nikhil','Aisha','Vikram',
  'Meera','Rahul','Zara','Aryan','Nisha','Tanvi','Harsh','Divya',
  'Yash','Ishaan','Shruti','Akash','Simran','Varun','Deepa',
]
const LAST = [
  'Sharma','Patel','Singh','Kumar','Mehta',
  'Joshi','Gupta','Rao','Verma','Iyer',
  'Nair','Shah','Reddy','Chopra','Malhotra',
]

function sr(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export const students = Array.from({ length: 80 }, (_, i) => {
  const s    = i + 1
  const dept = DEPTS[Math.floor(sr(s * 3)  * DEPTS.length)]
  const sem  = SEMS [Math.floor(sr(s * 7)  * SEMS.length)]
  const gpa  = parseFloat((sr(s * 11) * 2 + 6.5).toFixed(2))
  const att  = Math.floor(sr(s * 17) * 44) + 56
  const grade = gpa >= 9 ? 'A' : gpa >= 8 ? 'B' : gpa >= 7 ? 'C' : 'D'
  return {
    id     : `STU${String(s).padStart(3, '0')}`,
    name   : `${FIRST[Math.floor(sr(s*19)*FIRST.length)]} ${LAST[Math.floor(sr(s*23)*LAST.length)]}`,
    dept, sem,
    year   : 2020 + Math.floor(sr(s * 29) * 4),
    gpa, att, grade,
    status : sr(s * 31) > 0.1 ? 'Active' : 'Inactive',
    backlogs: Math.floor(sr(s * 37) * 4),
  }
})

export const DEPARTMENTS = DEPTS
export const SEMESTERS   = SEMS