import type { Month } from '../../types/month';
import { useLang } from '../../hooks/useLang';
import CapsuleBuyButton from './CapsuleBuyButton';

interface Props {
  month: Month;
  variant: 'archive-detail' | 'home-light' | 'home-full' | 'home-cross-link';
}

const CAPSULE_INSIDE_ITEMS: Record<string, string[]> = {
  '2026-04': [
    '4 волны темы: Замечать, Углубляться, Ограничения, Расширение',
    'Сквозные ритуалы недели: четверг благодарности, пятница красоты',
    'Гость месяца: Кристина Барташук, финансист',
    'Книга месяца: Герман Гессе, «Сиддхартха» + 2 цитаты',
    'Три голоса участниц апреля',
    'Инсайт месяца: сдвиг с «у меня недостаточно» на «я уже создаю»',
  ],
  '2026-05': [
    'Арка месяца: вода, движение, состояние, органы чувств и граница усилия',
    'Пять гостевых голосов: движение, психосоматика, женское здоровье, йога и привычки',
    'Мини-практикум: 6 упражнений, которые можно пройти самостоятельно',
    'Книга месяца: «Очаровательный кишечник» как приглашение к интересу к телу',
    'Голоса участниц и финальный сдвиг месяца',
  ],
};

const DEFAULT_INSIDE_ITEMS = [
  'Главная арка месяца и ключевые темы',
  'Практики и ритуалы, которые можно попробовать самостоятельно',
  'Голоса гостей и участниц',
  'Книга месяца и общий инсайт',
];

const MONTH_GENITIVE: Record<number, string> = {
  1: 'января',
  2: 'февраля',
  3: 'марта',
  4: 'апреля',
  5: 'мая',
  6: 'июня',
  7: 'июля',
  8: 'августа',
  9: 'сентября',
  10: 'октября',
  11: 'ноября',
  12: 'декабря',
};

export default function CapsulePromoBlock({ month, variant }: Props) {
  const { t } = useLang();
  if (!month.capsule?.available) return null;

  const themeTitle = t(month.theme.title);
  const monthName = MONTH_GENITIVE[month.month] ?? 'месяца';
  const insideItems = CAPSULE_INSIDE_ITEMS[month.id] ?? DEFAULT_INSIDE_ITEMS;
  const compactText =
    month.id === '2026-04'
      ? 'Памятка месяца: 4 волны темы, гость Кристина, цитаты Гессе, голоса участниц, инсайт.'
      : month.id === '2026-05'
        ? 'Капсула месяца: арка темы, 5 гостевых голосов, мини-практикум, книга, голоса участниц.'
        : 'Капсула месяца: арка темы, практики, гости, книга и инсайт.';

  if (variant === 'archive-detail') {
    return (
      <section className="mt-16 mb-4 border-t border-divider pt-12">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-gold uppercase tracking-widest text-xs mb-3">
            Капсула месяца
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-text-hover mb-4">
            «{themeTitle}»
          </h2>
          <p className="text-text leading-relaxed mb-8">
            Капсула {monthName} для тех, кто был в клубе, и окно для тех, кто ещё
            нет. Внутри:
          </p>
          <ul className="text-left space-y-2 mb-10 max-w-md mx-auto">
            {insideItems.map((item, i) => (
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
            Капсула {monthName}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-text-hover mb-4">
            «{themeTitle}»
          </h2>
          <p className="text-text leading-relaxed mb-8 max-w-xl mx-auto">
            Не были в клубе в этом месяце? Капсула «{themeTitle}» собрана так,
            чтобы её можно было пройти самостоятельно. Внутри:
          </p>
          <ul className="text-left space-y-2 mb-10 max-w-md mx-auto">
            {insideItems.map((item, i) => (
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
            Капсула {monthName}
          </p>
          <p className="font-serif text-xl md:text-2xl text-text-hover mb-2">
            «{themeTitle}»
          </p>
          <p className="text-text text-sm leading-relaxed">
            {compactText}
          </p>
        </div>
        <div className="flex-shrink-0">
          <CapsuleBuyButton capsule={month.capsule} size="sm" />
        </div>
      </div>
    </div>
  );
}
