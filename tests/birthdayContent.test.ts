import { describe, it, expect } from 'vitest';
import { birthdayContent } from '../src/data/birthdayContent';

describe('birthdayContent schema and Round 3 configuration', () => {
  it('contains the verified personal facts, birth dates, and recipient name Swethu', () => {
    expect(birthdayContent.site.recipientName).toBe('Swethu');
    expect(birthdayContent.site.senderName).toBe('Bharath');
    expect(birthdayContent.site.senderBirthDate).toBe('2005-10-10');
    expect(birthdayContent.site.recipientBirthDate).toBe('2005-11-11');
    expect(birthdayContent.site.birthdayDate).toBe('2026-11-11');
    expect(birthdayContent.site.relationshipStartDate).toBe('2025-07-07');
    expect(birthdayContent.site.timeZone).toBe('Asia/Kolkata');
  });

  it('has the official relationship milestones and concise merged paragraph for milestone 8', () => {
    expect(birthdayContent.timeline.length).toBe(8);
    const officialMilestone = birthdayContent.timeline.find(
      (m) => m.date === '2025-07-07' && m.isConfirmed
    );
    expect(officialMilestone).toBeDefined();
    expect(officialMilestone?.title).toBe('The Day We Became Us');

    const lastMilestone = birthdayContent.timeline[7];
    expect(lastMilestone.description).toContain('I was born on 10/10, you on 11/11, and on 7/7, we became us.');
    expect(lastMilestone.description).toContain('Three dates with repeating numbers');
  });

  it('verifies microphone, romanticQuestion, and constellation chapters are removed', () => {
    expect((birthdayContent as Record<string, unknown>).microphoneIntro).toBeUndefined();
    expect((birthdayContent as Record<string, unknown>).romanticQuestion).toBeUndefined();
    expect((birthdayContent as Record<string, unknown>).constellation).toBeUndefined();
  });

  it('has balloon game configured with 10 unique birthday surprise items', () => {
    expect(birthdayContent.balloonGame.enabled).toBe(true);
    expect(birthdayContent.balloonGame.balloons.length).toBe(10);
    const balloonIds = birthdayContent.balloonGame.balloons.map((b) => b.id);
    expect(new Set(balloonIds).size).toBe(10);

    const balloonTitles = birthdayContent.balloonGame.balloons.map((b) => b.title);
    expect(balloonTitles).toContain('Birthday Wish');
    expect(balloonTitles).toContain('Secret Wish');
    expect(balloonTitles).toContain('Tiny Mission');
    expect(balloonTitles).toContain('Music Choice');
    expect(balloonTitles).toContain('Birthday Rule');
  });

  it('points to user flower.png asset and has chat prelude configured', () => {
    expect(birthdayContent.bouquet.enabled).toBe(true);
    expect(birthdayContent.bouquet.imageSrc).toBe('/images/surprise/flower.png');
    expect(birthdayContent.chatPrelude.enabled).toBe(true);
    expect(birthdayContent.chatPrelude.messages.length).toBe(5);
  });

  it('has 10 unique reasons and special YOU card configured with number 11', () => {
    expect(birthdayContent.reasons.length).toBe(10);
    const numbers = birthdayContent.reasons.map((r) => r.number);
    expect(new Set(numbers).size).toBe(10);
    expect(birthdayContent.specialYouCard.title).toBe('YOU');
    expect(birthdayContent.specialYouCard.number).toBe(11);
  });

  it('has 11 reasons why I want you forever configured', () => {
    expect(birthdayContent.foreverReasons.length).toBe(11);
    const numbers = birthdayContent.foreverReasons.map((r) => r.number);
    expect(new Set(numbers).size).toBe(11);
  });

  it('has unified keepsake gift with voice message and letter', () => {
    expect(birthdayContent.gift.enabled).toBe(true);
    expect(birthdayContent.gift.voiceMessage).toBeDefined();
    expect(birthdayContent.gift.letter).toBeDefined();
    expect(birthdayContent.gift.letter.signature).toContain('Bharath');
    // Ensure "I Love You Infinity" is NOT in the letter
    expect(birthdayContent.gift.letter.paragraphs.join(' ')).not.toContain('I Love You Infinity');
  });

  it('has favourite four photos exact and first with no duplicate paths', () => {
    expect(birthdayContent.memories.length).toBe(12);
    expect(birthdayContent.memories[0].image).toBe('/images/gallery/HER (2).png');
    expect(birthdayContent.memories[1].image).toBe('/images/gallery/HER (4).jpeg');
    expect(birthdayContent.memories[2].image).toBe('/images/gallery/HER (3).jpeg');
    expect(birthdayContent.memories[3].image).toBe('/images/gallery/HER (7).jpeg');

    const imagePaths = birthdayContent.memories.map((m) => m.image);
    expect(new Set(imagePaths).size).toBe(12);
  });
});
