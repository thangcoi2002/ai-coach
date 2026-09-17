import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { apiService } from '@/services/api';
import { AuthService } from '@/services/auth.service';
import { SessionService } from '@/services/session.service';
import { setAuthRefreshHandlers } from '@/services/token-refresh';
import type { AuthUser, Session } from '@/types/auth.type';

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  /** Dev/debug use only (e.g. copying it for Postman) — never render this to a real user. */
  accessToken: string | null;
  requestOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = session?.user ?? null;

  // The 401 interceptor's refresh handler runs outside React and needs the latest
  // session synchronously, so it reads this ref instead of closing over `session`.
  const sessionRef = useRef<Session | null>(null);

  /** The only place a session reaches both the axios client and React state, so the two can't drift apart. */
  const applySession = useCallback((next: Session | null) => {
    sessionRef.current = next;
    apiService.setAuthToken(next?.accessToken ?? null);
    setSession(next);
  }, []);

  /** Persists a session (or clears it, for `null`) and applies it in one step. */
  const persistSession = useCallback(
    async (next: Session | null) => {
      await (next ? SessionService.saveSession(next) : SessionService.clearSession());
      applySession(next);
    },
    [applySession],
  );

  useEffect(() => {
    SessionService.loadSession()
      // A Keychain read that throws must not take the app down with it: the user
      // just starts signed out rather than the boot promise rejecting unhandled.
      .catch(() => null)
      .then(loaded => loaded && applySession(loaded))
      .finally(() => setIsLoading(false));

    setAuthRefreshHandlers({
      refresh: async () => {
        const current = sessionRef.current;
        if (!current) {
          return null;
        }
        try {
          const pair = await AuthService.refreshTokenPair(current.refreshToken);
          await persistSession({ ...current, ...pair });
          return pair.accessToken;
        } catch {
          return null;
        }
      },
      onFailure: () => {
        persistSession(null);
      },
    });
  }, [applySession, persistSession]);

  const verifyOtp = useCallback(
    async (email: string, code: string) => {
      await persistSession(await AuthService.verifyOtp(email, code));
    },
    [persistSession],
  );

  const logout = useCallback(async () => {
    const refreshToken = session?.refreshToken;
    // Clear locally first so the UI swaps to Login right away; the revoke call is
    // best-effort and must not hold up the local sign-out while it's in flight.
    await persistSession(null);
    if (refreshToken) {
      AuthService.requestLogout(refreshToken).catch(() => {});
    }
  }, [session, persistSession]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user != null,
      isLoading,
      accessToken: session?.accessToken ?? null,
      requestOtp: AuthService.requestOtp,
      verifyOtp,
      logout,
    }),
    [user, isLoading, session, verifyOtp, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
