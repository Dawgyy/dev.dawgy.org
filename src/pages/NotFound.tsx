import { Link } from 'react-router-dom';
import { Shell, Grid, Rule, Label } from '@/components/primitives';

export default function NotFound({
  title = 'Page not found',
  description = 'The page you requested does not exist or has been moved.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Shell>
      <div className="pt-14 md:pt-20">
        <Grid>
          <div className="col-span-4 md:col-span-12">
            <Label>Error — 404</Label>
          </div>
        </Grid>
        <Grid className="mt-4 items-end">
          <h1 className="col-span-4 text-[28vw] font-semibold leading-[0.85] tracking-[-0.04em] text-accent md:col-span-7 md:text-[16rem]">
            404
          </h1>
          <div className="col-span-4 mt-6 self-end md:col-span-4 md:mt-0">
            <p className="text-2xl font-medium tracking-tight">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {description}
            </p>
            <Link
              to="/"
              className="group mt-6 inline-flex items-center gap-1.5 border border-rule-strong px-3 py-1.5 text-sm font-medium"
            >
              <span aria-hidden>←</span>
              <span className="link-underline">Return to index</span>
            </Link>
          </div>
        </Grid>
        <Rule weight="heavy" className="mt-10" />
      </div>
    </Shell>
  );
}
