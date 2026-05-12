import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import type { Month } from '../../types/month';

interface Props {
  month: Month;
}

export default function MonthScheduleSection({ month }: Props) {
  const { t } = useLang();

  if (!month.schedule || month.schedule.length === 0) return null;

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="rule-strip mb-16">
          <span className="rule-label text-clay">§ 03</span>
          <span className="rule-line" />
          <span className="rule-label">{t(ui.monthSchedule)}</span>
          <span className="rule-line" />
        </div>

        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-12">
          <div className="lg:col-span-4">
            <h2
              className="display-italic mb-6"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                fontVariationSettings: "'opsz' 144, 'SOFT' 70, 'WONK' 1",
              }}
            >
              {t(ui.monthSchedule)}
            </h2>
            <p className="mono-cap-sm text-ink-soft">
              {String(month.month).padStart(2, '0')} · {month.year}
            </p>
            <div className="mt-6 h-px w-20 bg-clay/50" />
          </div>

          <ul className="lg:col-span-8 divide-y divide-ink/15">
            {month.schedule.map((item, i) => (
              <li
                key={i}
                className="grid grid-cols-[auto_1fr_auto] items-baseline gap-5 py-5 group"
              >
                <span
                  className="font-mono text-xs text-clay tabular-nums"
                  style={{ letterSpacing: '0.05em' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="font-serif text-lg md:text-xl text-ink leading-snug"
                  style={{ fontVariationSettings: "'opsz' 24, 'SOFT' 40, 'WONK' 0" }}
                >
                  {t(item)}
                </span>
                <span
                  aria-hidden
                  className="text-clay/60 transition-transform duration-400 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
