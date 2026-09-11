import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Generic key/value engine on top of AsyncStorage.
 * Values are JSON-serialized so `getOne`/`setOne` can carry arbitrary `T`.
 */
export class LocalStorageService {
  static async getOne<T = unknown>(key: string): Promise<T | undefined> {
    const raw = await AsyncStorage.getItem(key);
    return raw === null ? undefined : parse<T>(raw);
  }

  static async setOne<T = unknown>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  static async removeOne(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  static async removeAll(): Promise<void> {
    await AsyncStorage.clear();
  }
}

function parse<T>(raw: string): T | undefined {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}
