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
        description="This experience doesn't exist or has been removed."
      />
    );
  }

  const employer = work.employer || work.company;
  const meta = [
    employer && { label: 'Employer', value: employer },
    work.client &&
      work.client !== employer && { label: 'Client', value: work.client },
    {
      label: 'Timeline',
      value: `${work.startDate || work.date} — ${work.endDate || 'Present'}`,
    },
    (work.projectSize || work.sector) && {
      label: work.projectSize ? 'Size' : 'Sector',
      value: work.projectSize || work.sector,
    },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  return (
    <ArticleLayout
      eyebrow="Experience"
      title={work.title ?? 'Untitled'}
      subtitle={work.role}
      meta={meta}
      content={work.content}
    />
  );
}
