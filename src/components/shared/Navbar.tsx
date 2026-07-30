'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Tech Stack', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 nav-enter transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#262626]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Nilanga Muthukumarana — back to top"
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded border border-[#3b82f6]/40 bg-[#3b82f6]/10 flex items-center justify-center group-hover:border-[#3b82f6] group-hover:bg-[#3b82f6]/20 transition-all duration-200">
                <Terminal className="w-4 h-4 text-[#3b82f6]" />
              </div>
              <span className="font-mono text-sm text-white/80 group-hover:text-white transition-colors hidden sm:block">
                nilanga.dev
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-3 py-1.5 text-sm text-[#a1a1aa] hover:text-white rounded-md hover:bg-white/5 transition-all duration-150 font-medium"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-3 py-1.5 text-sm font-medium text-[#3b82f6] border border-[#3b82f6]/40 rounded-md hover:bg-[#3b82f6]/10 hover:border-[#3b82f6] transition-all duration-150"
              >
                Resume
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg text-[#a1a1aa] hover:bg-white/5 hover:text-white transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-[#111111] border-b border-[#262626] md:hidden nav-drawer-enter">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-3 text-sm text-[#a1a1aa] hover:text-white hover:bg-white/5 rounded-md transition-all duration-150 font-medium"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-3 text-sm font-medium text-[#3b82f6] border border-[#3b82f6]/40 rounded-md hover:bg-[#3b82f6]/10 text-center"
              >
                Download Resume
              </a>
            </nav>
        </div>
      )}
    </>
  );
}
