import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/shared/ui/primitives/button';
import { Text } from '@/shared/ui/primitives/text';

// Geçici karşılama ekranı: iskeletin ve tema zincirinin çalıştığını gösterir.
// Gerçek tasarım Penpot'taki "Karşılama" ekranından gelecek.
export function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 items-center justify-center gap-6 bg-background p-6"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View className="items-center gap-2">
        <Text variant="h1">Algolotl</Text>
        <Text variant="muted">Python öğrenmeye hazır mısın?</Text>
      </View>
      <Button>
        <Text>Başla</Text>
      </Button>
    </View>
  );
}
