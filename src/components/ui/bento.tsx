import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { cn, containerVariants, itemVariants } from '@/lib/utils';

/** Responsive 6-column grid. Children control their own span via className. */
export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={cn(
        'grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
  /** Internal route or external URL. Omit for a static card. */
  href?: string;
  /** Disable default padding (for edge-to-edge content). */
  bare?: boolean;
  /** Disable hover lift (e.g. the hero card). */
  flat?: boolean;
}

export function BentoCard({
  className,
  children,
  href,
  bare = false,
  flat = false,
}: BentoCardProps) {
  const isExternal = href?.startsWith('http');

  const cls = cn(
    'group relative flex flex-col overflow-hidden rounded-3xl glass',
    'transition-all duration-300',
    !bare && 'p-6',
    !flat &&
      'hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5',
    href && 'cursor-pointer',
    className,
  );

  const arrow = href && (
    <div className="absolute right-5 top-5 z-20 grid size-8 place-items-center rounded-full border border-border bg-card/80 text-muted-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-foreground">
      {isExternal ? (
        <ArrowUpRight className="size-4" />
      ) : (
        <ArrowRight className="size-4" />
      )}
    </div>
  );

  if (!href) {
    return (
      <motion.div variants={itemVariants} className={cls}>
        {children}
      </motion.div>
    );
  }

  if (isExternal) {
    return (
      <motion.a
        variants={itemVariants}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {arrow}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div variants={itemVariants} className="contents">
      <Link to={href} className={cls}>
        {arrow}
        {children}
      </Link>
    </motion.div>
  );
}

/** Small uppercase label used in card headers. */
export function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </span>
  );
}
