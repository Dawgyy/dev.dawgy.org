import { useParams, Navigate, Link } from 'react-router-dom';
import { getContentBySlug } from '@/lib/content';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Github, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectPost() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/" replace />;

  const project = getContentBySlug('projects', slug);

  if (!project) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Button asChild className="mt-4">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.article
      className="container max-w-3xl mx-auto py-10 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-4 mb-8">
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

        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {project.title}
        </h1>

        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm border-y border-border/40 py-4">
          {project.client && (
            <div className="flex flex-col">
              <span className="text-muted-foreground font-medium">Client</span>
              <span>{project.client}</span>
            </div>
          )}
          {project.employer && (
            <div className="flex flex-col">
              <span className="text-muted-foreground font-medium">
                Employer
              </span>
              <span>{project.employer}</span>
            </div>
          )}
          {project.role && (
            <div className="flex flex-col">
              <span className="text-muted-foreground font-medium">Role</span>
              <span>{project.role}</span>
            </div>
          )}
          {project.sector && (
            <div className="flex flex-col">
              <span className="text-muted-foreground font-medium">Sector</span>
              <span>{project.sector}</span>
            </div>
          )}
          {project.projectSize && (
            <div className="flex flex-col">
              <span className="text-muted-foreground font-medium">
                Project Size
              </span>
              <span>{project.projectSize}</span>
            </div>
          )}
          {project.startDate && (
            <div className="flex flex-col">
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
