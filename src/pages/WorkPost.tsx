import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { getContentBySlug } from '@/lib/content';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Building2, Calendar, Briefcase, User, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

import { pageVariants, pageTransition } from '@/lib/utils';

export default function WorkPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) return <Navigate to="/" replace />;

  const work = getContentBySlug('work', slug);

  if (!work) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold">Experience not found</h1>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Back
        </Button>
      </div>
    );
  }

  return (
    <motion.article
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="container max-w-4xl mx-auto pt-32 pb-20 px-4 md:px-6 w-full min-h-screen"
      layoutId={`work-${slug}`}
    >
      <div className="rounded-[2.5rem] p-8 md:p-12 bg-white/[0.02] backdrop-blur-[40px] border border-white/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]">
        <div className="space-y-6 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="-ml-4 text-muted-foreground hover:text-foreground scale-90 origin-left rounded-full"
          >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
          </Button>

          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-slate-800 dark:text-slate-100">
              {work.title}
            </h1>
            {work.role && (
              <div className="text-xl text-primary/90 font-medium flex items-center gap-2">
                <User className="h-5 w-5" />
                {work.role}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-muted-foreground bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-wider text-muted-foreground/60 font-bold flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" /> Employer
            </span>
            <div className="text-foreground font-medium pl-5">
              {work.employer || work.company}
            </div>
          </div>
          
          {(work.client && work.client !== (work.employer || work.company)) && (
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-muted-foreground/60 font-bold flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" /> Client
              </span>
              <div className="text-foreground font-medium pl-5">
                {work.client}
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-wider text-muted-foreground/60 font-bold flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> Timeline
            </span>
            <div className="text-foreground font-medium pl-5">
              {work.startDate || work.date} - {work.endDate || 'Present'}
            </div>
          </div>

          {(work.projectSize || work.sector) && (
             <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-muted-foreground/60 font-bold flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" /> {work.projectSize ? 'Size' : 'Sector'}
              </span>
              <div className="text-foreground font-medium pl-5">
                {work.projectSize || work.sector}
              </div>
            </div>
          )}
        </div>
      </div>

      <Separator className="my-8" />

      <MarkdownRenderer content={work.content} />
    </motion.article>
  );
}
