import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getSettings, updateSettings } from '@/services/setting.service';
import { DEFAULT_SETTINGS_VALUE } from '@/constant/local-storage';
import type { Setting } from '@/types/setting.type';

type SettingContextValue = Setting & {
  loading: boolean;
  editSetting: (patch: Partial<Setting>) => Promise<void>;
};

const SettingContext = createContext<SettingContextValue | undefined>(undefined);

export function SettingProvider({ children }: { children: React.ReactNode }) {
  const [setting, setSetting] = useState<Setting>(DEFAULT_SETTINGS_VALUE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings()
      .then(setSetting)
      .finally(() => setLoading(false));
  }, []);

  const editSetting = useCallback(async (patch: Partial<Setting>) => {
    setSetting(await updateSettings(patch));
  }, []);

  const value = useMemo(
    () => ({ ...setting, loading, editSetting }),
    [setting, loading, editSetting],
  );

  return <SettingContext.Provider value={value}>{children}</SettingContext.Provider>;
}

export function useSetting() {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error('useSetting must be used within a SettingProvider');
  }
  return context;
}
