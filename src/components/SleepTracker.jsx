import { useState } from 'react'
import { calculateSleepDuration, validateSleepEntry } from '../utils/sleepCalculations'
import '../styles/SleepTracker.css'

function SleepTracker({ child, entries, onAddEntry }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    bedtime: '20:00',
    waketime: '07:00',
    notes: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [validationErrors, setValidationErrors] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setValidationErrors([])
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = validateSleepEntry(formData)
    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await onAddEntry(formData)
      setFormData({
        date: new Date().toISOString().split('T')[0],
        bedtime: '20:00',
        waketime: '07:00',
        notes: ''
      })
      setValidationErrors([])
    } catch (err) {
      setError('Failed to add entry. Please try again.')
      console.error('Error adding entry:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateAverageSleep = () => {
    if (entries.length === 0) return null
    const totalMins = entries.reduce((acc, entry) => {
      const duration = calculateSleepDuration(entry.bedtime, entry.waketime)
      return acc + (duration.hours * 60 + duration.mins)
    }, 0)
    const avgMins = Math.round(totalMins / entries.length)
    return `${Math.floor(avgMins / 60)}h ${avgMins % 60}m`
  }

  const childName = child.charAt(0).toUpperCase() + child.slice(1)

  return (
    <div className="sleep-tracker">
      <section className="entry-form">
        <h2>Log Sleep for {childName}</h2>
        {error && <div className="error-message">{error}</div>}
        {validationErrors.length > 0 && (
          <div className="validation-errors">
            {validationErrors.map((err, idx) => (
              <p key={idx}>⚠️ {err}</p>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bedtime">Bedtime</label>
              <input
                type="time"
                id="bedtime"
                name="bedtime"
                value={formData.bedtime}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="waketime">Wake Time</label>
              <input
                type="time"
                id="waketime"
                name="waketime"
                value={formData.waketime}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes (optional, max 100 chars)</label>
            <input
              type="text"
              id="notes"
              name="notes"
              placeholder="e.g., Great night, slept in own bed!"
              value={formData.notes}
              onChange={handleChange}
              maxLength={100}
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Entry ✓'}
          </button>
        </form>
      </section>

      <section className="sleep-log">
        <h2>Sleep Log</h2>
        {entries.length === 0 ? (
          <p className="no-data">No sleep entries yet. Start tracking!</p>
        ) : (
          <div className="entries-grid">
            {entries.map((entry, idx) => {
              const duration = calculateSleepDuration(entry.bedtime, entry.waketime)
              return (
                <div key={`${entry.date}-${entry.bedtime}`} className="entry-card">
                  <div className="entry-date">{entry.date}</div>
                  <div className="entry-times">
                    <div className="time">🌙 {entry.bedtime}</div>
                    <div className="duration">→ {duration.toString()}</div>
                    <div className="time">☀️ {entry.waketime}</div>
                  </div>
                  {entry.notes && <div className="entry-notes">"{entry.notes}"</div>}
                </div>
              )
            })}
          </div>
        )}
      </section>

      <section className="stats">
        <h3>Quick Stats</h3>
        {entries.length > 0 ? (
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-label">Total Sessions</div>
              <div className="stat-value">{entries.length}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Average Duration</div>
              <div className="stat-value">{calculateAverageSleep()}</div>
            </div>
          </div>
        ) : (
          <p className="no-data">Add some sleep entries to see stats!</p>
        )}
      </section>
    </div>
  )
}

export default SleepTracker
