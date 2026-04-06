import { useLang } from '../../hooks/useLang';
import type { Lang } from '../../types/month';

const langs: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'uk', label: 'UA' },
];

export default function LangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex gap-1 text-sm">
      {langs.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`px-2 py-1 rounded transition-colors ${
            lang === code
              ? 'bg-accent text-white'
              : 'text-text hover:text-text-hover'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
