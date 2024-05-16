import { Track } from '@/types/album'
import { DetailSection, DetailSectionTitle } from '.'

export function TrackSection({}: React.ComponentPropsWithoutRef<
  typeof DetailSection
> & {
  data: Track[]
}) {
  return (
    <DetailSection>
      <DetailSectionTitle>Tracks</DetailSectionTitle>
      {/* TODO */}
    </DetailSection>
  )
}
