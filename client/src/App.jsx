"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Home from "./pages/Home.jsx"
import StudentLogin from "./pages/Studentlogin.jsx"
import TeacherLogin from "./pages/Teacherslogin.jsx"
import StudDashboard from "./pages/StudDashboard.jsx"
import TeachersDashboard from "./pages/TeachersDashboard.jsx"
import Applications from "./pages/Applications.jsx"
import Announcements from "./pages/Announcements.jsx"
import "./App.css"

// Teacher Dashboard Wrapper Component with State-based Navigation
function TeacherDashboardWrapper() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <TeachersDashboard onNavigate={handleNavigate} />
      case "applications":
        return <Applications onNavigate={handleNavigate} />
      case "announcements":
        return <Announcements onNavigate={handleNavigate} />
      default:
        return <TeachersDashboard onNavigate={handleNavigate} />
    }
  }

  return <div className="teacher-dashboard-wrapper">{renderCurrentPage()}</div>
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/studentlogin" element={<StudentLogin />} />
            <Route path="/teacherslogin" element={<TeacherLogin />} />
            <Route path="/studentdash" element={<StudDashboard />} />
            <Route path="/teacherdash" element={<TeacherDashboardWrapper />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
