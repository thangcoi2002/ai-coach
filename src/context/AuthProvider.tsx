import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { setAuthToken } from '@/services/api';
import {
  clearSession,
  loadSession,
  requestOtp,
  saveSession,
  updateSessionUser,
  verifyOtp as verifyOtpRequest,
} from '@/services/auth.service';
import type { AuthUser, Session } from '@/types/auth.type';

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  requestOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  /** Merges a patch into the signed-in user and persists it, e.g. after the diagnostic gate sets a starting level. */
  updateUser: (patch: Partial<AuthUser>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = session?.user ?? null;

  /** The only place a session reaches both the axios client and React state, so the two can't drift apart. */
  const applySession = useCallback((next: Session | null) => {
    setAuthToken(next?.token ?? null);
    setSession(next);
  }, []);

  useEffect(() => {
    loadSession()
      // A Keychain read that throws must not take the app down with it: the user
      // just starts signed out rather than the boot promise rejecting unhandled.
      .catch(() => null)
      .then(loaded => {
        if (loaded) {
          applySession(loaded);
        }
      })
      .finally(() => setIsLoading(false));
  }, [applySession]);

  const verifyOtp = useCallback(
    async (email: string, code: string) => {
      const next = await verifyOtpRequest(email, code);
      await saveSession(next);
      applySession(next);
    },
    [applySession],
  );

  const logout = useCallback(async () => {
    await clearSession();
    applySession(null);
  }, [applySession]);

  const updateUser = useCallback(
    async (patch: Partial<AuthUser>) => {
      if (!session) {
        return;
      }
      applySession(await updateSessionUser(session, patch));
    },
    [session, applySession],
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user != null,
      isLoading,
      requestOtp,
      verifyOtp,
      logout,
      updateUser,
    }),
    [user, isLoading, verifyOtp, logout, updateUser],
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
