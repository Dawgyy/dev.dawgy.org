import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/** Code block with a copy-to-clipboard affordance. */
function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);

  const copy = (e: React.MouseEvent<HTMLButtonElement>) => {
    const code = e.currentTarget
      .closest('.code-block')
      ?.querySelector('code')?.textContent;
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <div className="code-block group relative my-6">
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-lg bg-white/10 text-white/70 opacity-0 backdrop-blur transition-all hover:bg-white/20 hover:text-white group-hover:opacity-100"
      >
        {copied ? (
          <Check className="size-4 text-emerald-400" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
      <pre
        className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] p-4 text-sm leading-relaxed"
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
}: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        'prose prose-neutral max-w-none dark:prose-invert',
        'prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight',
        'prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl',
        'prose-a:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:font-medium prose-code:before:content-[""] prose-code:after:content-[""]',
        'prose-pre:bg-transparent prose-pre:p-0',
        'prose-blockquote:border-l-primary prose-blockquote:not-italic prose-blockquote:text-muted-foreground',
        'prose-img:rounded-2xl prose-img:border prose-img:border-border',
        'prose-hr:border-border',
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
