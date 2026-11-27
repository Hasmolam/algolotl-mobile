import { returnToLearningPath } from '@/shared/lib/navigation';
import { Button } from '@/shared/ui/primitives/button';
import { Text } from '@/shared/ui/primitives/text';
import { Placeholder } from '@/shared/ui/placeholder';
import { Screen } from '@/shared/ui/screen';

// Yalnızca lig sırası değişince, seri ekranından sonra gösterilir.
export function LeaguePromotionScreen() {
  return (
    <Screen className="justify-between">
      <Placeholder title="Podyuma çıktın!" design="13 Lig / yükselme" />
      <Button onPress={returnToLearningPath}>
        <Text>Devam et</Text>
      </Button>
    </Screen>
  );
}
