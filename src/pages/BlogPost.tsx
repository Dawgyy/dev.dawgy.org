import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { getContentBySlug } from '@/lib/content';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

import { pageVariants, pageTransition } from '@/lib/utils';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) return <Navigate to="/blog" replace />;

  const post = getContentBySlug('blog', slug);

  if (!post) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold">Article not found</h1>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Back
        </Button>
      </div>
    );
  }

  return (
    <motion.article
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="container max-w-4xl mx-auto pt-32 pb-20 px-4 md:px-6 w-full min-h-screen"
      layoutId={`blog-${slug}`}
    >
      <div className="rounded-[2.5rem] p-8 md:p-12 bg-white/[0.02] backdrop-blur-[40px] border border-white/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]">
        <div className="space-y-6 mb-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="-ml-4 text-muted-foreground hover:text-foreground scale-90 origin-left rounded-full"
          >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
          </Button>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-slate-100 leading-tight">
            {post.title}
          </h1>
          {post.date && (
            <div className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400">
              <Calendar className="mr-2 h-4 w-4" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
          )}
        </div>

        <Separator className="my-8 bg-slate-200/50 dark:bg-slate-700/50" />

        <div className="prose prose-neutral dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-pre:rounded-[1.5rem] prose-pre:bg-slate-950/50 prose-img:rounded-[2rem]">
          <MarkdownRenderer content={post.content} />
        </div>
      </div>
    </motion.article>
  );
}
