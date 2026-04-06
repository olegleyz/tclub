import type { LocalizedString, Lang } from '../../types/month';
import { useLang } from '../../hooks/useLang';
import { adminUi } from '../../lib/admin-strings';

const LANGS: Lang[] = ['ru', 'en', 'uk'];

interface Props {
  label: string;
  value: LocalizedString;
  onChange: (value: LocalizedString) => void;
  multiline?: boolean;
}

export default function LocalizedInput({ label, value, onChange, multiline }: Props) {
  const { t } = useLang();

  const handleChange = (lang: Lang, text: string) => {
    onChange({ ...value, [lang]: text });
  };

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className="space-y-2">
      <label className="text-text-hover text-sm font-medium">{label}</label>
      {LANGS.map((lang) => (
        <div key={lang} className="flex gap-2 items-start">
          <span className="text-accent text-xs mt-3 w-6 flex-shrink-0 uppercase">
            {t(adminUi[lang]!).slice(0, 2)}
          </span>
          <InputComponent
            value={value[lang]}
            onChange={(e) => handleChange(lang, e.target.value)}
            rows={multiline ? 3 : undefined}
            className="flex-1 px-3 py-2 bg-bg border border-white/10 rounded text-text-hover text-sm placeholder:text-text/50 focus:outline-none focus:border-accent resize-none"
          />
        </div>
      ))}
    </div>
  );
}
