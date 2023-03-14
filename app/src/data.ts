export type Data = Array<Album>

export type Album = {
  name: string
  id: string
  publisher: string
  year: number
  meta?: string[]
  cover: string
  intro?: string
  track: Array<Track>
}

export type Track = {
  title: string
  duration: number
  star: boolean
  comment?: string
  meta?: {
    [key: string]: string
  }
  source: string
}

export async function getData(): Promise<Data> {
  const cached = localStorage.getItem('data')

  if (!cached) {
    const res = await fetch('/data.json')
    const resText = await res.text()

    localStorage.setItem('data', resText)

    return JSON.parse(resText)
  }

  return JSON.parse(cached)
}
