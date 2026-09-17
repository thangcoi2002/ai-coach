import type { SurveyQuestion } from '@/types/diagnostic.type';
import { apiService } from './api';

export class DiagnosisService {
  /** The 15 situational questions behind the "Trả lời khảo sát nhanh" gate step. */
  static async getSurveyQuestions(): Promise<SurveyQuestion[]> {
    const response = await apiService.client.get<{ data: SurveyQuestion[] }>(
      '/diagnosis/survey/questions',
    );
    return response.data.data;
  }
}
