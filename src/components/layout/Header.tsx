import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LangSwitcher from './LangSwitcher';
import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';

export default function Header() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-paper/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-4 md:pt-5 pb-3 md:pb-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-baseline gap-2 no-underline"
            aria-label="Transformation Club — home"
          >
            <span
              className="display-italic text-2xl md:text-[28px] leading-none"
              style={{ fontVariationSettings: "'opsz' 96, 'SOFT' 50, 'WONK' 1" }}
            >
              Transformation
            </span>
            <span className="mono-cap-sm text-clay -translate-y-px">CLUB</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9">
            <Link to="/" className="mono-cap-sm text-ink-soft hover:text-clay transition-colors no-underline ed-link">
              {t(ui.home)}
            </Link>
            <Link to="/archive" className="mono-cap-sm text-ink-soft hover:text-clay transition-colors no-underline ed-link">
              {t(ui.archive)}
            </Link>
            <span className="h-3 w-px bg-ink/30" aria-hidden />
            <LangSwitcher />
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-ink p-1 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.25">
              {menuOpen ? <path d="M5 5l12 12M5 17L17 5" /> : <path d="M3 7h16M3 12h16M3 17h16" />}
            </svg>
          </button>
        </div>

        {/* Hairline rule with edition metadata */}
        <div className="mt-3 hidden md:flex items-center gap-3 text-ink-soft/80">
          <span className="mono-cap-sm">{t(ui.volume)}</span>
          <span className="h-px flex-1 bg-ink/15" />
          <span className="mono-cap-sm">{t(ui.issueLabel)} 05 · 26</span>
          <span className="h-px w-10 bg-ink/15" />
          <span className="mono-cap-sm text-clay">{t(ui.inSession)}</span>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-paper/95 backdrop-blur-md px-6 pb-6 pt-2 border-t border-ink/10">
          <nav className="flex flex-col gap-5">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="mono-cap text-ink hover:text-clay transition-colors no-underline"
            >
              {t(ui.home)}
            </Link>
            <Link
              to="/archive"
              onClick={() => setMenuOpen(false)}
              className="mono-cap text-ink hover:text-clay transition-colors no-underline"
            >
              {t(ui.archive)}
            </Link>
            <div className="pt-2 border-t border-ink/10">
              <LangSwitcher />
            </div>
            <div className="flex items-center gap-3 text-ink-soft/80 pt-3 border-t border-ink/10">
              <span className="mono-cap-sm">{t(ui.volume)}</span>
              <span className="h-px flex-1 bg-ink/15" />
              <span className="mono-cap-sm">{t(ui.issueLabel)} 05 · 26</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
