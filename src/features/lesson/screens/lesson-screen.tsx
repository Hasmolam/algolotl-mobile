import { router, useLocalSearchParams } from 'expo-router';
import { X } from 'lucide-react-native';
import { View } from 'react-native';

import { Button } from '@/shared/ui/primitives/button';
import { Icon } from '@/shared/ui/primitives/icon';
import { Progress } from '@/shared/ui/primitives/progress';
import { Text } from '@/shared/ui/primitives/text';
import { Placeholder } from '@/shared/ui/placeholder';
import { Screen } from '@/shared/ui/screen';

export function LessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();

  return (
    <Screen className="justify-between">
      <View className="gap-6">
        <View className="flex-row items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Dersi kapat"
            onPress={() => router.back()}
          >
            <Icon as={X} className="size-7 text-muted-foreground" />
          </Button>
          <Progress value={30} className="flex-1" />
        </View>
        <Placeholder title="Ders" design="06–10 Ders">
          <Text variant="caption">Ders: {lessonId}</Text>
        </Placeholder>
      </View>
      <Button onPress={() => router.replace('/lesson-result')}>
        <Text>Dersi bitir</Text>
      </Button>
    </Screen>
  );
}
