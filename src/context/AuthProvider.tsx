import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { setAuthToken } from '../services/api';
import {
  clearSession,
  loadSession,
  login as loginRequest,
  saveSession,
  type AuthUser,
} from '../services/auth.service';

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
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

  const login = async (email: string, password: string) => {
    const session = await loginRequest(email, password);
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
    () => ({ user, isAuthenticated: user != null, isLoading, login, logout }),
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
