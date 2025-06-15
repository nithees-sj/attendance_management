import { useState, useEffect } from "react"
import { Calendar, CheckCircle, FileText, LayoutDashboard, LogOut, Settings, User, X, Bell } from 'lucide-react'
import StudLeave from "./StudLeave.jsx"
import "./css/Dashboard.css"

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("dashboard")
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // Close the profile menu when clicking outside
  const closeProfileMenu = (e) => {
    if (showProfileMenu && !e.target.closest(".profile-panel") && !e.target.closest(".right-corner-icon")) {
      setShowProfileMenu(false)
    }
  }

  // Close the notifications when clicking outside
  const closeNotifications = (e) => {
    if (showNotifications && !e.target.closest(".notifications-panel") && !e.target.closest(".notifications-button")) {
      setShowNotifications(false)
    }
  }

  // Add event listener for clicks outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      closeProfileMenu(e)
      closeNotifications(e)
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [showProfileMenu, showNotifications])

  // Render different content based on active item
  const renderMainContent = () => {
    switch (activeItem) {
      case "studleave":
        return <StudLeave />
      case "approved-leaves":
        return (
          <div className="main-content-dashboard">
            <div className="page-header">
              <h1 className="page-title">Approved Leaves</h1>
            </div>
            <div className="placeholder-content">
              <p>Approved leaves content will be implemented here.</p>
            </div>
          </div>
        )
      case "dashboard":
      default:
        return (
          <div className="main-content-dashboard">
            <div className="page-header">
              <h1 className="page-title">Student Dashboard</h1>
              <button className="export-button">
                <FileText className="button-icon" />
                Export
              </button>
            </div>

            <div className="id-card">
              <div className="id-card-header">
                <div className="student-info">
                  <h2 className="student-name">John Smith</h2>
                  <p className="roll-number">Roll Number: CS2023-045</p>
                  <div className="badges">
                    <span className="badge">Class: CSE</span>
                    <span className="badge">Section: A</span>
                  </div>
                </div>
                <span className="semester-badge">Semester 2</span>
              </div>
              <div className="id-card-content">
                <div className="student-profile">
                  <div className="profile-image">
                    <User />
                  </div>
                  <div className="profile-details">
                    <p className="profile-detail">Student ID: STU-2023-1234</p>
                    <p className="profile-detail">Department: Computer Science</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="leaves-section">
              <div className="section-header">
                <h2 className="section-title">Leaves</h2>
                <div className="separator"></div>
              </div>

              <div className="status-cards">
                <div className="status-card applied">
                  <div className="status-card-header">
                    <h3 className="status-title">Applied</h3>
                  </div>
                  <div className="status-card-content">
                    <div className="status-count">3</div>
                    <p className="status-description">Pending review</p>
                  </div>
                </div>

                <div className="status-card approved">
                  <div className="status-card-header">
                    <h3 className="status-title">Approved</h3>
                  </div>
                  <div className="status-card-content">
                    <div className="status-count">8</div>
                    <p className="status-description">This semester</p>
                  </div>
                </div>

                <div className="status-card in-progress">
                  <div className="status-card-header">
                    <h3 className="status-title">In-Progress</h3>
                  </div>
                  <div className="status-card-content">
                    <div className="status-count">2</div>
                    <p className="status-description">Under review</p>
                  </div>
                </div>

                <div className="status-card declined">
                  <div className="status-card-header">
                    <h3 className="status-title">Declined</h3>
                  </div>
                  <div className="status-card-content">
                    <div className="status-count">1</div>
                    <p className="status-description">This semester</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="recent-applications">
              <div className="recent-applications-header">
                <h2 className="recent-applications-title">Recent Leave Applications</h2>
              </div>
              <div className="recent-applications-content">
                <div className="application-item">
                  <div className="application-info">
                    <p className="application-title">Medical Leave</p>
                    <div className="application-date">
                      <Calendar className="date-icon" />
                      <span>May 15 - May 18, 2023</span>
                    </div>
                  </div>
                  <span className="status-badge in-progress">In-Progress</span>
                </div>

                <div className="application-item">
                  <div className="application-info">
                    <p className="application-title">Family Function</p>
                    <div className="application-date">
                      <Calendar className="date-icon" />
                      <span>April 10 - April 12, 2023</span>
                    </div>
                  </div>
                  <span className="status-badge approved">Approved</span>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="logo-dashboard" onClick={() => window.location.href = "/"}>
          <img className="logo-icon" src="/src/assets/Logo.jpeg" alt="Logo" />
          <span className="logo-text-dashboard">VELORA</span>
        </div>
        <div className="header-actions">
          <button className="icon-button notifications-button" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell />
            <span className="notification-badge">3</span>
            <span className="sr-only">Notifications</span>
          </button>
          <button className="icon-button">
            <Settings />
            <span className="sr-only">Settings</span>
          </button>
          <button className="right-corner-icon" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <User />
          </button>
          <a href="/" className="logout-btn">Logout</a>


          {/* Notifications Panel */}
          {showNotifications && (
            <div className="notifications-panel">
              <div className="panel-header">
                <h3 className="panel-title">Notifications</h3>
                <button className="close-button" onClick={() => setShowNotifications(false)}>
                  <X size={16} />
                </button>
              </div>
              <div className="panel-content">
                <div className="notification-item">
                  <div className="notification-content">
                    <p className="notification-text">Your leave request has been approved</p>
                    <p className="notification-time">2 hours ago</p>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-content">
                    <p className="notification-text">New attendance policy updated</p>
                    <p className="notification-time">Yesterday</p>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-content">
                    <p className="notification-text">Monthly attendance report is ready</p>
                    <p className="notification-time">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Menu Popup */}
          {showProfileMenu && (
            <div className="profile-panel">
              <div className="panel-header">
                <h3 className="panel-title">Profile</h3>
                <button className="close-button" onClick={() => setShowProfileMenu(false)}>
                  <X size={16} />
                </button>
              </div>
              <div className="panel-content">
                <div className="profile-info">
                  <div className="profile-avatar">
                    <User size={48} />
                  </div>
                  <div className="profile-details">
                    <h4 className="profile-name">John Smith</h4>
                    <p className="profile-id">CS2023-045</p>
                  </div>
                </div>
                <div className="profile-actions">
                  <button className="profile-action-button">
                    <User size={16} />
                    <span>View Profile</span>
                  </button>
                  <button className="profile-action-button">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="logout-button">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="main-container">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <button
              className={`sidebar-nav-button ${activeItem === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveItem("dashboard")}
            >
              <LayoutDashboard className="sidebar-nav-icon" />
              <span>Dashboard</span>
            </button>

            <button
              className={`sidebar-nav-button ${activeItem === "studeleave" ? "active" : ""}`}
              onClick={() => setActiveItem("studleave")}
            >
              <Calendar className="sidebar-nav-icon" />
              <span>Leave Management</span>
            </button>

            <button
              className={`sidebar-nav-button ${activeItem === "approved-leaves" ? "active" : ""}`}
              onClick={() => setActiveItem("approved-leaves")}
            >
              <CheckCircle className="sidebar-nav-icon" />
              <span>Approved Leaves</span>
            </button>
          </nav>
        </aside>

        <main className="main-content-wrapper">{renderMainContent()}</main>
      </div>
    </div>
  )
}
