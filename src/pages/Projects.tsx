import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllContent, type ContentData } from '@/lib/content';
import { Shell, Grid, Rule, SectionHead } from '@/components/primitives';
import { PageHeader } from '@/components/PageHeader';
import { listVariants, rowVariants } from '@/lib/utils';

/** Projects without an explicit category are treated as professional. */
const isPersonal = (p: ContentData) => p.category === 'Personal';

function ProjectRow({
  project,
  index,
}: {
  project: ContentData;
  index: string;
}) {
  return (
    <motion.div variants={rowVariants}>
      <Link
        to={`/projects/${project.slug}`}
        className="group grid grid-cols-4 items-baseline gap-x-5 border-b border-rule py-5 md:grid-cols-12 md:gap-x-6"
      >
        <span className="nums col-span-1 text-xs text-ink-faint group-hover:text-accent">
          {index}
        </span>
        <span className="col-span-3 md:col-span-5">
          <span className="link-underline text-lg font-medium tracking-tight md:text-xl">
            {project.title}
          </span>
        </span>
        {project.resume && (
          <span className="col-span-3 col-start-2 mt-1 text-sm leading-relaxed text-ink-soft md:col-span-5 md:col-start-7 md:mt-0">
            {project.resume}
          </span>
        )}
        <span className="label col-span-1 col-start-4 mt-1 text-right md:col-start-12 md:mt-0">
          {project.date}
        </span>
      </Link>
    </motion.div>
  );
}

function ProjectList({
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
    <section className="pt-14 first:pt-12">
      <SectionHead index={index} title={title} aside={`${items.length}`} />
      <Rule weight="heavy" />
      <motion.div variants={listVariants} initial="initial" animate="animate">
        {items.map((p, i) => (
          <ProjectRow
            key={p.slug}
            project={p}
            index={String(i + 1).padStart(2, '0')}
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

  const meta = {
    Professional: {
      index: '01.A',
      title: 'Professional',
      description:
        'Internal business applications delivered at Edda and other engagements.',
    },
    Personal: {
      index: '01.B',
      title: 'Personal',
      description: 'Side projects, school work, and experiments.',
    },
    All: {
      index: '01',
      title: 'Work',
      description: 'A complete index of professional and personal projects.',
    },
  }[category ?? 'All'];

  return (
    <Shell>
      <PageHeader
        index={meta.index}
        title={meta.title}
        description={meta.description}
        back={Boolean(category)}
      />

      {category !== 'Personal' && (
        <ProjectList index="A" title="Professional" items={professional} />
      )}
      {category !== 'Professional' && (
        <ProjectList index="B" title="Personal" items={personal} />
      )}

      {all.length === 0 && (
        <Grid className="py-20">
          <p className="col-span-4 text-ink-soft md:col-span-12">
            No projects yet.
          </p>
        </Grid>
      )}
    </Shell>
  );
}
