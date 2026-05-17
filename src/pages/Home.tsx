import { motion } from 'framer-motion';
import { getAllContent } from '@/lib/content';
import { Shell, Label, SectionHead } from '@/components/primitives';
import { EntryRow } from '@/components/EntryRow';
import { useSeo } from '@/hooks/use-seo';
import { listVariants, rowVariants } from '@/lib/utils';

const stack = ['.NET', 'C#', 'React', 'TypeScript', 'Azure', 'SQL', 'TanStack'];

const socials = [
  { label: 'GitHub', href: 'https://github.com/Dawgyy' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alex-gerard-46b201295/',
  },
  { label: 'X', href: 'https://x.com/dxwgyy' },
];

function IndexSection({
  index,
  title,
  items,
  hrefBase,
}: {
  index: string;
  title: string;
  hrefBase: string;
  items: ReturnType<typeof getAllContent>;
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-16">
      <SectionHead index={index} title={title} count={items.length} />
      <motion.div
        variants={listVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        className="space-y-2.5"
      >
        {items.map((item, i) => (
          <EntryRow
            key={item.slug}
            to={`${hrefBase}/${item.slug}`}
            index={String(i + 1).padStart(2, '0')}
            title={item.title ?? 'Untitled'}
            caption={item.client || item.employer || item.resume}
            meta={
              item.endDate
                ? `${item.startDate}–${item.endDate === 'Present' ? 'now' : item.endDate}`
                : item.date
            }
          />
        ))}
      </motion.div>
    </section>
  );
}

export default function Home() {
  useSeo({ path: '/' });

  const work = getAllContent('work');
  const writing = getAllContent('blog');
  const projects = getAllContent('projects');
  const personal = projects.filter((p) => p.category === 'Personal');

  return (
    <Shell className="pb-8 pt-16 md:pt-24">
      {/* ============ Hero ============ */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={listVariants}
      >
        <motion.div variants={rowVariants}>
          <Label className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent" />
            Consultant @ Edda — Belgium
          </Label>
        </motion.div>

        <motion.h1
          variants={rowVariants}
          className="mt-6 text-[clamp(2.75rem,9vw,5.5rem)] font-semibold leading-[1.0] tracking-[-0.04em]"
        >
          Alex Gerard
          <span className="ml-1 text-accent">.</span>
          <br />
          <span className="text-accent-gradient">IT Consultant</span>{' '}
          <span className="text-text-3">&amp;</span>{' '}
          <span className="text-text-2">Developer</span>
        </motion.h1>

        <motion.p
          variants={rowVariants}
          className="mt-6 max-w-xl text-base leading-relaxed text-text-2 sm:text-lg"
        >
          I build internal business applications and tools — currently at{' '}
          <span className="text-text">Edda</span>, working across .NET, React
          and Azure. This site is a living index of what I do.
        </motion.p>

        {/* stack + socials strip */}
        <motion.div
          variants={rowVariants}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <div className="flex flex-wrap gap-1.5">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-xs text-text-2"
              >
                {s}
              </span>
            ))}
          </div>
          <span className="hidden h-4 w-px bg-line sm:block" />
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-sm text-text-2 transition-colors hover:text-text"
              >
                <span className="link-underline">{s.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* stat strip */}
        <motion.dl
          variants={rowVariants}
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-4"
        >
          {[
            ['Based in', 'Belgium'],
            ['Engagements', String(work.length)],
            ['Projects', String(projects.length)],
            ['Writing', String(writing.length)],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface px-4 py-3.5">
              <dt className="label">{k}</dt>
              <dd className="nums mt-1 text-lg font-semibold tracking-tight">
                {v}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.section>

      {/* ============ Index ============ */}
      <IndexSection
        index="01"
        title="Selected Work"
        items={work}
        hrefBase="/work"
      />
      <IndexSection
        index="02"
        title="Writing"
        items={writing}
        hrefBase="/blog"
      />
      <IndexSection
        index="03"
        title="Personal Projects"
        items={personal}
        hrefBase="/projects"
      />
    </Shell>
  );
}
