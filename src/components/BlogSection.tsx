import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

type BlogPost = {
  slug: string;
  title: string;
  date?: string;
  resume: string;
};

interface BlogSectionProps {
  blogPosts: BlogPost[];
}

export function BlogSection({ blogPosts }: BlogSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Blog</h3>
        <Link
          to="/blog"
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
        >
          See all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block group"
          >
            <Card className="transition-colors hover:bg-muted/50 border-none shadow-none bg-transparent p-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h4 className="text-lg font-medium group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {post.date}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
