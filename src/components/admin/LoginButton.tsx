import { useState } from 'react';
import { useLang } from '../../hooks/useLang';
import { adminUi } from '../../lib/admin-strings';

interface Props {
  onLogin: (pat: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export default function LoginButton({ onLogin, loading, error }: Props) {
  const { t } = useLang();
  const [pat, setPat] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pat.trim()) await onLogin(pat.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <form onSubmit={handleSubmit} className="text-center max-w-sm space-y-4 px-4">
        <h1 className="text-2xl text-text-hover">{t(adminUi.admin)}</h1>

        <p className="text-text text-sm">
          {t({
            ru: 'Введите ваш GitHub Personal Access Token',
            en: 'Enter your GitHub Personal Access Token',
            uk: 'Введіть ваш GitHub Personal Access Token',
          })}
        </p>

        <input
          type="password"
          value={pat}
          onChange={(e) => setPat(e.target.value)}
          placeholder="ghp_xxxxxxxxxxxx"
          autoFocus
          className="w-full px-4 py-3 bg-bg-card border border-white/10 rounded-lg text-text-hover placeholder:text-text/50 focus:outline-none focus:border-accent transition-colors font-mono text-sm"
        />

        <button
          type="submit"
          disabled={loading || !pat.trim()}
          className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          {loading
            ? t({ ru: 'Проверка...', en: 'Verifying...', uk: 'Перевірка...' })
            : t(adminUi.signIn)}
        </button>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <details className="text-left">
          <summary className="text-text text-xs cursor-pointer hover:text-text-hover">
            {t({
              ru: 'Как получить токен?',
              en: 'How to get a token?',
              uk: 'Як отримати токен?',
            })}
          </summary>
          <ol className="text-text text-xs mt-2 space-y-1 list-decimal list-inside">
            <li>
              {t({
                ru: 'Откройте',
                en: 'Go to',
                uk: 'Відкрийте',
              })}{' '}
              <a
                href="https://github.com/settings/tokens?type=beta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                GitHub Token Settings
              </a>
            </li>
            <li>{t({ ru: 'Нажмите "Generate new token"', en: 'Click "Generate new token"', uk: 'Натисніть "Generate new token"' })}</li>
            <li>{t({ ru: 'Выберите репозиторий tclub', en: 'Select the tclub repository', uk: 'Оберіть репозиторій tclub' })}</li>
            <li>{t({ ru: 'Включите: Contents (Read/Write), Issues (Read/Write)', en: 'Enable: Contents (Read/Write), Issues (Read/Write)', uk: 'Увімкніть: Contents (Read/Write), Issues (Read/Write)' })}</li>
            <li>{t({ ru: 'Скопируйте и вставьте токен выше', en: 'Copy and paste the token above', uk: 'Скопіюйте та вставте токен вище' })}</li>
          </ol>
        </details>
      </form>
    </div>
  );
}
