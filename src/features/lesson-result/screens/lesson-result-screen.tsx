import { router } from 'expo-router';
import { View } from 'react-native';

import { returnToLearningPath } from '@/shared/lib/navigation';
import { useSession } from '@/shared/session';
import { Button } from '@/shared/ui/primitives/button';
import { Text } from '@/shared/ui/primitives/text';
import { Placeholder } from '@/shared/ui/placeholder';
import { Screen } from '@/shared/ui/screen';

// Misafir: kayda geçer. Giriş yapmış: günün ilk dersiyse seri ekranı, değilse
// öğrenme yolu. "Günün ilk dersi mi" bilgisi API'den gelecek (#14); şimdilik
// iki yol da düğme olarak duruyor.
export function LessonResultScreen() {
  const { isSignedIn } = useSession();

  return (
    <Screen className="justify-between">
      <Placeholder title="Ders bitti" design="11 Ders sonu" />
      <View className="gap-4">
        {isSignedIn ? (
          <>
            <Button onPress={() => router.replace('/streak')}>
              <Text>Devam et (günün ilk dersi)</Text>
            </Button>
            <Button variant="secondary" onPress={returnToLearningPath}>
              <Text>Devam et</Text>
            </Button>
          </>
        ) : (
          <Button onPress={() => router.replace('/sign-up')}>
            <Text>Devam et</Text>
          </Button>
        )}
      </View>
    </Screen>
  );
}
