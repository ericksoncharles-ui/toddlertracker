# 🛏️ Toddler Sleep Tracker

A fun sleep tracking app for Theodore and Beau! Track their bedtimes, wake times, and sweet dreams.

## Features

- 👦 Track sleep for both Theodore and Beau
- 📊 View sleep logs with beautiful cards
- ⏱️ Calculate sleep duration automatically
- 📈 Quick stats on sleep sessions
- 🎨 Fun, colorful interface designed for parents

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ericksoncharles-ui/toddlertracker.git
cd toddlertracker
```

2. Install dependencies:
```bash
npm install
```

### Running the App

Run both the backend and frontend:

```bash
npm run server
```

In another terminal:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

The backend API runs on `http://localhost:5000`

### Build for Production

```bash
npm run build
```

## How to Use

1. **Select a child**: Click "Theodore" or "Beau" at the top
2. **Log sleep**: Fill in the date, bedtime, and wake time
3. **Add notes**: Optionally add notes about their sleep
4. **View history**: See all sleep entries with calculated durations
5. **Check stats**: View quick statistics on total sessions and average sleep duration

## Project Structure

```
toddlertracker/
├── server.js                 # Express backend
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies
├── index.html               # HTML entry point
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Main app component
    ├── App.css              # App styles
    ├── index.css            # Global styles
    └── components/
        ├── SleepTracker.jsx # Sleep tracker component
        └── styles/
            └── SleepTracker.css # Sleep tracker styles
```

## Technologies Used

- **Frontend**: React, Vite, CSS3
- **Backend**: Express.js, Node.js
- **Styling**: Custom CSS with gradients and animations

## Sweet Dreams! ✨
