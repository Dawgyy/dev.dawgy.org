import { useParams } from 'react-router-dom';
import { getContentBySlug } from '@/lib/content';
import { ArticleLayout } from '@/components/ArticleLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NotFound from './NotFound';
import { Github, Globe } from 'lucide-react';

export default function ProjectPost() {
  const { slug = '' } = useParams<{ slug: string }>();
  const project = getContentBySlug('projects', slug);

  if (!project) {
    return (
      <NotFound
        title="Project not found"
        description="This project doesn't exist or has been removed."
      />
    );
  }

  const meta = [
    project.client && { label: 'Client', value: project.client },
    project.employer && { label: 'Employer', value: project.employer },
    project.role && { label: 'Role', value: project.role },
    project.sector && { label: 'Sector', value: project.sector },
    project.startDate && {
      label: 'Timeline',
      value: `${project.startDate}${
        project.endDate ? ` — ${project.endDate}` : ''
      }`,
    },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  return (
    <ArticleLayout
      eyebrow={project.category ?? 'Project'}
      title={project.title ?? 'Untitled'}
      content={project.content}
      subtitle={
        project.tags?.length ? (
          <span className="flex flex-wrap gap-1.5">
            {project.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </span>
        ) : undefined
      }
      meta={meta}
      actions={
        <>
          {project.github && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4" /> View code
              </a>
            </Button>
          )}
          {project.demo && (
            <Button size="sm" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <Globe className="size-4" /> Live demo
              </a>
            </Button>
          )}
        </>
      }
    />
  );
}
