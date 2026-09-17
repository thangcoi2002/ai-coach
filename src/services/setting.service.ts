import type { Setting } from '@/types/setting.type';
import { DEFAULT_SETTINGS_VALUE, LOCAL_STORAGE_KEYS } from '@/constant/local-storage';
import { LocalStorageService } from './storage.service';

export class SettingService {
  static async getSettings(): Promise<Setting> {
    const settings = await LocalStorageService.getOne<Setting>(LOCAL_STORAGE_KEYS.SETTINGS);
    if (!settings) {
      await LocalStorageService.setOne(LOCAL_STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS_VALUE);
      return { ...DEFAULT_SETTINGS_VALUE };
    }

    // Merge over defaults so a field added later (not yet in already-persisted data) still has a value.
    return { ...DEFAULT_SETTINGS_VALUE, ...settings };
  }

  static async updateSettings(patch: Partial<Setting>): Promise<Setting> {
    const current = await SettingService.getSettings();
    const next = { ...current, ...patch };
    await LocalStorageService.setOne(LOCAL_STORAGE_KEYS.SETTINGS, next);
    return next;
  }
}
