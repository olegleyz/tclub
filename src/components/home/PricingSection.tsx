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
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-bg-warm via-bg-warm/50 to-transparent" />
      <div className="max-w-md mx-auto text-center relative">
        <span className="line-ornament mb-6" />
        <h2 className="font-serif text-3xl md:text-4xl font-light text-text-hover mb-10 italic">
          {t(ui.pricing)}
        </h2>

        <div className="border border-divider p-10">
          <div className="font-serif text-5xl font-light text-text-hover mb-1">
            {pricing.amount} {pricing.currency}
          </div>
          <p className="text-text text-sm mb-2">{t(ui.perMonth)}</p>
          <p className="text-accent text-sm tracking-wide mb-8">{t(pricing.trial)}</p>

          <ul className="text-left space-y-3 mb-10">
            {pricing.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3 text-text text-sm">
                <span className="text-gold mt-0.5">&#10003;</span>
                <span>{t(benefit)}</span>
              </li>
            ))}
          </ul>

          <a
            href={pricing.stripeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full px-8 py-4 bg-accent text-white hover:bg-accent-hover transition-colors duration-300 text-sm tracking-[0.15em] uppercase"
          >
            {t(ui.subscribe)}
          </a>
          <p className="text-text text-xs mt-5">{t(pricing.postPayment)}</p>
        </div>
      </div>
    </section>
  );
}
