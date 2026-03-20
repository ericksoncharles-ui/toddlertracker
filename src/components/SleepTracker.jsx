import { useState } from 'react'
import '../styles/SleepTracker.css'

function SleepTracker({ child, entries, onAddEntry }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    bedtime: '20:00',
    waketime: '07:00',
    notes: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddEntry(formData)
    setFormData({
      date: new Date().toISOString().split('T')[0],
      bedtime: '20:00',
      waketime: '07:00',
      notes: ''
    })
  }

  const calculateSleepDuration = (bedtime, waketime) => {
    const [bedHour, bedMin] = bedtime.split(':').map(Number)
    const [wakeHour, wakeMin] = waketime.split(':').map(Number)

    let duration = (wakeHour * 60 + wakeMin) - (bedHour * 60 + bedMin)
    if (duration < 0) duration += 24 * 60

    const hours = Math.floor(duration / 60)
    const mins = duration % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="sleep-tracker">
      <section className="entry-form">
        <h2>Log Sleep for {child.charAt(0).toUpperCase() + child.slice(1)}</h2>
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
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes (optional)</label>
            <input
              type="text"
              id="notes"
              name="notes"
              placeholder="e.g., Great night, slept in own bed!"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary">Add Entry ✓</button>
        </form>
      </section>

      <section className="sleep-log">
        <h2>Sleep Log</h2>
        {entries.length === 0 ? (
          <p className="no-data">No sleep entries yet. Start tracking!</p>
        ) : (
          <div className="entries-grid">
            {entries.map((entry, idx) => (
              <div key={idx} className="entry-card">
                <div className="entry-date">{entry.date}</div>
                <div className="entry-times">
                  <div className="time">🌙 {entry.bedtime}</div>
                  <div className="duration">→ {calculateSleepDuration(entry.bedtime, entry.waketime)}</div>
                  <div className="time">☀️ {entry.waketime}</div>
                </div>
                {entry.notes && <div className="entry-notes">"{entry.notes}"</div>}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="stats">
        <h3>Quick Stats</h3>
        {entries.length > 0 && (
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-label">Total Sessions</div>
              <div className="stat-value">{entries.length}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Average Duration</div>
              <div className="stat-value">
                {(() => {
                  const totalMins = entries.reduce((acc, entry) => {
                    const [bedHour, bedMin] = entry.bedtime.split(':').map(Number)
                    const [wakeHour, wakeMin] = entry.waketime.split(':').map(Number)
                    let duration = (wakeHour * 60 + wakeMin) - (bedHour * 60 + bedMin)
                    if (duration < 0) duration += 24 * 60
                    return acc + duration
                  }, 0)
                  const avgMins = Math.round(totalMins / entries.length)
                  return `${Math.floor(avgMins / 60)}h ${avgMins % 60}m`
                })()}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default SleepTracker
