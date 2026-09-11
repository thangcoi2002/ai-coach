import React, { useContext } from 'react';
import { Pressable, Text, View, type LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomTabBarHeightCallbackContext,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { Bell, ChartNoAxesCombined, Dumbbell, Home } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { brand } from '@/theme/colors';
import type { MainTabParamList } from './types';

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

export default function CustomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const reportHeight = useContext(BottomTabBarHeightCallbackContext);

  const handleLayout = (event: LayoutChangeEvent) => {
    reportHeight?.(event.nativeEvent.layout.height);
  };

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
              </View>
              <Text
                className={`text-[11px] ${
                  isFocused
                    ? 'font-bold text-brand-accent'
                    : 'font-medium text-brand-body'
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
