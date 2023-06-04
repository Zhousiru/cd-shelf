export type Index = {
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
  meta?: string[]
  cover: string
  color: string
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

export async function getIndex(): Promise<Array<Index>> {
  const res = await fetch('/data/index.json')
  const resText = await res.text()

  return JSON.parse(resText)
}

export async function getAlbumDetail(id: string): Promise<Album> {
  const res = await fetch(`/data/${id}.json`)
  const resText = await res.text()

  return JSON.parse(resText)
}
