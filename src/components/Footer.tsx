import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-xl mt-auto">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
          <div className="col-span-1 md:col-span-2 space-y-2">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Alex Gerard
            </h2>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Building digital experiences with passion and precision. 
              Let's create something amazing together.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Sitemap</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex gap-4">
              <a 
                href="https://github.com/Dawgyy" 
                target="_blank" 
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/alex-gerard-46b201295/" 
                target="_blank" 
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/dxwgyy" 
                target="_blank" 
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="mailto:gerardalexpro@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© {currentYear} Alex Gerard. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-red-400 animate-pulse">❤</span> and <span className="text-primary font-medium">React</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
