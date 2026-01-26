import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AmbientBackground } from './components/ui/ambient-background';
import { pageVariants } from './lib/utils';

export function Layout() {
  const location = useLocation();
  const currentOutlet = useOutlet();

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      <AmbientBackground />
      <Navbar />
      <main className="flex-1 grid grid-cols-1 grid-rows-1 w-full max-w-[100vw]">
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="col-start-1 row-start-1 w-full"
          >
            {currentOutlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
