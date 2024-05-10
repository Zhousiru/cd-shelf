import { CoverWithCase } from '@/components/cover-with-case'
import { MainContainer } from '@/components/main-container'
import { AlbumIndexEntry } from '@/types/album'

export default async function Home() {
  const cdIndex: AlbumIndexEntry[] = await (
    await fetch('https://cd.mofu.app/data/index.json')
  ).json()

  return (
    <MainContainer className="[perspective:2400px]">
      <CoverWithCase src="https://cd-1253266055.cos.ap-guangzhou.myqcloud.com/srtf-0009/cover.jpg" />
      <CoverWithCase src="https://cd-1253266055.cos.ap-guangzhou.myqcloud.com/mtcd-0022/cover.jpg" />
      <CoverWithCase src="https://cd-1253266055.cos.ap-guangzhou.myqcloud.com/ssm-008/cover.jpg" />
    </MainContainer>
  )
}
