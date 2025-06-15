import { useState } from "react"
import { Send, Users, MessageSquare } from "lucide-react"
import Layout from "/home/nithees/Desktop/Projects/Velora_App/Velora_App/client/src/components/Layout.jsx"
import "./css/Announcements.css"

const Announcements = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    targetClass: "",
    targetSection: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const classes = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "All Classes"]
  const sections = ["A", "B", "C", "D", "All Sections"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    if (!formData.targetClass) newErrors.targetClass = "Please select a target class"
    if (!formData.targetSection) newErrors.targetSection = "Please select a target section"

    if (formData.title.length > 100) newErrors.title = "Title must be less than 100 characters"
    if (formData.message.length > 500) newErrors.message = "Message must be less than 500 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        console.log("Announcement sent:", formData)
        alert("Announcement sent successfully to students!")

        // Reset form
        setFormData({
          title: "",
          message: "",
          targetClass: "",
          targetSection: "",
        })
        setIsSubmitting(false)
      }, 1500)
    }
  }

  const getTargetAudience = () => {
    if (formData.targetClass && formData.targetSection) {
      if (formData.targetClass === "All Classes" && formData.targetSection === "All Sections") {
        return "All Students"
      } else if (formData.targetClass === "All Classes") {
        return `All Classes - Section ${formData.targetSection}`
      } else if (formData.targetSection === "All Sections") {
        return `${formData.targetClass} - All Sections`
      } else {
        return `${formData.targetClass} - Section ${formData.targetSection}`
      }
    }
    return "No target selected"
  }

  const announcementContent = (
    <div className="announcements-content">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Public Announcements</h1>
          <p className="page-subtitle">Send important announcements to students about leaves and updates</p>
        </div>
      </div>

      {/* Announcement Form */}
      <div className="announcement-form-container">
        <div className="form-header">
          <MessageSquare className="form-icon" />
          <h2>Create New Announcement</h2>
        </div>

        <form onSubmit={handleSubmit} className="announcement-form">
          {/* Title Input */}
          <div className="form-group">
            <label htmlFor="title">Announcement Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter announcement title..."
              className={`form-input ${errors.title ? "error" : ""}`}
              maxLength={100}
            />
            <div className="input-footer">
              {errors.title && <span className="error-message">{errors.title}</span>}
              <span className="character-count">{formData.title.length}/100</span>
            </div>
          </div>

          {/* Target Audience Preview */}
          {(formData.targetClass || formData.targetSection) && (
            <div className="target-preview">
              <Users className="target-icon" />
              <span>Target Audience: {getTargetAudience()}</span>
            </div>
          )}

          {/* Message Textarea */}
          <div className="form-group">
            <label htmlFor="message">Announcement Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Type your announcement message here..."
              rows={6}
              className={`form-textarea ${errors.message ? "error" : ""}`}
              maxLength={500}
            />
            <div className="input-footer">
              {errors.message && <span className="error-message">{errors.message}</span>}
              <span className="character-count">{formData.message.length}/500</span>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setFormData({
                  title: "",
                  message: "",
                  targetClass: "",
                  targetSection: "",
                })
                setErrors({})
              }}
              disabled={isSubmitting}
            >
              Clear Form
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="loading-spinner"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="btn-icon" />
                  Send Announcement
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Recent Announcements Preview */}
      <div className="recent-announcements">
        <h3>Recent Announcements</h3>
        <div className="announcement-preview">
          <div className="preview-item">
            <div className="preview-header">
              <h4>Leave Policy Update</h4>
              <span className="preview-date">2 days ago</span>
            </div>
            <p className="preview-message">
              Please note that all leave applications must be submitted at least 24 hours in advance...
            </p>
            <span className="preview-target">Sent to: CSE - All Sections</span>
          </div>
          <div className="preview-item">
            <div className="preview-header">
              <h4>Holiday Notice</h4>
              <span className="preview-date">1 week ago</span>
            </div>
            <p className="preview-message">College will remain closed on January 26th for Republic Day...</p>
            <span className="preview-target">Sent to: All Students</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Layout currentPage="Public Announcement" onNavigate={onNavigate}>
      {announcementContent}
    </Layout>
  )
}

export default Announcements
