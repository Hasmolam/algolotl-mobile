import { View } from 'react-native';

import { Text } from '@/shared/ui/primitives/text';

type PlaceholderProps = {
  title: string;
  // Penpot'taki ekranın adı, ör. "05 Öğrenme yolu".
  design: string;
  children?: React.ReactNode;
};

// Henüz yazılmamış ekranların geçici içeriği: başlık ve tasarım kaynağı.
export function Placeholder({ title, design, children }: PlaceholderProps) {
  return (
    <View className="gap-2">
      <Text variant="h1">{title}</Text>
      <Text variant="muted">Bu ekran henüz boş. Tasarım: Penpot, “{design}”.</Text>
      {children}
    </View>
  );
}
