import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import type { SiteConfig } from '../../types/month';

interface Props {
  config: SiteConfig;
}

export default function OfferingsSection({ config }: Props) {
  const { t } = useLang();

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="rule-strip mb-16">
          <span className="rule-label text-clay">§ 06</span>
          <span className="rule-line" />
          <span className="rule-label">{t(ui.whatsInside)}</span>
          <span className="rule-line" />
        </div>

        <div className="grid md:grid-cols-12 gap-x-10 gap-y-10 mb-16 items-end">
          <h2
            className="md:col-span-8 display-italic"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              fontVariationSettings: "'opsz' 144, 'SOFT' 70, 'WONK' 1",
            }}
          >
            {t(ui.whatsInside)}
          </h2>
          <div className="md:col-span-4 mono-cap-sm text-ink-soft md:text-right">
            {config.offerings.length.toString().padStart(2, '0')} — {t(ui.monthTheme)}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-px md:bg-ink/10 md:border md:border-ink/10">
          {config.offerings.map((offering, i) => (
            <article
              key={i}
              className="editorial-card relative bg-paper p-8 md:p-10 hover:bg-paper-deep transition-colors duration-500"
            >
              <div className="flex items-start justify-between mb-10">
                <span
                  className="font-serif text-clay leading-none"
                  style={{
                    fontSize: 'clamp(4rem, 7vw, 6rem)',
                    fontVariationSettings: "'opsz' 144, 'SOFT' 0",
                    fontWeight: 300,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mono-cap-sm text-ink-soft mt-4">
                  — {String(i + 1).padStart(2, '0')} / {String(config.offerings.length).padStart(2, '0')} —
                </span>
              </div>
              <h3
                className="font-serif italic text-ink text-2xl md:text-3xl mb-4 leading-tight"
                style={{ fontVariationSettings: "'opsz' 36, 'SOFT' 60, 'WONK' 1" }}
              >
                {t(offering.title)}
              </h3>
              <p className="text-ink-soft leading-relaxed text-[0.98rem]">
                {t(offering.description)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
