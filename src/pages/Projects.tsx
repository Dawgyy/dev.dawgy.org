import { Link } from 'react-router-dom';
import { getAllContent, type ContentData } from '@/lib/content';
import { PageHeader } from '@/components/PageHeader';
import { Badge } from '@/components/ui/badge';
import { containerVariants, itemVariants } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Briefcase, Code2, ArrowUpRight } from 'lucide-react';

function ProjectCard({ project }: { project: ContentData }) {
  const isPro = project.category === 'Professional';
  return (
    <motion.div variants={itemVariants}>
      <Link
        to={`/projects/${project.slug}`}
        className="group flex h-full flex-col gap-4 rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5"
      >
        <div className="flex items-start justify-between">
          <div
            className={`grid size-12 place-items-center rounded-2xl ${
              isPro
                ? 'bg-primary/10 text-primary'
                : 'bg-emerald-500/10 text-emerald-500'
            }`}
          >
            {isPro ? (
              <Briefcase className="size-6" />
            ) : (
              <Code2 className="size-6" />
            )}
          </div>
          <ArrowUpRight className="size-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </div>

        <div className="flex-1 space-y-1.5">
          <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          {project.resume && (
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {project.resume}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant={isPro ? 'soft' : 'success'}>{project.category}</Badge>
          {project.tags?.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}

function ProjectSection({
  title,
  icon,
  projects,
}: {
  title: string;
  icon: React.ReactNode;
  projects: ContentData[];
}) {
  if (projects.length === 0) return null;
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-accent text-primary">
          {icon}
        </span>
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-sm text-muted-foreground">
          ({projects.length})
        </span>
      </div>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </motion.div>
    </section>
  );
}

export default function Projects({
  category,
}: {
  category?: 'Professional' | 'Personal';
}) {
  const all = getAllContent('projects');
  const pro = all.filter((p) => p.category === 'Professional');
  const personal = all.filter((p) => p.category === 'Personal');

  const header = category
    ? category === 'Professional'
      ? {
          title: 'Professional Work',
          description:
            'My work at Edda International and other professional engagements.',
        }
      : {
          title: 'Personal Projects',
          description:
            'Side projects, experiments, and open source contributions.',
        }
    : {
        title: 'Projects',
        description: 'A collection of my professional and personal work.',
      };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 pb-12 pt-28 md:px-6 md:pt-32">
      <PageHeader
        eyebrow="Portfolio"
        title={header.title}
        description={header.description}
        back={Boolean(category)}
      />

      {(!category || category === 'Professional') && (
        <ProjectSection
          title="Professional"
          icon={<Briefcase className="size-4" />}
          projects={pro}
        />
      )}
      {(!category || category === 'Personal') && (
        <ProjectSection
          title="Personal"
          icon={<Code2 className="size-4" />}
          projects={personal}
        />
      )}
    </div>
  );
}
