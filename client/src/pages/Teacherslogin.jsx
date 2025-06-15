import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import Navbar from "../components/Navbar"
import "react-toastify/dist/ReactToastify.css"
import "./css/Login.css"

const TeachersLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          role: "teacher"
        })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("userRole", "teacher")
        toast.success(data.message)
        setTimeout(() => navigate("/teacherdash"), 1500)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
            <Navbar />
    <div className="login-page student-login-page">
      <ToastContainer />
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

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Teachers Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
                className="input-field"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="input-field"
              />
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Having trouble? <a href="https://kongu.ac.in/contact">Contact support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default TeachersLogin