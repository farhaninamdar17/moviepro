import { Movie, MoodType, GenreType } from '../types/movie';
import { MOCK_MOVIES, MOOD_CONFIGS, GENRE_METADATA } from '../data/mockMovies';

export interface MovieFilters {
  genre?: string;
  mood?: string;
  yearDecade?: string; // 'all' | '2020s' | '2010s' | '2000s' | 'classics'
  minRating?: number;
  sortBy?: 'popularity' | 'rating' | 'releaseDate' | 'title';
  searchQuery?: string;
}

const enrichMovie = (m: Movie): Movie => ({
  ...m,
  downloadUrl: m.downloadUrl || '/videos/official-preview-sample.mp4',
  downloadSize: m.downloadSize || '1.1 MB',
  videoResolution: m.videoResolution || '1080p Full HD',
});

const ALL_MOVIES: Movie[] = MOCK_MOVIES.map(enrichMovie);

export const movieService = {
  getFeaturedMovies(): Movie[] {
    return ALL_MOVIES.filter(m => m.featured);
  },

  getTrendingTonight(): Movie[] {
    return ALL_MOVIES
      .filter(m => m.trendingRank !== undefined)
      .sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99));
  },

  getMoviesByMood(mood: MoodType): Movie[] {
    return ALL_MOVIES.filter(m => m.moods.includes(mood));
  },

  getMoviesByGenre(genre: string): Movie[] {
    return ALL_MOVIES.filter(m => 
      m.genres.some(g => g.toLowerCase() === genre.toLowerCase())
    );
  },

  getCuratedCollection(collection: 'trending' | 'popular' | 'recent' | 'acclaimed' | 'hidden_gems'): Movie[] {
    switch (collection) {
      case 'trending':
        return this.getTrendingTonight();
      case 'recent':
        return [...ALL_MOVIES].sort((a, b) => b.releaseYear - a.releaseYear);
      case 'acclaimed':
        return ALL_MOVIES.filter(m => m.isCriticallyAcclaimed || m.rating >= 8.5);
      case 'hidden_gems':
        return ALL_MOVIES.filter(m => m.isHiddenGem || m.rating >= 8.0);
      case 'popular':
      default:
        return [...ALL_MOVIES].sort((a, b) => b.rating - a.rating);
    }
  },

  searchMovies(query: string): Movie[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return ALL_MOVIES.filter(m => {
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchDirector = m.director.toLowerCase().includes(q);
      const matchGenre = m.genres.some(g => g.toLowerCase().includes(q));
      const matchMood = m.moods.some(mood => mood.toLowerCase().includes(q));
      const matchCast = m.cast.some(c => c.name.toLowerCase().includes(q));
      const matchOverview = m.overview.toLowerCase().includes(q);

      return matchTitle || matchDirector || matchGenre || matchMood || matchCast || matchOverview;
    });
  },

  getMovieById(idOrSlug: string): Movie | undefined {
    return ALL_MOVIES.find(m => m.id === idOrSlug || m.slug === idOrSlug);
  },

  getSimilarMovies(movieId: string, limit = 6): Movie[] {
    const current = this.getMovieById(movieId);
    if (!current) return ALL_MOVIES.slice(0, limit);

    return ALL_MOVIES
      .filter(m => m.id !== current.id)
      .sort((a, b) => {
        // Score by shared genres and moods
        const sharedGenresA = a.genres.filter(g => current.genres.includes(g)).length;
        const sharedGenresB = b.genres.filter(g => current.genres.includes(g)).length;
        const sharedMoodsA = a.moods.filter(m => current.moods.includes(m)).length;
        const sharedMoodsB = b.moods.filter(m => current.moods.includes(m)).length;

        const scoreA = sharedGenresA * 2 + sharedMoodsA * 1.5 + (a.director === current.director ? 3 : 0);
        const scoreB = sharedGenresB * 2 + sharedMoodsB * 1.5 + (b.director === current.director ? 3 : 0);

        return scoreB - scoreA;
      })
      .slice(0, limit);
  },

  filterMovies(filters: MovieFilters): Movie[] {
    let result = [...ALL_MOVIES];

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(m => 
        m.title.toLowerCase().includes(q) || 
        m.director.toLowerCase().includes(q) ||
        m.genres.some(g => g.toLowerCase().includes(q))
      );
    }

    if (filters.genre && filters.genre !== 'All') {
      result = result.filter(m => 
        m.genres.some(g => g.toLowerCase() === filters.genre?.toLowerCase())
      );
    }

    if (filters.mood && filters.mood !== 'All') {
      result = result.filter(m => 
        m.moods.includes(filters.mood as MoodType)
      );
    }

    if (filters.yearDecade && filters.yearDecade !== 'all') {
      if (filters.yearDecade === '2020s') {
        result = result.filter(m => m.releaseYear >= 2020);
      } else if (filters.yearDecade === '2010s') {
        result = result.filter(m => m.releaseYear >= 2010 && m.releaseYear < 2020);
      } else if (filters.yearDecade === '2000s') {
        result = result.filter(m => m.releaseYear >= 2000 && m.releaseYear < 2010);
      } else if (filters.yearDecade === 'classics') {
        result = result.filter(m => m.releaseYear < 2000);
      }
    }

    if (filters.minRating) {
      result = result.filter(m => m.rating >= (filters.minRating || 0));
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'releaseDate':
          result.sort((a, b) => b.releaseYear - a.releaseYear);
          break;
        case 'title':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'popularity':
        default:
          result.sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99));
          break;
      }
    }

    return result;
  },

  getMoodConfigs() {
    return MOOD_CONFIGS;
  },

  getGenreMetadata() {
    return GENRE_METADATA;
  }
};
