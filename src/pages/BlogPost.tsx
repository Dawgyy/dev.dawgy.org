import { useParams } from 'react-router-dom';
import { getContentBySlug } from '@/lib/content';
import { ArticleLayout } from '@/components/ArticleLayout';
import { useViewCounter } from '@/hooks/use-view-counter';
import { readingTime } from '@/lib/utils';
import NotFound from './NotFound';

export default function BlogPost() {
  const { slug = '' } = useParams<{ slug: string }>();
  const views = useViewCounter(slug);
  const post = getContentBySlug('blog', slug);

  if (!post) {
    return (
      <NotFound
        title="Article not found"
        description="This entry does not exist or has been removed."
      />
    );
  }

  const meta = [
    post.date && { label: 'Published', value: post.date },
    { label: 'Reading time', value: `${readingTime(post.content)} min` },
    views !== null && {
      label: 'Views',
      value: <span className="nums">{views}</span>,
    },
    { label: 'Section', value: 'Writing' },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  return (
    <ArticleLayout
      eyebrow="Writing / 02"
      title={post.title ?? 'Untitled'}
      description={post.resume}
      path={`/blog/${slug}`}
      meta={meta}
      content={post.content}
    />
  );
}
