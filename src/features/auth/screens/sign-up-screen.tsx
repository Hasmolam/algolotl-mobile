import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { View } from 'react-native';

import { useSession } from '@/shared/session';
import { Button } from '@/shared/ui/primitives/button';
import { Icon } from '@/shared/ui/primitives/icon';
import { Text } from '@/shared/ui/primitives/text';
import { Placeholder } from '@/shared/ui/placeholder';
import { Screen } from '@/shared/ui/screen';

// İlk dersin sonunda gelir. Kayıttan sonra ilk açılış akışı seri ve lig
// ekranlarıyla devam eder.
export function SignUpScreen() {
  const { signUp } = useSession();

  function createAccount() {
    router.replace('/streak');
    signUp();
  }

  return (
    <Screen className="justify-between">
      <View className="gap-4">
        <Button variant="ghost" size="icon" aria-label="Geri" onPress={() => router.back()}>
          <Icon as={ChevronLeft} className="size-7" />
        </Button>
        <Placeholder title="İlerlemeni kaydet" design="02 Kayıt" />
      </View>
      <View className="gap-4">
        <Button onPress={createAccount}>
          <Text>Hesabı oluştur</Text>
        </Button>
        <Button variant="secondary" onPress={() => router.replace('/sign-in')}>
          <Text>Hesabım var, giriş yap</Text>
        </Button>
      </View>
    </Screen>
  );
}
