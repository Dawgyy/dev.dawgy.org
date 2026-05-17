import { useParams } from 'react-router-dom';
import { getContentBySlug } from '@/lib/content';
import { ArticleLayout } from '@/components/ArticleLayout';
import { useViewCounter } from '@/hooks/use-view-counter';
import NotFound from './NotFound';
import { CalendarDays, Eye } from 'lucide-react';

export default function BlogPost() {
  const { slug = '' } = useParams<{ slug: string }>();
  const views = useViewCounter(slug);
  const post = getContentBySlug('blog', slug);

  if (!post) {
    return (
      <NotFound
        title="Article not found"
        description="This blog post doesn't exist or has been removed."
      />
    );
  }

  return (
    <ArticleLayout
      eyebrow="Article"
      title={post.title ?? 'Untitled'}
      content={post.content}
      inlineMeta={
        <>
          {post.date && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              <time dateTime={post.date}>{post.date}</time>
            </span>
          )}
          {views !== null && (
            <span className="inline-flex items-center gap-1.5">
              <Eye className="size-4" />
              {views} {views === 1 ? 'view' : 'views'}
            </span>
          )}
        </>
      }
    />
  );
}
