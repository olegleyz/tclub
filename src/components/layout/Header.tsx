import { Link } from 'react-router-dom';
import { useState } from 'react';
import LangSwitcher from './LangSwitcher';
import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';

export default function Header() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-divider">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-text-hover font-semibold text-lg no-underline">
          TC
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-text hover:text-text-hover transition-colors no-underline text-sm">
            {t(ui.home)}
          </Link>
          <Link to="/archive" className="text-text hover:text-text-hover transition-colors no-underline text-sm">
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
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg border-b border-divider px-4 pb-4">
          <nav className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-text hover:text-text-hover transition-colors no-underline"
            >
              {t(ui.home)}
            </Link>
            <Link
              to="/archive"
              onClick={() => setMenuOpen(false)}
              className="text-text hover:text-text-hover transition-colors no-underline"
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
