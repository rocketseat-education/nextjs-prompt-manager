import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'h-11 w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none',
  {
    variants: {
      variant: {
        default:
          'h-11 w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none',
        transparent: 'bg-transparent text-white placeholder:text-[#424242]',
      },
      size: {
        default: 'h-9',
        sm: 'h-8',
        lg: 'h-14 text-2xl font-bold sm:h-16 sm:text-3xl',
      },
      readOnly: {
        true: 'focus:ring-0 focus:border-gray-600 cursor-default',
        false: 'focus:ring-2 focus:ring-accent-400 focus:border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      readOnly: false,
    },
  }
);

type InputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants>;

function Input({
  variant,
  size,
  className,
  type,
  readOnly,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, size, readOnly, className }))}
      readOnly={readOnly}
      {...props}
    />
  );
}

export { Input };
