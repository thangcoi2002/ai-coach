import type { Skill } from '@/types/skill.type';
import { apiService } from './api';

export class SkillService {
  /** The program's skill catalog, with this user's lock state and current level per skill. */
  static async getSkills(): Promise<Skill[]> {
    const response = await apiService.client.get<{ data: Skill[] }>('/skills');
    return response.data.data;
  }
}
