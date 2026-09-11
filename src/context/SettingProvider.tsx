import React, { createContext, useCallback, useEffect, useState } from 'react';
import { SettingService } from '@/services/setting.service';
import type { Setting } from '@/types/setting.type';

const SettingContext = createContext<{
  setting: Setting;
  editSetting: (setting: Partial<Setting>) => Promise<void>;
  loading: boolean;
} | null>(null);

export function SettingProvider({ children }: { children: React.ReactNode }) {
  const [setting, setSetting] = useState<Setting>({ showOnboarding: true });
  const [loading, setLoading] = useState(true);

  const editSetting = useCallback(async (patch: Partial<Setting>) => {
    const newSetting = await SettingService.updateSettings(patch);
    setSetting(newSetting);
  }, []);

  useEffect(() => {
    SettingService.getSettings()
      .then(setSetting)
      .finally(() => setLoading(false));
  }, []);

  return (
    <SettingContext.Provider value={{ setting, editSetting, loading }}>
      {children}
    </SettingContext.Provider>
  );
}

export const useSetting = () => {
  const context = React.useContext(SettingContext);
  if (!context) {
    throw new Error('useSetting must be used within a SettingProvider');
  }
  return { ...context.setting, loading: context.loading };
};

export const useEditSetting = () => {
  const context = React.useContext(SettingContext);
  if (!context) {
    throw new Error('useEditSetting must be used within a SettingProvider');
  }
  return context.editSetting;
};
