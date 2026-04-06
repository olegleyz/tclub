import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import type { SiteConfig } from '../../types/month';

interface Props {
  config: SiteConfig;
}

export default function OfferingsSection({ config }: Props) {
  const { t } = useLang();

  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="line-ornament mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-light text-text-hover italic">
            {t(ui.whatsInside)}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {config.offerings.map((offering, i) => (
            <div
              key={i}
              className="text-center p-8 border border-divider hover:border-accent/30 transition-colors duration-300"
            >
              <h3 className="font-serif text-text-hover text-lg mb-3 italic">{t(offering.title)}</h3>
              <p className="text-text text-sm leading-relaxed">{t(offering.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
