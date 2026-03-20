import { useState, useEffect } from 'react'
import { getHatchStatus, getColorDisplay } from '../utils/hatchAPI'
import '../styles/HatchStatus.css'

function HatchStatus() {
  const [hatchStatus, setHatchStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)

  useEffect(() => {
    const fetchStatus = async () => {
      setIsLoading(true)
      const status = await getHatchStatus()
      if (status) {
        setHatchStatus(status)
        setLastUpdate(new Date().toLocaleTimeString())
      }
      setIsLoading(false)
    }

    fetchStatus()

    // Poll for status updates every 30 seconds
    const interval = setInterval(fetchStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return <div className="hatch-status loading">Loading Hatch status...</div>
  }

  if (!hatchStatus) {
    return (
      <div className="hatch-status error">
        ⚠️ Hatch not configured. Set HATCH_ACCESS_TOKEN and HATCH_DEVICE_ID environment variables.
      </div>
    )
  }

  const colorInfo = getColorDisplay(hatchStatus.currentColor.color)
  const colorHex = hatchStatus.currentColor.hex

  return (
    <div className="hatch-status-container">
      <div
        className="hatch-status-card"
        style={{
          borderLeft: `6px solid ${colorHex}`,
          background: `linear-gradient(135deg, ${colorHex}15 0%, ${colorHex}05 100%)`
        }}
      >
        <div className="hatch-header">
          <h3>🧤 Hatch Alarm Clock Status</h3>
          {hatchStatus.deviceConnected && (
            <span className="device-connected">✓ Connected</span>
          )}
        </div>

        <div className="hatch-color-display">
          <div
            className="color-circle"
            style={{ backgroundColor: colorHex }}
            title={`${hatchStatus.currentColor.color} (${colorHex})`}
          />
          <div className="color-info">
            <div className="color-label">{colorInfo.label}</div>
            <div className="color-description">{colorInfo.description}</div>
          </div>
        </div>

        <div className="hatch-schedule">
          <div className="schedule-item">
            <span className="schedule-label">🌙 Night Mode</span>
            <span className="schedule-time">8:00 PM - 7:30 AM</span>
            <span className="schedule-color amber-pill">Amber</span>
          </div>
          <div className="schedule-item">
            <span className="schedule-label">☀️ Day Mode</span>
            <span className="schedule-time">7:30 AM - 8:00 PM</span>
            <span className="schedule-color green-pill">Green</span>
          </div>
        </div>

        {lastUpdate && (
          <div className="last-update">
            Updated: {lastUpdate}
          </div>
        )}
      </div>

      <div className="hatch-tips">
        <p><strong>💡 Sleep Transition Tips:</strong></p>
        <ul>
          <li>Amber light helps with melatonin production at bedtime</li>
          <li>Green light signals wake-up time to the body</li>
          <li>Keep the Hatch clock visible from the bed</li>
          <li>Consistent timing helps establish sleep routines</li>
        </ul>
      </div>
    </div>
  )
}

export default HatchStatus
