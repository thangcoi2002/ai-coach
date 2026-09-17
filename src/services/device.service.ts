import { LOCAL_STORAGE_KEYS } from '@/constant/local-storage';
import { LocalStorageService } from './storage.service';

function generateDeviceId(): string {
  return `dev_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

export class DeviceService {
  /**
   * Stable per-install id that keys the refresh-token chain on the backend. Must never
   * change once issued, or the next /auth/verify-otp starts a chain the server can't
   * tell apart from a new device.
   */
  static async getDeviceId(): Promise<string> {
    const existing = await LocalStorageService.getOne<string>(LOCAL_STORAGE_KEYS.DEVICE_ID);
    if (existing) {
      return existing;
    }
    const id = generateDeviceId();
    await LocalStorageService.setOne(LOCAL_STORAGE_KEYS.DEVICE_ID, id);
    return id;
  }
}
