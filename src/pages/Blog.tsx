import { Link } from 'react-router-dom';
import { getAllContent } from '@/lib/content';
import { PageHeader } from '@/components/PageHeader';
import { containerVariants, itemVariants } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays } from 'lucide-react';

export default function Blog() {
  const posts = getAllContent('blog');

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10 px-4 pb-12 pt-28 md:px-6 md:pt-32">
      <PageHeader
        eyebrow="Writing"
        title="Blog"
        description="Thoughts on development, tooling, and the craft of building software."
      />

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="space-y-3"
      >
        {posts.map((post) => (
          <motion.div key={post.slug} variants={itemVariants}>
            <Link
              to={`/blog/${post.slug}`}
              className="group flex flex-col gap-2 rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center justify-between gap-3">
                {post.date && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    {post.date}
                  </span>
                )}
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                {post.title}
              </h2>
              {post.resume && (
                <p className="line-clamp-2 leading-relaxed text-muted-foreground">
                  {post.resume}
                </p>
              )}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
