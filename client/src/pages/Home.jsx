import { useState, useEffect, useRef } from "react"
import Navbar from "../components/Navbar"
import "./css/Home.css"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)

  const aboutSectionRef = useRef(null)
  const featuresSectionRef = useRef(null)
  const contactSectionRef = useRef(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleTeacherLogin = () => {
    navigate("/teacherslogin")
  }

  const handleStudentLogin = () => {
    navigate("/studentlogin")
  }

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <>
    <Navbar/> 
    <div className="home-container">
      <div className="animated-background">
        <div className="particles-container">
          {[...Array(20)].map((_, index) => (
            <div key={index} className="particle"></div>
          ))}
        </div>
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <main className="main-content-home">
        <div className={`hero-section ${isLoaded ? "slide-up" : ""}`}>
          <h1>
            Welcome to <span className="highlight">Velora</span>
          </h1>
          <p className="subtitle">Intelligent Attendance Management System</p>
          <div className="hero-description">
            <p>
              Streamline your attendance tracking with our modern, intuitive platform designed for educational
              institutions.
            </p>
          </div>

          <div className="role-buttons">
            <button className="role-btn student-btn" onClick={handleStudentLogin}>
              <span>GET STARTED</span>
            </button>
          </div>
        </div>

        <div ref={aboutSectionRef} id="about" className={`stats-section ${isLoaded ? "fade-in-delay" : ""}`}>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Schools</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10k+</div>
            <div className="stat-label">Teachers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100k+</div>
            <div className="stat-label">Students</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
        </div>

        <h2 ref={featuresSectionRef} id="features" className={`section-title ${isLoaded ? "fade-in-delay-2" : ""}`}>
          Why Choose Velora?
        </h2>

        <div className={`features-section ${isLoaded ? "fade-in-delay-2" : ""}`}>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-time Tracking</h3>
            <p>Monitor attendance in real-time with intuitive dashboards and instant notifications</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Access from any device, anywhere, anytime with our responsive design</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Detailed Reports</h3>
            <p>Generate comprehensive attendance reports with customizable parameters</p>
          </div>
          <div className="feature-card" id="card-centre">
            <div className="feature-icon">🔒</div>
            <h3>Secure Access</h3>
            <p>Role-based permissions ensure data is accessible only to authorized personnel</p>
          </div>
        </div>

        {/* Contact Section - CTA */}
        <div ref={contactSectionRef} id="contact" className={`cta-section ${isLoaded ? "fade-in-delay-3" : ""}`}>
          <h2>Ready to transform your attendance management?</h2>
          <button className="cta-button">Request a Demo</button>
        </div>
      </main>

      <footer className={`footer ${isLoaded ? "fade-in-delay-3" : ""}`}>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Velora</h3>
            <p>Modern attendance management for modern institutions.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(aboutSectionRef)
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(featuresSectionRef)
                  }}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(contactSectionRef)
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: info@velora.edu</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Velora Attendance Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  )
}

export default Home
