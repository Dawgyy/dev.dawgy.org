import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AmbientBackground } from './components/ui/ambient-background';
import { useEffect } from 'react';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      <AmbientBackground />
      <Navbar />
      <main className="flex-1 grid grid-cols-1 grid-rows-1 w-full max-w-[100vw]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={location.pathname}
            className="col-start-1 row-start-1 w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
