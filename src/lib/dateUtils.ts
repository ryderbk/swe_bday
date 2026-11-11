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
 * Calculates calendar difference and total days between start date and target date.
 * Includes real-time hours, minutes, seconds from elapsed time.
 */
export function calculateRelationshipTime(
  startDateStr: string,
  targetDate: Date = new Date()
): RelationshipDuration {
  const [startYear, startMonth, startDay] = parseDateParts(startDateStr);

  const curYear = targetDate.getFullYear();
  const curMonth = targetDate.getMonth() + 1; // 1-indexed
  const curDay = targetDate.getDate();

  // Total elapsed milliseconds (using local time for start date midnight)
  const startMs = new Date(startYear, startMonth - 1, startDay, 0, 0, 0, 0).getTime();
  const curMs = targetDate.getTime();
  const diffMs = curMs - startMs;

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

  // Real-time sub-day components from remainder
  const remainderMs = diffMs % (1000 * 60 * 60 * 24);
  const hours = Math.floor(remainderMs / (1000 * 60 * 60));
  const minutes = Math.floor((remainderMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainderMs % (1000 * 60)) / 1000);

  // Calculate calendar years, months, days
  let years = curYear - startYear;
  let months = curMonth - startMonth;
  let days = curDay - startDay;

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(curYear, curMonth - 1, 0).getDate();
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
    hours,
    minutes,
    seconds,
    totalDays,
    formattedText: parts.join(', '),
  };
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
