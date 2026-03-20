import '../styles/ViewToggle.css'

function ViewToggle({ currentView, onViewChange }) {
  return (
    <div className="view-toggle">
      <button
        className={`toggle-button parent-view ${currentView === 'parent' ? 'active' : ''}`}
        onClick={() => onViewChange('parent')}
      >
        👨‍👩‍👧‍👦 Parent View
      </button>
      <button
        className={`toggle-button kids-view-btn ${currentView === 'kids' ? 'active' : ''}`}
        onClick={() => onViewChange('kids')}
      >
        👶 Kids View
      </button>
    </div>
  )
}

export default ViewToggle
