import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Global cursor spotlight.
 * One pointer listener updates --mx/--my on every `.card` under the cursor,
 * so card borders light up where the cursor is (the signature interaction).
 * Also drives a soft page-wide accent glow that trails the pointer.
 */
export function SpotlightLayer() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // page-wide glow
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${e.clientX - 300}px, ${
            e.clientY - 300
          }px, 0)`;
        }
        // per-card border spotlight
        const cards = document.querySelectorAll<HTMLElement>('.card');
        for (const card of cards) {
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

/**
 * A surface that lights its border where the cursor hovers.
 * Renders as a div or an anchor-less wrapper — pair with a Link inside.
 */
export function Card({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
}) {
  return <Tag className={cn('card', className)}>{children}</Tag>;
}
