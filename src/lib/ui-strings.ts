import type { LocalizedString } from '../types/month';

// Static UI labels (not content — these don't change via admin)
export const ui: Record<string, LocalizedString> = {
  learnMore: { ru: 'Узнать больше', en: 'Learn more', uk: 'Дізнатися більше' },
  subscribe: { ru: 'Оформить подписку', en: 'Subscribe', uk: 'Оформити підписку' },
  monthTheme: { ru: 'Тема месяца', en: 'Monthly theme', uk: 'Тема місяця' },
  aboutClub: { ru: 'О клубе', en: 'About the club', uk: 'Про клуб' },
  monthStructure: { ru: 'Структура месяца', en: 'Monthly structure', uk: 'Структура місяця' },
  organizers: { ru: 'Организаторы', en: 'Organizers', uk: 'Організатори' },
  guestOfMonth: { ru: 'Гость месяца', en: 'Guest of the month', uk: 'Гість місяця' },
  whatsInside: { ru: 'Что внутри месяца', en: "What's inside", uk: 'Що всередині місяця' },
  pricing: { ru: 'Подписка', en: 'Subscription', uk: 'Підписка' },
  contactUs: { ru: 'Связь с нами', en: 'Contact us', uk: "Зв'язок з нами" },
  yourName: { ru: 'Ваше имя', en: 'Your name', uk: "Ваше ім'я" },
  message: { ru: 'Сообщение', en: 'Message', uk: 'Повідомлення' },
  send: { ru: 'Отправить', en: 'Send', uk: 'Надіслати' },
  perMonth: { ru: '/месяц', en: '/month', uk: '/місяць' },
  archive: { ru: 'Архив', en: 'Archive', uk: 'Архів' },
  home: { ru: 'Главная', en: 'Home', uk: 'Головна' },
  april: { ru: 'Апрель', en: 'April', uk: 'Квітень' },
};

export const monthNames: Record<string, LocalizedString> = {
  '1': { ru: 'Январь', en: 'January', uk: 'Січень' },
  '2': { ru: 'Февраль', en: 'February', uk: 'Лютий' },
  '3': { ru: 'Март', en: 'March', uk: 'Березень' },
  '4': { ru: 'Апрель', en: 'April', uk: 'Квітень' },
  '5': { ru: 'Май', en: 'May', uk: 'Травень' },
  '6': { ru: 'Июнь', en: 'June', uk: 'Червень' },
  '7': { ru: 'Июль', en: 'July', uk: 'Липень' },
  '8': { ru: 'Август', en: 'August', uk: 'Серпень' },
  '9': { ru: 'Сентябрь', en: 'September', uk: 'Вересень' },
  '10': { ru: 'Октябрь', en: 'October', uk: 'Жовтень' },
  '11': { ru: 'Ноябрь', en: 'November', uk: 'Листопад' },
  '12': { ru: 'Декабрь', en: 'December', uk: 'Грудень' },
};
