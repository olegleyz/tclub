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
      className="relative min-h-[85vh] flex items-center justify-center text-center px-4"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}images/backgrounds/hero-bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-light text-text-hover mb-4 tracking-tight">
          {t(config.about.title)}
        </h1>
        <p className="text-lg md:text-xl text-text mb-8">
          {monthLabel ? t(monthLabel) : ''} · {t(ui.monthTheme)}: {t(month.theme.title)}
        </p>
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-block px-8 py-3 border border-text-hover/30 text-text-hover rounded-full hover:bg-text-hover/10 transition-colors text-sm tracking-wide cursor-pointer"
        >
          {t(ui.learnMore)}
        </button>
      </div>
    </section>
  );
}
