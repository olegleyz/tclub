import { Link } from 'react-router-dom';
import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import type { SiteConfig, Month } from '../../types/month';
import { monthNames } from '../../lib/ui-strings';

interface Props {
  config: SiteConfig;
  month: Month;
  capsuleMonth?: Month;
}

export default function HeroSection({ config, month, capsuleMonth }: Props) {
  const { t } = useLang();

  const monthLabel = monthNames[String(month.month)];
  const capsuleMonthLabel = capsuleMonth
    ? monthNames[String(capsuleMonth.month)]
    : undefined;
  const showCapsuleStrip = capsuleMonth?.capsule?.available;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-center px-4"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}images/backgrounds/hero-bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5EFE3]/60 via-[#F5EFE3]/30 to-[#F5EFE3]/80" />
      <div className="relative z-10 max-w-2xl">
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <span className="line-ornament mb-6" />
        </div>
        <h1
          className="font-serif text-[2.5rem] md:text-7xl font-light text-text-hover mb-5 tracking-tight italic animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          {t(config.about.title)}
        </h1>
        <p
          className="text-base md:text-lg text-text mb-10 tracking-wide animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          {monthLabel ? t(monthLabel) : ''} · {t(month.theme.title)}
        </p>
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="animate-fade-up inline-block px-8 py-3 border border-accent/40 text-accent rounded-none hover:bg-accent hover:text-white transition-all duration-300 text-sm tracking-[0.15em] uppercase font-sans cursor-pointer"
          style={{ animationDelay: '0.6s' }}
        >
          {t(ui.learnMore)}
        </button>
      </div>

      {showCapsuleStrip && capsuleMonth && (
        <Link
          to={`/archive/${capsuleMonth.id}`}
          className="group absolute bottom-0 inset-x-0 z-10
                     border-t border-divider/70
                     bg-bg/40 backdrop-blur-[2px]
                     px-4 py-3 md:py-4
                     flex items-center justify-center gap-3 md:gap-5
                     text-center
                     hover:bg-bg/70 transition-colors duration-500
                     animate-fade-up"
          style={{ animationDelay: '0.8s' }}
        >
          {capsuleMonthLabel && (
            <>
              <span className="hidden md:inline text-gold text-[10px] tracking-[0.22em] uppercase">
                Капсула · {t(capsuleMonthLabel)} {capsuleMonth.year}
              </span>
              <span className="hidden md:inline h-px w-8 bg-gold/40" aria-hidden />
            </>
          )}
          <span className="font-serif italic text-text-hover text-sm md:text-base">
            «{t(capsuleMonth.theme.title)}»
          </span>
          <span className="text-accent text-sm tracking-wide
                           transition-transform duration-300
                           group-hover:translate-x-1">
            →
          </span>
        </Link>
      )}
    </section>
  );
}
