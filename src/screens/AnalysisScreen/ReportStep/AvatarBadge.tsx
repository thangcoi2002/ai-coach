import React from 'react';
import { Text, View } from 'react-native';
import { brand } from '@/theme/colors';

type Props = {
  initial: string;
  size?: number;
  /** The user's own avatar reads as ink instead of the other person's coral tint. */
  tone?: 'me' | 'them';
  className?: string;
};

/** Circle-with-initial stand-in for a real avatar photo, matching HomeHeader's pattern. */
export default function AvatarBadge({ initial, size = 32, tone = 'them', className = '' }: Props) {
  const isMe = tone === 'me';
  return (
    <View
      className={`items-center justify-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: isMe ? brand.ink : brand.accentTint,
      }}>
      <Text
        style={{ fontSize: size * 0.42, color: isMe ? '#FFFFFF' : brand.accentPressed }}
        className="font-bold">
        {initial}
      </Text>
    </View>
  );
}
