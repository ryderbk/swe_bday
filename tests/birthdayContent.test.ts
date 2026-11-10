import { describe, it, expect } from 'vitest';
import { birthdayContent } from '../src/data/birthdayContent';

describe('birthdayContent schema and configuration', () => {
  it('contains the verified personal facts', () => {
    expect(birthdayContent.site.recipientName).toBe('Saiswetha');
    expect(birthdayContent.site.senderName).toBe('Bharath');
    expect(birthdayContent.site.birthdayDate).toBe('2026-11-11');
    expect(birthdayContent.site.relationshipStartDate).toBe('2025-07-07');
    expect(birthdayContent.site.nicknames).toContain('Panda kutti');
    expect(birthdayContent.site.nicknames).toContain('Chellam');
  });

  it('has the official relationship milestone highlighted', () => {
    const officialMilestone = birthdayContent.timeline.find(
      (m) => m.date === '2025-07-07' && m.isConfirmed
    );
    expect(officialMilestone).toBeDefined();
    expect(officialMilestone?.title).toBe('The Day We Became Us');
  });

  it('contains at least 5 playful quiz questions with valid correctIndex', () => {
    expect(birthdayContent.quiz.length).toBeGreaterThanOrEqual(5);
    birthdayContent.quiz.forEach((q) => {
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(q.options.length);
      expect(q.explanation.length).toBeGreaterThan(0);
    });
  });

  it('has 12 unique reasons configured', () => {
    expect(birthdayContent.reasons.length).toBe(12);
    const numbers = birthdayContent.reasons.map((r) => r.number);
    expect(new Set(numbers).size).toBe(12);
  });

  it('handles optional voice message structure cleanly', () => {
    expect(typeof birthdayContent.voiceMessage.enabled).toBe('boolean');
    expect(typeof birthdayContent.voiceMessage.audioSrc).toBe('string');
  });

  it('includes proper letter signature and affection lines', () => {
    expect(birthdayContent.letter.signature).toContain('Bharath 🤍');
    expect(birthdayContent.letter.footerAffection).toContain('Panda kutti');
    expect(birthdayContent.letter.footerAffection).toContain('Chellam');
  });
});

