import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';

const socials = [
  { href: 'https://github.com/Dawgyy', label: 'GitHub', icon: Github },
  {
    href: 'https://www.linkedin.com/in/alex-gerard-46b201295/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  { href: 'https://x.com/dxwgyy', label: 'X', icon: Twitter },
  { href: 'mailto:gerardalexpro@gmail.com', label: 'Email', icon: Mail },
];

const sitemap = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-bold text-white">
                A
              </span>
              <span className="text-lg font-semibold">Alex Gerard</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              IT Consultant &amp; Developer based in Belgium. Building digital
              experiences with precision and passion.
            </p>
          </div>

          <div className="flex gap-16">
            <nav className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Navigate
              </h3>
              <ul className="space-y-2 text-sm">
                {sitemap.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Connect
              </h3>
              <ul className="space-y-2 text-sm">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {s.label}
                      <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Alex Gerard. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <s.icon className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
