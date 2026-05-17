import { Link } from 'react-router-dom';
import { getAllContent } from '@/lib/content';
import { BentoGrid, BentoCard, CardLabel } from '@/components/ui/bento';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Briefcase,
  Code2,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

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

const techStack = [
  '.NET',
  '.NET Core',
  'React',
  'TanStack',
  'TypeScript',
  'JavaScript',
  'SQL',
  'Azure',
  'Azure DevOps',
  'Azure Functions',
  'Azure Key Vault',
  'Azure SQL Database',
  'Azure AD',
  'Identity Framework',
  'MSAL React',
  'styled-components',
  'HTML5',
  'CSS3',
  'Git',
  'Swagger',
  'Postman',
  'UML',
];

export default function Home() {
  const workItems = getAllContent('work');
  const blogPosts = getAllContent('blog');
  const educationItems = getAllContent('education');

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-28 md:px-6 md:pt-32">
      <BentoGrid>
        {/* ---- Hero ------------------------------------------------ */}
        <BentoCard flat className="sm:col-span-2 lg:col-span-4 lg:row-span-2">
          <div className="flex h-full flex-col justify-center gap-7 py-2">
            <div className="flex items-center gap-5">
              <Avatar className="size-20 border-2 border-border shadow-lg md:size-24">
                <AvatarImage
                  src="/moi.jpeg"
                  alt="Alex Gerard"
                  className="object-cover"
                />
                <AvatarFallback className="bg-accent text-lg font-semibold">
                  AG
                </AvatarFallback>
              </Avatar>
              <div>
                <Badge variant="success" className="mb-2">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Available for work
                </Badge>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" />
                  Belgium
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                Alex Gerard
              </h1>
              <p className="text-lg font-medium text-primary md:text-xl">
                IT Consultant &amp; Developer
              </p>
              <p className="max-w-md leading-relaxed text-muted-foreground">
                Crafting digital experiences with precision and passion.
                Currently building at{' '}
                <span className="font-medium text-foreground">
                  Edda International
                </span>
                .
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-2xl border border-border bg-card/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-foreground"
                >
                  <s.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* ---- About / Education ----------------------------------- */}
        <BentoCard className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
          <div className="flex h-full flex-col gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-4 text-primary" />
              <CardLabel>Education</CardLabel>
            </div>
            <div className="-mr-2 flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-hide">
              {educationItems.map((edu) => (
                <div
                  key={edu.slug}
                  className="rounded-2xl border border-border/60 bg-card/40 p-3.5"
                >
                  <p className="text-sm font-semibold leading-snug">
                    {edu.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {edu.school}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground/70">
                    {edu.startDate} — {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-border/60 pt-3">
              <div>
                <CardLabel>Languages</CardLabel>
                <p className="mt-1 text-sm font-medium">French · English</p>
              </div>
              <div>
                <CardLabel>Based in</CardLabel>
                <p className="mt-1 text-sm font-medium">Belgium 🇧🇪</p>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* ---- Tech stack ------------------------------------------ */}
        <BentoCard className="sm:col-span-2 lg:col-span-3">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <CardLabel>Tech Stack</CardLabel>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/60 bg-card/50 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </BentoCard>

        {/* ---- Discord app ----------------------------------------- */}
        <BentoCard
          href="https://discord.com/application-directory/1254138347480289350"
          className="lg:col-span-3"
        >
          <div className="flex h-full items-center gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#5865F2]/12">
              <svg
                viewBox="0 0 24 24"
                fill="#5865F2"
                className="size-7"
                aria-hidden
              >
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.5151.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-semibold">FiveM Presence</p>
              <p className="text-sm text-muted-foreground">
                Discord app for FiveM servers
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge variant="success">Online</Badge>
                <Badge variant="secondary">25k+ users</Badge>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* ---- Experience ------------------------------------------ */}
        <BentoCard className="sm:col-span-2 lg:col-span-3 lg:row-span-2">
          <div className="mb-4 flex items-center gap-2">
            <Briefcase className="size-4 text-primary" />
            <CardLabel>Experience</CardLabel>
          </div>
          <div className="-mr-2 flex-1 space-y-2 overflow-y-auto pr-2 scrollbar-hide">
            {workItems.map((work) => (
              <Link
                key={work.slug}
                to={`/work/${work.slug}`}
                className="group/exp block rounded-2xl border border-border/60 bg-card/40 p-4 transition-colors hover:border-primary/25 hover:bg-card/70"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold leading-snug transition-colors group-hover/exp:text-primary">
                    {work.title}
                  </p>
                  <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {work.startDate} — {work.endDate || 'Now'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {work.role}
                  {work.employer ? ` · ${work.employer}` : ''}
                </p>
              </Link>
            ))}
          </div>
        </BentoCard>

        {/* ---- Professional projects ------------------------------- */}
        <BentoCard href="/projects/professional" className="lg:col-span-3">
          <div className="flex h-full flex-col justify-between gap-4">
            <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Briefcase className="size-6" />
            </div>
            <div>
              <p className="text-lg font-semibold">Professional Work</p>
              <p className="text-sm text-muted-foreground">
                Engagements at Edda International &amp; beyond
              </p>
            </div>
          </div>
        </BentoCard>

        {/* ---- Personal projects ----------------------------------- */}
        <BentoCard href="/projects/personal" className="lg:col-span-3">
          <div className="flex h-full flex-col justify-between gap-4">
            <div className="grid size-12 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-500">
              <Code2 className="size-6" />
            </div>
            <div>
              <p className="text-lg font-semibold">Personal Projects</p>
              <p className="text-sm text-muted-foreground">
                Side hustles, experiments &amp; open source
              </p>
            </div>
          </div>
        </BentoCard>

        {/* ---- Latest writing -------------------------------------- */}
        <BentoCard className="sm:col-span-2 lg:col-span-6">
          <div className="mb-4 flex items-center justify-between">
            <CardLabel>Latest Writing</CardLabel>
            <Link
              to="/blog"
              className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              View all <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group/post flex flex-col gap-1.5 rounded-2xl border border-border/60 bg-card/40 p-4 transition-colors hover:border-primary/25 hover:bg-card/70"
              >
                <p className="font-mono text-[11px] text-muted-foreground">
                  {post.date}
                </p>
                <p className="font-semibold leading-snug transition-colors group-hover/post:text-primary">
                  {post.title}
                </p>
                {post.resume && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.resume}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  );
}
