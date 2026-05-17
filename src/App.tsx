import { HashRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LangProvider } from './hooks/useLang';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import MonthDetailPage from './pages/MonthDetailPage';

const AdminPage = lazy(() => import('./pages/AdminPage'));

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/archive/:monthId" element={<MonthDetailPage />} />
          <Route path="/admin" element={
            <Suspense fallback={<Loading />}>
              <AdminPage />
            </Suspense>
          } />
        </Routes>
      </HashRouter>
    </LangProvider>
  );
}
