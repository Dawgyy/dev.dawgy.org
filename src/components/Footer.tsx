import { Link } from 'react-router-dom';
import { Shell, Label } from './primitives';

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
  { label: 'Work', to: '/work' },
  { label: 'Writing', to: '/blog' },
  { label: 'About', to: '/about' },
];

export function Footer() {
  return (
    <footer className="mt-28 border-t border-line">
      <Shell className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-2.5">
              <span className="grid size-7 place-items-center rounded-md bg-accent text-[13px] font-bold text-accent-ink shadow-[0_0_16px_var(--accent-glow)]">
                A
              </span>
              <span className="text-base font-semibold tracking-tight">
                Alex Gerard
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-2">
              IT Consultant &amp; Developer based in Belgium. Open to talking
              about software, consulting and well-built tools.
            </p>
            <a
              href="mailto:gerardalexpro@gmail.com"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-text"
            >
              <span className="link-underline">gerardalexpro@gmail.com</span>
              <span className="text-accent">→</span>
            </a>
          </div>

          <nav className="md:col-span-3">
            <Label className="block pb-3">Pages</Label>
            <ul className="space-y-2">
              {pages.map((p) => (
                <li key={p.to}>
                  <Link
                    to={p.to}
                    className="group inline-flex text-sm text-text-2 transition-colors hover:text-text"
                  >
                    <span className="link-underline">{p.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-3">
            <Label className="block pb-3">Elsewhere</Label>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm text-text-2 transition-colors hover:text-text"
                  >
                    <span className="link-underline">{l.label}</span>
                    <span className="text-text-3 transition-colors group-hover:text-accent">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Label>© {new Date().getFullYear()} Alex Gerard</Label>
          <Label>Designed &amp; built in Belgium</Label>
        </div>
      </Shell>
    </footer>
  );
}
