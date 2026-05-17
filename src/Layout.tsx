import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GridOverlay } from './components/grid-overlay';
import { pageVariants } from './lib/utils';

export function Layout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <GridOverlay />
      <Navbar />
      <main className="grid flex-1 grid-cols-1 grid-rows-1">
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="col-start-1 row-start-1"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
