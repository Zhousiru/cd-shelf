export interface AlbumIndexEntry {
  name: string
  id: string
  publisher: string
  cover: string
}

export type Album = {
  name: string
  id: string
  publisher: string
  year: number
  meta: string[]
  cover: string
  intro?: string
  track: Array<Track>
}

export type Track = {
  title: string
  duration: number
  star: boolean
  comment?: string
  meta?: Record<string, string>
  source: string
}
