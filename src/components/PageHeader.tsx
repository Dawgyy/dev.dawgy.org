import { useNavigate } from 'react-router-dom';
import { Grid, Rule, Label } from './primitives';

interface PageHeaderProps {
  index: string;
  title: string;
  description?: string;
  back?: boolean;
}

/** Swiss page masthead: index label, large title, optional standfirst. */
export function PageHeader({
  index,
  title,
  description,
  back,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="pt-14 md:pt-20">
      <Grid>
        <div className="col-span-4 flex items-center justify-between md:col-span-12">
          <Label>
            {index} — {title}
          </Label>
          {back && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="group label flex items-center gap-1.5 hover:text-ink"
            >
              <span aria-hidden>←</span>
              <span className="link-underline">Back</span>
            </button>
          )}
        </div>
      </Grid>

      <Grid className="mt-4 items-end">
        <h1 className="col-span-4 text-5xl font-semibold leading-[0.95] tracking-[-0.035em] md:col-span-8 md:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="col-span-4 mt-5 self-end text-sm leading-relaxed text-ink-soft md:col-span-4 md:mt-0">
            {description}
          </p>
        )}
      </Grid>

      <Rule weight="heavy" className="mt-10" />
    </header>
  );
}
