import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; 

export function Navbar() {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;
  const [menuOpen, setMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="text-white py-4 mt-4 px-6">
      <div className="flex justify-between items-center">
        <div className="hidden lg:flex space-x-4">
          <Link href="/" className={`navbar-link ${isActive('/') ? 'navbar-link-active' : ''}`}>
            Home
          </Link>
          <Link href="/blog" className={`navbar-link ${isActive('/blog') ? 'navbar-link-active' : ''}`}>
            Blog
          </Link>
        </div>

        <div className="hidden lg:flex space-x-4">
          <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer"
            className="navbar-link">
            Curriculum Vitae
          </Link>
          <a
            href="https://infohers.dawgy.org"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-link flex items-center"
          >
            Notes de cours
            <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2" />
          </a>
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden mt-4 space-y-2">
          <Link href="/" className={`block navbar-link ${isActive('/') ? 'navbar-link-active' : ''}`}>
            Home
          </Link>
          <Link href="/blog" className={`block navbar-link ${isActive('/blog') ? 'navbar-link-active' : ''}`}>
            Blog
          </Link>
          <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer"
            className="block navbar-link">
            Curriculum Vitae
          </Link>
          <a
            href="https://infohers.dawgy.org"
            target="_blank"
            rel="noopener noreferrer"
            className="block navbar-link flex items-center"
          >
            Notes de cours
            <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2 w-5 h-5" />
          </a>
        </div>
      )}
    </nav>
  );
}
