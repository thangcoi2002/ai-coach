import { MOCK_NOTIFICATIONS } from '@/mock/notifications.mock';
import type { Notification } from '@/types/notification.type';

export class NotificationService {
  /** TODO: return the API response once Backend chính ships a GET /notifications endpoint. */
  static async fetchNotifications(): Promise<Notification[]> {
    return MOCK_NOTIFICATIONS;
  }
}
