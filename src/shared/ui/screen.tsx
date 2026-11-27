import { View, type ViewProps } from 'react-native';

import { cn } from '@/shared/lib/utils';

type ScreenProps = ViewProps & {
  // Sekmeli ekranlarda alttaki güvenli alanı sekme çubuğu karşılar.
  withBottomInset?: boolean;
};

// Bütün ekranların ortak kabı: zemin rengi, güvenli alan ve 24px kenar boşluğu.
// pt-safe-offset-4 = üst güvenli alan + 16px (kök düzendeki SafeAreaListener ile çalışır).
export function Screen({ className, withBottomInset = true, ...props }: ScreenProps) {
  return (
    <View
      className={cn(
        'flex-1 bg-background px-6 pt-safe-offset-4',
        withBottomInset ? 'pb-safe-offset-4' : 'pb-4',
        className,
      )}
      {...props}
    />
  );
}
