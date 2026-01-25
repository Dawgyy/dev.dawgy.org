import { useParams, Navigate, Link } from 'react-router-dom';
import { getContentBySlug } from '@/lib/content';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Building2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkPost() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/" replace />;

  const work = getContentBySlug('work', slug);

  if (!work) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold">Experience not found</h1>
        <Button asChild className="mt-4">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.article
      className="container max-w-3xl mx-auto py-10 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="-ml-4 text-muted-foreground hover:text-foreground"
        >
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>

        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {work.title}
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground">
          {work.company && (
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{work.company}</span>
            </div>
          )}
          {work.date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{work.date}</span>
            </div>
          )}
        </div>
      </div>

      <Separator className="my-8" />

      <MarkdownRenderer content={work.content} />
    </motion.article>
  );
}
