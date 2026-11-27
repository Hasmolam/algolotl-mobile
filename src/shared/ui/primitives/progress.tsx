import { cn } from '@/shared/lib/utils';
import * as ProgressPrimitive from '@rn-primitives/progress';
import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

// Penpot'taki ilerleme çubukları. "default": ders üst barındaki 16px çubuk,
// dolgunun üstünde açık bir parlama şeridi var. "sm": ünite ve kurs
// ilerlemesindeki 12px çubuk.
const progressVariants = cva('relative w-full overflow-hidden rounded-full bg-track', {
  variants: {
    size: {
      default: 'h-4',
      sm: 'h-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants> & {
    indicatorClassName?: string;
  };

function Progress({ className, value, size, indicatorClassName, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root className={cn(progressVariants({ size }), className)} {...props}>
      <Indicator value={value} className={indicatorClassName} shine={size !== 'sm'} />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
export type { ProgressProps };

const Indicator = Platform.select({
  web: WebIndicator,
  native: NativeIndicator,
  default: NullIndicator,
});

type IndicatorProps = {
  value: number | undefined | null;
  className?: string;
  shine: boolean;
};

function Shine() {
  return (
    <View className="absolute top-[3px] right-1.5 left-1.5 h-1 rounded-full bg-success-highlight" />
  );
}

function WebIndicator({ value, className, shine }: IndicatorProps) {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View
      className={cn(
        'h-full w-full flex-1 rounded-full bg-success-bright transition-all',
        className,
      )}
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    >
      <ProgressPrimitive.Indicator className="h-full w-full" />
      {shine ? <Shine /> : null}
    </View>
  );
}

function NativeIndicator({ value, className, shine }: IndicatorProps) {
  const progress = useDerivedValue(() => value ?? 0);

  const indicator = useAnimatedStyle(() => {
    return {
      width: withSpring(
        `${interpolate(progress.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`,
        { overshootClamping: true },
      ),
    };
  });

  if (Platform.OS === 'web') {
    return null;
  }

  return (
    <ProgressPrimitive.Indicator asChild>
      <Animated.View
        style={indicator}
        className={cn('h-full rounded-full bg-success-bright', className)}
      >
        {shine ? <Shine /> : null}
      </Animated.View>
    </ProgressPrimitive.Indicator>
  );
}

function NullIndicator(_props: IndicatorProps) {
  return null;
}
