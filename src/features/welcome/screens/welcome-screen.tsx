import { Link } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/shared/ui/primitives/button';
import { Text } from '@/shared/ui/primitives/text';

// Geçici karşılama ekranı: iskeletin ve temanın çalıştığını gösterir.
// Gerçek tasarım Penpot'taki "Karşılama" ekranından gelecek.
export function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 justify-center gap-8 bg-background p-6"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View className="items-center gap-2">
        <Text variant="h1">Algolotl</Text>
        <Text variant="muted">Python öğrenmeye hazır mısın?</Text>
      </View>
      <View className="gap-3">
        <Button>
          <Text>Başla</Text>
        </Button>
        {__DEV__ ? (
          <Link href="/bilesenler" asChild>
            <Button variant="link" className="self-center">
              <Text>Bileşenler</Text>
            </Button>
          </Link>
        ) : null}
      </View>
    </View>
  );
}
