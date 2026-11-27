import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { BookOpen, Trophy, UserRound } from 'lucide-react-native';

import { TabBar, TabBarButton } from '@/shared/ui/tab-bar';

// Giriş yapmış kullanıcının alt sekmeleri: Öğren, Lig, Profil.
export default function TabsLayout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <TabBar>
          <TabTrigger name="learn" href="/learn" asChild>
            <TabBarButton icon={BookOpen} label="Öğren" />
          </TabTrigger>
          <TabTrigger name="league" href="/league" asChild>
            <TabBarButton icon={Trophy} label="Lig" />
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <TabBarButton icon={UserRound} label="Profil" />
          </TabTrigger>
        </TabBar>
      </TabList>
    </Tabs>
  );
}
