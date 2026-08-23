import * as Keychain from 'react-native-keychain';
import { api } from './api';

const KEYCHAIN_SERVICE = 'ai-coach-session';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type Session = {
  token: string;
  user: AuthUser;
};

export const MOCK_EMAIL = 'test@aicoach.dev';
export const MOCK_PASSWORD = '123456';

/**
 * TODO: remove mockLogin once Backend chính's real /auth/login is ready.
 */
function mockLogin(email: string, password: string): Promise<Session> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
        resolve({
          token: 'mock-dev-token',
          user: { id: 'usr_mock_001', name: 'Test User', email },
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
}

/**
 * Placeholder endpoint — swap for whatever Backend chính defines for login.
 */
export async function login(email: string, password: string): Promise<Session> {
  if (__DEV__) {
    return mockLogin(email, password);
  }
  const response = await api.post<{ data: Session }>('/auth/login', { email, password });
  return response.data.data;
}

export async function saveSession(session: Session): Promise<void> {
  await Keychain.setGenericPassword('session', JSON.stringify(session), {
    service: KEYCHAIN_SERVICE,
  });
}

export async function loadSession(): Promise<Session | null> {
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

export async function clearSession(): Promise<void> {
  await Keychain.resetGenericPassword({ service: KEYCHAIN_SERVICE });
}
