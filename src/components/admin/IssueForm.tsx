import { useState } from 'react';
import { useLang } from '../../hooks/useLang';
import { adminUi } from '../../lib/admin-strings';
import { createIssue } from '../../lib/github';

interface Props {
  token: string;
  type: 'bug' | 'enhancement';
}

export default function IssueForm({ token, type }: Props) {
  const { t } = useLang();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [autoImplement, setAutoImplement] = useState(true);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [issueUrl, setIssueUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    try {
      const labels: string[] = [type];
      if (autoImplement) labels.push('claude-code');
      const url = await createIssue(token, title, body, labels);
      setIssueUrl(url);
      setStatus('success');
      setTitle('');
      setBody('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg text-text-hover font-medium">
        {type === 'bug' ? t(adminUi.reportBug) : t(adminUi.submitRequest)}
      </h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t(adminUi.issueTitle)}
        required
        className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-hover placeholder:text-text/50 focus:outline-none focus:border-accent"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={t(adminUi.issueBody)}
        rows={4}
        required
        className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-hover placeholder:text-text/50 focus:outline-none focus:border-accent resize-none"
      />

      <label className="flex items-center gap-2 text-text text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={autoImplement}
          onChange={(e) => setAutoImplement(e.target.checked)}
          className="accent-accent"
        />
        {t(adminUi.autoImplement)}
      </label>

      <button
        type="submit"
        disabled={status === 'saving'}
        className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
      >
        {status === 'saving' ? t(adminUi.saving) : t(adminUi.submit)}
      </button>

      {status === 'success' && (
        <p className="text-green-400 text-sm">
          {t(adminUi.success)}{' '}
          <a href={issueUrl} target="_blank" rel="noopener noreferrer" className="underline">
            GitHub Issue
          </a>
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-sm">Error creating issue.</p>
      )}
    </form>
  );
}
