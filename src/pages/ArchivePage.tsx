import { Link } from 'react-router-dom';
import { useMonthIndex } from '../hooks/useContent';
import { useLang } from '../hooks/useLang';
import { ui, monthNames } from '../lib/ui-strings';

export default function ArchivePage() {
  const { t } = useLang();
  const index = useMonthIndex();

  if (!index) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const pastMonths = index.months.filter(m => m.id !== index.current);

  return (
    <main className="pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-light text-text-hover mb-12 text-center">
          {t(ui.archive)}
        </h1>
        {pastMonths.length === 0 ? (
          <p className="text-text text-center">
            {t({ ru: 'Пока нет архивных месяцев', en: 'No archived months yet', uk: 'Поки немає архівних місяців' })}
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {pastMonths.map(m => {
              const [year, month] = m.id.split('-');
              const monthLabel = monthNames[String(Number(month))];
              return (
                <Link
                  key={m.id}
                  to={`/archive/${m.id}`}
                  className="block bg-bg-card rounded-lg p-6 hover:bg-white/[0.06] transition-colors no-underline"
                >
                  <p className="text-accent text-sm mb-2">
                    {monthLabel ? t(monthLabel) : month} {year}
                  </p>
                  <h3 className="text-text-hover font-medium text-lg mb-2">
                    {t(m.theme)}
                  </h3>
                  <p className="text-text text-sm">{t(m.guestName)}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
