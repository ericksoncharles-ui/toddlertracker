import { useState, useEffect, useCallback } from 'react'
import SleepTracker from './components/SleepTracker'
import HatchStatus from './components/HatchStatus'
import KidsView from './components/KidsView'
import ViewToggle from './components/ViewToggle'
import './App.css'

function App() {
  const [activeChild, setActiveChild] = useState('theodore')
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [globalError, setGlobalError] = useState(null)
  const [currentView, setCurrentView] = useState('parent') // 'parent' or 'kids'

  const fetchEntries = useCallback(async (child) => {
    setIsLoading(true)
    setGlobalError(null)
    try {
      const response = await fetch(`/api/sleep-entries/${child}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch entries: ${response.statusText}`)
      }
      const data = await response.json()
      setEntries(data.data || [])
    } catch (error) {
      setGlobalError('Unable to load sleep entries. Please check your connection.')
      console.error('Error fetching entries:', error)
      setEntries([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEntries(activeChild)
  }, [activeChild, fetchEntries])

  const handleAddEntry = async (entry) => {
    try {
      const response = await fetch('/api/sleep-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ child: activeChild, ...entry })
      })

      if (!response.ok) {
        throw new Error(`Failed to add entry: ${response.statusText}`)
      }

      const data = await response.json()
      setEntries(data.data || [])
      setGlobalError(null)
    } catch (error) {
      console.error('Error adding entry:', error)
      throw error
    }
  }

  // Kids view - fun interactive mode
  if (currentView === 'kids') {
    return (
      <KidsView
        child={activeChild === 'theodore' ? 'Theodore' : 'Beau'}
        onBedtime={() => {
          const date = new Date().toISOString().split('T')[0]
          const bedtime = new Date().toTimeString().slice(0, 5)
          handleAddEntry({
            date,
            bedtime,
            waketime: '07:30',
            notes: `${activeChild} went to bed! 🌙`
          })
        }}
        onWakeup={() => {
          // Mark the previous entry as complete
          if (entries.length > 0) {
            const now = new Date().toTimeString().slice(0, 5)
            console.log(`${activeChild} woke up at ${now}! ☀️`)
          }
        }}
      />
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🛏️ Sleep Tracker</h1>
        <div className="child-selector">
          <button
            className={`child-btn ${activeChild === 'theodore' ? 'active' : ''}`}
            onClick={() => setActiveChild('theodore')}
            disabled={isLoading}
          >
            Theodore 👦
          </button>
          <button
            className={`child-btn ${activeChild === 'beau' ? 'active' : ''}`}
            onClick={() => setActiveChild('beau')}
            disabled={isLoading}
          >
            Beau 👦
          </button>
        </div>
        {isLoading && <p className="loading-indicator">Loading...</p>}
      </header>

      <main className="main-content">
        <ViewToggle currentView={currentView} onViewChange={setCurrentView} />

        {globalError && (
          <div className="error-banner">
            <span>❌ {globalError}</span>
            <button onClick={() => fetchEntries(activeChild)} className="retry-btn">
              Retry
            </button>
          </div>
        )}
        <HatchStatus />
        <SleepTracker
          child={activeChild}
          entries={entries}
          onAddEntry={handleAddEntry}
        />
      </main>

      <footer className="footer">
        <p>✨ Sweet dreams for Theodore & Beau! ✨</p>
      </footer>
    </div>
  )
}

export default App
