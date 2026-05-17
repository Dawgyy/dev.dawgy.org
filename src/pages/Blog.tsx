import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllContent } from '@/lib/content';
import { Shell } from '@/components/primitives';
import { PageHeader } from '@/components/PageHeader';
import { listVariants, rowVariants } from '@/lib/utils';

export default function Blog() {
  const posts = getAllContent('blog');

  return (
    <Shell>
      <PageHeader
        index="02"
        title="Writing"
        description="Notes on development, tooling, and the craft of building software."
      />

      <motion.div
        variants={listVariants}
        initial="initial"
        animate="animate"
        className="pt-2"
      >
        {posts.map((post, i) => (
          <motion.div key={post.slug} variants={rowVariants}>
            <Link
              to={`/blog/${post.slug}`}
              className="group grid grid-cols-4 gap-x-5 border-b border-rule py-7 md:grid-cols-12 md:gap-x-6"
            >
              <span className="nums col-span-1 text-xs text-ink-faint group-hover:text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="col-span-3 md:col-span-8">
                <h2 className="link-underline inline text-2xl font-medium tracking-tight md:text-3xl">
                  {post.title}
                </h2>
                {post.resume && (
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
                    {post.resume}
                  </p>
                )}
              </div>
              <span className="label col-span-4 col-start-2 mt-3 md:col-span-3 md:col-start-10 md:mt-1 md:text-right">
                {post.date}
              </span>
            </Link>
          </motion.div>
        ))}

        {posts.length === 0 && (
          <p className="py-20 text-ink-soft">Nothing published yet.</p>
        )}
      </motion.div>
    </Shell>
  );
}
