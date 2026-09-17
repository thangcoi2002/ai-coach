import { Setting } from '@/types/setting.type';

export const LOCAL_STORAGE_KEYS = {
  SETTINGS: 'settings',
  DEVICE_ID: 'device_id',
} as const;

export const DEFAULT_SETTINGS_VALUE: Setting = {
  showOnboarding: true,
};
