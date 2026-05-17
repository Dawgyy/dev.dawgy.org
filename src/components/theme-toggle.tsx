import { useTheme } from './theme-provider';
import { cn } from '@/lib/utils';

/**
 * Swiss toggle: a labelled two-state switch (LT / DK), no icons.
 * The active state is filled with ink.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        'flex select-none border border-rule text-[10px] font-medium',
        className,
      )}
      role="group"
      aria-label="Color theme"
    >
      {(['light', 'dark'] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => setTheme(mode)}
          aria-pressed={theme === mode}
          className={cn(
            'px-2 py-1 uppercase tracking-wider transition-colors',
            theme === mode
              ? 'bg-ink text-paper'
              : 'text-ink-faint hover:text-ink',
          )}
        >
          {mode === 'light' ? 'Lt' : 'Dk'}
        </button>
      ))}
    </div>
  );
}
