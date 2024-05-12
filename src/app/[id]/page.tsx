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
      <div className="mx-auto mt-[15vh] grid max-w-md gap-8 p-4 lg:max-w-screen-2xl lg:grid-cols-[auto_1fr] lg:gap-x-12 lg:p-12 xl:gap-x-24">
        <div className="relative aspect-square w-full place-self-center overflow-hidden rounded-lg shadow-2xl lg:w-[350px]">
          <Image src={album.cover} alt="Album cover" fill />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div className="text-white">
            <AutoSizingText
              className="font-medium leading-tight"
              text={album.name}
            />
            <h2 className="text-2xl">{album.publisher}</h2>
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

        <div className="w-full justify-self-center bg-white/25 lg:col-span-2 lg:max-w-screen-md xl:col-start-2 xl:justify-self-start">
          Test
        </div>
      </div>
    </>
  )
}
