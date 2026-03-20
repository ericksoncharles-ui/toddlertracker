import { useState, useEffect } from 'react'
import SleepTracker from './components/SleepTracker'
import './App.css'

function App() {
  const [activeChild, setActiveChild] = useState('theodore')
  const [entries, setEntries] = useState([])

  useEffect(() => {
    fetchEntries(activeChild)
  }, [activeChild])

  const fetchEntries = async (child) => {
    try {
      const response = await fetch(`/api/sleep-entries/${child}`)
      const data = await response.json()
      setEntries(data.data)
    } catch (error) {
      console.error('Error fetching entries:', error)
    }
  }

  const handleAddEntry = async (entry) => {
    try {
      const response = await fetch('/api/sleep-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ child: activeChild, ...entry })
      })
      const data = await response.json()
      setEntries(data.data)
    } catch (error) {
      console.error('Error adding entry:', error)
    }
  }


  return (
    <div className="app">
      <header className="header">
        <h1>🛏️ Sleep Tracker</h1>
        <div className="child-selector">
          <button
            className={`child-btn ${activeChild === 'theodore' ? 'active' : ''}`}
            onClick={() => setActiveChild('theodore')}
          >
            Theodore 👦
          </button>
          <button
            className={`child-btn ${activeChild === 'beau' ? 'active' : ''}`}
            onClick={() => setActiveChild('beau')}
          >
            Beau 👦
          </button>
        </div>
      </header>

      <main className="main-content">
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
