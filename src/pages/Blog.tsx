import { motion } from 'framer-motion';
import { getAllContent } from '@/lib/content';
import { Shell } from '@/components/primitives';
import { PageHeader } from '@/components/PageHeader';
import { EntryRow } from '@/components/EntryRow';
import { TagFilter } from '@/components/TagFilter';
import { useSeo } from '@/hooks/use-seo';
import { useTagFilter } from '@/hooks/use-tag-filter';
import { listVariants } from '@/lib/utils';

export default function Blog() {
  useSeo({
    title: 'Writing',
    path: '/blog',
    description:
      'Writing by Alex Gerard — notes on development, tooling, and the craft of building software.',
  });

  const posts = getAllContent('blog');
  const { tags, active, setActive, filtered } = useTagFilter(posts);

  return (
    <Shell className="pb-8">
      <PageHeader
        eyebrow="Index / 02"
        title="Writing"
        description="Notes on development, tooling, and the craft of building software."
      />

      <div className="mt-10">
        <TagFilter tags={tags} active={active} onChange={setActive} />

        <motion.div
          key={active ?? 'all'}
          variants={listVariants}
          initial="initial"
          animate="animate"
          className="space-y-2.5"
        >
          {filtered.map((post, i) => (
            <EntryRow
              key={post.slug}
              to={`/blog/${post.slug}`}
              index={String(i + 1).padStart(2, '0')}
              title={post.title ?? 'Untitled'}
              caption={post.resume}
              meta={post.date}
            />
          ))}

          {filtered.length === 0 && (
            <p className="py-20 text-text-2">
              {posts.length === 0
                ? 'Nothing published yet.'
                : 'No entries match this tag.'}
            </p>
          )}
        </motion.div>
      </div>
    </Shell>
  );
}
