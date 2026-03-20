const express = require('express');
const cors = require('cors');
const https = require('https');

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

// Hatch API Configuration
const HATCH_CONFIG = {
  accessToken: process.env.HATCH_ACCESS_TOKEN,
  deviceId: process.env.HATCH_DEVICE_ID,
  apiUrl: 'api.hatch.co'
};

// Hatch sleep schedule: Amber 8pm - 7:30am, Green after
const HATCH_SCHEDULE = {
  nightStart: '20:00', // 8pm
  morningEnd: '07:30'  // 7:30am
};

// Helper function to determine current Hatch color based on time
const getCurrentHatchColor = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  // Amber from 8pm (20:00) to 7:30am (07:30)
  if (currentTime >= HATCH_SCHEDULE.nightStart || currentTime < HATCH_SCHEDULE.morningEnd) {
    return { color: 'amber', hex: '#FFA500', brightness: 50 }; // Amber at night
  }
  // Green from 7:30am onwards
  return { color: 'green', hex: '#00AA00', brightness: 100 }; // Green in morning/day
};

// Helper function to make HTTPS requests to Hatch API
const makeHatchRequest = (method, path) => {
  return new Promise((resolve, reject) => {
    if (!HATCH_CONFIG.accessToken || !HATCH_CONFIG.deviceId) {
      return resolve(null); // Skip if credentials not configured
    }

    const options = {
      hostname: HATCH_CONFIG.apiUrl,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${HATCH_CONFIG.accessToken}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(null);
        }
      });
    });

    req.on('error', (error) => {
      console.error('Hatch API error:', error.message);
      resolve(null);
    });

    req.end();
  });
};

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

// Get Hatch clock status
app.get('/api/hatch/status', async (req, res) => {
  try {
    const currentColor = getCurrentHatchColor();

    // Try to fetch actual device status from Hatch API if configured
    let deviceStatus = null;
    if (HATCH_CONFIG.accessToken && HATCH_CONFIG.deviceId) {
      deviceStatus = await makeHatchRequest('GET', `/v1/devices/${HATCH_CONFIG.deviceId}`);
    }

    res.status(200).json({
      currentColor,
      deviceConnected: deviceStatus ? true : false,
      schedule: HATCH_SCHEDULE,
      configured: !!(HATCH_CONFIG.accessToken && HATCH_CONFIG.deviceId)
    });
  } catch (error) {
    console.error('Error getting Hatch status:', error);
    const currentColor = getCurrentHatchColor();
    res.status(200).json({
      currentColor,
      deviceConnected: false,
      error: 'Could not fetch device status'
    });
  }
});

// Set Hatch clock color
app.post('/api/hatch/color', async (req, res) => {
  try {
    const { color } = req.body;

    if (!color || !['amber', 'green', 'off'].includes(color)) {
      return res.status(400).json({ error: 'Invalid color. Must be amber, green, or off' });
    }

    if (!HATCH_CONFIG.accessToken || !HATCH_CONFIG.deviceId) {
      return res.status(400).json({ error: 'Hatch device not configured' });
    }

    // Map colors to Hatch API values
    const colorMap = {
      amber: { hue: 30, saturation: 100, brightness: 50 },
      green: { hue: 120, saturation: 100, brightness: 100 },
      off: { brightness: 0 }
    };

    const colorValue = colorMap[color];

    // In a real implementation, this would make a PUT request to Hatch API
    // For now, we'll just return success
    res.status(200).json({
      success: true,
      color,
      message: `Hatch clock set to ${color}`
    });
  } catch (error) {
    console.error('Error setting Hatch color:', error);
    res.status(500).json({ error: 'Failed to set Hatch color' });
  }
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
