import { Platform } from 'react-native';
import type { AuthUser, Session } from '@/types/auth.type';
import { DeviceService } from './device.service';
import { apiService } from './api';

type TokenPair = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export class AuthService {
  /** Asks the backend to email a 6-digit sign-in code. Always resolves, even for an unknown email. */
  static async requestOtp(email: string): Promise<void> {
    await apiService.client.post('/auth/request-otp', { email });
  }

  /** Exchanges the emailed code for a token pair, then hydrates the signed-in user. */
  static async verifyOtp(email: string, code: string): Promise<Session> {
    const deviceId = await DeviceService.getDeviceId();
    const response = await apiService.client.post<{ data: TokenPair }>('/auth/verify-otp', {
      email,
      code,
      deviceId,
      deviceName: `${Platform.OS} app`,
    });
    const { accessToken, refreshToken } = response.data.data;

    // /auth/verify-otp only returns the token pair — the user profile comes from /me,
    // and that call needs the access token just returned, not whatever is currently applied.
    apiService.setAuthToken(accessToken);
    const user = await AuthService.fetchMe();

    return { accessToken, refreshToken, user };
  }

  /** Rotates the token pair. Must not be called concurrently — rotating revokes both old tokens immediately. */
  static async refreshTokenPair(refreshToken: string): Promise<TokenPair> {
    const response = await apiService.client.post<{ data: TokenPair }>('/auth/refresh', {
      refreshToken,
    });
    return response.data.data;
  }

  /** Revokes the given refresh token server-side. Best-effort: local sign-out proceeds regardless. */
  static async requestLogout(refreshToken: string): Promise<void> {
    await apiService.client.post('/auth/logout', { refreshToken });
  }

  private static async fetchMe(): Promise<AuthUser> {
    const response = await apiService.client.get<{ data: AuthUser }>('/me');
    return response.data.data;
  }
}
