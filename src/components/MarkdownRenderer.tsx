import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { cn } from '@/lib/utils';
import './markdown-code.css';

function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);

  const copy = (e: React.MouseEvent<HTMLButtonElement>) => {
    const code = e.currentTarget
      .closest('.code-block')
      ?.querySelector('code')?.textContent;
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="code-block group relative my-6 border border-rule">
      <div className="flex items-center justify-between border-b border-rule bg-field px-3 py-1.5">
        <span className="label">Source</span>
        <button
          type="button"
          onClick={copy}
          className="label transition-colors hover:text-ink"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed" {...props}>
        {children}
      </pre>
    </div>
  );
}

export function MarkdownRenderer({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'prose max-w-none',
        // typography tuned to the swiss system
        'prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-ink',
        'prose-h1:text-2xl prose-h2:text-xl prose-h2:mt-12 prose-h2:pb-2 prose-h2:border-b prose-h2:border-rule',
        'prose-h3:text-base prose-h3:uppercase prose-h3:tracking-wide prose-h3:text-ink-soft',
        'prose-p:text-ink-soft prose-p:leading-relaxed prose-li:text-ink-soft',
        'prose-strong:text-ink prose-strong:font-semibold',
        'prose-a:text-ink prose-a:font-medium prose-a:underline prose-a:decoration-accent prose-a:underline-offset-[3px] hover:prose-a:text-accent',
        'prose-code:font-mono prose-code:text-[0.85em] prose-code:text-ink prose-code:bg-field prose-code:px-1 prose-code:py-0.5 prose-code:before:content-[""] prose-code:after:content-[""]',
        'prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0',
        'prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:not-italic prose-blockquote:text-ink-soft prose-blockquote:font-normal',
        'prose-img:border prose-img:border-rule',
        'prose-hr:border-rule',
        'prose-li:marker:text-ink-faint',
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{ pre: Pre }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
