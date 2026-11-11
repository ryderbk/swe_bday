export interface RelationshipDuration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  formattedText: string;
}

/**
 * Parses YYYY-MM-DD string into [year, month (1-indexed), day]
 * avoiding timezone offset shifts.
 */
export function parseDateParts(dateStr: string): [number, number, number] {
  const parts = dateStr.split('-').map((p) => parseInt(p, 10));
  if (parts.length !== 3 || parts.some(isNaN)) {
    throw new Error(`Invalid date format: ${dateStr}. Expected YYYY-MM-DD.`);
  }
  return [parts[0], parts[1], parts[2]];
}

/**
 * Formats "YYYY-MM-DD" into "Month Day, Year", e.g. "July 7, 2025"
 */
export function formatReadableDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = parseDateParts(dateStr);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = monthNames[month - 1] || '';
  return `${monthName} ${day}, ${year}`;
}

/**
 * Extracts zoned date components (year, month, day, hour, minute, second)
 * using the configured timezone.
 */
export function getZonedParts(date: Date, timeZone: string = 'Asia/Kolkata') {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
    const parts = formatter.formatToParts(date);
    const getPart = (type: string) => {
      const match = parts.find((p) => p.type === type)?.value;
      return match ? parseInt(match, 10) : 0;
    };
    return {
      year: getPart('year'),
      month: getPart('month'), // 1-indexed
      day: getPart('day'),
      hour: getPart('hour') % 24,
      minute: getPart('minute'),
      second: getPart('second'),
    };
  } catch {
    // Fallback if timezone string is unsupported
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    };
  }
}

/**
 * Calculates calendar difference and total days between start date and target date
 * using true elapsed time in the specified timezone (defaulting to Asia/Kolkata).
 */
export function calculateRelationshipTime(
  startDateStr: string,
  targetDate: Date = new Date(),
  timeZone: string = 'Asia/Kolkata'
): RelationshipDuration {
  const [startYear, startMonth, startDay] = parseDateParts(startDateStr);

  const curZoned = getZonedParts(targetDate, timeZone);

  // Calculate elapsed total days:
  // In Asia/Kolkata (+05:30), start date midnight corresponds to startUtcMs
  const startUtcMs = Date.UTC(startYear, startMonth - 1, startDay, -5, -30, 0, 0);
  const diffMs = targetDate.getTime() - startUtcMs;

  if (diffMs <= 0) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      formattedText: 'The beginning of our journey',
    };
  }

  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Calendar difference in the target timezone
  let years = curZoned.year - startYear;
  let months = curZoned.month - startMonth;
  let days = curZoned.day - startDay;

  if (days < 0) {
    months -= 1;
    // Days in previous month of curZoned
    const prevMonthDays = new Date(curZoned.year, curZoned.month - 1, 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
  if (days > 0 || parts.length === 0) parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: curZoned.hour,
    minutes: curZoned.minute,
    seconds: curZoned.second,
    totalDays,
    formattedText: parts.join(', '),
  };
}
