import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { View } from 'react-native';

import { useSession } from '@/shared/session';
import { Button } from '@/shared/ui/primitives/button';
import { Icon } from '@/shared/ui/primitives/icon';
import { Text } from '@/shared/ui/primitives/text';
import { Placeholder } from '@/shared/ui/placeholder';
import { Screen } from '@/shared/ui/screen';

export function SignInScreen() {
  const { signIn } = useSession();

  return (
    <Screen className="justify-between">
      <View className="gap-4">
        <Button variant="ghost" size="icon" aria-label="Geri" onPress={() => router.back()}>
          <Icon as={ChevronLeft} className="size-7" />
        </Button>
        <Placeholder title="Giriş yap" design="03 Giriş" />
      </View>
      {/* Giriş yapınca misafir ekranları kapanır, sekmeler açılır. */}
      <Button onPress={signIn}>
        <Text>Giriş yap</Text>
      </Button>
    </Screen>
  );
}
