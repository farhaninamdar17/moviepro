export type MoodType = 
  | 'FEEL GOOD'
  | 'MIND-BENDING'
  | 'ROMANCE'
  | 'ADRENALINE'
  | 'DARK'
  | 'ADVENTURE'
  | 'FUNNY'
  | 'EMOTIONAL';

export type GenreType = 
  | 'Action'
  | 'Sci-Fi'
  | 'Horror'
  | 'Comedy'
  | 'Drama'
  | 'Thriller'
  | 'Romance'
  | 'Animation'
  | 'Mystery'
  | 'Fantasy'
  | 'Crime'
  | 'Adventure';

export interface CastMember {
  id: string;
  name: string;
  character: string;
  photo: string;
}

export interface CrewMember {
  name: string;
  role: string;
}

export interface Movie {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  overview: string;
  backdrop: string;
  poster: string;
  releaseYear: number;
  releaseDate: string;
  runtimeMinutes: number;
  formattedRuntime: string; // e.g. "2h 49m"
  rating: number; // e.g. 8.7 (out of 10)
  votesCount: string; // e.g. "2.1M"
  certification: string; // "PG-13", "R", etc.
  genres: GenreType[];
  moods: MoodType[];
  director: string;
  cinematographer?: string;
  composer?: string;
  cast: CastMember[];
  trailerYoutubeId: string; // Official YouTube trailer key, e.g. "zSWdZVtXT7E"
  downloadUrl?: string; // Direct path to hosted video on platform, e.g. "/videos/official-preview-sample.mp4"
  downloadSize?: string; // e.g. "1.1 MB" or "145 MB"
  videoResolution?: string; // e.g. "1080p Full HD"
  featured?: boolean;
  trendingRank?: number; // 1, 2, 3, 4, 5...
  isCriticallyAcclaimed?: boolean;
  isHiddenGem?: boolean;
  budget?: string;
  boxOffice?: string;
  aspectRatio?: string;
  soundMix?: string;
}

export interface MoodConfig {
  id: MoodType;
  label: string;
  headline: string;
  description: string;
  accentColor: string;
  iconName: string;
}

export interface WatchlistItem {
  movieId: string;
  movie: Movie;
  addedAt: number;
}
