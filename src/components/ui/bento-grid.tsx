import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={gridVariants}
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
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom ease for "Apple-like" motion
      },
    },
  };

  const containerClasses = cn(
    'row-span-1 rounded-[2.5rem] group/bento transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'bg-white/[0.02] dark:bg-white/[0.02]', // Very transparent
    'backdrop-blur-[40px] saturate-150', // Heavy blur, higher saturation for "glass"
    'border border-white/[0.08] dark:border-white/[0.05]', // Subtle border
    'shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]', // Ambient shadow
    'justify-between flex flex-col space-y-3 overflow-hidden relative p-6', // Increased padding
    'hover:bg-white/[0.04] dark:hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]',
    href
      ? 'cursor-pointer'
      : '',
    className,
  );

  const content = (
    <>
      {href && (
        <div className="absolute top-6 right-6 z-20 text-neutral-400 group-hover/bento:text-foreground transition-all duration-500 opacity-0 group-hover/bento:opacity-100 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10">
          {href.startsWith('http') ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </div>
      )}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex-1 min-h-0">{header}</div>
        <div className="group-hover/bento:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mt-4 shrink-0">
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

  const commonProps = {
    className: containerClasses,
    variants: itemVariants,
  };

  if (href?.startsWith('http')) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        {...commonProps}
      >
        {content}
      </motion.a>
    );
  }

  if (href) {
    const MotionLink = motion.create(Link);
    return (
      <MotionLink
        to={href}
        {...commonProps}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.div {...commonProps}>
      {content}
    </motion.div>
  );
};
