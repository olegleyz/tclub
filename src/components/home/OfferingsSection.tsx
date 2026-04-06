import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import type { SiteConfig } from '../../types/month';

interface Props {
  config: SiteConfig;
}

export default function OfferingsSection({ config }: Props) {
  const { t } = useLang();

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-light text-text-hover mb-12 text-center">
          {t(ui.whatsInside)}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {config.offerings.map((offering, i) => (
            <div
              key={i}
              className="bg-bg-card rounded-xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <h3 className="text-text-hover font-medium mb-3">{t(offering.title)}</h3>
              <p className="text-text text-sm leading-relaxed">{t(offering.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
