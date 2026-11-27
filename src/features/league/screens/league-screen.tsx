import { Placeholder } from '@/shared/ui/placeholder';
import { Screen } from '@/shared/ui/screen';

export function LeagueScreen() {
  return (
    <Screen withBottomInset={false}>
      <Placeholder title="Bu haftanın sıralaması" design="14 Lig sekmesi" />
    </Screen>
  );
}
