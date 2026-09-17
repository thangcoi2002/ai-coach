import type { InternalAxiosRequestConfig } from 'axios';
import { apiService } from './api';

type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean };

let refreshAccessToken: (() => Promise<string | null>) | null = null;
let onRefreshFailed: (() => void) | null = null;
let pendingRefresh: Promise<string | null> | null = null;

/**
 * AuthProvider wires these once it knows how to rotate + persist a session. `refresh`
 * is only ever in flight once at a time — the backend revokes the whole device chain
 * if a rotated refresh token is reused, so concurrent 401s must share a single
 * /auth/refresh call instead of racing.
 */
export function setAuthRefreshHandlers(handlers: {
  refresh: () => Promise<string | null>;
  onFailure: () => void;
}) {
  refreshAccessToken = handlers.refresh;
  onRefreshFailed = handlers.onFailure;
}

apiService.client.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config as RetriableConfig | undefined;
    const status = error.response?.status;
    if (status !== 401 || !config || config._retried || !refreshAccessToken) {
      return Promise.reject(error);
    }
    config._retried = true;

    pendingRefresh ??= refreshAccessToken().finally(() => {
      pendingRefresh = null;
    });
    const nextToken = await pendingRefresh;

    if (!nextToken) {
      onRefreshFailed?.();
      return Promise.reject(error);
    }
    config.headers.Authorization = `Bearer ${nextToken}`;
    return apiService.client(config);
  },
);
