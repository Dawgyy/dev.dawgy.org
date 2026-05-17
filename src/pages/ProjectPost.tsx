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
      index="01"
      kind={project.category === 'Personal' ? 'Personal' : 'Project'}
      title={project.title ?? 'Untitled'}
      description={project.resume}
      meta={meta}
      actions={
        <>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 border border-rule-strong px-3 py-1.5 text-sm font-medium"
            >
              <span className="link-underline">Repository</span>
              <span className="text-ink-faint">↗</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 bg-ink px-3 py-1.5 text-sm font-medium text-paper"
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
