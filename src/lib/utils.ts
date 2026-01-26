import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

export const pageTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
};

export const APPLE_EASE = [0.16, 1, 0.3, 1];

