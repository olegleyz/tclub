import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import type { Month } from '../../types/month';
import CapsuleBuyButton from './CapsuleBuyButton';

interface Props {
  month: Month;
  children: ReactNode;
}

export default function CapsuleLayout({ month, children }: Props) {
  const { t } = useLang();
  const themeTitle = t(month.theme.title);
  const monthLabel = ['', 'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'][month.month];

  return (
    <main className="pt-24 pb-20 px-4">
      <article className="max-w-2xl mx-auto">
        <Link
          to={`/archive/${month.id}`}
          className="text-accent text-sm hover:underline mb-8 inline-block"
        >
          &larr; {t(ui.archive)}
        </Link>

        <header className="text-center mb-16 pb-12 border-b border-divider">
          <p className="text-gold uppercase tracking-widest text-xs mb-4">
            Капсула месяца · {monthLabel} {month.year}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-text-hover mb-4 leading-tight">
            «{themeTitle}»
          </h1>
          <p className="text-text italic max-w-md mx-auto leading-relaxed">
            Месячная капсула трансформационного клуба t-club.
          </p>
        </header>

        <div className="capsule-content space-y-12">
          {children}
        </div>

        {month.capsule && (
          <footer className="mt-20 pt-12 border-t border-divider text-center">
            <p className="text-gold uppercase tracking-widest text-xs mb-3">
              Если откликается
            </p>
            <p className="font-serif text-2xl text-text-hover mb-6">
              Клуб открыт.
            </p>
            <p className="text-text leading-relaxed mb-8 max-w-md mx-auto">
              Май: «Моё Тело». Подписка на месяц включает все встречи,
              расстановочные и коучинговые практики, гостя месяца.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/"
                className="inline-block bg-accent hover:bg-accent-hover text-bg font-medium rounded-full px-7 py-3 transition-colors no-underline"
              >
                Узнать о клубе
              </Link>
              {!month.capsule.stripeLink && (
                <CapsuleBuyButton capsule={month.capsule} size="sm" />
              )}
            </div>
          </footer>
        )}
      </article>
    </main>
  );
}
