import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getSettings, updateSettings } from '@/services/setting.service';
import { LocalStorageService } from '@/services/storage.service';
import { DEFAULT_SETTINGS_VALUE } from '@/constant/local-storage';
import type { Setting } from '@/types/setting.type';

type SettingContextValue = Setting & {
  loading: boolean;
  editSetting: (patch: Partial<Setting>) => Promise<void>;
  /** Wipes everything kept on the device and returns the app to its defaults. */
  resetLocalData: () => Promise<void>;
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

  // Clears the whole store, not just the settings key: settings are all that is kept
  // in AsyncStorage today, and the point is to leave nothing behind from a past run.
  const resetLocalData = useCallback(async () => {
    await LocalStorageService.removeAll();
    setSetting(DEFAULT_SETTINGS_VALUE);
  }, []);

  const value = useMemo(
    () => ({ ...setting, loading, editSetting, resetLocalData }),
    [setting, loading, editSetting, resetLocalData],
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
