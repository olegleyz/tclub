import { useState, useCallback, useEffect } from 'react';
import { getAuthenticatedUser, checkRepoAccess } from '../lib/github';

const TOKEN_KEY = 'tclub-gh-token';
const USER_KEY = 'tclub-gh-user';

interface AuthState {
  token: string | null;
  username: string | null;
  avatarUrl: string | null;
  loading: boolean;
  error: string | null;
  login: (pat: string) => Promise<boolean>;
  logout: () => void;
}

export function useAuth(): AuthState {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [username, setUsername] = useState<string | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored).login : null;
  });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored).avatar_url : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate stored token on mount
  useEffect(() => {
    if (!token) return;
    getAuthenticatedUser(token).catch(() => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setToken(null);
      setUsername(null);
      setAvatarUrl(null);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback(async (pat: string): Promise<boolean> => {
    setError(null);
    setLoading(true);
    try {
      const user = await getAuthenticatedUser(pat);
      const hasAccess = await checkRepoAccess(pat);

      if (!hasAccess) {
        setError('No write access to this repository. Make sure you are a collaborator.');
        setLoading(false);
        return false;
      }

      localStorage.setItem(TOKEN_KEY, pat);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      setToken(pat);
      setUsername(user.login);
      setAvatarUrl(user.avatar_url);
      return true;
    } catch {
      setError('Invalid token. Please check and try again.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUsername(null);
    setAvatarUrl(null);
  }, []);

  return { token, username, avatarUrl, loading, error, login, logout };
}
