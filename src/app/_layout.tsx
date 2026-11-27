import '@/global.css';

import { PortalHost } from '@rn-primitives/portal';
import { DefaultTheme, Stack, ThemeProvider, type Theme } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Uniwind, useCSSVariable } from 'uniwind';

export { ErrorBoundary } from 'expo-router';

// Uygulama yalnızca açık temalı; cihaz koyu moddayken de açık kalır.
Uniwind.setTheme('light');

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

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
      <PortalHost />
    </ThemeProvider>
  );
}
