import '@/global.css';

import {
  JetBrainsMono_400Regular,
  JetBrainsMono_600SemiBold,
} from '@expo-google-fonts/jetbrains-mono';
import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  Rubik_800ExtraBold,
} from '@expo-google-fonts/rubik';
import { PortalHost } from '@rn-primitives/portal';
import { useFonts } from 'expo-font';
import { DefaultTheme, Stack, ThemeProvider, type Theme } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Uniwind, useCSSVariable } from 'uniwind';

export { ErrorBoundary } from 'expo-router';

// Uygulama yalnızca açık temalı; cihaz koyu moddayken de açık kalır.
Uniwind.setTheme('light');

// Yazı tipleri yüklenene kadar açılış ekranı açık kalır.
SplashScreen.preventAutoHideAsync();

// Gezinme renkleri de tema dosyasından (src/global.css) okunur, burada renk yazılmaz.
function useNavigationTheme(): Theme {
  const [background, card, text, border, primary, notification] = useCSSVariable([
    '--color-background',
    '--color-card',
    '--color-foreground',
    '--color-border',
    '--color-primary',
    '--color-destructive',
  ]);

  return {
    ...DefaultTheme,
    colors: {
      background: String(background),
      card: String(card),
      text: String(text),
      border: String(border),
      primary: String(primary),
      notification: String(notification),
    },
  };
}

export default function RootLayout() {
  const navigationTheme = useNavigationTheme();
  // Ailelerin adları src/global.css'teki --font-* değerleriyle aynı olmalı.
  const [fontsLoaded, fontError] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    Rubik_800ExtraBold,
    JetBrainsMono_400Regular,
    JetBrainsMono_600SemiBold,
  });
  const ready = fontsLoaded || fontError !== null;

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
      <PortalHost />
    </ThemeProvider>
  );
}
