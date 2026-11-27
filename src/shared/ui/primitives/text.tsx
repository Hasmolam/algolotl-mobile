import { cn } from '@/shared/lib/utils';
import { Slot } from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Text as RNText, type Role } from 'react-native';

// Metin stilleri Penpot'taki "Yazı" ölçeğinden gelir. Kalınlık için font-bold
// gibi sınıflar değil, font-sans-* aileleri kullanılır (bkz. src/global.css).
const textVariants = cva(
  cn('font-sans text-body text-foreground', Platform.select({ web: 'select-text' })),
  {
    variants: {
      variant: {
        default: '',
        display: 'font-sans-extrabold text-display',
        h1: 'font-sans-extrabold text-title',
        h2: 'font-sans-extrabold text-heading',
        h3: 'font-sans-extrabold text-subheading',
        muted: 'text-muted-foreground',
        label: 'font-sans-semibold',
        caption: 'font-sans-semibold text-caption text-muted-foreground',
        small: 'font-sans-semibold text-small text-muted-foreground',
        code: 'font-mono text-code',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type TextVariantProps = VariantProps<typeof textVariants>;

type TextVariant = NonNullable<TextVariantProps['variant']>;

const ROLE: Partial<Record<TextVariant, Role>> = {
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  code: Platform.select({ web: 'code' as Role }),
};

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
  h1: '1',
  h2: '2',
  h3: '3',
};

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
  className,
  asChild = false,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof RNText> &
  React.RefAttributes<typeof RNText> &
  TextVariantProps & {
    asChild?: boolean;
  }) {
  const textClass = React.useContext(TextClassContext);
  const Component = asChild ? Slot : RNText;
  return (
    <Component
      className={cn(textVariants({ variant }), textClass, className)}
      role={variant ? ROLE[variant] : undefined}
      aria-level={variant ? ARIA_LEVEL[variant] : undefined}
      {...props}
    />
  );
}

export { Text, TextClassContext };
