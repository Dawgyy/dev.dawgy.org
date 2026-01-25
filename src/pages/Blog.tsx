import { getAllContent } from '@/lib/content';
import { BlogSection } from '@/components/BlogSection';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

export default function Blog() {
  const blogPosts = getAllContent('blog') as any[];

  return (
    <motion.div
      className="container max-w-4xl mx-auto py-10 px-4 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">
          My thoughts on development, technology, and more.
        </p>
      </div>

      <Separator />

      <BlogSection blogPosts={blogPosts} />
    </motion.div>
  );
}
