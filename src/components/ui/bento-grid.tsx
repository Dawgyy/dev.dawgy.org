import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
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
  layoutId,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  layoutId?: string;
}) => {
  const Content = () => (
    <>
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4 relative z-20">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </>
  );

  const containerClasses = cn(
    'row-span-1 rounded-[2.5rem] group/bento hover:shadow-2xl transition duration-300 shadow-input dark:shadow-none p-6 bg-white/30 dark:bg-neutral-900/30 border border-white/20 dark:border-white/10 backdrop-blur-2xl justify-between flex flex-col space-y-4 overflow-hidden relative',
    href &&
      'cursor-pointer hover:border-primary/50 hover:bg-white/40 dark:hover:bg-neutral-900/50',
    className,
  );

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // If layoutId is present, avoid fade-in animation to allow proper layout transition
  const activeVariants = layoutId
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : variants;

  if (href) {
    if (href.startsWith('http')) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          variants={activeVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={containerClasses}
        >
          <Content />
        </motion.a>
      );
    }
    return (
      <Link to={href} className="contents">
        <motion.div
          layoutId={layoutId}
          variants={activeVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={containerClasses}
        >
          <Content />
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div
      layoutId={layoutId}
      variants={activeVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={containerClasses}
    >
      <Content />
    </motion.div>
  );
};
