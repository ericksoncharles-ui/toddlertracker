import { useState, useEffect } from 'react'
import SleepyElephant from './SleepyElephant'
import '../styles/KidsView.css'

function KidsView({ child, onBedtime, onWakeup }) {
  const [mode, setMode] = useState('day')
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationText, setCelebrationText] = useState('')
  const [stars, setStars] = useState(0)

  useEffect(() => {
    const hours = new Date().getHours()
    if (hours >= 20 || hours < 7.5) {
      setMode('bedtime')
    } else {
      setMode('day')
    }
  }, [])

  const triggerCelebration = (text) => {
    setCelebrationText(text)
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 2500)
  }

  const handleBedtimeClick = () => {
    setMode('sleeping')
    triggerCelebration(`Ready for sleep, ${child}!`)
    onBedtime()
  }

  const handleWakeupClick = () => {
    setMode('day')
    setStars(stars + 1)
    triggerCelebration(`Great morning, ${child}!`)
    onWakeup()
  }

  const addStar = () => {
    setStars(stars + 1)
    triggerCelebration('Awesome job!')
  }

  return (
    <div className="kids-view">
      {showCelebration && (
        <div className="celebration-modal">
          <div className="celebration-inner">
            <div className="celebration-text">{celebrationText}</div>
            {[...Array(30)].map((_, i) => (
              <div key={i} className="confetti-item" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.3}s`,
                animationDuration: `${2 + Math.random()}s`
              }} />
            ))}
          </div>
        </div>
      )}

      <div className={`kids-container mode-${mode}`}>
        {mode === 'day' && (
          <div className="mode-content day-content">
            <div className="mode-header">
              <SleepyElephant size="large" animated={true} />
              <h1>Good Morning!</h1>
              <p>Ready to play, {child}?</p>
            </div>

            <div className="action-button primary-action" onClick={handleBedtimeClick}>
              <div className="action-label">Ready for Bed</div>
            </div>
          </div>
        )}

        {mode === 'bedtime' && (
          <div className="mode-content bedtime-content">
            <div className="mode-header">
              <SleepyElephant size="large" animated={true} />
              <h1>Bedtime!</h1>
              <p>Time to get ready for sleep</p>
            </div>

            <div className="bedtime-checklist">
              <div className="checklist-item">
                <div className="item-icon">🚿</div>
                <span>Bath time</span>
              </div>
              <div className="checklist-item">
                <div className="item-icon">🧸</div>
                <span>Cuddle toys</span>
              </div>
              <div className="checklist-item">
                <div className="item-icon">👕</div>
                <span>Pajamas on</span>
              </div>
              <div className="checklist-item">
                <div className="item-icon">📚</div>
                <span>Story time</span>
              </div>
            </div>

            <div className="action-button primary-action" onClick={handleBedtimeClick}>
              <div className="action-label">Going to Sleep</div>
            </div>
          </div>
        )}

        {mode === 'sleeping' && (
          <div className="mode-content sleeping-content">
            <div className="mode-header">
              <SleepyElephant size="large" animated={true} />
              <h1>Sweet Dreams</h1>
              <p>Rest well, {child}...</p>
            </div>

            <div className="action-button secondary-action" onClick={handleWakeupClick}>
              <div className="action-label">I Woke Up!</div>
            </div>
          </div>
        )}

        <div className="stars-section">
          <div className="stars-header">
            <span className="stars-label">Sleep Streak</span>
            <span className="star-count">{stars}/7</span>
          </div>
          <div className="stars-bar">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`star-slot ${i < stars ? 'filled' : 'empty'}`}
              >
                {i < stars && <span className="star-icon">⭐</span>}
              </div>
            ))}
          </div>
          <button className="bonus-button" onClick={addStar}>
            <span>+</span> Add Star
          </button>
        </div>
      </div>
    </div>
  )
}

export default KidsView
