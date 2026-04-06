import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useMonth } from '../hooks/useContent';
import { useLang } from '../hooks/useLang';
import { adminUi } from '../lib/admin-strings';
import LoginButton from '../components/admin/LoginButton';
import MonthList from '../components/admin/MonthList';
import MonthEditor from '../components/admin/MonthEditor';
import IssueForm from '../components/admin/IssueForm';

type View = 'list' | 'add' | 'edit' | 'bug' | 'enhancement';

export default function AdminPage() {
  const { t } = useLang();
  const { token, username, avatarUrl, loading, error, login, logout } = useAuth();
  const [view, setView] = useState<View>('list');
  const [editMonthId, setEditMonthId] = useState<string | undefined>();
  const editMonth = useMonth(editMonthId);

  if (!token) {
    return (
      <LoginButton
        onLogin={login}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <main className="pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl text-text-hover font-light">{t(adminUi.admin)}</h1>
          <div className="flex items-center gap-3">
            {avatarUrl && (
              <img src={avatarUrl} alt="" className="w-6 h-6 rounded-full" />
            )}
            <span className="text-text text-sm">{username}</span>
            <button onClick={logout} className="text-accent text-sm hover:underline">
              {t(adminUi.signOut)}
            </button>
          </div>
        </div>

        {view === 'list' && (
          <div className="space-y-8">
            <MonthList
              onEdit={(id) => { setEditMonthId(id); setView('edit'); }}
              onAdd={() => { setEditMonthId(undefined); setView('add'); }}
            />

            <div className="border-t border-white/10 pt-8 grid md:grid-cols-2 gap-6">
              <button
                onClick={() => setView('enhancement')}
                className="p-4 bg-bg-card rounded-lg text-left hover:bg-white/[0.06] transition-colors"
              >
                <h3 className="text-text-hover font-medium mb-1">{t(adminUi.submitRequest)}</h3>
                <p className="text-text text-sm">{t({ ru: 'Предложить улучшение сайта', en: 'Suggest a website improvement', uk: 'Запропонувати покращення сайту' })}</p>
              </button>
              <button
                onClick={() => setView('bug')}
                className="p-4 bg-bg-card rounded-lg text-left hover:bg-white/[0.06] transition-colors"
              >
                <h3 className="text-text-hover font-medium mb-1">{t(adminUi.reportBug)}</h3>
                <p className="text-text text-sm">{t({ ru: 'Сообщить о проблеме на сайте', en: 'Report a website issue', uk: 'Повідомити про проблему на сайті' })}</p>
              </button>
            </div>
          </div>
        )}

        {view === 'add' && (
          <MonthEditor token={token} onDone={() => setView('list')} />
        )}

        {view === 'edit' && editMonth && (
          <MonthEditor token={token} existing={editMonth} onDone={() => setView('list')} />
        )}

        {(view === 'bug' || view === 'enhancement') && (
          <div>
            <button
              onClick={() => setView('list')}
              className="text-accent text-sm hover:underline mb-6 inline-block"
            >
              &larr; {t(adminUi.cancel)}
            </button>
            <IssueForm token={token} type={view} />
          </div>
        )}
      </div>
    </main>
  );
}
