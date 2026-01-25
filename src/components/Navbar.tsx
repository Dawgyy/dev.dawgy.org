import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink, FileText, BookOpen, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/blog', label: 'Blog', icon: BookOpen },
  ];

  const externalLinks = [
    { href: '/cv.pdf', label: 'CV', icon: FileText },
    { href: 'https://infohers.dawgy.org', label: 'Notes', icon: ExternalLink },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="mr-6 flex items-center space-x-2 font-bold">
            <span className="hidden sm:inline-block">dev.dawgy.org</span>
            <span className="sm:hidden">AG</span>
          </Link>
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                  isActive(link.href) ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80 flex items-center gap-1"
            >
              {link.label}
              {link.icon === ExternalLink && (
                <ExternalLink className="h-3 w-3" />
              )}
            </a>
          ))}
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-b bg-background">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                  isActive(link.href) ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </div>
              </Link>
            ))}
            <Separator />
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80 flex items-center gap-2"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
