import * as Keychain from 'react-native-keychain';
import { mockSession } from '@/mock/auth-session.mock';
import type { AuthUser, Session } from '@/types/auth.type';
import { api } from './api';

const KEYCHAIN_SERVICE = 'ai-coach-session';

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
    return mockSession(email);
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

/**
 * Merges a patch into the signed-in user and persists the result. Takes the caller's
 * session rather than re-reading the Keychain, so a write can't resurrect a session
 * that was cleared meanwhile, and a missing Keychain entry surfaces as a rejection
 * instead of a silently dropped update.
 */
export async function updateSessionUser(
  session: Session,
  patch: Partial<AuthUser>,
): Promise<Session> {
  const next = { ...session, user: { ...session.user, ...patch } };
  await saveSession(next);
  return next;
}

export async function clearSession(): Promise<void> {
  await Keychain.resetGenericPassword({ service: KEYCHAIN_SERVICE });
}
