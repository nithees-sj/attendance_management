import { useState, useEffect } from "react"
import { Download, ChevronDown } from "lucide-react"
import Layout from "../components/Layout"
import "./css//TeachersDashboard.css"

const TeachersDashboard = ({ onNavigate }) => {
  const [students, setStudents] = useState([])
  const [sortBy, setSortBy] = useState("name")
  const [filterBy, setFilterBy] = useState("all")
  const [filteredStudents, setFilteredStudents] = useState([])

  // Generate sample student data
  const generateStudentData = () => {
    const firstNames = [
      "Aiden",
      "Bella",
      "Caleb",
      "Diana",
      "Ethan",
      "Fiona",
      "George",
      "Hannah",
      "Isaac",
      "Julia",
      "Kevin",
      "Lily",
      "Mason",
      "Nora",
      "Oliver",
      "Penelope",
      "Quinn",
      "Rachel",
      "Samuel",
      "Tara",
      "Umar",
      "Victoria",
      "William",
      "Xena",
      "Yasmin",
      "Zach",
      "Abby",
      "Ben",
      "Chloe",
      "Daniel",
      "Emma",
      "Felix",
      "Grace",
      "Henry",
      "Ivy",
      "Jack",
      "Kate",
      "Leo",
      "Mia",
      "Noah",
      "Olivia",
      "Peter",
      "Quinn",
      "Rose",
      "Simon",
      "Tina",
      "Uma",
      "Vincent",
      "Wendy",
      "Xavier",
      "Yara",
      "Zoe",
      "Adam",
      "Bianca",
      "Charlie",
      "Daisy",
      "Elijah",
      "Freya",
      "Gabriel",
      "Harper",
    ]

    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
      "Hernandez",
      "Lopez",
      "Gonzalez",
      "Wilson",
      "Anderson",
      "Thomas",
      "Taylor",
      "Moore",
      "Jackson",
      "Martin",
      "Lee",
      "Perez",
      "Thompson",
      "White",
      "Harris",
      "Sanchez",
      "Clark",
      "Ramirez",
      "Lewis",
      "Robinson",
      "Walker",
      "Young",
      "Allen",
      "King",
      "Wright",
      "Scott",
      "Torres",
      "Nguyen",
      "Hill",
      "Flores",
      "Green",
      "Adams",
      "Nelson",
      "Baker",
      "Hall",
      "Rivera",
      "Campbell",
      "Mitchell",
      "Carter",
      "Roberts",
      "Gomez",
      "Phillips",
      "Evans",
      "Turner",
      "Diaz",
      "Parker",
      "Cruz",
      "Edwards",
      "Collins",
      "Reyes",
      "Stewart",
    ]

    const studentList = []

    for (let i = 0; i < 60; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const fullName = `${firstName} ${lastName}`
      const attendancePercentage = Math.floor(Math.random() * 101)

      studentList.push({
        id: i + 1,
        name: fullName,
        rollNumber: `CS2023-${(i + 1).toString().padStart(3, "0")}`,
        attendancePercentage,
        class: "CSE",
        section: "A",
        studentId: `STU-2023-${(i + 1234).toString()}`,
        department: "Computer Science",
      })
    }

    // Sort students alphabetically by name first
    studentList.sort((a, b) => a.name.localeCompare(b.name))

    // Assign sequential IDs based on alphabetical order
    studentList.forEach((student, index) => {
      student.id = index + 1
      student.rollNumber = `CS2023-${(index + 1).toString().padStart(3, "0")}`
      student.studentId = `STU-2023-${(index + 1001).toString()}`
    })

    return studentList
  }

  useEffect(() => {
    const studentData = generateStudentData()
    setStudents(studentData)
    setFilteredStudents(studentData)
  }, [])

  useEffect(() => {
    let filtered = [...students]

    // Apply filter
    if (filterBy !== "all") {
      filtered = filtered.filter((student) => {
        if (filterBy === "good") return student.attendancePercentage >= 80
        if (filterBy === "average") return student.attendancePercentage >= 70 && student.attendancePercentage < 80
        if (filterBy === "poor") return student.attendancePercentage < 70
        return true
      })
    }

    // Apply sort
    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "attendance") return b.attendancePercentage - a.attendancePercentage
      if (sortBy === "roll") return a.rollNumber.localeCompare(b.rollNumber)
      return 0
    })

    setFilteredStudents(filtered)
  }, [students, sortBy, filterBy])

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 80) return { class: "good", text: "Good Attendance" }
    if (percentage >= 70) return { class: "average", text: "Average Attendance" }
    return { class: "poor", text: "Poor Attendance" }
  }

  const dashboardContent = (
    <div className="dashboard-content">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Teacher's Dashboard</h1>
        <button className="export-btn">
          <Download className="btn-icon" />
          Export
        </button>
      </div>

      {/* Student Management Section */}
      <div className="student-management-section">
        <div className="section-header">
          <h3 className="section-title">Student Management</h3>

          {/* Sort & Filter Controls */}
          <div className="controls-container">
            <div className="control-group">
              <label htmlFor="sortBy">Sort by:</label>
              <div className="select-wrapper">
                <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="name">Name</option>
                  <option value="attendance">Attendance</option>
                  <option value="roll">Roll Number</option>
                </select>
                <ChevronDown className="select-icon" />
              </div>
            </div>

            <div className="control-group">
              <label htmlFor="filterBy">Filter by Attendance:</label>
              <div className="select-wrapper">
                <select id="filterBy" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                  <option value="all">All Students</option>
                  <option value="good">Good (≥80%)</option>
                  <option value="average">Average (70-79%)</option>
                  <option value="poor">Poor (&lt;70%)</option>
                </select>
                <ChevronDown className="select-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="students-grid">
          {filteredStudents.map((student, index) => {
            const status = getAttendanceStatus(student.attendancePercentage)
            return (
              <div key={student.id} className="student-card" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="student-card-info">
                  <h4 className="student-card-name">{student.name}</h4>
                  <p className="student-card-roll">{student.rollNumber}</p>
                  <p className="student-card-details">
                    {student.class} - Section {student.section}
                  </p>
                </div>
                <div className={`attendance-badge ${status.class}`}>
                  {student.attendancePercentage}% - {status.text}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <Layout currentPage="Dashboard" onNavigate={onNavigate}>
      {dashboardContent}
    </Layout>
  )
}

export default TeachersDashboard
