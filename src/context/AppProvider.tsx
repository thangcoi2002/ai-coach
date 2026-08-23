import React, { createContext, useContext, useMemo, useState } from 'react';

type User = {
  id: string;
  name: string;
} | null;

type AppContextValue = {
  user: User;
  setUser: (user: User) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
