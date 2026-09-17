import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAuth } from '@/context/AuthProvider';
import { SkillService } from '@/services/skill.service';
import type { DiagnosisResult } from '@/types/diagnostic.type';
import type { Skill } from '@/types/skill.type';

type SkillsContextValue = {
  /** Null before the first successful fetch (or after logout) — not the same as an empty catalog. */
  skills: Skill[] | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
  /**
   * Folds a just-finished diagnosis into the cache so a screen navigated to right
   * after (e.g. Home) can render the new level immediately, without waiting on a
   * fresh GET /api/skills round-trip. The next `refresh()` still reconciles against
   * the server, which stays the actual source of truth.
   */
  applyDiagnosisResult: (result: DiagnosisResult) => void;
};

const SkillsContext = createContext<SkillsContextValue | undefined>(undefined);

export function SkillsProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [skills, setSkills] = useState<Skill[] | null>(null);
  // Starts true (rather than only while a fetch is in flight) so RootNavigator keeps
  // holding the splash screen through the render right after login, before this
  // provider's own effect has had a chance to kick off the real fetch.
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      setSkills(await SkillService.getSkills());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refresh();
    } else {
      setSkills(null);
      setIsLoading(false);
    }
  }, [isAuthenticated, refresh]);

  const applyDiagnosisResult = useCallback((result: DiagnosisResult) => {
    setSkills(current => {
      if (!current) {
        return current;
      }
      const measuredById = new Map(result.skills.map(skill => [skill.id, skill]));
      return current.map(skill => {
        const measured = measuredById.get(skill.id);
        return measured
          ? { ...skill, currentLevel: measured.level, currentScore: measured.score }
          : skill;
      });
    });
  }, []);

  const value = useMemo(
    () => ({ skills, isLoading, refresh, applyDiagnosisResult }),
    [skills, isLoading, refresh, applyDiagnosisResult],
  );

  return <SkillsContext.Provider value={value}>{children}</SkillsContext.Provider>;
}

export function useSkills() {
  const context = useContext(SkillsContext);
  if (!context) {
    throw new Error('useSkills must be used within a SkillsProvider');
  }
  return context;
}
