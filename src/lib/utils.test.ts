import { describe, it, expect } from 'vitest';
import { cn, readingTime } from './utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('drops falsy values', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b');
  });

  it('lets later tailwind classes win', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
});

describe('readingTime', () => {
  it('is at least one minute', () => {
    expect(readingTime('short')).toBe(1);
  });

  it('scales with word count (~200 wpm)', () => {
    const text = Array(600).fill('word').join(' ');
    expect(readingTime(text)).toBe(3);
  });
});
