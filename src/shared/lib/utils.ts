import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tailwind-merge, src/global.css'teki özel değerleri tanımazsa çakışmaları
// yanlış çözer (ör. text-body'yi renk sanıp text-foreground ile siler).
// Tema dosyasına yeni bir yazı boyutu, aile, köşe ya da kenar eklenince
// buraya da eklenmeli.
const twMerge = extendTailwindMerge<'edge'>({
  extend: {
    theme: {
      text: [
        'display',
        'title',
        'heading',
        'subheading',
        'button',
        'body',
        'caption',
        'small',
        'code',
      ],
      radius: ['stone', 'button', 'card'],
    },
    classGroups: {
      'font-family': [
        {
          font: ['sans-medium', 'sans-semibold', 'sans-bold', 'sans-extrabold', 'mono-semibold'],
        },
      ],
      edge: [
        {
          edge: [
            'primary',
            'secondary',
            'success',
            'destructive',
            'streak',
            'league',
            'disabled',
            'card',
            'code',
            'none',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
