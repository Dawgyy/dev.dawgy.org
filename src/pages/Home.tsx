import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllContent } from '@/lib/content';
import { Shell, Grid, Rule, Label, SectionHead } from '@/components/primitives';
import { listVariants, rowVariants } from '@/lib/utils';

/* ---- Index row: a single line item with index / title / meta ---- */
function IndexRow({
  to,
  index,
  title,
  meta,
  caption,
}: {
  to: string;
  index: string;
  title: string;
  meta?: string;
  caption?: string;
}) {
  return (
    <motion.div variants={rowVariants}>
      <Link
        to={to}
        className="group grid grid-cols-4 items-baseline gap-x-5 border-b border-rule py-4 md:grid-cols-12 md:gap-x-6"
      >
        <span className="nums col-span-1 text-xs text-ink-faint group-hover:text-accent">
          {index}
        </span>
        <span className="col-span-3 md:col-span-5">
          <span className="link-underline text-lg font-medium tracking-tight md:text-xl">
            {title}
          </span>
        </span>
        {caption && (
          <span className="col-span-3 col-start-2 mt-1 text-sm text-ink-soft md:col-span-4 md:col-start-7 md:mt-0">
            {caption}
          </span>
        )}
        <span className="label col-span-1 col-start-4 mt-1 text-right md:col-start-12 md:mt-0">
          {meta}
        </span>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const work = getAllContent('work');
  const writing = getAllContent('blog');
  const projects = getAllContent('projects');
  const personal = projects.filter((p) => p.category === 'Personal');

  return (
    <Shell>
      {/* ============ Masthead ============ */}
      <section className="pt-14 md:pt-20">
        <Grid>
          <div className="col-span-4 md:col-span-12">
            <Label>Alex Gerard — Portfolio — Belgium</Label>
          </div>
        </Grid>

        <Grid className="mt-4 items-end">
          <h1 className="col-span-4 text-[15vw] font-semibold leading-[0.92] tracking-[-0.04em] md:col-span-9 md:text-[8.5rem]">
            IT Consultant
            <br />
            <span className="text-ink-faint">&amp; Developer</span>
          </h1>
          <p className="col-span-4 mt-6 self-end text-sm leading-relaxed text-ink-soft md:col-span-3 md:mt-0">
            I build internal business applications and tools — currently at
            Edda, working with .NET, React and Azure. This site is a working
            index of what I do.
          </p>
        </Grid>

        <Rule weight="heavy" className="mt-10" />

        {/* facts strip */}
        <Grid className="py-4">
          {[
            ['Status', 'Available'],
            ['Based in', 'Belgium'],
            ['Focus', '.NET · React · Azure'],
            ['Languages', 'FR · EN'],
          ].map(([k, v]) => (
            <div key={k} className="col-span-2 md:col-span-3">
              <Label className="block">{k}</Label>
              <p className="mt-1.5 text-sm font-medium">{v}</p>
            </div>
          ))}
        </Grid>
        <Rule />
      </section>

      {/* ============ Work ============ */}
      <section className="pt-14">
        <SectionHead
          index="01"
          title="Selected Work"
          aside={`${work.length} entries`}
        />
        <Rule weight="heavy" />
        <motion.div variants={listVariants} initial="initial" animate="animate">
          {work.map((item, i) => (
            <IndexRow
              key={item.slug}
              to={`/work/${item.slug}`}
              index={String(i + 1).padStart(2, '0')}
              title={item.title ?? 'Untitled'}
              caption={item.client || item.employer}
              meta={`${item.startDate}–${item.endDate === 'Present' ? 'now' : item.endDate || ''}`}
            />
          ))}
        </motion.div>
      </section>

      {/* ============ Writing ============ */}
      <section className="pt-14">
        <SectionHead
          index="02"
          title="Writing"
          aside={`${writing.length} entries`}
        />
        <Rule weight="heavy" />
        <motion.div variants={listVariants} initial="initial" animate="animate">
          {writing.map((post, i) => (
            <IndexRow
              key={post.slug}
              to={`/blog/${post.slug}`}
              index={String(i + 1).padStart(2, '0')}
              title={post.title ?? 'Untitled'}
              caption={post.resume}
              meta={post.date}
            />
          ))}
        </motion.div>
      </section>

      {/* ============ Personal ============ */}
      {personal.length > 0 && (
        <section className="pt-14">
          <SectionHead
            index="03"
            title="Personal"
            aside={`${personal.length} entries`}
          />
          <Rule weight="heavy" />
          <motion.div
            variants={listVariants}
            initial="initial"
            animate="animate"
          >
            {personal.map((p, i) => (
              <IndexRow
                key={p.slug}
                to={`/projects/${p.slug}`}
                index={String(i + 1).padStart(2, '0')}
                title={p.title ?? 'Untitled'}
                caption={p.resume}
                meta={p.date}
              />
            ))}
          </motion.div>
        </section>
      )}
    </Shell>
  );
}
