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
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="rule-strip mb-16">
          <span className="rule-label text-clay">§ 01</span>
          <span className="rule-line" />
          <span className="rule-label">{t(ui.aboutClub)}</span>
          <span className="rule-line" />
        </div>

        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-14">
          {/* Side metadata */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32 space-y-7">
              <div>
                <p className="mono-cap-sm text-clay mb-2">— I —</p>
                <p
                  className="font-serif italic text-ink leading-snug text-lg"
                  style={{ fontVariationSettings: "'opsz' 18, 'SOFT' 60" }}
                >
                  {t(about.atmosphere)}
                </p>
              </div>
              <div>
                <p className="mono-cap-sm text-clay mb-2">— II —</p>
                <p className="text-ink-soft text-sm leading-relaxed">
                  {t(about.audience)}
                </p>
              </div>
              <div className="pt-5 border-t border-ink/10">
                <p className="mono-cap-sm">{t(about.tags)}</p>
              </div>
            </div>
          </aside>

          {/* Main column — pull quote + body */}
          <div className="lg:col-span-9 lg:pl-10 lg:border-l lg:border-ink/10">
            <p
              className="display-italic mb-12"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                fontVariationSettings: "'opsz' 96, 'SOFT' 60, 'WONK' 1",
              }}
            >
              <span aria-hidden className="text-clay/70 mr-2" style={{ fontStyle: 'normal' }}>“</span>
              {t(about.mission)}
              <span aria-hidden className="text-clay/70 ml-1" style={{ fontStyle: 'normal' }}>”</span>
            </p>

            <p className="max-w-2xl text-ink leading-[1.8] text-[1.02rem]">
              {t(about.description)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
