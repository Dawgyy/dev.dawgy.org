import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Label } from './primitives';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  back?: boolean;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  back,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="pt-16 md:pt-24">
      {back && (
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group mb-6 inline-flex items-center gap-1.5 text-sm text-text-3 transition-colors hover:text-text"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="link-underline">Back</span>
        </button>
      )}
      <Label className="text-accent">{eyebrow}</Label>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-text-2">
          {description}
        </p>
      )}
      <div className="mt-8 h-px w-full bg-line" />
    </header>
  );
}
