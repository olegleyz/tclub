import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import { assetUrl } from '../../lib/assets';
import type { SiteConfig } from '../../types/month';

interface Props {
  config: SiteConfig;
}

export default function OrganizersSection({ config }: Props) {
  const { t } = useLang();

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-light text-text-hover mb-12 text-center">
          {t(ui.organizers)}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {config.organizers.map((org, i) => (
            <div key={i} className="text-center">
              <img
                src={assetUrl(org.image)}
                alt={t(org.name)}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-text-hover font-medium text-lg mb-1">{t(org.name)}</h3>
              <p className="text-accent text-sm mb-3">{t(org.role)}</p>
              <p className="text-text text-sm leading-relaxed">{t(org.bio)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
