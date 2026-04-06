import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import type { Month } from '../../types/month';

interface Props {
  month: Month;
}

export default function MonthStructure({ month }: Props) {
  const { t } = useLang();

  return (
    <section className="py-20 px-4 bg-bg-card">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-light text-text-hover mb-12 text-center">
          {t(ui.monthStructure)}
        </h2>
        <div className="space-y-8">
          {/* Theme intro */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold">
              1
            </div>
            <div>
              <h3 className="text-text-hover font-medium mb-2">
                {t(ui.monthTheme)}: {t(month.theme.title)}
              </h3>
              <p className="text-text leading-relaxed">{t(month.theme.description)}</p>
            </div>
          </div>

          {/* Sections */}
          {month.sections.map((section, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold">
                {i + 2}
              </div>
              <div>
                <h3 className="text-text-hover font-medium mb-2">{t(section.title)}</h3>
                <p className="text-text leading-relaxed">{t(section.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
