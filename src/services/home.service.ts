import type { HomeData } from '@/types/home.type';
import { apiService } from './api';

export class HomeService {
  /** AK-44 · Màn 12. One request for everything the home screen needs. */
  static async getHome(): Promise<HomeData> {
    const response = await apiService.client.get<{ data: HomeData }>('/home');
    return response.data.data;
  }
}
