import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Shell, Label } from '@/components/primitives';

export default function NotFound({
  title = 'Page not found',
  description = 'The page you requested does not exist or has been moved.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Shell className="flex min-h-[70vh] flex-col items-start justify-center">
      <Label className="text-accent">Error / 404</Label>
      <p className="mt-4 text-[28vw] font-semibold leading-[0.8] tracking-[-0.04em] text-accent-gradient md:text-[14rem]">
        404
      </p>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 max-w-sm text-text-2">{description}</p>
      <Link
        to="/"
        className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        Back to index
      </Link>
    </Shell>
  );
}
