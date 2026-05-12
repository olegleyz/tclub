import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import type { SiteConfig } from '../../types/month';

interface Props {
  config: SiteConfig;
}

export default function PricingSection({ config }: Props) {
  const { t } = useLang();
  const { pricing } = config;

  return (
    <section id="pricing" className="relative py-28 md:py-36 px-6 md:px-10 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 90%, rgba(177,75,42,0.08) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <div className="rule-strip mb-16">
          <span className="rule-label text-clay">§ 07</span>
          <span className="rule-line" />
          <span className="rule-label">{t(ui.pricing)}</span>
          <span className="rule-line" />
        </div>

        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-14 items-start">
          {/* LEFT — display price */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="mono-cap-sm text-ink-soft mb-6">{t(ui.pricing)}</p>

            <div className="flex items-start gap-4">
              <span
                className="font-serif text-ink leading-[0.85]"
                style={{
                  fontSize: 'clamp(7rem, 18vw, 16rem)',
                  fontVariationSettings: "'opsz' 144, 'SOFT' 30, 'WONK' 0",
                  fontWeight: 300,
                  letterSpacing: '-0.04em',
                }}
              >
                {pricing.amount}
              </span>
              <div className="pt-5 ml-1">
                <p
                  className="font-serif italic text-clay text-2xl md:text-3xl leading-none"
                  style={{ fontVariationSettings: "'opsz' 24, 'SOFT' 70, 'WONK' 1" }}
                >
                  {pricing.currency}
                </p>
                <p className="mono-cap-sm text-ink-soft mt-3">{t(ui.perMonth)}</p>
              </div>
            </div>

            <div className="mt-10 inline-flex items-center gap-3 px-4 py-2 border border-clay/50 text-clay bg-clay/5">
              <span aria-hidden>✦</span>
              <span className="mono-cap-sm">{t(pricing.trial)}</span>
            </div>

            <p className="mt-10 max-w-md text-ink-soft text-sm leading-relaxed">
              {t(pricing.postPayment)}
            </p>
          </div>

          {/* RIGHT — benefits + CTA */}
          <div className="lg:col-span-7">
            <h2
              className="display-italic mb-10"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                fontVariationSettings: "'opsz' 144, 'SOFT' 70, 'WONK' 1",
              }}
            >
              {t(ui.whatsInside)}
            </h2>

            <ul className="divide-y divide-ink/15 mb-10">
              {pricing.benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[auto_1fr_auto] items-baseline gap-5 py-4"
                >
                  <span className="font-mono text-xs text-clay tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-serif text-lg text-ink leading-snug"
                    style={{ fontVariationSettings: "'opsz' 20, 'SOFT' 40" }}
                  >
                    {t(benefit)}
                  </span>
                  <span aria-hidden className="text-clay/60">✓</span>
                </li>
              ))}
            </ul>

            <a
              href={pricing.stripeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full items-center justify-between gap-4 px-8 py-5 bg-ink text-paper hover:bg-clay transition-colors duration-400 no-underline"
            >
              <span
                className="font-serif italic text-2xl md:text-3xl leading-none"
                style={{ fontVariationSettings: "'opsz' 36, 'SOFT' 70, 'WONK' 1" }}
              >
                {t(ui.subscribe)}
              </span>
              <span className="flex items-center gap-3">
                <span className="mono-cap-sm">{pricing.amount} {pricing.currency}</span>
                <span className="w-8 h-px bg-paper transition-all duration-400 group-hover:w-14" />
                <span aria-hidden>→</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
