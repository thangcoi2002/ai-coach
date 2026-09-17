import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';
import { API_URL } from '@env';

class ApiService {
  public readonly client: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
  });

  private authToken: string | null = null;

  constructor() {
    this.client.interceptors.request.use(this.attachAuthHeader);
  }

  public setAuthToken(token: string | null) {
    this.authToken = token;
  }

  // Arrow field, not a method, so `this` still points at the instance when axios
  // calls it as a bare callback.
  private attachAuthHeader = (config: InternalAxiosRequestConfig) => {
    if (this.authToken) {
      config.headers.Authorization = `Bearer ${this.authToken}`;
    }
    return config;
  };
}

export const apiService = new ApiService();
