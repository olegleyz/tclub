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
  const themeTitle = t(month.theme.title);

  // Split the theme title onto two cascading lines (e.g. "Моё" / "Тело", "My" / "Body")
  const parts = themeTitle.trim().split(/\s+/);
  const lineA = parts.slice(0, Math.max(1, Math.ceil(parts.length / 2))).join(' ');
  const lineB = parts.slice(Math.max(1, Math.ceil(parts.length / 2))).join(' ');

  return (
    <section
      className="relative pt-32 md:pt-36 pb-20 md:pb-28 px-6 md:px-10 overflow-hidden"
      aria-label="Hero"
    >
      {/* Faint photographic atmosphere — kept as soft wash, not full-bleed */}
      <div
        aria-hidden
        className="absolute right-0 top-0 w-[55%] h-[60%] opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/backgrounds/hero-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'radial-gradient(ellipse at 70% 30%, rgba(0,0,0,0.8), transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 30%, rgba(0,0,0,0.8), transparent 70%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Mast rule */}
        <div className="rule-strip mb-14 md:mb-20 animate-fade-in" style={{ animationDelay: '0.05s' }}>
          <span className="rule-label">— {t(config.about.title)} —</span>
          <span className="rule-line" />
          <span className="rule-label hidden sm:inline">{t(ui.volume)} · {t(ui.issueLabel)} 05 / 26</span>
          <span className="rule-line hidden sm:block" />
          <span className="rule-label text-clay">{t(ui.inSession)}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-12 items-start">
          {/* LEFT — display title column */}
          <div className="lg:col-span-8 relative">
            {/* Kicker */}
            <div className="flex items-baseline gap-4 mb-5 animate-fade-up" style={{ animationDelay: '0.15s' }}>
              <span className="mono-cap text-clay">{t(ui.monthTheme)}</span>
              <span className="h-px w-12 bg-clay/40" />
              <span className="mono-cap text-ink-soft">
                {monthLabel ? t(monthLabel) : ''} · {month.year}
              </span>
            </div>

            {/* Cascading italic display — the theme as cover */}
            <h1
              className="relative leading-[0.86] tracking-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              <span
                className="block animate-fade-up font-light italic"
                style={{
                  fontSize: 'clamp(3.5rem, 13vw, 11rem)',
                  fontVariationSettings: "'opsz' 144, 'SOFT' 80, 'WONK' 1",
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.03em',
                  animationDelay: '0.25s',
                }}
              >
                {lineA}
              </span>
              {lineB && (
                <span
                  className="block animate-fade-up pl-[12%] md:pl-[22%]"
                  style={{
                    fontSize: 'clamp(3.5rem, 13vw, 11rem)',
                    fontVariationSettings: "'opsz' 144, 'SOFT' 30, 'WONK' 0",
                    color: 'var(--color-clay)',
                    letterSpacing: '-0.03em',
                    fontWeight: 350,
                    fontStyle: 'normal',
                    animationDelay: '0.45s',
                    marginTop: '-0.05em',
                  }}
                >
                  {lineB}
                  <span
                    aria-hidden
                    className="inline-block ml-3 align-baseline text-clay/70"
                    style={{ fontSize: '0.18em' }}
                  >
                    ✦
                  </span>
                </span>
              )}
            </h1>

            {/* Theme description */}
            <p
              className="mt-10 md:mt-12 max-w-xl text-lg md:text-xl text-ink leading-[1.55] font-serif animate-fade-up"
              style={{
                fontVariationSettings: "'opsz' 16, 'SOFT' 30",
                animationDelay: '0.65s',
              }}
            >
              {t(month.theme.description)}
            </p>

            {/* CTA row */}
            <div
              className="mt-10 flex flex-wrap items-center gap-5 animate-fade-up"
              style={{ animationDelay: '0.8s' }}
            >
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-3 bg-ink text-paper px-7 py-3.5 hover:bg-clay transition-colors duration-400 cursor-pointer"
              >
                <span className="mono-cap-sm">{t(ui.learnMore)}</span>
                <span className="w-6 h-px bg-paper transition-all duration-400 group-hover:w-10" />
              </button>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mono-cap-sm text-ink hover:text-clay transition-colors ed-link no-underline"
              >
                {t(ui.subscribe)} →
              </a>
            </div>
          </div>

          {/* RIGHT — paper-frame portrait + editorial note */}
          <aside className="lg:col-span-4 lg:pt-16 animate-fade-up" style={{ animationDelay: '0.55s' }}>
            <figure className="relative">
              <div
                className="paper-frame"
                style={{ transform: 'rotate(-1.2deg)' }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}images/backgrounds/hero-bg.jpg`}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ filter: 'sepia(0.18) contrast(1.02) saturate(0.92)' }}
                  />
                </div>
                <span className="tape" style={{ top: '-8px', left: '24px', transform: 'rotate(-4deg)' }} />
                <span className="tape" style={{ top: '-8px', right: '24px', transform: 'rotate(3deg)' }} />
              </div>
              <figcaption className="mt-4 flex items-start gap-3 mono-cap-sm text-ink-soft">
                <span className="text-clay">Fig. 01</span>
                <span className="opacity-70">— {t(ui.cover)} · {monthLabel ? t(monthLabel) : ''} {month.year}</span>
              </figcaption>
            </figure>

            <div className="mt-9 pl-4 border-l border-ink/15">
              <p className="mono-cap-sm text-clay mb-3">{t(ui.editorsNote)}</p>
              <p className="font-serif text-base text-ink-soft leading-relaxed italic"
                 style={{ fontVariationSettings: "'opsz' 14, 'SOFT' 50" }}>
                {t(month.closingMessage)}
              </p>
            </div>
          </aside>
        </div>

        {/* Scroll cue */}
        <div className="mt-20 md:mt-28 flex items-center gap-3 mono-cap-sm text-ink-soft/80 animate-fade-in" style={{ animationDelay: '1.05s' }}>
          <span>{t(ui.beginReading)}</span>
          <span className="h-px w-16 bg-ink-soft/40" />
          <span aria-hidden>↓</span>
        </div>
      </div>
    </section>
  );
}
