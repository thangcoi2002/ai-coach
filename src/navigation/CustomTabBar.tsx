import React, { useContext, useEffect } from 'react';
import { Pressable, Text, View, type LayoutChangeEvent, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomTabBarHeightCallbackContext,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { Bell, ChartNoAxesCombined, Dumbbell, Home } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useNotifications } from '@/context/NotificationProvider';
import { MAIN_TAB_ROUTES, type MainTabParamList } from './routes';
import { brand } from '@/theme/colors';

const ICONS: Record<keyof MainTabParamList, LucideIcon> = {
  Home,
  Practice: Dumbbell,
  Analysis: ChartNoAxesCombined,
  Notifications: Bell,
};

const LABELS: Record<keyof MainTabParamList, string> = {
  Home: 'Trang chủ',
  Practice: 'Luyện tập',
  Analysis: 'Phân tích',
  Notifications: 'Thông báo',
};

const shadowStyle = {
  shadowColor: '#333',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 20,
  elevation: 8,
};

export default function CustomTabBar({ state, navigation, descriptors }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const reportHeight = useContext(BottomTabBarHeightCallbackContext);
  const { unreadCount } = useNotifications();

  const handleLayout = (event: LayoutChangeEvent) => {
    reportHeight?.(event.nativeEvent.layout.height);
  };

  // A full-bleed step (Analysis's `processing` / `redo`) sets its own `tabBarStyle`
  // option to ask for this — the same option key + `{ display: 'none' }` value the
  // built-in tab bar honors, just read here ourselves since ours is custom. Reading
  // it off the *focused* route's descriptor means there's nothing to clean up on
  // blur: switching to another tab reads that tab's own (unset) option instead.
  const focusedRoute = state.routes[state.index];
  const tabBarStyle = descriptors[focusedRoute.key].options.tabBarStyle as ViewStyle | undefined;
  const hidden = tabBarStyle?.display === 'none';

  useEffect(() => {
    if (hidden) {
      reportHeight?.(0);
    }
  }, [hidden, reportHeight]);

  if (hidden) {
    return null;
  }

  return (
    <View
      pointerEvents="box-none"
      onLayout={handleLayout}
      className="absolute inset-x-0 bottom-0 px-4 pt-2"
      style={{ paddingBottom: Math.max(insets.bottom - 10, 8) }}>
      <View
        className="flex-row rounded-[28px] border border-brand-ink/5 bg-brand-surface px-2 py-2"
        style={shadowStyle}>
        {state.routes.map((route, index) => {
          const routeName = route.name as keyof MainTabParamList;
          const isFocused = state.index === index;
          const Icon = ICONS[routeName];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              className="flex-1 items-center gap-1 py-1">
              <View
                className={`h-9 w-9 items-center justify-center rounded-[14px] ${
                  isFocused ? 'bg-brand-accent-tint' : ''
                }`}>
                <Icon
                  color={isFocused ? brand.accent : brand.body}
                  size={22}
                  strokeWidth={isFocused ? 2.25 : 2}
                />
                {routeName === MAIN_TAB_ROUTES.NOTIFICATIONS && unreadCount > 0 && (
                  <View className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-accent" />
                )}
              </View>
              <Text
                className={`text-[11px] ${
                  isFocused ? 'font-bold text-brand-accent' : 'font-medium text-brand-body'
                }`}>
                {LABELS[routeName]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
