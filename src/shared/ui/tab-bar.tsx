import type { TabTriggerSlotProps } from 'expo-router/ui';
import type { LucideIcon } from 'lucide-react-native';
import { Pressable, View, type ViewProps } from 'react-native';

import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/primitives/icon';
import { Text } from '@/shared/ui/primitives/text';

// Penpot'taki "Sekme çubuğu": beyaz zemin, 2px üst çizgi, seçili sekmede açık
// mavi taş. İkonlar şimdilik Lucide; Penpot ikonları ayrı bir işte gelecek.
export function TabBar({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn(
        'pb-safe-offset-1.5 flex-row justify-around border-t-2 border-nav-border bg-card px-4 pt-1.5',
        className,
      )}
      {...props}
    />
  );
}

type TabBarButtonProps = Omit<TabTriggerSlotProps, 'ref'> & {
  icon: LucideIcon;
  label: string;
  ref?: React.Ref<React.ComponentRef<typeof Pressable>>;
};

export function TabBarButton({
  icon,
  label,
  isFocused,
  className,
  // TabTrigger kendi yerleşim stilini (yatay dizilim) gönderir; görünümü
  // tamamen sınıflar belirlesin diye kullanılmaz.
  style: _triggerStyle,
  ...props
}: TabBarButtonProps) {
  return (
    <Pressable
      className={cn(
        'h-12 w-[110px] items-center justify-center gap-0.5 rounded-stone',
        isFocused && 'bg-primary-soft',
        className,
      )}
      role="tab"
      aria-selected={isFocused}
      {...props}
    >
      <Icon as={icon} className={cn('size-6', isFocused ? 'text-primary' : 'text-nav-inactive')} />
      <Text
        variant="small"
        className={isFocused ? 'font-sans-bold text-primary' : 'text-nav-inactive'}
      >
        {label}
      </Text>
    </Pressable>
  );
}
