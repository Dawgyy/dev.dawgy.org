import { getAllContent } from '@/lib/content';
import { Link } from 'react-router-dom';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Briefcase,
  Code,
  MapPin,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

const HeroHeader = () => (
  <div className="flex flex-col md:flex-row items-center gap-10 h-full justify-center md:justify-start px-8">
    <div className="relative group shrink-0">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/10 to-purple-300/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      <Avatar className="h-32 w-32 md:h-48 md:w-48 border border-white/10 relative z-10 shadow-xl shadow-blue-900/5 rounded-full">
        <AvatarImage
          src="/moi.jpeg"
          alt="Alex Gerard"
          className="object-cover"
        />
        <AvatarFallback className="rounded-full bg-slate-50 text-slate-400">
          AG
        </AvatarFallback>
      </Avatar>
    </div>
    <div className="space-y-6 text-center md:text-left flex-1 min-w-0">
      <div className="space-y-2">
        <h1 className="text-xl md:text-6xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          Alex Gerard
        </h1>
        <h2 className="text-lg font-medium text-slate-500 dark:text-slate-400 tracking-wide uppercase">
          IT Consultant & Developer
        </h2>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto md:mx-0 font-normal line-clamp-3">
        Crafting digital experiences with precision and passion. Building at
        Edda International 🚀
      </p>

      <div className="flex gap-4 justify-center md:justify-start pt-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-500 border border-white/5 hover:border-white/20"
          asChild
        >
          <a href="https://github.com/Dawgyy" target="_blank" rel="noreferrer">
            <Github className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-500 border border-white/5 hover:border-white/20"
          asChild
        >
          <a
            href="https://www.linkedin.com/in/alex-gerard-46b201295/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-500 border border-white/5 hover:border-white/20"
          asChild
        >
          <a href="https://x.com/dxwgyy" target="_blank" rel="noreferrer">
            <Twitter className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-500 border border-white/5 hover:border-white/20"
          asChild
        >
          <a href="mailto:gerardalexpro@gmail.com">
            <Mail className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </a>
        </Button>
      </div>
    </div>
  </div>
);

const AboutMeHeader = ({ educationItems }: { educationItems: any[] }) => (
  <div className="flex flex-col h-full gap-3 p-2 overflow-hidden relative">
    <div className="grid grid-cols-2 gap-3 shrink-0">
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold pl-1">
          Languages
        </span>
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant="secondary"
            className="text-[10px] bg-white/5 text-slate-600 dark:text-slate-300 border-transparent px-2 h-5 font-medium shadow-none hover:bg-white/10 transition-colors"
          >
            French
          </Badge>
          <Badge
            variant="secondary"
            className="text-[10px] bg-white/5 text-slate-600 dark:text-slate-300 border-transparent px-2 h-5 font-medium shadow-none hover:bg-white/10 transition-colors"
          >
            English
          </Badge>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold pl-1">
          Location
        </span>
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 pl-1">
          <MapPin className="h-3 w-3 text-slate-400" />
          <span>Belgium</span>
        </div>
      </div>
    </div>

    <div className="flex-1 flex flex-col pt-1 min-h-0 relative">
      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2 pl-1 shrink-0">
        Education
      </span>
      <div className="flex-1 space-y-3 overflow-y-auto pr-1 scrollbar-hide [mask-image:linear-gradient(to_bottom,black_60%,transparent)] pb-4">
        {educationItems.map((item, i) => (
          <div
            key={i}
            className="group flex flex-col gap-0.5 pl-3 border-l-2 border-slate-100 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 transition-colors shrink-0"
          >
            <div className="flex justify-between items-start gap-2">
              <span className="text-xs font-semibold leading-tight text-slate-700 dark:text-slate-200 group-hover:text-blue-500 transition-colors line-clamp-1">
                {item.title}
              </span>
              <span className="text-[9px] text-slate-400 font-mono shrink-0 whitespace-nowrap">
                {item.endDate}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium line-clamp-1">
              {item.school}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExperienceHeader = ({ workItems }: { workItems: any[] }) => (
  <div className="flex flex-col h-full space-y-1">
    {workItems.map((item, i) => (
      <div
        key={i}
        className="group flex flex-col gap-1.5 p-2 rounded-2xl hover:bg-white/5 transition-all duration-500 cursor-default"
      >
        <div className="flex justify-between items-center">
          <span className="font-semibold text-sm text-slate-700 dark:text-slate-200 group-hover:text-blue-600 transition-colors line-clamp-1">
            {item.title}
          </span>
          <span className="text-[10px] text-slate-400 shrink-0 font-mono bg-white/5 px-2 py-0.5 rounded-full">
            {item.startDate} - {item.endDate || 'Now'}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {item.role && (
            <span className="text-xs text-blue-500/80 font-medium">
              {item.role}
            </span>
          )}
          <span className="text-[10px] text-slate-300">•</span>
          <span className="text-xs text-slate-500">
            {item.employer || item.company}
          </span>
        </div>
      </div>
    ))}
  </div>
);

const TechStackHeader = () => (
  <div className="h-full w-full overflow-hidden relative group">
    <div className="flex flex-wrap gap-2 content-start h-full overflow-y-auto pr-2 scrollbar-hide [mask-image:linear-gradient(to_bottom,black_70%,transparent)] pb-8">
      {[
        '.NET',
        '.NET Core',
        'Azure',
        'Azure Active Directory',
        'Azure DevOps',
        'Azure Functions',
        'Azure Key Vault',
        'Azure Storage Account',
        'Azure SQL Database',
        'CSS3',
        'Git',
        'HTML5',
        'Javascript',
        'MSAL React',
        'Postman',
        'React',
        'SQL',
        'Swagger',
        'UML',
        'TanStack',
        'styled-component',
        'Identity framework',
      ].map((tech, i) => (
        <div
          key={i}
          className="bg-white/5 rounded-full px-2.5 py-1 text-[10px] font-medium text-center whitespace-nowrap text-slate-600 dark:text-slate-300 hover:text-blue-500 hover:bg-white/10 transition-all cursor-default border border-transparent hover:border-white/10 shrink-0"
        >
          {tech}
        </div>
      ))}
    </div>
  </div>
);

const DiscordHeader = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-3xl bg-[#5865F2]/5 items-center justify-center overflow-hidden transition-colors duration-500 relative">
    <div className="absolute inset-0 bg-grid-black/[0.01] dark:bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
    <div className="absolute -right-10 -top-10 h-30 w-30 rounded-full bg-[#5865F2]/10 blur-[60px] mix-blend-multiply" />
    <div className="absolute -left-10 -bottom-10 h-30 w-30 rounded-full bg-[#404EED]/10 blur-[60px] mix-blend-multiply" />

    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="#5865F2"
      className="relative z-10 opacity-80"
    >
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.5151.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
    </svg>
  </div>
);

const BlogHeader = ({ blogPosts }: { blogPosts: any[] }) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center justify-between mb-2 px-1">
      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
        Latest Posts
      </span>
      <Link
        to="/blog"
        className="text-[10px] text-blue-500 hover:text-blue-400 font-medium flex items-center gap-1 transition-colors relative z-20"
      >
        View all <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
    <div className="space-y-2 flex-1 overflow-hidden p-1">
      {blogPosts.slice(0, 3).map((post) => (
        <Link
          key={post.slug}
          to={`/blog/${post.slug}`}
          className="group flex items-start justify-between gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors duration-300 cursor-pointer border border-transparent hover:border-white/5 relative z-20"
        >
          <div className="space-y-1 min-w-0 flex-1">
            <p className="font-semibold text-sm text-slate-700 dark:text-slate-200 group-hover:text-blue-600 transition-colors line-clamp-1">
              {post.title}
            </p>
            <p className="text-[10px] text-slate-400 line-clamp-1 font-medium">
              {post.date}
            </p>
          </div>
          <div className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center transition-colors shrink-0 group-hover:bg-blue-500/10">
            <ChevronRight className="h-3 w-3 opacity-40 group-hover:opacity-100 text-slate-400 group-hover:text-blue-500 transition-all" />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default function Home() {
  const workItems = getAllContent('work') as any[];
  const blogPosts = getAllContent('blog') as any[];
  const educationItems = getAllContent('education') as any[];

  return (
    <div className="pt-[8em] pb-8 px-4 md:px-6 relative w-full h-screen overflow-y-auto scrollbar-hide">
      <div className="max-w-7xl mx-auto space-y-8">
        <BentoGrid className="grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-[20rem]">
          <BentoGridItem
            title=""
            description=""
            header={<HeroHeader />}
            className="md:col-span-2 lg:col-span-2 row-span-2 shadow-none bg-transparent border-none hover:bg-transparent hover:shadow-none p-0"
          />

          <BentoGridItem
            title="Tech Stack"
            description="My preferred tools"
            header={<TechStackHeader />}
            className="md:col-span-2 lg:col-span-2"
          />

          <BentoGridItem
            title="About Me"
            description="Profile & Education"
            header={<AboutMeHeader educationItems={educationItems} />}
            className="md:col-span-1 lg:col-span-1"
          />
          <BentoGridItem
            title="Discord App FiveM Presence"
            description={
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-xs text-muted-foreground line-clamp-2">
                  Presence for FiveM servers on Discord.
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 backdrop-blur-sm flex items-center gap-1.5 pl-1.5 text-[10px]"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    Online
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-[10px] border-white/10 h-5 px-1.5"
                  >
                    25k+ Users
                  </Badge>
                </div>
              </div>
            }
            header={<DiscordHeader />}
            className="md:col-span-1 lg:col-span-1"
            href="https://discord.com/application-directory/1254138347480289350"
          />

          <BentoGridItem
            title="Experience"
            description="My professional journey"
            header={<ExperienceHeader workItems={workItems} />}
            className="md:col-span-2 lg:col-span-2 row-span-2"
          />

          <BentoGridItem
            title="Professional Work"
            description="Edda International & more"
            header={
              <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center mb-4 group-hover:scale-[1.02] transition-transform duration-300">
                <Briefcase className="h-10 w-10 text-primary/60 group-hover:text-primary transition-colors" />
              </div>
            }
            icon={<Briefcase className="h-4 w-4 text-neutral-500" />}
            className="md:col-span-1 lg:col-span-1"
            href="/projects/professional"
          />
          <BentoGridItem
            title="Personal Projects"
            description="Side hustles & experiments"
            header={
              <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center mb-4 group-hover:scale-[1.02] transition-transform duration-300">
                <Code className="h-10 w-10 text-emerald-600/60 group-hover:text-emerald-500 transition-colors" />
              </div>
            }
            icon={<Code className="h-4 w-4 text-neutral-500" />}
            className="md:col-span-1 lg:col-span-1"
            href="/projects/personal"
          />
          <BentoGridItem
            title=""
            description=""
            header={<BlogHeader blogPosts={blogPosts} />}
            className="md:col-span-2 lg:col-span-2"
          />
        </BentoGrid>
      </div>
    </div>
  );
}
