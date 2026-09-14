import axios from 'axios';
import { API_URL } from '@env';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

/** RFC 4122-ish v4 UUID — Hermes has no `crypto.randomUUID`, and this is just a trace id. */
function generateRequestId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
    const random = Math.floor(Math.random() * 16);
    const value = char === 'x' ? random : (random % 4) + 8;
    return value.toString(16);
  });
}

api.interceptors.request.use(config => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  config.headers['X-Request-Id'] = generateRequestId();
  return config;
});
