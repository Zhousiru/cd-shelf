export type Index = {
  name: string;
  id: string;
  publisher: string;
  cover: string;
};

export type Album = {
  name: string;
  id: string;
  publisher: string;
  year: number;
  meta?: string[];
  cover: string;
  color: string;
  intro?: string;
  track: Array<Track>;
};

export type Track = {
  title: string;
  duration: number;
  star: boolean;
  comment?: string;
  meta?: Record<string, string>;
  source: string;
};

export type AlbumFileItem = {
  filename: string;
  data: Album;
};
