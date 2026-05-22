import type { Month } from '../../types/month';
import { useLang } from '../../hooks/useLang';
import CapsuleBuyButton from './CapsuleBuyButton';

interface Props {
  month: Month;
  variant: 'archive-detail' | 'home-light' | 'home-full' | 'home-cross-link';
}

const APRIL_INSIDE_ITEMS = [
  '4 волны темы — Замечать, Углубляться, Ограничения, Расширение',
  'Сквозные ритуалы недели — четверг благодарности, пятница красоты',
  'Гость месяца — Кристина Барташук, финансист',
  'Книга месяца — Герман Гессе, «Сиддхартха» + 2 цитаты',
  'Три голоса участниц апреля',
  'Инсайт месяца — сдвиг с «у меня недостаточно» на «я уже создаю»',
];

export default function CapsulePromoBlock({ month, variant }: Props) {
  const { t } = useLang();
  if (!month.capsule?.available) return null;

  const themeTitle = t(month.theme.title);

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
            Памятка апреля для тех, кто был в клубе, и окно для тех, кто ещё
            нет. Внутри:
          </p>
          <ul className="text-left space-y-2 mb-10 max-w-md mx-auto">
            {APRIL_INSIDE_ITEMS.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-text leading-relaxed">
                <span className="text-gold mt-1.5 text-xs flex-shrink-0" aria-hidden="true">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <CapsuleBuyButton capsule={month.capsule} />
        </div>
      </section>
    );
  }

  if (variant === 'home-full') {
    return (
      <section className="py-20 px-4 bg-bg-warm">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold uppercase tracking-widest text-xs mb-3">
            Капсула апреля
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-text-hover mb-4">
            «{themeTitle}»
          </h2>
          <p className="text-text leading-relaxed mb-8 max-w-xl mx-auto">
            Не были в апреле? Апрельская капсула «{themeTitle}» собрана на одну
            страницу. Внутри:
          </p>
          <ul className="text-left space-y-2 mb-10 max-w-md mx-auto">
            {APRIL_INSIDE_ITEMS.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-text leading-relaxed">
                <span className="text-gold mt-1.5 text-xs flex-shrink-0" aria-hidden="true">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <CapsuleBuyButton capsule={month.capsule} />
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
          <p className="font-serif text-xl md:text-2xl text-text-hover mb-2">
            «{themeTitle}»
          </p>
          <p className="text-text text-sm leading-relaxed">
            Памятка месяца на одну страницу: 4 волны темы, гость Кристина,
            цитаты Гессе, голоса участниц, инсайт.
          </p>
        </div>
        <div className="flex-shrink-0">
          <CapsuleBuyButton capsule={month.capsule} size="sm" />
        </div>
      </div>
    </div>
  );
}
