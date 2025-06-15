import { useState } from "react"
import { Bell, Settings, User, LayoutDashboard, CheckCircle, Megaphone } from "lucide-react"
import "../components/Layouts.css"

const Layout = ({ children, currentPage, onNavigate }) => {
  const [activeNavLink, setActiveNavLink] = useState("Home")
  const [activeSidebarItem, setActiveSidebarItem] = useState(currentPage || "Dashboard")
  const [showNotifications, setShowNotifications] = useState(false)

  const navLinks = ["Home", "About", "Features", "Contact"]
  const sidebarItems = [
    { name: "Dashboard", icon: LayoutDashboard, route: "dashboard" },
    { name: "Applications", icon: CheckCircle, route: "applications" },
    { name: "Public Announcement", icon: Megaphone, route: "announcements" },
  ]

  const handleSidebarClick = (item) => {
    setActiveSidebarItem(item.name)
    onNavigate(item.route)
  }

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
  }

  return (
    <div className="layout-container">
      {/* Top Navigation Bar */}
      <nav className="top-navbar">
        <div className="navbar-content">
          {/* Left side - Logo and navigation links */}
          <div className="navbar-left">
            <div className="logo-section">
              <img src="/src/assets/Logo.jpeg" className="logo-img"/>
              <span className="site-name">VELORA</span>
            </div>
          </div>

          {/* Right side - Icons */}
          <div className="navbar-right">
            <div className="notification-container">
              <button className="icon-btn notification-btn" onClick={handleNotificationClick}>
                <Bell className="icon" />
                <span className="notification-badge">3</span>
              </button>

              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h3>Notifications</h3>
                    <button className="close-btn" onClick={() => setShowNotifications(false)}>
                      ×
                    </button>
                  </div>
                  <div className="notification-content">
                    <div className="notification-item">
                      <p>Adam Miller Requested for a Leave</p>
                      <span className="notification-time">2 hours ago</span>
                    </div>
                    <div className="notification-item">
                      <p>Adam Parker requested for a OD</p>
                      <span className="notification-time">Yesterday</span>
                    </div>
                    <div className="notification-item">
                      <p>Ben Thompson requested a leave for his sisters wedding</p>
                      <span className="notification-time">2 days ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="icon-btn">
              <Settings className="icon" />
            </button>

            <button className="icon-btn">
              <User className="icon" />
            </button>
            <a href="/" className="logout-btn">Logout</a>
          </div>
        </div>
        
      </nav>

      <div className="main-layout">
        {/* Left Sidebar - Fixed */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.name}
                  className={`sidebar-item ${activeSidebarItem === item.name ? "active" : ""}`}
                  onClick={() => handleSidebarClick(item)}
                >
                  <IconComponent className="sidebar-icon" />
                  <span className="sidebar-text">{item.name}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="main-content-layout">{children}</main>
      </div>
    </div>
  )
}

export default Layout
