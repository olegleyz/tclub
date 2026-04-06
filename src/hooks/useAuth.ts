import { useState, useCallback, useEffect } from 'react';
import {
  requestDeviceCode,
  pollForToken,
  getAuthenticatedUser,
  checkRepoAccess,
  type DeviceCodeResponse,
} from '../lib/github';

const TOKEN_KEY = 'tclub-gh-token';
const USER_KEY = 'tclub-gh-user';

interface AuthState {
  token: string | null;
  username: string | null;
  avatarUrl: string | null;
  loading: boolean;
  deviceCode: DeviceCodeResponse | null;
  error: string | null;
  startLogin: () => Promise<void>;
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
  const [deviceCode, setDeviceCode] = useState<DeviceCodeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Validate stored token on mount
  useEffect(() => {
    if (!token) return;
    getAuthenticatedUser(token).catch(() => {
      // Token expired or revoked
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setToken(null);
      setUsername(null);
      setAvatarUrl(null);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startLogin = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      // Step 1: Get device code
      const dc = await requestDeviceCode();
      setDeviceCode(dc);

      // Step 2: Poll for token (user enters code on github.com)
      const accessToken = await pollForToken(dc.device_code, dc.interval);

      // Step 3: Verify user has repo access
      const user = await getAuthenticatedUser(accessToken);
      const hasAccess = await checkRepoAccess(accessToken);

      if (!hasAccess) {
        setError('You do not have write access to this repository.');
        setDeviceCode(null);
        setLoading(false);
        return;
      }

      // Save
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      setToken(accessToken);
      setUsername(user.login);
      setAvatarUrl(user.avatar_url);
      setDeviceCode(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
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
    setDeviceCode(null);
  }, []);

  return { token, username, avatarUrl, loading, deviceCode, error, startLogin, logout };
}
