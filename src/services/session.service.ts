import * as Keychain from 'react-native-keychain';
import type { Session } from '@/types/auth.type';

const KEYCHAIN_SERVICE = 'ai-coach-session';

export class SessionService {
  static async saveSession(session: Session): Promise<void> {
    await Keychain.setGenericPassword('session', JSON.stringify(session), {
      service: KEYCHAIN_SERVICE,
    });
  }

  static async loadSession(): Promise<Session | null> {
    const credentials = await Keychain.getGenericPassword({ service: KEYCHAIN_SERVICE });
    if (!credentials) {
      return null;
    }
    try {
      return JSON.parse(credentials.password) as Session;
    } catch {
      return null;
    }
  }

  static async clearSession(): Promise<void> {
    await Keychain.resetGenericPassword({ service: KEYCHAIN_SERVICE });
  }
}
