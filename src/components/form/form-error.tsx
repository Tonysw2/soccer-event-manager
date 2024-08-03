import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface FormErrorProps extends ComponentProps<'span'> {
  message: string
}

export function FormError({ message, className, ...rest }: FormErrorProps) {
  return (
    <span
      className={cn('text-xs leading-none text-red-500', className)}
      {...rest}
    >
      {message}
    </span>
  )
}
