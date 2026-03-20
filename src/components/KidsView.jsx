import { useState, useEffect } from 'react'
import '../styles/KidsView.css'

function KidsView({ child, onBedtime, onWakeup }) {
  const [mode, setMode] = useState('day') // 'day', 'bedtime', 'sleeping', 'waking'
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

  const handleBedtimeClick = () => {
    setMode('sleeping')
    setCelebrationText(`Time for sleep, ${child}! 🌙`)
    setShowCelebration(true)
    onBedtime()

    setTimeout(() => {
      setShowCelebration(false)
    }, 3000)
  }

  const handleWakeupClick = () => {
    setMode('day')
    setCelebrationText(`Good morning, ${child}! ☀️`)
    setShowCelebration(true)
    setStars(stars + 1)
    onWakeup()

    setTimeout(() => {
      setShowCelebration(false)
    }, 3000)
  }

  const addStar = () => {
    setStars(stars + 1)
    setCelebrationText('⭐ Great job! ⭐')
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 2000)
  }

  return (
    <div className="kids-view">
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="celebration-content">
            <div className="celebration-text">{celebrationText}</div>
            <div className="confetti">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="confetti-piece" style={{
                  left: `${Math.random() * 100}%`,
                  delay: `${Math.random() * 0.5}s`
                }} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={`kids-container mode-${mode}`}>
        {mode === 'day' && (
          <div className="day-mode">
            <div className="mascot sun">☀️</div>
            <h1 className="mode-title">Good Morning, {child}!</h1>
            <p className="mode-subtitle">Ready to play and have fun!</p>

            <button
              className="big-button bedtime-button"
              onClick={handleBedtimeClick}
            >
              <span className="button-emoji">🌙</span>
              <span className="button-text">Ready for Bed!</span>
            </button>
          </div>
        )}

        {mode === 'bedtime' && (
          <div className="bedtime-mode">
            <div className="mascot moon">🌙</div>
            <h1 className="mode-title">Bedtime, {child}!</h1>
            <p className="mode-subtitle">It's time to rest and dream!</p>

            <div className="bedtime-checklist">
              <div className="checklist-item">
                <span className="emoji">🚿</span>
                <span>Bath time</span>
              </div>
              <div className="checklist-item">
                <span className="emoji">🧸</span>
                <span>Cuddle toys</span>
              </div>
              <div className="checklist-item">
                <span className="emoji">🧳</span>
                <span>Pajamas on</span>
              </div>
              <div className="checklist-item">
                <span className="emoji">📚</span>
                <span>Story time</span>
              </div>
            </div>

            <button
              className="big-button sleep-button"
              onClick={handleBedtimeClick}
            >
              <span className="button-emoji">💤</span>
              <span className="button-text">I'm Going to Sleep!</span>
            </button>
          </div>
        )}

        {mode === 'sleeping' && (
          <div className="sleeping-mode">
            <div className="mascot sleeping">😴</div>
            <h1 className="mode-title">Sweet Dreams!</h1>
            <p className="mode-subtitle">Shhh... sleeping time 💤</p>

            <div className="zzz-animation">
              <div className="z">z</div>
              <div className="z">z</div>
              <div className="z">z</div>
            </div>

            <button
              className="big-button wake-button"
              onClick={handleWakeupClick}
            >
              <span className="button-emoji">🌅</span>
              <span className="button-text">I Woke Up!</span>
            </button>
          </div>
        )}

        <div className="stars-container">
          <div className="stars-title">Bedtime Stars!</div>
          <div className="stars-display">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < stars ? 'earned' : 'empty'}`}>
                ⭐
              </span>
            ))}
          </div>
          <button className="add-star-btn" onClick={addStar}>
            ✨ Add a Star! ✨
          </button>
        </div>
      </div>
    </div>
  )
}

export default KidsView
