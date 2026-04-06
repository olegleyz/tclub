import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import type { SiteConfig, Month } from '../../types/month';
import { monthNames } from '../../lib/ui-strings';

interface Props {
  config: SiteConfig;
  month: Month;
}

export default function HeroSection({ config, month }: Props) {
  const { t } = useLang();

  const monthLabel = monthNames[String(month.month)];

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
    </section>
  );
}
