'use client';

import { cn } from '@/lib/utils';

export const AmbientBackground = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-slate-50 dark:bg-neutral-950',
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-slate-100/50 to-slate-200/50 dark:from-neutral-950/50 dark:via-neutral-900/50 dark:to-neutral-800/50" />

      <div className="absolute inset-0 opacity-30 dark:opacity-15">
        <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-indigo-200/20 to-blue-100/20 dark:from-indigo-900/10 dark:to-blue-900/10 blur-[90px] mix-blend-multiply dark:mix-blend-screen" />

        <div className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-rose-100/20 to-orange-100/20 dark:from-rose-900/10 dark:to-orange-900/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-gradient-to-b from-sky-100/20 to-emerald-100/20 dark:from-sky-900/10 dark:to-emerald-900/10 blur-[80px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div
        className="absolute inset-0 z-[1] opacity-[0.015] dark:opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
