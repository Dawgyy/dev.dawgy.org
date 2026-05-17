import { useParams } from 'react-router-dom';
import { getContentBySlug } from '@/lib/content';
import { ArticleLayout } from '@/components/ArticleLayout';
import NotFound from './NotFound';

export default function ProjectPost() {
  const { slug = '' } = useParams<{ slug: string }>();
  const project = getContentBySlug('projects', slug);

  if (!project) {
    return (
      <NotFound
        title="Project not found"
        description="This project does not exist or has been removed."
      />
    );
  }

  const meta = [
    project.client && { label: 'Client', value: project.client },
    project.employer && { label: 'Employer', value: project.employer },
    project.role && { label: 'Role', value: project.role },
    project.sector && { label: 'Sector', value: project.sector },
    project.date && { label: 'Date', value: project.date },
    (project.startDate || project.endDate) && {
      label: 'Timeline',
      value: `${project.startDate ?? ''}${
        project.endDate ? ` – ${project.endDate}` : ''
      }`,
    },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  return (
    <ArticleLayout
      eyebrow={project.category === 'Personal' ? 'Personal / 03' : 'Work / 01'}
      title={project.title ?? 'Untitled'}
      description={project.resume}
      path={`/projects/${slug}`}
      meta={meta}
      actions={
        <>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-3.5 py-2 text-sm font-medium transition-colors hover:border-accent"
            >
              <span className="link-underline">Repository</span>
              <span className="text-text-3 group-hover:text-accent">↗</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
            >
              Live demo <span aria-hidden>↗</span>
            </a>
          )}
        </>
      }
      content={project.content}
    />
  );
}
