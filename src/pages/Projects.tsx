import { getAllContent } from '@/lib/content';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Code, Briefcase, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Projects({
  category,
}: {
  category?: 'Professional' | 'Personal';
}) {
  const navigate = useNavigate();
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
      return 'bg-white/[0.02] backdrop-blur-[40px] border border-white/5 shadow-sm';
    if (category === 'Personal')
      return 'bg-white/[0.02] backdrop-blur-[40px] border border-white/5 shadow-sm';
    return '';
  };

  const getProjectStyle = () => {
    // Let BentoGridItem handle the default glassmorphism style
    return '';
  };

  const ProjectHeader = ({ project }: { project: any }) => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center mb-4 group-hover:scale-[1.02] transition-transform duration-500">
      <div className="absolute top-0 right-0 z-10">
        <Badge
          variant={
            project.category === 'Professional' ? 'default' : 'secondary'
          }
          className="text-[10px] px-2.5 py-1 backdrop-blur-md bg-white/5 border border-white/5 text-slate-600 shadow-none font-medium"
        >
          {project.category}
        </Badge>
      </div>
      {project.category === 'Professional' ? (
        <Briefcase className="h-10 w-10 text-slate-300 group-hover:text-blue-500 transition-colors duration-500" />
      ) : (
        <Code className="h-10 w-10 text-slate-300 group-hover:text-emerald-500 transition-colors duration-500" />
      )}
    </div>
  );

  return (
    <div
      className="min-h-screen pt-32 pb-20 px-4 md:px-6 relative w-full"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="-ml-4 text-muted-foreground hover:text-foreground scale-90 origin-left rounded-full"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
          </motion.div>
          {category ? (
            <motion.div
            layoutId={category === 'Professional' ? 'projects-professional' : 'projects-personal'}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`rounded-[2.5rem] p-8 ${getGradientClass()} border border-white/5 relative overflow-hidden`}
          >
            <div className="relative z-10 flex flex-col justify-end h-full min-h-[10rem]">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100"
              >
                {title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-lg mt-2 font-medium max-w-xl"
              >
                {description}
              </motion.p>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 transform rotate-12 pointer-events-none mix-blend-overlay">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {category === 'Professional' ? (
                  <Briefcase className="h-80 w-80 text-primary" />
                ) : (
                  <Code className="h-80 w-80 text-emerald-500" />
                )}
              </motion.div>
            </div>
          </motion.div>
          ) : (
            <motion.div
              layoutId="projects-all"
              className="space-y-2 px-2"
            >
              <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100">{title}</h1>
              <p className="text-muted-foreground text-lg">{description}</p>
            </motion.div>
          )}
        </div>

        {proProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {!category && (
              <>
                <h2 className="text-2xl font-bold flex items-center gap-2 px-2">
                  <span className="bg-primary/10 text-primary p-1 rounded-md">
                    <Briefcase className="h-5 w-5" />
                  </span>{' '}
                  Professional Projects
                </h2>
                <Separator className="bg-slate-200/50 dark:bg-slate-700/50" />
              </>
            )}
            <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[20rem] gap-6">
              {proProjects.map((project) => (
                <BentoGridItem
                  key={project.slug}
                  title={project.title}
                  description={project.resume}
                  header={<ProjectHeader project={project} />}
                  icon={<Globe className="h-4 w-4 text-neutral-500" />}
                  className={`col-span-1 ${getProjectStyle()}`}
                  href={`/projects/${project.slug}`}
                />
              ))}
            </BentoGrid>
          </motion.div>
        )}

        {personalProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {!category && (
              <>
                <h2 className="text-2xl font-bold flex items-center gap-2 px-2">
                  <span className="bg-primary/10 text-primary p-1 rounded-md">
                    <Code className="h-5 w-5" />
                  </span>{' '}
                  Personal Projects
                </h2>
                <Separator className="bg-slate-200/50 dark:bg-slate-700/50" />
              </>
            )}
            <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[20rem] gap-6">
              {personalProjects.map((project) => (
                <BentoGridItem
                  key={project.slug}
                  title={project.title}
                  description={project.resume}
                  header={<ProjectHeader project={project} />}
                  icon={<Globe className="h-4 w-4 text-neutral-500" />}
                  className={`col-span-1 ${getProjectStyle()}`}
                  href={`/projects/${project.slug}`}
                />
              ))}
            </BentoGrid>
          </motion.div>
        )}
      </div>
    </div>
  );
}
