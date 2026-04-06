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
    <section id="about" className="py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <span className="line-ornament mb-6" />
        <h2 className="font-serif text-3xl md:text-4xl font-light text-text-hover mb-10 italic">
          {t(ui.aboutClub)}
        </h2>
        <p className="font-serif text-xl md:text-2xl text-text-hover font-light leading-relaxed mb-6">
          {t(about.mission)}
        </p>
        <p className="text-text mb-8 leading-loose text-[0.95rem]">{t(about.description)}</p>
        <p className="text-accent text-sm tracking-[0.2em] uppercase mb-8">{t(about.tags)}</p>
        <div className="border-t border-divider pt-6 max-w-xs mx-auto">
          <p className="font-serif text-text italic text-lg mb-1">{t(about.atmosphere)}</p>
          <p className="text-text text-sm">{t(about.audience)}</p>
        </div>
      </div>
    </section>
  );
}
