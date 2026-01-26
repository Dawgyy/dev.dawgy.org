import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { getContentBySlug } from '@/lib/content';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Github, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

import { pageVariants, pageTransition } from '@/lib/utils';

export default function ProjectPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) return <Navigate to="/" replace />;

  const project = getContentBySlug('projects', slug);

  if (!project) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Back to previous page
        </Button>
      </div>
    );
  }

  return (
    <motion.article
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="container max-w-4xl mx-auto pt-32 pb-20 px-4 md:px-6 w-full min-h-screen"
      layoutId={`project-${slug}`}
    >
      <div className="rounded-[2.5rem] p-8 md:p-12 bg-white/[0.02] backdrop-blur-[40px] border border-white/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]">
        <div className="space-y-6 mb-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="-ml-4 text-muted-foreground hover:text-foreground scale-90 origin-left rounded-full"
          >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
          </Button>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-slate-100 leading-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="bg-white/5 border-transparent text-slate-600 dark:text-slate-300 hover:bg-white/10 transition-colors">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-sm border-y border-slate-200/50 dark:border-white/5 py-6">
            {project.client && (
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground font-medium text-xs uppercase tracking-wider">Client</span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">{project.client}</span>
              </div>
            )}
            {project.employer && (
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground font-medium text-xs uppercase tracking-wider">
                  Employer
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">{project.employer}</span>
              </div>
            )}
            {project.role && (
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground font-medium text-xs uppercase tracking-wider">Role</span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">{project.role}</span>
              </div>
            )}
            {project.sector && (
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground font-medium text-xs uppercase tracking-wider">Sector</span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">{project.sector}</span>
              </div>
            )}
            {project.projectSize && (
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground font-medium text-xs uppercase tracking-wider">
                  Project Size
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">{project.projectSize}</span>
              </div>
            )}
            {project.startDate && (
              <div className="flex flex-col gap-1">
              <span className="text-muted-foreground font-medium">Date</span>
              <span>
                {project.startDate}
                {project.endDate ? ` - ${project.endDate}` : ''}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          {project.github && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" /> Code
              </a>
            </Button>
          )}
          {project.demo && (
            <Button size="sm" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" /> Demo
              </a>
            </Button>
          )}
        </div>
      </div>

      <Separator className="my-8" />

      <MarkdownRenderer content={project.content} />
    </motion.article>
  );
}
