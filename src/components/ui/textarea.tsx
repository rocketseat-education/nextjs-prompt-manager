import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const textareaVariants = cva(
  'w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none min-h-[300px] resize-none',
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
        lg: 'h-16 text-base font-regular',
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

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, readOnly, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, size, readOnly, className }))}
        ref={ref}
        readOnly={readOnly}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
