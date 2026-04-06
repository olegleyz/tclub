import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import type { SiteConfig } from '../../types/month';

interface Props {
  config: SiteConfig;
}

export default function AboutSection({ config }: Props) {
  const { t } = useLang();
  const { about } = config;

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-light text-text-hover mb-8">
          {t(ui.aboutClub)}
        </h2>
        <p className="text-text-hover text-lg mb-6">{t(about.mission)}</p>
        <p className="text-text mb-6 leading-relaxed">{t(about.description)}</p>
        <p className="text-accent text-sm tracking-wider mb-6">{t(about.tags)}</p>
        <p className="text-text italic mb-2">{t(about.atmosphere)}</p>
        <p className="text-text">{t(about.audience)}</p>
      </div>
    </section>
  );
}
