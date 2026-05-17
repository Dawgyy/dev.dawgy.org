import { Link } from 'react-router-dom';
import { Shell, Grid, Rule, Label } from './primitives';

const links = [
  { label: 'GitHub', href: 'https://github.com/Dawgyy' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alex-gerard-46b201295/',
  },
  { label: 'X / Twitter', href: 'https://x.com/dxwgyy' },
  { label: 'Email', href: 'mailto:gerardalexpro@gmail.com' },
];

const pages = [
  { label: 'Index', to: '/' },
  { label: 'Work', to: '/projects' },
  { label: 'Writing', to: '/blog' },
];

export function Footer() {
  return (
    <footer className="mt-32">
      <Shell>
        <Rule weight="heavy" />
        <Grid className="py-12">
          <div className="col-span-4 md:col-span-5">
            <p className="text-2xl font-semibold tracking-tight">Alex Gerard</p>
            <p className="mt-1 text-sm text-ink-soft">
              IT Consultant &amp; Developer — Belgium
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-soft">
              Open to conversations about software, consulting, and well-built
              tools.
            </p>
          </div>

          <nav className="col-span-2 mt-8 md:col-span-3 md:mt-0">
            <Label className="block pb-3">Pages</Label>
            <ul className="space-y-1.5">
              {pages.map((p) => (
                <li key={p.to}>
                  <Link
                    to={p.to}
                    className="group inline-flex text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    <span className="link-underline">{p.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="col-span-2 mt-8 md:col-span-4 md:mt-0">
            <Label className="block pb-3">Elsewhere</Label>
            <ul className="space-y-1.5">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    <span className="link-underline">{l.label}</span>
                    <span className="ml-1 text-ink-faint">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Grid>
        <Rule />
        <div className="flex flex-col gap-1 py-5 text-[11px] text-ink-faint sm:flex-row sm:justify-between">
          <span className="label">
            © {new Date().getFullYear()} Alex Gerard
          </span>
          <span className="label">
            Built with React — Press G to toggle grid
          </span>
        </div>
      </Shell>
    </footer>
  );
}
