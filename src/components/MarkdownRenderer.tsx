import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css'; // or any other style

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content text-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-medium mt-4 mb-2" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
          ),
          li: ({ node, ...props }) => <li className="leading-7" {...props} />,
          a: ({ node, ...props }) => (
            <a
              className="font-medium text-primary underline underline-offset-4"
              {...props}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
          ),
          code: ({ node, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !className?.includes('language-');
            return isInline ? (
              <code
                className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ node, ...props }) => (
            <pre
              className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4 px-4 text-white"
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <img
              className="rounded-md border my-4"
              {...props}
              alt={props.alt || ''}
            />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-muted" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full" {...props} />
            </div>
          ),
          tr: ({ node, ...props }) => (
            <tr className="m-0 border-t p-0 even:bg-muted" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th
              className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
