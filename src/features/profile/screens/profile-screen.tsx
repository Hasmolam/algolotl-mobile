import { useSession } from '@/shared/session';
import { Button } from '@/shared/ui/primitives/button';
import { Text } from '@/shared/ui/primitives/text';
import { Placeholder } from '@/shared/ui/placeholder';
import { Screen } from '@/shared/ui/screen';

export function ProfileScreen() {
  const { signOut } = useSession();

  return (
    <Screen withBottomInset={false} className="justify-between">
      <Placeholder title="Profil" design="15 Profil" />
      {/* Çıkış yapınca sekmeler kapanır, karşılama ekranı açılır. */}
      <Button variant="secondary" onPress={signOut}>
        <Text>Çıkış yap</Text>
      </Button>
    </Screen>
  );
}
