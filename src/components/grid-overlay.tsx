import { useEffect, useState } from 'react';

/**
 * The signature: the composition grid itself is the decoration.
 * Faint vertical column rules, drawn once on load (top-down wipe),
 * then left in place at low contrast. Toggleable with the `G` key.
 */
export function GridOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === 'g' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        setVisible((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 flex justify-center transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="w-full max-w-[1320px] px-5 md:px-10">
        <div className="grid h-full grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={i >= 4 ? 'hidden md:block' : ''}
              style={{
                borderLeft: '1px solid var(--color-rule)',
                borderRight:
                  i === 11 ? '1px solid var(--color-rule)' : undefined,
                opacity: 0.5,
                animation: `grid-draw 0.8s cubic-bezier(0.2,0,0,1) ${
                  0.15 + i * 0.04
                }s both`,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes grid-draw {
          from { clip-path: inset(0 0 100% 0); }
          to   { clip-path: inset(0 0 0 0); }
        }
      `}</style>
    </div>
  );
}
