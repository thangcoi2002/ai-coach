import { MOCK_NOTIFICATIONS } from '@/mock/notifications.mock';
import type { Notification } from '@/types/notification.type';

/** TODO: return the API response once Backend chính ships a GET /notifications endpoint. */
export async function fetchNotifications(): Promise<Notification[]> {
  return MOCK_NOTIFICATIONS;
}
