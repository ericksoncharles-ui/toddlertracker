# 🛏️ Toddler Sleep Tracker

A fun sleep tracking app for Theodore and Beau! Track their bedtimes, wake times, and sweet dreams.

## Features

- 👦 Track sleep for both Theodore and Beau
- 📊 View sleep logs with beautiful cards
- ⏱️ Calculate sleep duration automatically
- 📈 Quick stats on sleep sessions
- 🎨 Fun, colorful interface designed for parents
- 🧤 **Hatch Alarm Clock Integration** - Sync with Hatch to show:
  - 🌙 Amber light during sleep hours (8pm - 7:30am)
  - ☀️ Green light during wake hours (7:30am - 8pm)
  - Real-time clock status and schedule

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

### Configure Hatch Alarm Clock (Optional)

To enable Hatch clock integration:

1. Get your Hatch credentials:
   - Log in to [Hatch Sleep](https://hatchsleep.com)
   - Go to Settings > Integrations > API
   - Generate an API token
   - Copy your device ID

2. Set environment variables:
```bash
export HATCH_ACCESS_TOKEN=your_api_token
export HATCH_DEVICE_ID=your_device_id
```

Or create a `.env` file:
```bash
cp .env.example .env
# Edit .env with your Hatch credentials
```

3. The app will automatically:
   - Show current Hatch color status
   - Display the sleep schedule (Amber 8pm-7:30am, Green after)
   - Update clock status every 30 seconds

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
├── server.js                      # Express backend with Hatch API
├── vite.config.js                # Vite configuration
├── package.json                  # Dependencies
├── .env.example                  # Environment variables template
├── index.html                    # HTML entry point
└── src/
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Main app component
    ├── App.css                   # App styles
    ├── index.css                 # Global styles
    ├── utils/
    │   ├── sleepCalculations.js  # Sleep duration utilities
    │   └── hatchAPI.js           # Hatch API helpers
    └── components/
        ├── SleepTracker.jsx      # Sleep tracker component
        ├── HatchStatus.jsx       # Hatch clock status component
        └── styles/
            ├── SleepTracker.css  # Sleep tracker styles
            └── HatchStatus.css   # Hatch status styles
```

## Technologies Used

- **Frontend**: React, Vite, CSS3
- **Backend**: Express.js, Node.js
- **Styling**: Custom CSS with gradients and animations
- **IoT Integration**: Hatch Sleep API for smart clock synchronization

## Hatch Clock Schedule

The app syncs with your Hatch alarm clock on this schedule:

| Time | Color | Status |
|------|-------|--------|
| 8:00 PM - 7:30 AM | 🌙 Amber | Sleep time |
| 7:30 AM - 8:00 PM | ☀️ Green | Wake time |

**Sleep Science Tips:**
- Amber light supports melatonin production and promotes sleep
- Green light signals wake time and regulates circadian rhythm
- Consistent lighting helps children develop healthy sleep patterns
- The Hatch clock provides a visual cue for bedtime routines

## Sweet Dreams! ✨

Perfect for helping Theodore and Beau transition to their big-kid beds! 🛏️
