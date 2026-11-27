import { Link, router } from 'expo-router';
import { View } from 'react-native';

import { Button } from '@/shared/ui/primitives/button';
import { Text } from '@/shared/ui/primitives/text';
import { Screen } from '@/shared/ui/screen';

// Karşılama: hesapsız ilk derse ya da girişe gider ("önce ders, sonra kayıt").
// Gerçek tasarım: Penpot, "01 Karşılama".
export function WelcomeScreen() {
  return (
    <Screen className="justify-between">
      <View className="flex-1 items-center justify-center gap-2">
        <Text variant="h1">Algolotl</Text>
        <Text variant="muted">Python öğrenmeye hazır mısın?</Text>
      </View>
      <View className="gap-4">
        <Button onPress={() => router.push('/lesson/ilk-ders')}>
          <Text>Başla</Text>
        </Button>
        <Button variant="secondary" onPress={() => router.push('/sign-in')}>
          <Text>Hesabım var, giriş yap</Text>
        </Button>
        {__DEV__ ? (
          <Link href="/bilesenler" asChild>
            <Button variant="link" className="self-center">
              <Text>Bileşenler</Text>
            </Button>
          </Link>
        ) : null}
      </View>
    </Screen>
  );
}
