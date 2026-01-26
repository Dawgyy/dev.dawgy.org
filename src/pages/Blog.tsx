import { getAllContent } from '@/lib/content';
import { BlogSection } from '@/components/BlogSection';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

import { pageVariants, pageTransition } from '@/lib/utils';

export default function Blog() {
  const blogPosts = getAllContent('blog') as any[];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen pt-32 pb-16 px-4 md:px-8 relative w-full"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">
            My thoughts on development, technology, and more.
          </p>
        </div>

        <Separator />

        <BlogSection blogPosts={blogPosts} />
      </div>
    </motion.div>
  );
}
