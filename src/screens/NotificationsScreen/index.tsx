import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNotifications } from '@/context/NotificationProvider';
import type { Notification } from '@/types/notification.type';

function NotificationCard({ notification }: { notification: Notification }) {
  return (
    <View
      className={`rounded-[20px] border border-brand-ink/10 p-4 dark:border-brandDark-ink/10 ${
        notification.unread
          ? 'bg-brand-surface dark:bg-brandDark-surface'
          : 'bg-brand-card dark:bg-brandDark-card'
      }`}>
      <View className="flex-row items-start justify-between gap-2.5">
        <Text className="min-w-0 flex-1 text-[15px] font-bold leading-[22.5px] text-brand-ink dark:text-brandDark-ink">
          {notification.title}
        </Text>
        {notification.unread && (
          <View className="mt-[5px] h-[7px] w-[7px] rounded-full bg-brand-accent dark:bg-brandDark-accent" />
        )}
      </View>
      <Text className="mt-[5px] text-[13px] font-medium leading-[19.5px] text-brand-ink/60 dark:text-brandDark-ink/60">
        {notification.body}
      </Text>
      <View className="mt-[11px] flex-row items-center gap-2">
        <View className="rounded-full bg-brand-card px-2.5 py-[5px] dark:bg-brandDark-card">
          <Text className="text-[11px] font-bold text-brand-ink dark:text-brandDark-ink">
            {notification.cta}
          </Text>
        </View>
        <Text className="text-[11px] font-medium text-brand-ink/50 dark:text-brandDark-ink/50">
          {notification.when}
        </Text>
      </View>
    </View>
  );
}

export default function NotificationsScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const { notifications } = useNotifications();

  return (
    <View className="flex-1 bg-brand-page dark:bg-brandDark-page">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="h-[34px] items-center justify-center">
          <Text className="text-[15px] font-bold text-brand-ink dark:text-brandDark-ink">
            Thông báo
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-[9px] px-5 pt-3"
          contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
          showsVerticalScrollIndicator={false}>
          {notifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
