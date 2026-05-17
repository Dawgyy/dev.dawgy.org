import { useEffect, useRef } from 'react';

/**
 * Global cursor spotlight.
 *
 * - A soft page-wide accent glow trails the pointer.
 * - The `.card` under the cursor gets --mx/--my so its border lights up
 *   where the cursor is (the signature interaction).
 *
 * Only the hovered card is touched per frame — found via `closest('.card')`
 * on the event target, so there's no full-DOM scan and no layout thrash.
 */
export function SpotlightLayer() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf = 0;
    let lastCard: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${
            e.clientX - 300
          }px, ${e.clientY - 300}px, 0)`;
        }

        const target = e.target as HTMLElement | null;
        const card = target?.closest<HTMLElement>('.card') ?? null;

        if (card !== lastCard) {
          lastCard?.style.removeProperty('--spot');
          lastCard = card;
          card?.style.setProperty('--spot', '1');
        }
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${e.clientX - r.left}px`);
          card.style.setProperty('--my', `${e.clientY - r.top}px`);
        }
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-0 hidden h-[600px] w-[600px] rounded-full opacity-60 blur-[120px] md:block"
      style={{
        background:
          'radial-gradient(circle, var(--accent-glow), transparent 70%)',
      }}
    />
  );
}
