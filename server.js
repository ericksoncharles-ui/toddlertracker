const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory storage (in production, use a database)
let sleepData = {
  theodore: [],
  beau: []
};

// Add sleep entry
app.post('/api/sleep-entry', (req, res) => {
  const { child, date, bedtime, waketime, notes } = req.body;

  if (!['theodore', 'beau'].includes(child)) {
    return res.status(400).json({ error: 'Invalid child name' });
  }

  sleepData[child].push({
    date,
    bedtime,
    waketime,
    notes,
    timestamp: new Date().toISOString()
  });

  res.json({ success: true, data: sleepData[child] });
});

// Get sleep entries for a child
app.get('/api/sleep-entries/:child', (req, res) => {
  const { child } = req.params;

  if (!['theodore', 'beau'].includes(child)) {
    return res.status(400).json({ error: 'Invalid child name' });
  }

  res.json({ data: sleepData[child] });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Toddler Tracker Server running on port ${PORT}`);
});
