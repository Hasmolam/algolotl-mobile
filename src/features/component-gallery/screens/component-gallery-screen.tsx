import { Redirect } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { Button } from '@/shared/ui/primitives/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/primitives/card';
import { Progress } from '@/shared/ui/primitives/progress';
import { Text } from '@/shared/ui/primitives/text';

// Temel bileşenlerin hepsini tek ekranda gösterir; Penpot'taki "Tasarım sistemi"
// sayfasıyla karşılaştırmak için. Yalnızca geliştirme sırasında açılır.
export function ComponentGalleryScreen() {
  if (!__DEV__) {
    return <Redirect href="/" />;
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-8 p-6 pt-16">
      <Section title="Metin">
        <Text variant="display" className="text-streak-strong">
          13
        </Text>
        <Text variant="h1">Kusursuz ders!</Text>
        <Text variant="h2">Boşluğu doldur</Text>
        <Text variant="h3">Değişkeni yazdır</Text>
        <Text>Gövde metni</Text>
        <Text variant="muted">Ekrana Ada yazdırmak için boşluğa ne gelmeli?</Text>
        <Text variant="label">Doğruluk</Text>
        <Text variant="caption">2. ünite</Text>
        <Text variant="small">Pzt</Text>
        <Text variant="code">print(isim)</Text>
      </Section>

      <Section title="Buton">
        <Button>
          <Text>Devam et</Text>
        </Button>
        <Button variant="secondary">
          <Text>Devam et</Text>
        </Button>
        <Button variant="success">
          <Text>Devam et</Text>
        </Button>
        <Button variant="destructive">
          <Text>Devam et</Text>
        </Button>
        <Button variant="streak">
          <Text>Devam et</Text>
        </Button>
        <Button disabled>
          <Text>Devam et</Text>
        </Button>
        <Button variant="link" className="self-start">
          <Text>Şifremi unuttum</Text>
        </Button>
      </Section>

      <Section title="İlerleme çubuğu">
        <Progress value={38} />
        <Progress value={40} size="sm" />
      </Section>

      <Section title="Kart">
        <Card>
          <CardHeader>
            <Text variant="caption" className="font-sans-bold text-primary">
              3. ders
            </Text>
            <CardTitle>Değişkeni yazdır</CardTitle>
            <CardDescription>12 soru, yaklaşık 5 dakika</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>
              <Text>Derse başla</Text>
            </Button>
          </CardContent>
        </Card>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-4">
      <Text variant="small" className="uppercase">
        {title}
      </Text>
      {children}
    </View>
  );
}
