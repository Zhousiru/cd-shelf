import { cn } from '@/utils/cn'
import React from 'react'

export function DetailSection({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('text-white', className)} {...props} />
}

export function DetailSectionTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'border-b border-white/25 p-2 text-2xl font-medium',
        className,
      )}
      {...props}
    />
  )
}

export function DetailSectionContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'prose prose-invert prose-p:my-2 prose-p:leading-tight p-2 text-xl',
        className,
      )}
      {...props}
    />
  )
}
