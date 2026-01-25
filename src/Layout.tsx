import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

export function Layout() {
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
