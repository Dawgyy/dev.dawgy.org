import { Calendar, FileText } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

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
    <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[20rem] gap-4">
      {blogPosts.map((post) => (
        <BentoGridItem
          key={post.slug}
          title={post.title}
          description={post.resume}
          header={
            <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center mb-4 group-hover:scale-[1.02] transition-transform duration-500 rounded-3xl bg-white/5 border border-transparent">
              <FileText className="h-10 w-10 text-slate-300 group-hover:text-blue-500 transition-colors duration-500" />
            </div>
          }
          icon={
            <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </div>
          }
          className="col-span-1"
          href={`/blog/${post.slug}`}
        />
      ))}
    </BentoGrid>
  );
}
