import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { setAuthToken } from '../services/api';
import {
  clearSession,
  loadSession,
  requestOtp as requestOtpRequest,
  saveSession,
  verifyOtp as verifyOtpRequest,
  type AuthUser,
} from '../services/auth.service';

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  requestOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSession()
      .then(session => {
        if (session) {
          setAuthToken(session.token);
          setUser(session.user);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const requestOtp = async (email: string) => {
    await requestOtpRequest(email);
  };

  const verifyOtp = async (email: string, code: string) => {
    const session = await verifyOtpRequest(email, code);
    await saveSession(session);
    setAuthToken(session.token);
    setUser(session.user);
  };

  const logout = async () => {
    await clearSession();
    setAuthToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: user != null, isLoading, requestOtp, verifyOtp, logout }),
    [user, isLoading],
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
