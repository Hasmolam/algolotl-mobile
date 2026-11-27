import { Text, TextClassContext } from '@/shared/ui/primitives/text';
import { cn } from '@/shared/lib/utils';
import { View } from 'react-native';

// Penpot'taki kartlar: beyaz yüzey, 24px köşe, altında 4px açık kenar.

function Card({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return (
    <TextClassContext.Provider value="text-card-foreground">
      <View
        className={cn('flex flex-col gap-4 rounded-card bg-card p-5 edge-card', className)}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function CardHeader({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn('flex flex-col gap-1', className)} {...props} />;
}

function CardTitle({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<typeof Text>) {
  return (
    <Text
      ref={ref}
      role="heading"
      aria-level={3}
      className={cn('font-sans-extrabold text-subheading', className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<typeof Text>) {
  return <Text className={cn('text-caption text-muted-foreground', className)} {...props} />;
}

function CardContent({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn('gap-3', className)} {...props} />;
}

function CardFooter({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn('flex flex-row items-center gap-3', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
