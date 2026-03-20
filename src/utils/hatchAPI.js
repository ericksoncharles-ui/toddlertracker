export const getHatchStatus = async () => {
  try {
    const response = await fetch('/api/hatch/status');
    if (!response.ok) throw new Error('Failed to fetch Hatch status');
    return await response.json();
  } catch (error) {
    console.error('Error getting Hatch status:', error);
    return null;
  }
};

export const setHatchColor = async (color) => {
  try {
    const response = await fetch('/api/hatch/color', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color })
    });
    if (!response.ok) throw new Error('Failed to set Hatch color');
    return await response.json();
  } catch (error) {
    console.error('Error setting Hatch color:', error);
    return null;
  }
};

export const getColorDisplay = (colorName) => {
  const colorMap = {
    amber: {
      hex: '#FFA500',
      rgb: 'rgb(255, 165, 0)',
      label: '🌙 Night (Amber)',
      description: 'Sleep time - 8pm to 7:30am'
    },
    green: {
      hex: '#00AA00',
      rgb: 'rgb(0, 170, 0)',
      label: '☀️ Morning/Day (Green)',
      description: 'Wake time - 7:30am onwards'
    }
  };
  return colorMap[colorName] || colorMap.amber;
};
