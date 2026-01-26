import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Variants } from 'framer-motion';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1], // Soft cubic-bezier for natural deceleration
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

// Kept for backward compatibility or other uses
export const pageTransition = {
  type: 'tween',
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  duration: 0.5,
};

export const APPLE_EASE = [0.16, 1, 0.3, 1];
