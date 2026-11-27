import { router } from 'expo-router';
import { View } from 'react-native';

import { returnToLearningPath } from '@/shared/lib/navigation';
import { Button } from '@/shared/ui/primitives/button';
import { Text } from '@/shared/ui/primitives/text';
import { Placeholder } from '@/shared/ui/placeholder';
import { Screen } from '@/shared/ui/screen';

// Yalnızca günün ilk dersinden sonra gösterilir. Ardından lig sırası
// değiştiyse lig ekranı gelir; bu bilgi API'den gelecek (#14).
export function StreakScreen() {
  return (
    <Screen className="justify-between">
      <Placeholder title="Seri" design="12 Seri" />
      <View className="gap-4">
        <Button variant="streak" onPress={() => router.replace('/league-promotion')}>
          <Text>Devam et (lig sırası değişti)</Text>
        </Button>
        <Button variant="secondary" onPress={returnToLearningPath}>
          <Text>Devam et</Text>
        </Button>
      </View>
    </Screen>
  );
}
