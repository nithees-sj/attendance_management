import { useState } from "react"
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Send } from "lucide-react"
import "./css/StudLeave.css"

export default function StudLeave() {
  const [leaveType, setLeaveType] = useState("single")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarType, setCalendarType] = useState("")
  const [studentName, setStudentName] = useState("")
  const [reason, setReason] = useState("")
  const [comments, setComments] = useState("")
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const currentDate = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return days
  }

  const handleDateSelect = (date) => {
    if (calendarType === "single") {
      setSelectedDate(date)
    } else if (calendarType === "from") {
      setFromDate(date)
      // If from date is after to date, update to date
      if (date > toDate) {
        setToDate(date)
      }
    } else if (calendarType === "to") {
      setToDate(date)
      // If to date is before from date, update from date
      if (date < fromDate) {
        setFromDate(date)
      }
    }
    setShowCalendar(false)
    setCalendarType("")
  }

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + direction)
    setCurrentMonth(newMonth)
  }

  const openCalendar = (type) => {
    if (showCalendar && calendarType === type) {
      setShowCalendar(false)
      setCalendarType("")
    } else {
      setCalendarType(type)
      setShowCalendar(true)
      // Set current month based on the date being edited
      if (type === "single") {
        setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))
      } else if (type === "from") {
        setCurrentMonth(new Date(fromDate.getFullYear(), fromDate.getMonth(), 1))
      } else if (type === "to") {
        setCurrentMonth(new Date(toDate.getFullYear(), toDate.getMonth(), 1))
      }
    }
  }

  const handleLeaveTypeChange = (type) => {
    setLeaveType(type)
    setShowCalendar(false)
    setCalendarType("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const leaveData = {
      studentName,
      leaveType,
      ...(leaveType === "single" ? { leaveDate: selectedDate } : { fromDate, toDate }),
      reason,
      comments,
      submittedAt: new Date(),
    }

    // Temporary success message for demo
    alert("Leave application submitted successfully!")
    console.log("Leave Application Data:", leaveData)
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="leave-management-container">
      <div className="page-header">
        <h1 className="page-title">Leave Management</h1>
        <p className="page-subtitle">Submit your leave application</p>
      </div>

      <div className="leave-form-container">
        <form onSubmit={handleSubmit} className="leave-form">
          {/* Student Name Field */}
          <div className="form-group">
            <label htmlFor="studentName" className="form-label">
              Leave Type
            </label>
            <input
              type="text"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="form-input"
              placeholder="Enter the type of leave"
              required
            />
          </div>

          {/* Leave Type Selection */}
          <div className="form-group">
            <label className="form-label"></label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="leaveType"
                  value="single"
                  checked={leaveType === "single"}
                  onChange={() => handleLeaveTypeChange("single")}
                  className="radio-input"
                />
                <span className="radio-custom"></span>
                <span className="radio-text">Single</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="leaveType"
                  value="multi"
                  checked={leaveType === "multi"}
                  onChange={() => handleLeaveTypeChange("multi")}
                  className="radio-input"
                />
                <span className="radio-custom"></span>
                <span className="radio-text">Multiple</span>
              </label>
            </div>
          </div>

          {/* Date Selection - Single Day */}
          {leaveType === "single" && (
            <div className="form-group">
              <label className="form-label">Leave Date</label>
              <div className="date-picker-wrapper">
                <button type="button" className="date-picker-button" onClick={() => openCalendar("single")}>
                  <Calendar className="calendar-icon" />
                  <span className="selected-date">{formatDate(selectedDate)}</span>
                  <ChevronDown
                    className={`chevron-icon ${showCalendar && calendarType === "single" ? "rotated" : ""}`}
                  />
                </button>

                {showCalendar && calendarType === "single" && (
                  <div className="calendar-dropdown">
                    <div className="calendar-header">
                      <button type="button" className="nav-button" onClick={() => navigateMonth(-1)}>
                        <ChevronLeft size={16} />
                      </button>
                      <h3 className="calendar-month">
                        {currentMonth.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </h3>
                      <button type="button" className="nav-button" onClick={() => navigateMonth(1)}>
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="calendar-grid">
                      <div className="calendar-weekdays">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                          <div key={day} className="weekday">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="calendar-days">
                        {calendarDays.map((day, index) => {
                          const isCurrentMonth = day.getMonth() === currentMonth.getMonth()
                          const isToday = day.toDateString() === new Date().toDateString()
                          const isSelected = day.toDateString() === selectedDate.toDateString()

                          return (
                            <button
                              key={index}
                              type="button"
                              className={`calendar-day ${
                                isCurrentMonth ? "current-month" : "other-month"
                              } ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
                              onClick={() => handleDateSelect(day)}
                            >
                              {day.getDate()}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Date Selection - Multiple Days */}
          {leaveType === "multi" && (
            <div className="form-group">
              <label className="form-label">Leave Duration</label>
              <div className="date-range-container">
                <div className="date-range-field">
                  <label className="date-range-label">From</label>
                  <div className="date-picker-wrapper">
                    <button type="button" className="date-picker-button" onClick={() => openCalendar("from")}>
                      <Calendar className="calendar-icon" />
                      <span className="selected-date">{formatDate(fromDate)}</span>
                      <ChevronDown
                        className={`chevron-icon ${showCalendar && calendarType === "from" ? "rotated" : ""}`}
                      />
                    </button>

                    {showCalendar && calendarType === "from" && (
                      <div className="calendar-dropdown">
                        <div className="calendar-header">
                          <button type="button" className="nav-button" onClick={() => navigateMonth(-1)}>
                            <ChevronLeft size={16} />
                          </button>
                          <h3 className="calendar-month">
                            {currentMonth.toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric",
                            })}
                          </h3>
                          <button type="button" className="nav-button" onClick={() => navigateMonth(1)}>
                            <ChevronRight size={16} />
                          </button>
                        </div>

                        <div className="calendar-grid">
                          <div className="calendar-weekdays">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                              <div key={day} className="weekday">
                                {day}
                              </div>
                            ))}
                          </div>
                          <div className="calendar-days">
                            {calendarDays.map((day, index) => {
                              const isCurrentMonth = day.getMonth() === currentMonth.getMonth()
                              const isToday = day.toDateString() === new Date().toDateString()
                              const isSelected = day.toDateString() === fromDate.toDateString()
                              const isInRange = day >= fromDate && day <= toDate

                              return (
                                <button
                                  key={index}
                                  type="button"
                                  className={`calendar-day ${
                                    isCurrentMonth ? "current-month" : "other-month"
                                  } ${isSelected ? "selected" : ""} ${isToday ? "today" : ""} ${isInRange ? "in-range" : ""}`}
                                  onClick={() => handleDateSelect(day)}
                                >
                                  {day.getDate()}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="date-range-field">
                  <label className="date-range-label">To</label>
                  <div className="date-picker-wrapper">
                    <button type="button" className="date-picker-button" onClick={() => openCalendar("to")}>
                      <Calendar className="calendar-icon" />
                      <span className="selected-date">{formatDate(toDate)}</span>
                      <ChevronDown
                        className={`chevron-icon ${showCalendar && calendarType === "to" ? "rotated" : ""}`}
                      />
                    </button>

                    {showCalendar && calendarType === "to" && (
                      <div className="calendar-dropdown">
                        <div className="calendar-header">
                          <button type="button" className="nav-button" onClick={() => navigateMonth(-1)}>
                            <ChevronLeft size={16} />
                          </button>
                          <h3 className="calendar-month">
                            {currentMonth.toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric",
                            })}
                          </h3>
                          <button type="button" className="nav-button" onClick={() => navigateMonth(1)}>
                            <ChevronRight size={16} />
                          </button>
                        </div>

                        <div className="calendar-grid">
                          <div className="calendar-weekdays">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                              <div key={day} className="weekday">
                                {day}
                              </div>
                            ))}
                          </div>
                          <div className="calendar-days">
                            {calendarDays.map((day, index) => {
                              const isCurrentMonth = day.getMonth() === currentMonth.getMonth()
                              const isToday = day.toDateString() === new Date().toDateString()
                              const isSelected = day.toDateString() === toDate.toDateString()
                              const isInRange = day >= fromDate && day <= toDate

                              return (
                                <button
                                  key={index}
                                  type="button"
                                  className={`calendar-day ${
                                    isCurrentMonth ? "current-month" : "other-month"
                                  } ${isSelected ? "selected" : ""} ${isToday ? "today" : ""} ${isInRange ? "in-range" : ""}`}
                                  onClick={() => handleDateSelect(day)}
                                >
                                  {day.getDate()}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reason Section */}
          <div className="form-group">
            <label htmlFor="reason" className="form-label">
              Reason for Leave
            </label>
            <input
              type="text"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-input"
              placeholder="Enter reason for leave"
              required
            />
          </div>

          {/* Comments Section */}
          <div className="form-group">
            <label htmlFor="comments" className="form-label">
              Additional Comments <span className="optional">(Optional)</span>
            </label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="form-textarea"
              placeholder="Any additional information or comments..."
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="submit-button">
              <Send className="submit-icon" />
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
