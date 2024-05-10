import { cn } from '@/utils/cn'

export function MainContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'main'>) {
  return (
    <main
      className={cn(
        'mx-auto grid max-w-md grid-cols-1 gap-8 px-4 sm:max-w-full sm:grid-cols-2 sm:gap-12 sm:px-8 md:max-w-4xl lg:max-w-screen-lg xl:max-w-screen-2xl xl:grid-cols-3 2xl:gap-20',
        className,
      )}
      {...props}
    />
  )
}
