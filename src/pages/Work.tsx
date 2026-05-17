import { motion } from 'framer-motion';
import { getAllContent } from '@/lib/content';
import { Shell, SectionHead } from '@/components/primitives';
import { PageHeader } from '@/components/PageHeader';
import { EntryRow } from '@/components/EntryRow';
import { useSeo } from '@/hooks/use-seo';
import { listVariants } from '@/lib/utils';

/**
 * Unified Work page.
 * - "Professional engagements" → client work at Edda (content/work/*).
 * - "Personal projects" → personal/side projects (content/projects, Personal).
 * Professional entries under content/projects duplicate work/* and are
 * intentionally not surfaced here.
 */
export default function Work() {
  useSeo({
    title: 'Work',
    path: '/work',
    description:
      'Selected work by Alex Gerard — client engagements at Edda International and personal projects.',
  });

  const engagements = getAllContent('work');
  const personal = getAllContent('projects').filter(
    (p) => p.category === 'Personal',
  );

  return (
    <Shell className="pb-8">
      <PageHeader
        eyebrow="Index / 01"
        title="Work"
        description="Client engagements at Edda International, and the side projects I build on my own time."
      />

      {/* Professional engagements */}
      <section className="mt-12">
        <SectionHead
          index="A"
          title="Professional Engagements"
          count={engagements.length}
        />
        <motion.div
          variants={listVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-2.5"
        >
          {engagements.map((item, i) => (
            <EntryRow
              key={item.slug}
              to={`/work/${item.slug}`}
              index={String(i + 1).padStart(2, '0')}
              title={item.title ?? 'Untitled'}
              caption={item.client || item.employer || item.resume}
              meta={
                item.startDate
                  ? `${item.startDate}–${
                      item.endDate === 'Present' ? 'now' : item.endDate || ''
                    }`
                  : undefined
              }
            />
          ))}
        </motion.div>
      </section>

      {/* Personal projects */}
      {personal.length > 0 && (
        <section className="mt-14">
          <SectionHead
            index="B"
            title="Personal Projects"
            count={personal.length}
          />
          <motion.div
            variants={listVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-2.5"
          >
            {personal.map((p, i) => (
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
      )}
    </Shell>
  );
}
