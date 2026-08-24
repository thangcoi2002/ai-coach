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

/** Any 6-digit code passes in dev; this one is the documented happy path. */
export const MOCK_OTP = '123456';

/**
 * TODO: remove the mock branches once Backend chính ships the real
 * /auth/otp/request + /auth/otp/verify pair.
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Asks the backend to email a 6-digit sign-in code. */
export async function requestOtp(email: string): Promise<void> {
  if (__DEV__) {
    await delay(500);
    return;
  }
  await api.post('/auth/otp/request', { email });
}

/** Exchanges the emailed code for a session. */
export async function verifyOtp(email: string, code: string): Promise<Session> {
  if (__DEV__) {
    await delay(500);
    if (!/^\d{6}$/.test(code)) {
      throw new Error('Invalid code');
    }
    return {
      token: 'mock-dev-token',
      user: { id: 'usr_mock_001', name: 'Test User', email },
    };
  }
  const response = await api.post<{ data: Session }>('/auth/otp/verify', { email, code });
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
