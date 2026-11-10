export interface RelationshipDuration {
  years: number;
  months: number;
  days: number;
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
 * Strictly date-only arithmetic without timezone off-by-one anomalies.
 */
export function calculateRelationshipTime(
  startDateStr: string,
  targetDate: Date = new Date()
): RelationshipDuration {
  const [startYear, startMonth, startDay] = parseDateParts(startDateStr);

  const curYear = targetDate.getFullYear();
  const curMonth = targetDate.getMonth() + 1; // 1-indexed
  const curDay = targetDate.getDate();

  // Total elapsed full days using UTC timestamps
  const startUtc = Date.UTC(startYear, startMonth - 1, startDay);
  const curUtc = Date.UTC(curYear, curMonth - 1, curDay);
  const diffMs = curUtc - startUtc;
  const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (diffMs <= 0) {
    return {
      years: 0,
      months: 0,
      days: 0,
      totalDays: 0,
      formattedText: "The beginning of our journey",
    };
  }

  // Calculate calendar years, months, days
  let years = curYear - startYear;
  let months = curMonth - startMonth;
  let days = curDay - startDay;

  if (days < 0) {
    months -= 1;
    // Days in previous month
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

