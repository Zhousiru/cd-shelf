import { AutoSizingText } from '@/components/auto-sizing-text'
import { BlurryBackground } from '@/components/blurry-background'
import { Album } from '@/types/album'
import { IconPlayerPlay } from '@tabler/icons-react'
import Image from 'next/image'

export default async function Page({ params }: { params: { id: string } }) {
  const album: Album = await (
    await fetch(`https://cd.mofu.app/data/${params.id}.json`)
  ).json()

  return (
    <>
      <BlurryBackground src={album.cover} />
      <div className="mx-auto mt-[15vh] grid max-w-screen-2xl grid-cols-[auto_1fr] gap-24">
        <div className="relative aspect-square w-[350px] overflow-hidden rounded-lg shadow-2xl">
          <Image src={album.cover} alt="Album cover" fill />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div className="text-white">
            <AutoSizingText className="font-medium" text={album.name} />
            <h2 className="text-4xl">{album.publisher}</h2>
          </div>
          <div className="flex gap-2 text-white opacity-75">
            {album.meta.map((v) => (
              <span key={v}>{v}</span>
            ))}
          </div>
          <button className="grid h-12 w-36 place-items-center rounded-full border bg-white transition hover:opacity-75">
            <IconPlayerPlay />
          </button>
        </div>
      </div>
    </>
  )
}
