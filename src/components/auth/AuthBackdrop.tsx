import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { brand } from '../../theme/colors';

/**
 * The warm glow behind the auth screens:
 * `radial-gradient(120% 70% at 50% -10%, #FBD9CB 0%, #FDEEE7 45%, transparent 78%)`
 * over the flat app background.
 */
export default function AuthBackdrop() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View className="flex-1 bg-brand-bg" />
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="authGlow" cx="50%" cy="-10%" rx="120%" ry="70%">
            <Stop offset="0" stopColor={brand.gradientFrom} stopOpacity="1" />
            <Stop offset="0.45" stopColor={brand.gradientTo} stopOpacity="1" />
            <Stop offset="0.78" stopColor={brand.gradientTo} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#authGlow)" />
      </Svg>
    </View>
  );
}
