import { router } from 'expo-router';

import { Button } from '@/shared/ui/primitives/button';
import { Text } from '@/shared/ui/primitives/text';
import { Placeholder } from '@/shared/ui/placeholder';
import { Screen } from '@/shared/ui/screen';

export function LearningPathScreen() {
  return (
    <Screen withBottomInset={false} className="justify-between">
      <Placeholder title="Öğrenme yolu" design="05 Öğrenme yolu" />
      <Button onPress={() => router.push('/lesson/1')}>
        <Text>Derse başla</Text>
      </Button>
    </Screen>
  );
}
