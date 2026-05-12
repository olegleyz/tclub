import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import type { Month } from '../../types/month';

interface Props {
  month: Month;
}

export default function MonthStructure({ month }: Props) {
  const { t } = useLang();
  const themeTitle = t(month.theme.title);

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(90,103,69,0.04) 30%, rgba(90,103,69,0.07) 70%, transparent 100%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <div className="rule-strip mb-16">
          <span className="rule-label text-clay">§ 02</span>
          <span className="rule-line" />
          <span className="rule-label">{t(ui.monthStructure)}</span>
          <span className="rule-line" />
          <span className="rule-label hidden md:inline">{themeTitle}</span>
        </div>

        {/* Massive theme title */}
        <div className="mb-20 md:mb-24 grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end">
          <div className="lg:col-span-7">
            <p className="mono-cap-sm text-ink-soft mb-4">{t(ui.monthTheme)}</p>
            <h2
              className="display-italic"
              style={{
                fontSize: 'clamp(3rem, 9vw, 8rem)',
                fontVariationSettings: "'opsz' 144, 'SOFT' 70, 'WONK' 1",
              }}
            >
              {themeTitle}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-12 lg:border-l lg:border-ink/15">
            <p
              className="font-serif text-lg md:text-xl text-ink leading-[1.55]"
              style={{ fontVariationSettings: "'opsz' 18, 'SOFT' 40" }}
            >
              {t(month.theme.description)}
            </p>
          </div>
        </div>

        {/* Sections as numbered editorial entries */}
        <ol className="grid md:grid-cols-3 gap-x-10 gap-y-14">
          {month.sections.map((section, i) => (
            <li key={i} className="group relative">
              <div className="flex items-start justify-between mb-6">
                <span
                  className="font-serif text-clay leading-none"
                  style={{
                    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                    fontVariationSettings: "'opsz' 144, 'SOFT' 0, 'WONK' 0",
                    fontWeight: 300,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mono-cap-sm text-ink-soft mt-3">
                  — {String(i + 1).padStart(2, '0')} / {String(month.sections.length).padStart(2, '0')}
                </span>
              </div>
              <div className="h-px bg-ink/20 mb-6 origin-left animate-line-grow"
                   style={{ animationDelay: `${0.1 + i * 0.1}s` }} />
              <h3
                className="font-serif text-2xl md:text-3xl text-ink mb-4 leading-tight italic"
                style={{ fontVariationSettings: "'opsz' 36, 'SOFT' 50, 'WONK' 1" }}
              >
                {t(section.title)}
              </h3>
              <p className="text-ink-soft leading-relaxed text-[0.98rem]">
                {t(section.description)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
