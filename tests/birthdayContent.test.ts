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

  it('verifies quiz is removed and romantic affirmative question is configured', () => {
    expect((birthdayContent as Record<string, unknown>).quiz).toBeUndefined();
    expect(birthdayContent.romanticQuestion.enabled).toBe(true);
    expect(birthdayContent.romanticQuestion.title).toContain('choose me');
    expect(birthdayContent.romanticQuestion.buttonLabel).toContain('YES');
  });

  it('has balloon game configured with 15 unique balloons', () => {
    expect(birthdayContent.balloonGame.enabled).toBe(true);
    expect(birthdayContent.balloonGame.balloons.length).toBe(15);
    const balloonIds = birthdayContent.balloonGame.balloons.map((b) => b.id);
    expect(new Set(balloonIds).size).toBe(15);
  });

  it('has bouquet and chat prelude configured', () => {
    expect(birthdayContent.bouquet.enabled).toBe(true);
    expect(birthdayContent.bouquet.imageSrc).toContain('bouquet.webp');
    expect(birthdayContent.chatPrelude.enabled).toBe(true);
    expect(birthdayContent.chatPrelude.messages.length).toBeGreaterThan(0);
  });

  it('has 12 unique reasons configured', () => {
    expect(birthdayContent.reasons.length).toBe(12);
    const numbers = birthdayContent.reasons.map((r) => r.number);
    expect(new Set(numbers).size).toBe(12);
  });

  it('handles gallery heart expansion configuration cleanly', () => {
    expect(birthdayContent.galleryConfig.defaultPhotoCount).toBe(4);
    expect(birthdayContent.memories.length).toBeGreaterThanOrEqual(4);
  });

  it('includes proper letter signature and affection lines', () => {
    expect(birthdayContent.letter.signature).toContain('Bharath 🤍');
    expect(birthdayContent.letter.footerAffection).toContain('Panda kutti');
    expect(birthdayContent.letter.footerAffection).toContain('Chellam');
  });
});
