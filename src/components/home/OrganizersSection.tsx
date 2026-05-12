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
    <section className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="rule-strip mb-20">
          <span className="rule-label text-clay">§ 04</span>
          <span className="rule-line" />
          <span className="rule-label">{t(ui.organizers)}</span>
          <span className="rule-line" />
        </div>

        <h2
          className="display-italic mb-20"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            fontVariationSettings: "'opsz' 144, 'SOFT' 70, 'WONK' 1",
          }}
        >
          {t(ui.organizers)}
        </h2>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
          {config.organizers.map((org, i) => {
            const isOdd = i % 2 === 1;
            return (
              <article
                key={i}
                className={`grid grid-cols-[auto_1fr] gap-x-6 ${isOdd ? 'md:mt-24' : ''}`}
              >
                {/* Number marker */}
                <div className="flex flex-col items-center pt-2">
                  <span className="mono-cap-sm text-clay">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-3 w-px flex-1 bg-ink/15" />
                </div>

                {/* Content */}
                <div>
                  <figure className="relative mb-7">
                    <div
                      className="paper-frame"
                      style={{ transform: `rotate(${isOdd ? '0.8deg' : '-0.6deg'})` }}
                    >
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={assetUrl(org.image)}
                          alt={t(org.name)}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top"
                          style={{ filter: 'sepia(0.08) saturate(0.95)' }}
                        />
                      </div>
                      <span
                        className="tape"
                        style={{
                          top: '-8px',
                          [isOdd ? 'right' : 'left']: '32px',
                          transform: `rotate(${isOdd ? '4deg' : '-3deg'})`,
                        }}
                      />
                    </div>
                    <figcaption className="mt-3 flex items-center gap-3 mono-cap-sm text-ink-soft">
                      <span className="text-clay">Fig. {String(i + 1).padStart(2, '0')}</span>
                      <span className="h-px w-10 bg-ink/20" />
                      <span className="opacity-70">— {t(ui.portrait)} —</span>
                    </figcaption>
                  </figure>

                  <h3
                    className="font-serif text-2xl md:text-3xl text-ink mb-2 italic leading-tight"
                    style={{ fontVariationSettings: "'opsz' 36, 'SOFT' 60, 'WONK' 1" }}
                  >
                    {t(org.name)}
                  </h3>
                  <p className="mono-cap-sm text-clay mb-4">{t(org.role)}</p>
                  <p className="text-ink-soft leading-relaxed">{t(org.bio)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
