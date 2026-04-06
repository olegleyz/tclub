import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Lang, LocalizedString } from '../types/month';

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (s: LocalizedString) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = 'tclub-lang';

function getInitialLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'ru' || stored === 'en' || stored === 'uk') return stored;
  const browserLang = navigator.language.slice(0, 2);
  if (browserLang === 'uk') return 'uk';
  if (browserLang === 'en') return 'en';
  return 'ru';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback((s: LocalizedString) => s[lang] || s.ru, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
