import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

/** Same 100pt logo the native splash shows, so the handover is invisible. */
const logoSize = { width: 100, height: 100 };

/**
 * Shown whenever the app is between screens with nothing else to render (e.g. skills
 * refetching right after login). Reuses the bootsplash logo/background so it reads as
 * a continuation of the native splash rather than a jarring blank flash.
 */
export default function AppLoadingView() {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });
  const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });

  return (
    <View className="flex-1 items-center justify-center bg-brand-page">
      <Animated.Image
        source={require('../../assets/bootsplash/logo.png')}
        style={[logoSize, { transform: [{ scale }], opacity }]}
        resizeMode="contain"
      />
    </View>
  );
}
