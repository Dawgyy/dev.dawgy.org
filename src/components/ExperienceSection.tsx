import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

type ExperienceItem = {
  slug: string;
  title: string;
  date?: string;
  resume: string,
};

interface ExperienceSectionProps {
  title: string;
  items: ExperienceItem[];
}

export function ExperienceSection({ title, items }: ExperienceSectionProps) {
  return (
    <section>
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      {items.map((item, index) => (
        <div key={index} className="mb-2 text-xl font-bold">
          <Link href={`/work/${item.slug}`} className="text-lg">
            {item.title}
          </Link>
          <p className="m-0 text-blue-300 text-opacity-60">{item.date}</p>
           <ReactMarkdown className="m-0"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
            {item.resume}
          </ReactMarkdown>
        </div>
      ))}
    </section>
  );
}
