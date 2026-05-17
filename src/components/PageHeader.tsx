import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Show a "Back" affordance above the title. */
  back?: boolean;
  eyebrow?: string;
}

export function PageHeader({
  title,
  description,
  back,
  eyebrow,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="space-y-4">
      {back && (
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="-ml-1 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
      )}
      <div className="space-y-2">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
