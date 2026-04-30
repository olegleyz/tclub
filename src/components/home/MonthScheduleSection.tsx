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
    <section className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="line-ornament mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-light text-text-hover italic">
            {t(ui.monthSchedule)}
          </h2>
        </div>
        <ul className="space-y-4 text-left">
          {month.schedule.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-text leading-relaxed">
              <span className="text-gold mt-1.5 text-sm" aria-hidden="true">&#10003;</span>
              <span>{t(item)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
