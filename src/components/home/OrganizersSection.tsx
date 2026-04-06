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
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="line-ornament mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-light text-text-hover italic">
            {t(ui.organizers)}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {config.organizers.map((org, i) => (
            <div key={i} className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-6 ring-1 ring-accent/20 ring-offset-4 ring-offset-bg">
                <img
                  src={assetUrl(org.image)}
                  alt={t(org.name)}
                  className="w-full h-full object-cover object-top scale-125"
                />
              </div>
              <h3 className="font-serif text-text-hover text-xl mb-1 italic">{t(org.name)}</h3>
              <p className="text-accent text-sm tracking-wide mb-3">{t(org.role)}</p>
              <p className="text-text text-sm leading-relaxed">{t(org.bio)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
