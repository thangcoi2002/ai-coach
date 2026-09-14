import type { Session } from '@/types/auth.type';

/** Any 6-digit code passes in dev; this one is the documented happy path. */
export const MOCK_OTP = '123456';

/** Session handed back by the dev sign-in branch, before the real OTP endpoints ship. */
export function mockSession(email: string): Session {
  return {
    token: 'mock-dev-token',
    user: { id: 'usr_mock_001', name: 'Test User', email, level: null },
  };
}
