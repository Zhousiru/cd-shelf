import { CoverWithCase } from '@/components/cover-with-case'
import { AlbumIndexEntry } from '@/types/album'

export default async function Home() {
  const cdIndex: AlbumIndexEntry[] = await (
    await fetch('https://cd.mofu.app/data/index.json')
  ).json()

  return (
    <>
      <CoverWithCase
        className="w-[400px] mx-auto mt-[500px]"
        src="https://cd-1253266055.cos.ap-guangzhou.myqcloud.com/srtf-0009/cover.jpg"
      />
    </>
  )
}
