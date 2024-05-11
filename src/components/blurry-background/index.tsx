import Image, { StaticImageData } from 'next/image'

export function BlurryBackground({ src }: { src: string | StaticImageData }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50">
      <Image
        src={src}
        alt="Blurry background"
        fill
        aria-hidden
        className="scale-125 object-cover blur-2xl"
      />
      <div className="absolute inset-0 bg-black/60" />
    </div>
  )
}
