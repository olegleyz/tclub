import { useParams, Link } from 'react-router-dom';
import { useMonth } from '../hooks/useContent';
import { useLang } from '../hooks/useLang';
import { ui, monthNames } from '../lib/ui-strings';

export default function MonthDetailPage() {
  const { monthId } = useParams<{ monthId: string }>();
  const { t } = useLang();
  const month = useMonth(monthId);

  if (!month) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const monthLabel = monthNames[String(month.month)];

  return (
    <main className="pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/archive" className="text-accent text-sm hover:underline mb-8 inline-block">
          &larr; {t(ui.archive)}
        </Link>

        <h1 className="text-3xl md:text-4xl font-light text-text-hover mb-2">
          {monthLabel ? t(monthLabel) : ''} {month.year}
        </h1>
        <p className="text-accent text-lg mb-8">{t(month.theme.title)}</p>
        <p className="text-text leading-relaxed mb-12">{t(month.theme.description)}</p>

        {/* Sections */}
        <div className="space-y-8 mb-12">
          {month.sections.map((section, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-semibold">
                {i + 1}
              </div>
              <div>
                <h3 className="text-text-hover font-medium mb-2">{t(section.title)}</h3>
                <p className="text-text leading-relaxed">{t(section.description)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Guest */}
        <div className="bg-bg-card rounded-lg p-8 text-center">
          <h2 className="text-xl text-text-hover mb-6">{t(ui.guestOfMonth)}</h2>
          <img
            src={month.guest.image}
            alt={t(month.guest.name)}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
          />
          <h3 className="text-text-hover font-medium text-lg mb-1">{t(month.guest.name)}</h3>
          <p className="text-accent text-sm mb-3">{t(month.guest.role)}</p>
          <p className="text-text text-sm leading-relaxed max-w-md mx-auto">{t(month.guest.bio)}</p>
        </div>

        {month.closingMessage && (
          <p className="text-text-hover text-center italic mt-12">{t(month.closingMessage)}</p>
        )}
      </div>
    </main>
  );
}
