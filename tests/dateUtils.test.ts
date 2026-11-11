import { describe, it, expect } from 'vitest';
import { calculateRelationshipTime, formatReadableDate, parseDateParts } from '../src/lib/dateUtils';

describe('dateUtils', () => {
  it('parses YYYY-MM-DD correctly', () => {
    const parts = parseDateParts('2025-07-07');
    expect(parts).toEqual([2025, 7, 7]);
  });

  it('formats dates in readable form', () => {
    expect(formatReadableDate('2025-07-07')).toBe('July 7, 2025');
    expect(formatReadableDate('2026-11-11')).toBe('November 11, 2026');
  });

  it('calculates duration accurately from 2025-07-07 to 2026-11-10', () => {
    // 2026-11-10: 1 year, 4 months, 3 days
    const targetDate = new Date(2026, 10, 10); // month is 0-indexed in Date constructor (10 = November)
    const duration = calculateRelationshipTime('2025-07-07', targetDate);

    expect(duration.years).toBe(1);
    expect(duration.months).toBe(4);
    expect(duration.days).toBe(3);
    expect(duration.totalDays).toBeGreaterThan(490);
    expect(duration.formattedText).toContain('1 year');
    expect(duration.formattedText).toContain('4 months');
  });

  it('handles same day gracefully', () => {
    const targetDate = new Date(2025, 6, 7); // July 7, 2025
    const duration = calculateRelationshipTime('2025-07-07', targetDate);
    expect(duration.totalDays).toBe(0);
    expect(duration.formattedText).toBe('The beginning of our journey');
  });
});

