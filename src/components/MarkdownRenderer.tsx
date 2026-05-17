import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { Check, Copy } from 'lucide-react';
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
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="code-block group relative my-6 overflow-hidden rounded-xl border border-line">
      <div className="flex items-center justify-between border-b border-line bg-surface-2 px-3 py-1.5">
        <span className="label">Source</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className={cn(
            'inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors',
            copied ? 'text-accent' : 'text-text-3 hover:text-text',
          )}
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre
        className="overflow-x-auto bg-bg-2 p-4 text-sm leading-relaxed"
        {...props}
      >
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
        'prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-text',
        'prose-h1:text-2xl prose-h2:text-xl prose-h2:mt-12 prose-h2:pb-2 prose-h2:border-b prose-h2:border-line',
        'prose-h3:text-base prose-h3:uppercase prose-h3:tracking-wide prose-h3:text-text-2',
        'prose-p:text-text-2 prose-p:leading-relaxed prose-li:text-text-2',
        'prose-strong:text-text prose-strong:font-semibold',
        'prose-a:text-text prose-a:font-medium prose-a:underline prose-a:decoration-accent prose-a:underline-offset-[3px] hover:prose-a:text-accent',
        'prose-code:font-mono prose-code:text-[0.85em] prose-code:text-text prose-code:bg-surface-2 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:before:content-[""] prose-code:after:content-[""]',
        'prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0',
        'prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:not-italic prose-blockquote:text-text-2 prose-blockquote:font-normal',
        'prose-img:rounded-xl prose-img:border prose-img:border-line',
        'prose-hr:border-line',
        'prose-li:marker:text-text-3',
        'prose-th:text-text prose-td:text-text-2',
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
