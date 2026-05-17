import { cn } from '@/lib/utils';

/**
 * Fixed full-bleed background: layered aurora blobs + faint dot grid + grain.
 * Adapts automatically to light / dark via theme tokens.
 */
export function AmbientBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background',
        className,
      )}
    >
      {/* Aurora blobs */}
      <div className="absolute -left-[15%] -top-[10%] size-[55vw] rounded-full bg-indigo-500/20 blur-[120px] animate-aurora dark:bg-indigo-500/15" />
      <div className="absolute -right-[15%] top-[15%] size-[50vw] rounded-full bg-fuchsia-500/15 blur-[130px] animate-aurora [animation-delay:-6s] dark:bg-fuchsia-500/10" />
      <div className="absolute bottom-[-15%] left-[25%] size-[45vw] rounded-full bg-sky-400/15 blur-[120px] animate-aurora [animation-delay:-12s] dark:bg-sky-500/10" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-50 dark:opacity-30"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          color: 'var(--color-border)',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Bottom vignette keeps footer legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/70" />
    </div>
  );
}
