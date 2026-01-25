import { getAllContent } from '@/lib/content';
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
  FileText,
  ExternalLink,
  Cpu,
  Globe,
  Database,
  GraduationCap,
  Languages,
} from 'lucide-react';
import { differenceInYears } from 'date-fns';
import { motion } from 'framer-motion';

export default function Home() {
  const workItems = getAllContent('work') as any[];
  const projectItems = getAllContent('projects') as any[];
  const blogPosts = getAllContent('blog') as any[];
  const educationItems = getAllContent('education') as any[];

  const proProjects = projectItems.filter((p) => p.category === 'Professional');
  const personalProjects = projectItems.filter(
    (p) => p.category === 'Personal',
  );
  // Show All Pro and 1 Personal
  const previewProjects = [...proProjects, ...personalProjects.slice(0, 1)];

  const birthDate = new Date('2003-11-17');
  const today = new Date();
  const age = differenceInYears(today, birthDate);

  // Hero Component
  const HeroHeader = () => (
    <div className="flex flex-col md:flex-row items-center gap-8 h-full justify-center md:justify-start">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/30 rounded-[2.5rem] blur-3xl opacity-60 animate-pulse group-hover:opacity-80 transition-opacity duration-500"></div>
        <Avatar className="h-40 w-40 border-4 border-background/50 shadow-2xl relative z-10 ring-4 ring-primary/10 rounded-[2.5rem]">
          <AvatarImage
            src="/moi.jpeg"
            alt="Alex Gerard"
            className="object-cover"
          />
          <AvatarFallback className="rounded-[2.5rem]">AG</AvatarFallback>
        </Avatar>
      </div>
      <div className="space-y-4 text-center md:text-left flex-1">
        <Badge
          variant="secondary"
          className="w-fit mx-auto md:mx-0 rounded-[1.5rem] px-4 py-1.5 border border-primary/10 bg-primary/5 text-primary text-xs backdrop-blur-md shadow-sm font-medium"
        >
          Building at Edda International 🚀
        </Badge>
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Alex Gerard
          </h1>
          <h2 className="text-xl font-bold text-muted-foreground mt-1">
            IT Consultant
          </h2>
        </div>
        <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
          {age}-year-old Consultant at Edda International.
          <br className="hidden md:block" />
          HERS Graduate (Bachelor in Application Development).
        </p>
      </div>
    </div>
  );

  // Socials Component
  const SocialsHeader = () => (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
        Connect
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-[1.8rem] hover:bg-primary/10 hover:border-primary/50 hover:scale-110 transition-all duration-300 shadow-sm border-white/10 bg-white/5 backdrop-blur-sm"
          asChild
        >
          <a href="https://github.com/Dawgyy" target="_blank" rel="noreferrer">
            <Github className="h-7 w-7" />
          </a>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-[1.8rem] hover:bg-primary/10 hover:border-primary/50 hover:scale-110 transition-all duration-300 shadow-sm border-white/10 bg-white/5 backdrop-blur-sm"
          asChild
        >
          <a
            href="https://www.linkedin.com/in/alex-gerard-46b201295/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="h-7 w-7" />
          </a>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-[1.8rem] hover:bg-primary/10 hover:border-primary/50 hover:scale-110 transition-all duration-300 shadow-sm border-white/10 bg-white/5 backdrop-blur-sm"
          asChild
        >
          <a href="https://x.com/dxwgyy" target="_blank" rel="noreferrer">
            <Twitter className="h-7 w-7" />
          </a>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-[1.8rem] hover:bg-primary/10 hover:border-primary/50 hover:scale-110 transition-all duration-300 shadow-sm border-white/10 bg-white/5 backdrop-blur-sm"
          asChild
        >
          <a href="mailto:gerardalexpro@gmail.com">
            <Mail className="h-7 w-7" />
          </a>
        </Button>
      </div>
    </div>
  );

  // Personal Info Component
  const PersonalInfoHeader = () => (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Languages className="h-5 w-5 text-primary" /> Profile
        </h3>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-medium text-sm">French</span>
          <Badge variant="secondary" className="text-xs">
            Native
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-sm">English</span>
          <Badge variant="outline" className="text-xs">
            B1
          </Badge>
        </div>
        <div className="border-t border-border/40 my-2"></div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-sm">Nationality</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            Belgian 🇧🇪
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-sm">License</span>
          <span className="text-xs text-muted-foreground">Category B</span>
        </div>
      </div>
    </div>
  );

  // Experience Component
  const ExperienceHeader = () => (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" /> Experience
        </h3>
      </div>
      <div className="space-y-6">
        {workItems.map((item, i) => (
          <div
            key={i}
            className="relative pl-4 border-l-2 border-primary/20 hover:border-primary/60 transition-colors duration-300 group"
          >
            <div className="flex flex-col">
              <span className="font-bold text-base group-hover:text-primary transition-colors">
                {item.title}
              </span>
              <span className="text-sm text-muted-foreground font-medium">
                {item.company}
              </span>
              <span className="text-xs text-muted-foreground mt-1 bg-primary/5 w-fit px-2 py-0.5 rounded-xl border border-primary/10">
                {item.startDate} - {item.endDate || 'Present'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Education Component
  const EducationHeader = () => (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" /> Education
        </h3>
      </div>
      <div className="space-y-6">
        {educationItems.map((item, i) => (
          <div
            key={i}
            className="relative pl-4 border-l-2 border-primary/20 hover:border-primary/60 transition-colors duration-300 group"
          >
            <div className="flex flex-col">
              <span className="font-bold text-base group-hover:text-primary transition-colors">
                {item.title}
              </span>
              <span className="text-sm text-muted-foreground font-medium">
                {item.school}
              </span>
              <span className="text-xs text-muted-foreground mt-1 bg-primary/5 w-fit px-2 py-0.5 rounded-xl border border-primary/10">
                {item.startDate} - {item.endDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Tech Stack Component
  const TechStackHeader = () => (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Cpu className="h-5 w-5 text-primary" /> Stack
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          'C#',
          'React',
          'Python',
          'Java',
          'SQL',
          'VueJS',
          'Next.js',
          'TS',
          'Tailwind',
        ].map((tech) => (
          <div
            key={tech}
            className="bg-muted/30 rounded-[0.8rem] py-2 text-xs font-medium border border-white/5 hover:bg-primary/10 transition-colors cursor-default"
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );

  // Blog List Component
  const BlogHeader = () => (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          <FileText className="h-5 w-5 text-primary" /> Latest Thoughts
        </h3>
      </div>
      <div className="space-y-3 flex-1 overflow-hidden">
        {blogPosts.slice(0, 3).map((post) => (
          <div
            key={post.slug}
            className="group flex items-start justify-between gap-4 p-2 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="space-y-1">
              <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                {post.title}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {post.date}
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Discord Component
  const DiscordHeader = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-[2rem] bg-gradient-to-br from-[#5865F2]/20 to-[#404EED]/20 mb-4 items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 border border-white/5 relative">
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
      <motion.div layoutId="discord-icon">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="#5865F2"
          className="drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300"
        >
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.5151.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
        </svg>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20 px-4 md:px-8 bg-grid-small-black/[0.02] dark:bg-grid-small-white/[0.02] relative"
    >
      {/* Noise overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[50] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <BentoGrid className="max-w-7xl mx-auto auto-rows-[minmax(180px,auto)]">
        {/* Row 1 */}
        <BentoGridItem
          title=""
          description=""
          header={<HeroHeader />}
          className="md:col-span-2 lg:col-span-3 min-h-[300px] flex flex-col justify-center"
        />
        <BentoGridItem
          title=""
          description=""
          header={<SocialsHeader />}
          className="md:col-span-1 min-h-[300px]"
        />

        {/* Row 2 */}
        <BentoGridItem
          title="Profile"
          description="Languages & Info"
          header={<PersonalInfoHeader />}
          className="md:col-span-1"
        />
        <BentoGridItem
          title="Tech Stack"
          description="My preferred tools"
          header={<TechStackHeader />}
          className="md:col-span-1"
        />

        <BentoGridItem
          title="Professional Work"
          description="Edda International & more"
          layoutId="pro-projects-card"
          header={
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-[2rem] bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 mb-4 items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 border border-white/5">
              <motion.div layoutId="pro-projects-icon">
                <Briefcase className="h-10 w-10 text-primary/60 group-hover:text-primary transition-colors" />
              </motion.div>
            </div>
          }
          icon={<Briefcase className="h-4 w-4 text-neutral-500" />}
          className="md:col-span-1"
          href="/projects/professional"
        />

        <BentoGridItem
          title="Personal Projects"
          description="Side hustles & experiments"
          layoutId="personal-projects-card"
          header={
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-[2rem] bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 mb-4 items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 border border-white/5">
              <motion.div layoutId="personal-projects-icon">
                <Code className="h-10 w-10 text-emerald-600/60 group-hover:text-emerald-500 transition-colors" />
              </motion.div>
            </div>
          }
          icon={<Code className="h-4 w-4 text-neutral-500" />}
          className="md:col-span-1"
          href="/projects/personal"
        />

        <BentoGridItem
          title="Discord Presence"
          description={
            <div className="flex flex-col gap-3 pt-2">
              <span className="text-sm text-muted-foreground line-clamp-2">
                Enhance your server with powerful automation and moderation
                tools.
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 backdrop-blur-sm flex items-center gap-1.5 pl-1.5"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  25K+ Users
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-500/10 text-blue-600 border-blue-500/20 backdrop-blur-sm flex items-center gap-1.5"
                >
                  <Database className="w-3 h-3" />
                  700+ Servers
                </Badge>
              </div>
            </div>
          }
          header={<DiscordHeader />}
          className="md:col-span-2"
          href="https://discord.com/discovery/applications/1254138347480289350"
          icon={
            <div className="h-4 w-4 text-[#5865F2]">
              <Globe className="h-4 w-4" />
            </div>
          }
        />

        {/* Row 3 */}
        <BentoGridItem
          title="Experience"
          description="My professional journey"
          header={<ExperienceHeader />}
          className="md:col-span-2 lg:col-span-2 row-span-1"
        />

        <BentoGridItem
          title="Education"
          description="Academic background"
          header={<EducationHeader />}
          className="md:col-span-2 lg:col-span-2 row-span-1"
        />

        {blogPosts.length > 0 && (
          <BentoGridItem
            title=""
            description=""
            header={<BlogHeader />}
            className="md:col-span-4 lg:col-span-4"
            href="/blog"
          />
        )}

        <BentoGridItem
          title="All Projects"
          description="Explore my full portfolio"
          header={
            <div className="flex flex-1 items-center justify-center h-full bg-muted/20 rounded-[2rem] border border-white/5">
              <Database className="h-8 w-8 text-muted-foreground" />
            </div>
          }
          className="md:col-span-4"
          href="/projects"
        />
      </BentoGrid>
    </motion.div>
  );
}
