import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import type { Month } from '../../types/month';

interface Props {
  month: Month;
}

export default function MonthStructure({ month }: Props) {
  const { t } = useLang();

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-warm to-bg opacity-80" />
      <div className="max-w-2xl mx-auto relative">
        <div className="text-center mb-14">
          <span className="line-ornament mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-light text-text-hover italic">
            {t(ui.monthStructure)}
          </h2>
        </div>
        <div className="space-y-10">
          {/* Theme intro */}
          <div className="flex gap-5">
            <div className="flex-shrink-0 w-9 h-9 rounded-full border border-accent/40 flex items-center justify-center text-accent text-sm font-serif">
              1
            </div>
            <div>
              <h3 className="font-serif text-text-hover text-lg mb-2 italic">
                {t(ui.monthTheme)}: {t(month.theme.title)}
              </h3>
              <p className="text-text leading-relaxed text-[0.95rem]">{t(month.theme.description)}</p>
            </div>
          </div>

          {/* Sections */}
          {month.sections.map((section, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex-shrink-0 w-9 h-9 rounded-full border border-accent/40 flex items-center justify-center text-accent text-sm font-serif">
                {i + 2}
              </div>
              <div>
                <h3 className="font-serif text-text-hover text-lg mb-2 italic">{t(section.title)}</h3>
                <p className="text-text leading-relaxed text-[0.95rem]">{t(section.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
