import { Link } from 'react-router-dom';
import { useState } from 'react';
import LangSwitcher from './LangSwitcher';
import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';

export default function Header() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/70 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-text-hover text-xl italic no-underline tracking-wide">
          TC
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-text hover:text-accent transition-colors no-underline text-xs tracking-[0.15em] uppercase">
            {t(ui.home)}
          </Link>
          <Link to="/archive" className="text-text hover:text-accent transition-colors no-underline text-xs tracking-[0.15em] uppercase">
            {t(ui.archive)}
          </Link>
          <LangSwitcher />
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-hover p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg/95 backdrop-blur-md px-6 pb-5 border-t border-divider/50">
          <nav className="flex flex-col gap-4 pt-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-text hover:text-accent transition-colors no-underline text-xs tracking-[0.15em] uppercase"
            >
              {t(ui.home)}
            </Link>
            <Link
              to="/archive"
              onClick={() => setMenuOpen(false)}
              className="text-text hover:text-accent transition-colors no-underline text-xs tracking-[0.15em] uppercase"
            >
              {t(ui.archive)}
            </Link>
            <LangSwitcher />
          </nav>
        </div>
      )}
    </header>
  );
}
