import { describe, it, expect } from 'vitest';
import { birthdayContent } from '../src/data/birthdayContent';

describe('birthdayContent schema and Round 2 configuration', () => {
  it('contains the verified personal facts and recipient name Swethu', () => {
    expect(birthdayContent.site.recipientName).toBe('Swethu');
    expect(birthdayContent.site.senderName).toBe('Bharath');
    expect(birthdayContent.site.birthdayDate).toBe('2026-11-11');
    expect(birthdayContent.site.relationshipStartDate).toBe('2025-07-07');
  });

  it('has the official relationship milestone highlighted', () => {
    const officialMilestone = birthdayContent.timeline.find(
      (m) => m.date === '2025-07-07' && m.isConfirmed
    );
    expect(officialMilestone).toBeDefined();
    expect(officialMilestone?.title).toBe('The Day We Became Us');
    expect(birthdayContent.timeline.length).toBe(8);
  });

  it('verifies romanticQuestion and constellation chapters are removed', () => {
    expect((birthdayContent as Record<string, unknown>).romanticQuestion).toBeUndefined();
    expect((birthdayContent as Record<string, unknown>).constellation).toBeUndefined();
  });

  it('has balloon game configured with 10 unique balloons', () => {
    expect(birthdayContent.balloonGame.enabled).toBe(true);
    expect(birthdayContent.balloonGame.balloons.length).toBe(10);
    const balloonIds = birthdayContent.balloonGame.balloons.map((b) => b.id);
    expect(new Set(balloonIds).size).toBe(10);
  });

  it('has clean rose-bouquet SVG and chat prelude configured', () => {
    expect(birthdayContent.bouquet.enabled).toBe(true);
    expect(birthdayContent.bouquet.imageSrc).toBe('/images/surprise/rose-bouquet.svg');
    expect(birthdayContent.chatPrelude.enabled).toBe(true);
    expect(birthdayContent.chatPrelude.messages.length).toBe(5);
  });

  it('has 10 unique reasons and special YOU card configured', () => {
    expect(birthdayContent.reasons.length).toBe(10);
    const numbers = birthdayContent.reasons.map((r) => r.number);
    expect(new Set(numbers).size).toBe(10);
    expect(birthdayContent.specialYouCard.title).toBe('YOU');
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
  });

  it('has 12 photos with 4 favourites first', () => {
    expect(birthdayContent.memories.length).toBe(12);
    expect(birthdayContent.memories[0].image).toContain('HER (2).png');
    expect(birthdayContent.memories[1].image).toContain('HER (4).jpeg');
    expect(birthdayContent.memories[2].image).toContain('HER (3).jpeg');
    expect(birthdayContent.memories[3].image).toContain('HER (7).jpeg');
  });
});
