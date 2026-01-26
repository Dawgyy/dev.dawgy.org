import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto',
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
}) => {
  const isExternal = href && href.startsWith('http');

  const containerClasses = cn(
    'row-span-1 rounded-[2.5rem] group/bento transition duration-200',
    'bg-white/[0.02] dark:bg-white/[0.02]',
    'backdrop-blur-[40px] saturate-150',
    'border border-white/[0.08] dark:border-white/[0.05]',
    'shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]',
    'justify-between flex flex-col space-y-3 overflow-hidden relative p-6',
    'hover:bg-white/[0.04] dark:hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]',
    'hover:border-white/[0.1] transition-all duration-300',
    href ? 'cursor-pointer' : '',
    className,
  );

  const content = (
    <>
      {href && (
        <div className="absolute top-6 right-6 z-20 text-neutral-400 group-hover/bento:text-foreground transition-all duration-200 opacity-0 group-hover/bento:opacity-100 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10">
          {href.startsWith('http') ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </div>
      )}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex-1 min-h-0">{header}</div>
        <div className="group-hover/bento:translate-x-1 transition-transform duration-200 mt-4 shrink-0">
          {icon}
          <div className="font-sans font-bold text-xl text-neutral-800 dark:text-neutral-100 mb-1 mt-2 tracking-tight">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-500 text-sm dark:text-neutral-400 leading-relaxed line-clamp-3">
            {description}
          </div>
        </div>
      </div>
    </>
  );

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  if (!href) {
    return (
      <motion.div variants={variants} className={containerClasses}>
        {content}
      </motion.div>
    );
  }

  if (isExternal) {
    return (
      <motion.a
        variants={variants}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={containerClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div variants={variants}>
      <Link to={href} className={cn(containerClasses, 'block h-full')}>
        {content}
      </Link>
    </motion.div>
  );
};
