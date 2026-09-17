import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { NotificationService } from '@/services/notification.service';
import type { Notification } from '@/types/notification.type';

type NotificationContextValue = {
  notifications: Notification[];
  unreadCount: number;
};

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    NotificationService.fetchNotifications().then(setNotifications);
  }, []);

  const value = useMemo<NotificationContextValue>(
    () => ({
      notifications,
      unreadCount: notifications.filter(notification => notification.unread).length,
    }),
    [notifications],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
