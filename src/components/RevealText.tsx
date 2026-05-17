import { motion } from 'framer-motion';
import { EASE } from '@/lib/utils';

interface RevealTextProps {
  /** Lines of the heading — each line is a list of word nodes. */
  lines: React.ReactNode[][];
  /** Plain-text equivalent for assistive tech. */
  label: string;
  className?: string;
  /** Stagger start delay (s). */
  delay?: number;
}

/**
 * Heading that composes itself word-by-word: each word rises from under
 * a clip mask. Used for the home hero — sober, not gimmicky.
 */
export function RevealText({
  lines,
  label,
  className,
  delay = 0,
}: RevealTextProps) {
  let wordIndex = 0;

  return (
    <h1 className={className} aria-label={label}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.map((word, wi) => {
            const i = wordIndex++;
            return (
              <span
                key={wi}
                className="inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: EASE,
                    delay: delay + i * 0.07,
                  }}
                >
                  {word}
                  {wi < line.length - 1 && ' '}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
