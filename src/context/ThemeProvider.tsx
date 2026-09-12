import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useColorScheme } from 'nativewind';
import { useSetting } from './SettingProvider';
import { brand, brandDark } from '@/theme/colors';

type ThemeColors = { [K in keyof typeof brand]: string };

const ThemeColorsContext = createContext<ThemeColors>(brand);

/**
 * Syncs the persisted `themeMode` setting into NativeWind's colorScheme (which
 * drives every `dark:` class in the app) and exposes the resolved color object
 * for the few call sites that need a raw color value (icons, placeholderTextColor).
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { themeMode, loading } = useSetting();
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    if (!loading) {
      setColorScheme(themeMode);
    }
  }, [themeMode, loading, setColorScheme]);

  const colors = useMemo(() => (colorScheme === 'dark' ? brandDark : brand), [colorScheme]);

  return <ThemeColorsContext.Provider value={colors}>{children}</ThemeColorsContext.Provider>;
}

/** Resolved theme colors (light or dark) for use outside of className, e.g. icon `color` props. */
export function useThemeColors() {
  return useContext(ThemeColorsContext);
}

/** Resolved scheme, e.g. to pick a StatusBar style. */
export function useIsDarkMode() {
  const { colorScheme } = useColorScheme();
  return colorScheme === 'dark';
}
