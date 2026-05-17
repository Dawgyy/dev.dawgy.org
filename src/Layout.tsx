import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SpotlightLayer } from './components/spotlight';
import { pageVariants } from './lib/utils';

/** Static ambient backdrop: soft accent bloom anchored top-centre. */
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute left-1/2 top-[-20%] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full opacity-50 blur-[140px] animate-drift"
        style={{
          background:
            'radial-gradient(circle, var(--accent-glow), transparent 70%)',
        }}
      />
      {/* faint dot texture */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(var(--color-line-strong) 0.5px, transparent 0.5px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 70% 50% at 50% 0%, #000, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 50% at 50% 0%, #000, transparent 80%)',
        }}
      />
    </div>
  );
}

export function Layout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Backdrop />
      <SpotlightLayer />
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
