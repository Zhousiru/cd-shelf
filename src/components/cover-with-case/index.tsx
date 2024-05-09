import { cn } from '@/utils/cn'
import Image, { StaticImageData } from 'next/image'
import React from 'react'
import caseMaskImage from './case.png'

export function CoverWithCase({
  className,
  src,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  src: string | StaticImageData
}) {
  return (
    <div className="[perspective:1000px]">
      <div
        className={cn(
          'group relative aspect-square translate-y-2 select-none transition hover:[transform:rotateX(5deg)]',
          className,
        )}
        {...props}
      >
        <div className="absolute bottom-[8.4%] left-[10.9%] right-[3.9%] top-[8.1%]">
          <Image
            src={src}
            alt="Case shadow"
            fill
            className="pointer-events-none scale-90 rounded-[50px] opacity-75 blur-3xl transition group-hover:translate-y-4"
          />
          <Image
            src={src}
            alt="CD cover shadow"
            fill
            aria-hidden
            className="pointer-events-none translate-y-[0.5%] object-cover blur-sm"
          />
          <Image
            src={src}
            alt="CD cover"
            fill
            className="rounded-sm object-cover transition"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-0 mix-blend-lighten transition group-hover:opacity-15" />
        </div>
        <Image
          src={caseMaskImage}
          alt="CD crystal case"
          fill
          aria-hidden
          className="pointer-events-none mix-blend-multiply transition group-hover:brightness-110"
        />
      </div>
    </div>
  )
}
