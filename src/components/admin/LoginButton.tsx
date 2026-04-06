import { useLang } from '../../hooks/useLang';
import { adminUi } from '../../lib/admin-strings';
import type { DeviceCodeResponse } from '../../lib/github';

interface Props {
  onLogin: () => void;
  loading: boolean;
  deviceCode: DeviceCodeResponse | null;
  error: string | null;
}

export default function LoginButton({ onLogin, loading, deviceCode, error }: Props) {
  const { t } = useLang();

  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center max-w-sm space-y-6">
        <h1 className="text-2xl text-text-hover">{t(adminUi.admin)}</h1>

        {!deviceCode && !loading && (
          <button
            onClick={onLogin}
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
          >
            {t({ ru: 'Войти через GitHub', en: 'Sign in with GitHub', uk: 'Увійти через GitHub' })}
          </button>
        )}

        {deviceCode && (
          <div className="space-y-4">
            <p className="text-text">
              {t({
                ru: 'Откройте ссылку и введите код:',
                en: 'Open the link and enter the code:',
                uk: 'Відкрийте посилання та введіть код:',
              })}
            </p>
            <a
              href={deviceCode.verification_uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline block"
            >
              {deviceCode.verification_uri}
            </a>
            <div className="text-3xl font-mono text-text-hover tracking-widest bg-bg-card rounded-lg py-4">
              {deviceCode.user_code}
            </div>
            <div className="flex items-center justify-center gap-2 text-text text-sm">
              <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              {t({ ru: 'Ожидание авторизации...', en: 'Waiting for authorization...', uk: 'Очікування авторизації...' })}
            </div>
          </div>
        )}

        {loading && !deviceCode && (
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        )}

        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
}
