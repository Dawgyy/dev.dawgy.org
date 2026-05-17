import { motion } from 'framer-motion';
import { getAllContent, type ContentData } from '@/lib/content';
import { Shell, SectionHead } from '@/components/primitives';
import { PageHeader } from '@/components/PageHeader';
import { EntryRow } from '@/components/EntryRow';
import { useSeo } from '@/hooks/use-seo';
import { listVariants } from '@/lib/utils';

/** Projects without an explicit category are treated as professional. */
const isPersonal = (p: ContentData) => p.category === 'Personal';

function List({
  index,
  title,
  items,
}: {
  index: string;
  title: string;
  items: ContentData[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-14 first:mt-12">
      <SectionHead index={index} title={title} count={items.length} />
      <motion.div
        variants={listVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-60px' }}
        className="space-y-2.5"
      >
        {items.map((p, i) => (
          <EntryRow
            key={p.slug}
            to={`/projects/${p.slug}`}
            index={String(i + 1).padStart(2, '0')}
            title={p.title ?? 'Untitled'}
            caption={p.resume}
            meta={p.date}
            tags={p.tags}
          />
        ))}
      </motion.div>
    </section>
  );
}

export default function Projects({
  category,
}: {
  category?: 'Professional' | 'Personal';
}) {
  const all = getAllContent('projects');
  const professional = all.filter((p) => !isPersonal(p));
  const personal = all.filter(isPersonal);

  const head = {
    Professional: {
      eyebrow: 'Work / 01.A',
      title: 'Professional',
      description:
        'Internal business applications delivered at Edda and other engagements.',
    },
    Personal: {
      eyebrow: 'Work / 01.B',
      title: 'Personal',
      description: 'Side projects, school work, and experiments.',
    },
    All: {
      eyebrow: 'Index / 01',
      title: 'Work',
      description: 'A complete index of professional and personal projects.',
    },
  }[category ?? 'All'];

  useSeo({
    title: head.title === 'Work' ? 'Work' : `${head.title} Work`,
    path: category ? `/projects/${category.toLowerCase()}` : '/projects',
    description: head.description,
  });

  return (
    <Shell className="pb-8">
      <PageHeader
        eyebrow={head.eyebrow}
        title={head.title}
        description={head.description}
        back={Boolean(category)}
      />

      {category !== 'Personal' && (
        <List index="A" title="Professional" items={professional} />
      )}
      {category !== 'Professional' && (
        <List index="B" title="Personal" items={personal} />
      )}

      {all.length === 0 && (
        <p className="py-20 text-text-2">No projects yet.</p>
      )}
    </Shell>
  );
}
