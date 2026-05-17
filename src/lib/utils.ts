import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Variants } from 'framer-motion';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Mechanical easing — precise, no overshoot. */
export const EASE: [number, number, number, number] = [0.2, 0, 0, 1];

/**
 * Page transition: the new page wipes up from under a clip mask while a
 * slight blur dissipates — distinctive but quick, no bounce.
 */
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 24,
    filter: 'blur(6px)',
    clipPath: 'inset(0 0 12% 0)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.45, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(4px)',
    transition: { duration: 0.2, ease: EASE },
  },
};

/** Staggered reveal for list rows — content slides up under a clip. */
export const listVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};

export const rowVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

/** Estimated reading time in minutes (~200 wpm), at least 1. */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
