"use client"

import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import "./Navbar.css"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoaded, setIsLoaded] = useState(false)

  // Create refs for each section (only used on home page)
  const aboutSectionRef = useRef(null)
  const featuresSectionRef = useRef(null)
  const contactSectionRef = useRef(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleLogoClick = () => {
    navigate("/")
  }

  // Scroll to section function (only works on home page)
  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      // If not on home page, navigate to home first
      navigate("/")
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }, 100)
    } else {
      // If on home page, scroll directly
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  }

  const handleNavClick = (sectionId, e) => {
    e.preventDefault()
    scrollToSection(sectionId)
  }

  return (
    <nav className={`navbar ${isLoaded ? "fade-in" : ""}`}>
      <div className="navbar-container">
        <div className="logo" onClick={handleLogoClick}>
          <img src="./src/assets/Logo.jpeg" className="logo-vel-img" alt="Velora Logo" />
          <span className="logo-text">VELORA</span>
        </div>
        <div className="nav-links">
          <a
            href="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault()
              navigate("/")
            }}
          >
            Home
          </a>
          <a href="#about" className="nav-link" onClick={(e) => handleNavClick("about", e)}>
            About
          </a>
          <a href="#features" className="nav-link" onClick={(e) => handleNavClick("features", e)}>
            Features
          </a>
          <a href="#contact" className="nav-link" onClick={(e) => handleNavClick("contact", e)}>
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
