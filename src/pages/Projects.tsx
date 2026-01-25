import { getAllContent } from '@/lib/content';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Code, Briefcase, Globe, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Projects({
  category,
}: {
  category?: 'Professional' | 'Personal';
}) {
  const allProjects = getAllContent('projects') as any[];

  let proProjects = allProjects.filter((p) => p.category === 'Professional');
  let personalProjects = allProjects.filter((p) => p.category === 'Personal');

  let title = 'Projects';
  let description = 'A collection of my professional and personal work.';

  if (category === 'Professional') {
    personalProjects = [];
    title = 'Professional Projects';
    description =
      'My work at Edda International and other professional engagements.';
  } else if (category === 'Personal') {
    proProjects = [];
    title = 'Personal Projects';
    description = 'Side projects, experiments, and open source contributions.';
  }

  const getGradientClass = () => {
    if (category === 'Professional')
      return 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40';
    if (category === 'Personal')
      return 'bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40';
    return '';
  };

  const getLayoutId = () => {
    if (category === 'Professional') return 'pro-projects-card';
    if (category === 'Personal') return 'personal-projects-card';
    return undefined;
  };

  const getIconLayoutId = () => {
    if (category === 'Professional') return 'pro-projects-icon';
    if (category === 'Personal') return 'personal-projects-icon';
    return undefined;
  };

  const ProjectHeader = ({ project }: { project: any }) => (
    <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-[2rem] bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 mb-4 items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 border border-white/5">
      <div className="absolute top-3 right-3 z-10">
        <Badge
          variant={
            project.category === 'Professional' ? 'default' : 'secondary'
          }
          className="text-[10px] px-2 py-0.5 shadow-sm"
        >
          {project.category}
        </Badge>
      </div>
      <Code className="h-10 w-10 text-muted-foreground/40 group-hover:text-primary/60 transition-colors" />
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
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="-ml-4 text-muted-foreground hover:text-foreground"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>
          {category ? (
            <motion.div
              layoutId={getLayoutId()}
              className={`rounded-[2.5rem] p-8 ${getGradientClass()} border border-white/5 relative overflow-hidden shadow-2xl`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="relative z-10 flex flex-col justify-end h-full min-h-[10rem]">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-black tracking-tight text-foreground"
                >
                  {title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground text-lg mt-2 font-medium"
                >
                  {description}
                </motion.p>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10 transform rotate-12 pointer-events-none">
                <motion.div layoutId={getIconLayoutId()}>
                  {category === 'Professional' ? (
                    <Briefcase className="h-80 w-80 text-primary" />
                  ) : (
                    <Code className="h-80 w-80 text-emerald-500" />
                  )}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight">{title}</h1>
              <p className="text-muted-foreground text-lg">{description}</p>
            </div>
          )}
        </div>

        {proProjects.length > 0 && (
          <div className="space-y-6">
            {!category && (
              <>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="bg-primary/10 text-primary p-1 rounded-md">
                    <Briefcase className="h-5 w-5" />
                  </span>{' '}
                  Professional Projects
                </h2>
                <Separator />
              </>
            )}
            <BentoGrid className="auto-rows-[minmax(200px,auto)]">
              {proProjects.map((project, i) => (
                <BentoGridItem
                  key={project.slug}
                  title={project.title}
                  description={project.resume}
                  header={<ProjectHeader project={project} />}
                  icon={<Globe className="h-4 w-4 text-neutral-500" />}
                  className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
                  href={`/projects/${project.slug}`}
                />
              ))}
            </BentoGrid>
          </div>
        )}

        {personalProjects.length > 0 && (
          <div className="space-y-6">
            {!category && (
              <>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="bg-primary/10 text-primary p-1 rounded-md">
                    <Code className="h-5 w-5" />
                  </span>{' '}
                  Personal Projects
                </h2>
                <Separator />
              </>
            )}
            <BentoGrid className="auto-rows-[minmax(200px,auto)]">
              {personalProjects.map((project, i) => (
                <BentoGridItem
                  key={project.slug}
                  title={project.title}
                  description={project.resume}
                  header={<ProjectHeader project={project} />}
                  icon={<Globe className="h-4 w-4 text-neutral-500" />}
                  className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
                  href={`/projects/${project.slug}`}
                />
              ))}
            </BentoGrid>
          </div>
        )}
      </div>
    </motion.div>
  );
}
