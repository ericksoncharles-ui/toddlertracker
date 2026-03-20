export const calculateSleepDuration = (bedtime, waketime) => {
  const [bedHour, bedMin] = bedtime.split(':').map(Number);
  const [wakeHour, wakeMin] = waketime.split(':').map(Number);

  let duration = (wakeHour * 60 + wakeMin) - (bedHour * 60 + bedMin);
  if (duration < 0) duration += 24 * 60;

  const hours = Math.floor(duration / 60);
  const mins = duration % 60;
  return { hours, mins, toString: () => `${hours}h ${mins}m` };
};

export const validateSleepEntry = (entry) => {
  const errors = [];

  if (!entry.date) {
    errors.push('Date is required');
  }

  if (!entry.bedtime) {
    errors.push('Bedtime is required');
  }

  if (!entry.waketime) {
    errors.push('Wake time is required');
  }

  if (entry.notes && entry.notes.length > 100) {
    errors.push('Notes must be 100 characters or less');
  }

  return errors;
};
