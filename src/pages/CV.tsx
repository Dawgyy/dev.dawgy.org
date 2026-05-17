import { getAllContent } from '@/lib/content';
import { Shell, Label } from '@/components/primitives';
import { useSeo } from '@/hooks/use-seo';
import { Printer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const skillGroups: [string, string[]][] = [
  ['Backend', ['.NET', '.NET Core', 'C#', 'Identity Framework', 'SQL']],
  ['Frontend', ['React', 'TypeScript', 'TanStack', 'MSAL React', 'HTML5/CSS3']],
  [
    'Cloud / DevOps',
    ['Azure', 'Azure DevOps', 'Azure Functions', 'Key Vault', 'Azure AD'],
  ],
  ['Tooling', ['Git', 'Postman', 'UML', 'Swagger']],
];

const contact = [
  ['Email', 'gerardalexpro@gmail.com', 'mailto:gerardalexpro@gmail.com'],
  ['GitHub', 'github.com/Dawgyy', 'https://github.com/Dawgyy'],
  [
    'LinkedIn',
    'in/alex-gerard',
    'https://www.linkedin.com/in/alex-gerard-46b201295/',
  ],
  ['Site', 'dev.dawgy.org', 'https://dev.dawgy.org'],
];

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-4 first:border-t-0">{children}</div>
  );
}

export default function CV() {
  useSeo({
    title: 'CV',
    path: '/cv',
    description: 'Curriculum vitae of Alex Gerard — IT Consultant & Developer.',
  });

  const engagements = getAllContent('work');
  const education = getAllContent('education');

  return (
    <Shell className="print-page pb-8">
      {/* Toolbar — hidden when printing */}
      <div className="no-print flex items-center justify-between pt-16 md:pt-24">
        <Link
          to="/about"
          className="group inline-flex items-center gap-1.5 text-sm text-text-3 transition-colors hover:text-text"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="link-underline">Back</span>
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="group inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
        >
          <Printer className="size-4" />
          Print / Save as PDF
        </button>
      </div>

      {/* Header */}
      <header className="mt-10 print:mt-0">
        <h1 className="text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
          Alex Gerard
        </h1>
        <p className="mt-1.5 text-lg text-accent">
          IT Consultant &amp; Developer
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5">
          {contact.map(([k, v, href]) => (
            <a
              key={k}
              href={href}
              className="group text-sm text-text-2 transition-colors hover:text-text"
            >
              <span className="label mr-1.5">{k}</span>
              <span className="link-underline">{v}</span>
            </a>
          ))}
        </div>
      </header>

      {/* Summary */}
      <section className="mt-8">
        <Label className="text-accent">Profile</Label>
        <p className="mt-2 max-w-2xl leading-relaxed text-text-2">
          Belgium-based IT consultant and developer, building internal business
          applications at Edda International. Full-stack work with .NET, React
          and Azure — from data modelling to UI delivery, authentication and CI.
        </p>
      </section>

      {/* Experience */}
      <section className="mt-8">
        <Label className="text-accent">Experience</Label>
        <div className="mt-3">
          {engagements.map((job) => (
            <Row key={job.slug}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-base font-semibold tracking-tight">
                  {job.title}
                </h2>
                <span className="label nums">
                  {job.startDate} – {job.endDate || 'Present'}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-text-2">
                {job.role}
                {job.employer ? ` · ${job.employer}` : ''}
                {job.client && job.client !== job.employer
                  ? ` · Client: ${job.client}`
                  : ''}
              </p>
              {job.resume && (
                <p className="mt-1.5 text-sm leading-relaxed text-text-2">
                  {job.resume}
                </p>
              )}
            </Row>
          ))}
        </div>
      </section>

      {/* Education */}
      {education.length > 0 && (
        <section className="mt-8">
          <Label className="text-accent">Education</Label>
          <div className="mt-3">
            {education.map((edu) => (
              <Row key={edu.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="text-base font-semibold tracking-tight">
                    {edu.title}
                  </h2>
                  <span className="label nums">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-text-2">
                  {edu.school}
                  {edu.location ? ` · ${edu.location}` : ''}
                </p>
              </Row>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      <section className="mt-8">
        <Label className="text-accent">Skills</Label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {skillGroups.map(([group, items]) => (
            <div key={group}>
              <p className="text-sm font-semibold">{group}</p>
              <p className="mt-0.5 text-sm text-text-2">{items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className="mt-8">
        <Label className="text-accent">Languages</Label>
        <p className="mt-2 text-sm text-text-2">
          French (native) · English (professional)
        </p>
      </section>
    </Shell>
  );
}
