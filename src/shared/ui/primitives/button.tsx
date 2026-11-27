import { TextClassContext } from '@/shared/ui/primitives/text';
import { cn } from '@/shared/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, Pressable } from 'react-native';

// Penpot'taki "Buton" bileşeni. Dolgulu varyantların altında 4px koyu kenar
// var; basılınca buton 4px aşağı iner ve kenar kaybolur.
const pressed = 'active:translate-y-1 active:edge-none';

const buttonVariants = cva(
  cn(
    'group shrink-0 flex-row items-center justify-center gap-2',
    Platform.select({
      web: "whitespace-nowrap outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
    }),
  ),
  {
    variants: {
      variant: {
        default: cn('bg-primary edge-primary', pressed),
        secondary: cn('border-2 border-border bg-secondary edge-secondary', pressed),
        success: cn('bg-success edge-success', pressed),
        destructive: cn('bg-destructive edge-destructive', pressed),
        streak: cn('bg-streak edge-streak', pressed),
        // `disabled` prop'u verilince otomatik seçilir.
        disabled: 'bg-disabled edge-disabled',
        ghost: cn('active:bg-accent', Platform.select({ web: 'hover:bg-accent' })),
        link: '',
      },
      size: {
        default: 'h-14 rounded-button px-6',
        icon: 'size-11 rounded-stone',
      },
    },
    compoundVariants: [{ variant: 'link', className: 'h-11 px-0' }],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const buttonTextVariants = cva(
  cn('font-sans-bold text-button text-foreground', Platform.select({ web: 'pointer-events-none' })),
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        secondary: 'text-secondary-foreground',
        success: 'text-success-foreground',
        destructive: 'text-destructive-foreground',
        streak: 'text-streak-foreground',
        disabled: 'text-disabled-foreground',
        ghost: '',
        link: cn(
          'text-caption text-primary group-active:underline',
          Platform.select({ web: 'underline-offset-4 group-hover:underline' }),
        ),
      },
      size: {
        default: '',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  const resolvedVariant = props.disabled ? 'disabled' : variant;
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant: resolvedVariant, size })}>
      <Pressable
        className={cn(buttonVariants({ variant: resolvedVariant, size }), className)}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
