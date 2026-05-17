import { Link } from 'react-router-dom';
import type { Month } from '../../types/month';
import { useLang } from '../../hooks/useLang';
import CapsuleBuyButton from './CapsuleBuyButton';

interface Props {
  month: Month;
  variant: 'archive-detail' | 'home-light' | 'home-full' | 'home-cross-link';
}

export default function CapsulePromoBlock({ month, variant }: Props) {
  const { t } = useLang();
  if (!month.capsule?.available) return null;

  const themeTitle = t(month.theme.title);
  const capsulePath = `/archive/${month.id}/capsule`;

  if (variant === 'archive-detail') {
    return (
      <section className="mt-16 mb-4 border-t border-divider pt-12">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-gold uppercase tracking-widest text-xs mb-3">
            Капсула месяца
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-text-hover mb-4">
            «{themeTitle}» — на одну страницу
          </h2>
          <p className="text-text leading-relaxed mb-8">
            Памятка апреля: что мы прошли вместе, гость месяца, цитаты из книги
            и голоса участниц. Для тех, кто был в клубе — как memory-keeper. Для
            тех, кто ещё нет — окно в то, чем мы живём.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CapsuleBuyButton capsule={month.capsule} />
            <Link
              to={capsulePath}
              className="text-accent hover:text-accent-hover transition-colors text-sm underline-offset-4 hover:underline"
            >
              Посмотреть, что внутри
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'home-full') {
    return (
      <section className="py-20 px-4 bg-bg-warm">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold uppercase tracking-widest text-xs mb-3">
            Капсула апреля
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-text-hover mb-4">
            «{themeTitle}»
          </h2>
          <p className="text-text leading-relaxed mb-8 max-w-2xl mx-auto">
            Не были в апреле? Апрельская капсула «{themeTitle}» собрана на одну
            страницу: что мы прошли вместе, гость месяца, цитаты из книги,
            голоса участниц.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CapsuleBuyButton capsule={month.capsule} />
            <Link
              to={capsulePath}
              className="text-accent hover:text-accent-hover transition-colors text-sm underline-offset-4 hover:underline"
            >
              Посмотреть, что внутри
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // 'home-light' / 'home-cross-link' — small ribbon under hero or between sections
  return (
    <div className="px-4 py-8">
      <div className="max-w-3xl mx-auto bg-bg-card rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 text-center md:text-left">
          <p className="text-gold uppercase tracking-widest text-xs mb-1">
            Капсула апреля
          </p>
          <p className="font-serif text-xl md:text-2xl text-text-hover mb-1">
            «{themeTitle}»
          </p>
          <p className="text-text text-sm leading-relaxed">
            Не были в апреле — апрельская капсула доступна за{' '}
            {month.capsule.price.amount} {month.capsule.price.currency}.
          </p>
        </div>
        <div className="flex-shrink-0 flex flex-col gap-2 items-center">
          <CapsuleBuyButton capsule={month.capsule} size="sm" />
          <Link
            to={capsulePath}
            className="text-accent hover:text-accent-hover transition-colors text-xs underline-offset-4 hover:underline"
          >
            что внутри
          </Link>
        </div>
      </div>
    </div>
  );
}
