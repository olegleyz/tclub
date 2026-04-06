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
    <section className="py-20 px-4">
      <div className="max-w-lg mx-auto text-center bg-bg-card rounded-2xl p-10">
        <h2 className="text-2xl md:text-3xl font-light text-text-hover mb-8">
          {t(ui.pricing)}
        </h2>

        <div className="text-4xl font-light text-text-hover mb-2">
          {pricing.amount} {pricing.currency}
          <span className="text-lg text-text">{t(ui.perMonth)}</span>
        </div>
        <p className="text-accent text-sm mb-8">{t(pricing.trial)}</p>

        <ul className="text-left space-y-3 mb-8">
          {pricing.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3 text-text">
              <span className="text-accent mt-0.5">&#10003;</span>
              <span>{t(benefit)}</span>
            </li>
          ))}
        </ul>

        <a
          href={pricing.stripeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors font-medium tracking-wide"
        >
          {t(ui.subscribe)}
        </a>
        <p className="text-text text-sm mt-4">{t(pricing.postPayment)}</p>
      </div>
    </section>
  );
}
