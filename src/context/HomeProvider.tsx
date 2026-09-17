import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAuth } from '@/context/AuthProvider';
import { HomeService } from '@/services/home.service';
import type { HomeData } from '@/types/home.type';

type HomeContextValue = {
  /** Null before the first successful fetch, while loading, or after a failed fetch. */
  home: HomeData | null;
  isLoading: boolean;
  /** Re-fetches from GET /api/home. Any screen can call this after doing something
   * that changes what Home shows (finishing a session, checking off a commitment)
   * so Home is fresh the next time it's visited, instead of only refetching on its
   * own mount. */
  refresh: () => Promise<void>;
};

const HomeContext = createContext<HomeContextValue | undefined>(undefined);

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [home, setHome] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      setHome(await HomeService.getHome());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refresh();
    } else {
      setHome(null);
      setIsLoading(false);
    }
  }, [isAuthenticated, refresh]);

  const value = useMemo(() => ({ home, isLoading, refresh }), [home, isLoading, refresh]);

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export function useHome() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHome must be used within a HomeProvider');
  }
  return context;
}
