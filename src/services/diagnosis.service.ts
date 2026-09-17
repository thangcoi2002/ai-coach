import type {
  DiagnosisResult,
  IntakeMethod,
  SurveyAnswer,
  SurveyQuestion,
} from '@/types/diagnostic.type';
import { apiService } from './api';

export class DiagnosisService {
  /** Màn 06 · Opens one diagnosis intake; the returned id threads through every later step as intakeId. */
  static async startIntake(method: IntakeMethod): Promise<string> {
    const response = await apiService.client.post<{ data: { id: string } }>('/diagnosis/intake', {
      method,
    });
    return response.data.data.id;
  }

  /** The 15 situational questions behind the "Trả lời khảo sát nhanh" gate step. */
  static async getSurveyQuestions(): Promise<SurveyQuestion[]> {
    const response = await apiService.client.get<{ data: SurveyQuestion[] }>(
      '/diagnosis/survey/questions',
    );
    return response.data.data;
  }

  /** Màn 08 · Submits the survey. Scores and skills are computed server-side from the answers. */
  static async submitSurvey(intakeId: string, answers: SurveyAnswer[]): Promise<void> {
    await apiService.client.post('/diagnosis/survey/submit', { intakeId, answers });
  }

  /** Màn 11 · Result of a finished intake — per-skill score/level, and the starting point to save onto the user. */
  static async getResult(intakeId: string): Promise<DiagnosisResult> {
    const response = await apiService.client.get<{ data: DiagnosisResult }>(
      `/diagnosis/${intakeId}/result`,
    );
    return response.data.data;
  }
}
