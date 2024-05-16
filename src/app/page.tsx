import { CoverWithCase } from '@/components/cover-with-case'
import { MainContainer } from '@/components/main-container'
import { MainHeader } from '@/components/main-header'
import { AlbumIndexEntry } from '@/types/album'
import Link from 'next/link'

export default async function Home() {
  const cdIndex: AlbumIndexEntry[] = await (
    await fetch('https://cd.mofu.app/data/index.json')
  ).json()

  return (
    <>
      <MainHeader />
      <MainContainer className="[perspective:2400px]">
        {cdIndex.map((v) => (
          <Link
            key={v.id}
            href={`/${v.id}`}
            className="block [transform-style:preserve-3d]"
          >
            <CoverWithCase src={v.cover} />
          </Link>
        ))}
      </MainContainer>
    </>
  )
}
