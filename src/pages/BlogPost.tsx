import { useParams, Navigate, Link } from 'react-router-dom';
import { getContentBySlug } from '@/lib/content';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/blog" replace />;

  const post = getContentBySlug('blog', slug);

  if (!post) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold">Article not found</h1>
        <Button asChild className="mt-4">
          <Link to="/blog">Back to blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="container max-w-3xl mx-auto py-10 px-4">
      <div className="space-y-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="-ml-4 text-muted-foreground hover:text-foreground"
        >
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blog
          </Link>
        </Button>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {post.title}
        </h1>
        {post.date && (
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <time dateTime={post.date}>{post.date}</time>
          </div>
        )}
      </div>

      <Separator className="my-8" />

      <MarkdownRenderer content={post.content} />
    </article>
  );
}
