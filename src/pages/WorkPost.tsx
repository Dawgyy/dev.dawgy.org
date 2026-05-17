import { useParams } from 'react-router-dom';
import { getContentBySlug } from '@/lib/content';
import { ArticleLayout } from '@/components/ArticleLayout';
import NotFound from './NotFound';

export default function WorkPost() {
  const { slug = '' } = useParams<{ slug: string }>();
  const work = getContentBySlug('work', slug);

  if (!work) {
    return (
      <NotFound
        title="Experience not found"
        description="This experience does not exist or has been removed."
      />
    );
  }

  const employer = work.employer || work.company;
  const meta = [
    work.role && { label: 'Role', value: work.role },
    employer && { label: 'Employer', value: employer },
    work.client &&
      work.client !== employer && { label: 'Client', value: work.client },
    {
      label: 'Timeline',
      value: `${work.startDate || work.date} – ${work.endDate || 'Present'}`,
    },
    work.sector && { label: 'Sector', value: work.sector },
    work.projectSize && { label: 'Size', value: work.projectSize },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  return (
    <ArticleLayout
      index="01"
      kind="Work"
      title={work.title ?? 'Untitled'}
      description={work.resume}
      meta={meta}
      content={work.content}
    />
  );
}
