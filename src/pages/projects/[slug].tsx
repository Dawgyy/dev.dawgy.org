import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import Breadcrumb from '@/components/Breadcrumb';

interface ProjectDetailProps {
  content: string;
  title: string;
  excerpt: string;
}

interface Params {
  params: {
    slug: string;
  };
}

export default function ProjectsDetail({
  content,
  title,
  excerpt,
}: ProjectDetailProps) {
  return (
    <div className="max-w-container mx-auto px-4 text-white">
      <Breadcrumb />
      <main className="py-6">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <p className="mb-4 text-gray-300">{excerpt}</p>
        <article className="prose prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const projectsDirectory = path.join(process.cwd(), 'src/content/projects');
  const filenames = fs.readdirSync(projectsDirectory);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: Params) {
  const filePath = path.join(
    process.cwd(),
    'src/content/projects',
    `${params.slug}.md`,
  );
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    props: {
      title: data.title,
      content,
    },
  };
}
