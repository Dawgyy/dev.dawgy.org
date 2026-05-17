import { motion } from 'framer-motion';
import { getAllContent } from '@/lib/content';
import { Shell } from '@/components/primitives';
import { PageHeader } from '@/components/PageHeader';
import { EntryRow } from '@/components/EntryRow';
import { useSeo } from '@/hooks/use-seo';
import { listVariants } from '@/lib/utils';

export default function Blog() {
  useSeo({
    title: 'Writing',
    path: '/blog',
    description:
      'Writing by Alex Gerard — notes on development, tooling, and the craft of building software.',
  });

  const posts = getAllContent('blog');

  return (
    <Shell className="pb-8">
      <PageHeader
        eyebrow="Index / 02"
        title="Writing"
        description="Notes on development, tooling, and the craft of building software."
      />

      <motion.div
        variants={listVariants}
        initial="initial"
        animate="animate"
        className="mt-10 space-y-2.5"
      >
        {posts.map((post, i) => (
          <EntryRow
            key={post.slug}
            to={`/blog/${post.slug}`}
            index={String(i + 1).padStart(2, '0')}
            title={post.title ?? 'Untitled'}
            caption={post.resume}
            meta={post.date}
          />
        ))}

        {posts.length === 0 && (
          <p className="py-20 text-text-2">Nothing published yet.</p>
        )}
      </motion.div>
    </Shell>
  );
}
