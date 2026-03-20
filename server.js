const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Simple in-memory storage (in production, use a database)
let sleepData = {
  theodore: [],
  beau: []
};

const VALID_CHILDREN = ['theodore', 'beau'];

// Helper function to validate sleep entry
const validateSleepEntry = (data) => {
  const errors = [];

  if (!data.date || typeof data.date !== 'string') {
    errors.push('Valid date is required');
  }

  if (!data.bedtime || typeof data.bedtime !== 'string') {
    errors.push('Valid bedtime is required');
  }

  if (!data.waketime || typeof data.waketime !== 'string') {
    errors.push('Valid wake time is required');
  }

  if (data.notes && typeof data.notes !== 'string') {
    errors.push('Notes must be a string');
  }

  if (data.notes && data.notes.length > 100) {
    errors.push('Notes must be 100 characters or less');
  }

  return errors;
};

// Add sleep entry
app.post('/api/sleep-entry', (req, res) => {
  try {
    const { child, date, bedtime, waketime, notes } = req.body;

    if (!child || !VALID_CHILDREN.includes(child)) {
      return res.status(400).json({ error: 'Invalid child name' });
    }

    const validationErrors = validateSleepEntry({ date, bedtime, waketime, notes });
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors.join('; ') });
    }

    const entry = {
      date,
      bedtime,
      waketime,
      notes: notes || '',
      timestamp: new Date().toISOString()
    };

    sleepData[child].push(entry);

    res.status(201).json({ success: true, data: sleepData[child] });
  } catch (error) {
    console.error('Error creating sleep entry:', error);
    res.status(500).json({ error: 'Failed to create sleep entry' });
  }
});

// Get sleep entries for a child
app.get('/api/sleep-entries/:child', (req, res) => {
  try {
    const { child } = req.params;

    if (!VALID_CHILDREN.includes(child)) {
      return res.status(400).json({ error: 'Invalid child name' });
    }

    res.status(200).json({ data: sleepData[child] });
  } catch (error) {
    console.error('Error fetching sleep entries:', error);
    res.status(500).json({ error: 'Failed to fetch sleep entries' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Toddler Tracker Server running on port ${PORT}`);
});
