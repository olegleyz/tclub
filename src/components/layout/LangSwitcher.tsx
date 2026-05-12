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
    <div className="inline-flex items-center gap-3 mono-cap-sm">
      {langs.map(({ code, label }, i) => (
        <span key={code} className="inline-flex items-center">
          {i > 0 && <span className="mr-3 opacity-30">·</span>}
          <button
            onClick={() => setLang(code)}
            className={`cursor-pointer transition-colors ${
              lang === code ? 'text-clay' : 'text-ink-soft hover:text-ink'
            }`}
            aria-pressed={lang === code}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  );
}
