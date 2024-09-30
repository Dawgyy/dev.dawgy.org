import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '@/components/Breadcrumb';

interface BlogDetailProps {
  content: string;
  title: string;
  slug: string;
}

export default function BlogDetail({ content, title, slug }: BlogDetailProps) {
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        await fetch(`/api/view/${slug}`, { method: 'POST' });
        const response = await fetch(`/api/view/${slug}`);
        const data = await response.json();
        setViews(data.views);
      } catch (error) {
        console.error('Failed to fetch views', error);
      }
    };

    fetchViews();
  }, [slug]);

  return (
    <div className="max-w-container mx-auto px-4 text-white">
    <Breadcrumb />
      <main className="py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
        </div>
        <div className="mb-4">
          <FontAwesomeIcon icon={faEye} className="text-blue-300 text-opacity-60 w-5 h-5" />
          <span className="text-blue-300 text-opacity-60"> {views} vues</span>
        </div>
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
  const blogDirectory = path.join(process.cwd(), 'src/content/blog');
  const filenames = fs.readdirSync(blogDirectory);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'src/content/blog', `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    props: {
      title: data.title,
      content,
      slug: params.slug,
    },
  };
}
