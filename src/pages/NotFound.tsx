import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Shell, Label } from '@/components/primitives';
import { useSeo } from '@/hooks/use-seo';

const suggestions = [
  { to: '/work', label: 'Work', hint: 'Engagements & projects' },
  { to: '/blog', label: 'Writing', hint: 'Notes on development' },
  { to: '/about', label: 'About', hint: 'Who I am' },
];

export default function NotFound({
  title = 'Page not found',
  description = 'The page you requested does not exist or has been moved.',
}: {
  title?: string;
  description?: string;
}) {
  useSeo({ title: '404', path: '/404' });

  return (
    <Shell className="flex min-h-[78vh] flex-col justify-center py-20">
      <Label className="text-accent">Error / 404</Label>
      <p className="mt-4 select-none bg-gradient-to-b from-text to-text-3/40 bg-clip-text text-[34vw] font-semibold leading-[0.78] tracking-[-0.05em] text-transparent md:text-[16rem]">
        404
      </p>

      <h1 className="mt-8 text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 max-w-sm text-text-2">{description}</p>

      <Link
        to="/"
        className="group mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        Back to index
      </Link>

      {/* Helpful exits */}
      <div className="mt-12">
        <Label className="block pb-3">Or try</Label>
        <div className="grid gap-3 sm:grid-cols-3">
          {suggestions.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="card group flex items-center justify-between p-4 hover:bg-surface-2"
            >
              <span>
                <span className="link-underline font-medium">{s.label}</span>
                <span className="mt-0.5 block text-xs text-text-3">
                  {s.hint}
                </span>
              </span>
              <ArrowUpRight className="size-4 text-text-3 transition-colors group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  );
}
