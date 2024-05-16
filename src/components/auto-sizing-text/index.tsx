import { cn } from '@/utils/cn'
import stringWidth from 'string-width'

export function AutoSizingText({
  text,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & { text: string }) {
  const width = stringWidth(text)

  return (
    <div className={cn('@container', className)} {...props}>
      <div style={{ fontSize: `clamp(2.5rem, ${100 / (width / 2)}cqi, 8rem)` }}>
        {text}
      </div>
    </div>
  )
}
