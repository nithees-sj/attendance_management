import { useState } from "react"
import { Search, Filter, Check, X, Clock, Calendar, User, Video } from "lucide-react"
import Layout from "../components/Layout"
import "./css/Applications.css"

const Applications = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample applications data
  const applications = [
    {
      id: 1,
      studentName: "Adam Miller",
      studentId: "STU-2023-1001",
      leaveType: "Medical Leave",
      startDate: "2024-01-15",
      endDate: "2024-01-18",
      duration: 4,
      reason: "Fever and flu symptoms, need rest for recovery",
      status: "pending",
      submittedDate: "2024-01-10",
      emergencyContact: "+1-555-0123",
      documents: "medical_certificate.pdf",
    },
    {
      id: 2,
      studentName: "Adam Parker",
      studentId: "STU-2023-1002",
      leaveType: "Official Duty",
      startDate: "2024-01-20",
      endDate: "2024-01-20",
      duration: 1,
      reason: "Attending inter-college technical symposium as team representative",
      status: "approved",
      submittedDate: "2024-01-08",
      emergencyContact: "+1-555-0124",
      documents: "invitation_letter.pdf",
    },
    {
      id: 3,
      studentName: "Ben Thompson",
      studentId: "STU-2023-1003",
      leaveType: "Family Function",
      startDate: "2024-01-25",
      endDate: "2024-01-27",
      duration: 3,
      reason: "Sister's wedding ceremony - important family function",
      status: "pending",
      submittedDate: "2024-01-12",
      emergencyContact: "+1-555-0125",
      documents: "wedding_invitation.jpg",
    },
    {
      id: 4,
      studentName: "Emma Wilson",
      studentId: "STU-2023-1004",
      leaveType: "Personal Leave",
      startDate: "2024-01-10",
      endDate: "2024-01-12",
      duration: 3,
      reason: "Personal emergency - family member hospitalized",
      status: "rejected",
      submittedDate: "2024-01-05",
      emergencyContact: "+1-555-0126",
      documents: null,
    },
    {
      id: 5,
      studentName: "James Davis",
      studentId: "STU-2023-1005",
      leaveType: "Medical Leave",
      startDate: "2024-01-30",
      endDate: "2024-02-02",
      duration: 4,
      reason: "Dental surgery scheduled, recovery period required",
      status: "approved",
      submittedDate: "2024-01-14",
      emergencyContact: "+1-555-0127",
      documents: "dental_appointment.pdf",
    },
  ]

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.leaveType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange"
      case "approved":
        return "green"
      case "rejected":
        return "red"
      default:
        return "gray"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="status-icon" />
      case "approved":
        return <Check className="status-icon" />
      case "rejected":
        return <X className="status-icon" />
      default:
        return <Clock className="status-icon" />
    }
  }

  const handleStatusChange = (applicationId, newStatus) => {
    console.log(`Changing application ${applicationId} status to ${newStatus}`)
    // Here you would typically update the backend
    alert(`Application ${newStatus}!`)
  }

  const applicationsContent = (
    <div className="applications-content">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Leave Applications</h1>
          <p className="page-subtitle">Review and manage student leave requests</p>
        </div>
        <div className="header-stats">
          <span className="stat-item">
            <span className="stat-number-applications">{applications.filter((app) => app.status === "pending").length}</span>
            <span className="stat-label">Pending</span>
          </span>
          <span className="stat-item">
            <span className="stat-number-applications">{applications.filter((app) => app.status === "approved").length}</span>
            <span className="stat-label">Approved</span>
          </span>
          <span className="stat-item">
            <span className="stat-number-applications">{applications.filter((app) => app.status === "rejected").length}</span>
            <span className="stat-label">Rejected</span>
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search by student name, ID, or leave type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <Filter className="filter-icon" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="applications-list">
        {filteredApplications.map((application) => (
          <div key={application.id} className="application-card">
            <div className="application-header">
              <div className="student-info">
                <div className="student-avatar">
                  <User className="avatar-icon" />
                </div>
                <div className="student-details">
                  <h3 className="student-name">{application.studentName}</h3>
                  <p className="student-id">{application.studentId}</p>
                </div>
              </div>

              <div className={`status-badge ${getStatusColor(application.status)}`}>
                {getStatusIcon(application.status)}
                <span className="status-text">
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="application-body">
              <div className="leave-info">
                <div className="info-item">
                  <strong>Leave Type:</strong> {application.leaveType}
                </div>
                <div className="info-item">
                  <Calendar className="info-icon" />
                  <strong>Duration:</strong> {application.startDate} to {application.endDate} ({application.duration}{" "}
                  days)
                </div>
                <div className="info-item">
                  <strong>Reason:</strong> {application.reason}
                </div>
              </div>
            </div>

            <div className="application-footer">
              <div className="submitted-info">
                <small>Submitted on {new Date(application.submittedDate).toLocaleDateString()}</small>
              </div>

              <div className="action-buttons">
                <button
                  className="btn-meet"
                  onClick={() => console.log(`Starting meeting with ${application.studentName}`)}
                >
                  <Video className="btn-icon" />
                  Meet Me
                </button>

                {application.status === "pending" && (
                  <>
                    <button className="btn-approve" onClick={() => handleStatusChange(application.id, "approved")}>
                      <Check className="btn-icon" />
                      Approve
                    </button>
                    <button className="btn-reject" onClick={() => handleStatusChange(application.id, "rejected")}>
                      <X className="btn-icon" />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="no-applications">
          <p>No applications found matching your criteria.</p>
        </div>
      )}
    </div>
  )

  return (
    <Layout currentPage="Applications" onNavigate={onNavigate}>
      {applicationsContent}
    </Layout>
  )
}

export default Applications
