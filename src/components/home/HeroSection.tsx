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
        backgroundImage: 'url(/images/backgrounds/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-tight">
          {t(config.about.title)}
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8">
          {monthLabel ? t(monthLabel) : ''} · {t(ui.monthTheme)}: {t(month.theme.title)}
        </p>
        <a
          href="#about"
          className="inline-block px-8 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors text-sm tracking-wide"
        >
          {t(ui.learnMore)}
        </a>
      </div>
    </section>
  );
}
