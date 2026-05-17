import { motion } from 'framer-motion';
import { getAllContent } from '@/lib/content';
import { Shell, Label, SectionHead } from '@/components/primitives';
import { PageHeader } from '@/components/PageHeader';
import { useSeo } from '@/hooks/use-seo';
import { listVariants, rowVariants } from '@/lib/utils';

const skillGroups = [
  {
    label: 'Backend',
    items: ['.NET', '.NET Core', 'C#', 'Identity Framework', 'SQL', 'Swagger'],
  },
  {
    label: 'Frontend',
    items: ['React', 'TypeScript', 'TanStack', 'MSAL React', 'HTML5', 'CSS3'],
  },
  {
    label: 'Cloud / DevOps',
    items: [
      'Azure',
      'Azure DevOps',
      'Azure Functions',
      'Azure Key Vault',
      'Azure SQL Database',
      'Azure AD',
    ],
  },
  {
    label: 'Tooling',
    items: ['Git', 'Postman', 'UML', 'Azure Boards'],
  },
];

const facts = [
  ['Based in', 'Belgium'],
  ['Role', 'IT Consultant & Developer'],
  ['Company', 'Edda'],
  ['Languages', 'French · English'],
];

export default function About() {
  useSeo({
    title: 'About',
    path: '/about',
    description:
      'About Alex Gerard — IT Consultant & Developer based in Belgium, building internal business applications with .NET, React and Azure.',
  });

  const education = getAllContent('education');

  return (
    <Shell className="pb-8">
      <PageHeader
        eyebrow="Index / 04"
        title="About"
        description="A bit more on who I am, what I do, and what I'm after."
      />

      {/* Intro: photo + bio */}
      <motion.section
        variants={listVariants}
        initial="initial"
        animate="animate"
        className="mt-12 grid gap-8 md:grid-cols-12"
      >
        <motion.div
          variants={rowVariants}
          className="md:col-span-4 lg:col-span-3"
        >
          <div className="card relative overflow-hidden">
            <img
              src="/moi.jpeg"
              alt="Alex Gerard"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-bg/90 to-transparent p-3">
              <Label>Belgium</Label>
              <Label className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-accent" />
                Consultant @ Edda
              </Label>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={rowVariants}
          className="space-y-4 md:col-span-8 lg:col-span-9"
        >
          <p className="text-xl font-medium leading-relaxed tracking-tight">
            I'm Alex — an IT consultant and developer based in Belgium,
            currently building internal business applications at{' '}
            <span className="text-accent-gradient">Edda</span>.
          </p>
          <p className="leading-relaxed text-text-2">
            My day-to-day is full-stack work on tools that real teams depend on:
            document management, timesheets, leave requests, CV generation. I
            work mostly with .NET and React on top of Azure — from designing the
            data model to shipping the UI and wiring up authentication and CI.
          </p>
          <p className="leading-relaxed text-text-2">
            I care about software that is clear, maintainable and pleasant to
            use. I like turning fuzzy business needs into precise, well-built
            tools — and I enjoy the parts most people skip: naming things, tidy
            data flows, and a UI that doesn't fight the user.
          </p>
          <p className="leading-relaxed text-text-2">
            Outside of consulting, I tinker with side projects, write the
            occasional note, and maintain a Discord app used by 25k+ people.
          </p>
        </motion.div>
      </motion.section>

      {/* Facts strip */}
      <section className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-4">
        {facts.map(([k, v]) => (
          <div key={k} className="bg-surface p-4">
            <Label className="block">{k}</Label>
            <p className="mt-1.5 text-sm font-medium">{v}</p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mt-16">
        <SectionHead index="A" title="Skills & Tools" />
        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label} className="card p-5">
              <Label className="text-accent">{group.label}</Label>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-xs text-text-2"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      {education.length > 0 && (
        <section className="mt-16">
          <SectionHead index="B" title="Education" count={education.length} />
          <div className="space-y-2.5">
            {education.map((edu) => (
              <div key={edu.slug} className="card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold tracking-tight">
                    {edu.title}
                  </h3>
                  <span className="label nums">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-2">
                  {edu.school}
                  {edu.location ? ` · ${edu.location}` : ''}
                </p>
                {edu.resume && (
                  <p className="mt-2 text-sm leading-relaxed text-text-2">
                    {edu.resume}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-16">
        <div className="card flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Get in touch
            </h2>
            <p className="mt-1 text-sm text-text-2">
              Always happy to talk software, tooling, or an interesting idea.
            </p>
          </div>
          <a
            href="mailto:gerardalexpro@gmail.com"
            className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
          >
            gerardalexpro@gmail.com
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </section>
    </Shell>
  );
}
