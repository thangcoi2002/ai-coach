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

api.interceptors.request.use(config => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
