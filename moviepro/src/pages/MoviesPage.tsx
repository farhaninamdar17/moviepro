import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Film, ArrowDown } from 'lucide-react';
import { Movie } from '../types/movie';
import { movieService } from '../services/movieService';
import { MovieCard } from '../components/MovieCard';

interface MoviesPageProps {
  onSelectMovie: (movie: Movie) => void;
  onPlayTrailer: (movie: Movie) => void;
  initialGenre?: string;
}

const PAGE_SIZE = 12;

export const MoviesPage: React.FC<MoviesPageProps> = ({
  onSelectMovie,
  onPlayTrailer,
  initialGenre,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>(initialGenre || 'All');
  const [selectedDecade, setSelectedDecade] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'releaseDate' | 'title'>('popularity');
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const genreList = ['All', ...movieService.getGenreMetadata().map(g => g.name)];

  const allFiltered = useMemo(() => {
    return movieService.filterMovies({
      searchQuery: searchTerm,
      genre: selectedGenre === 'All' ? undefined : selectedGenre,
      yearDecade: selectedDecade === 'all' ? undefined : selectedDecade,
      minRating: minRating > 0 ? minRating : undefined,
      sortBy,
    });
  }, [searchTerm, selectedGenre, selectedDecade, minRating, sortBy]);

  const displayedMovies = allFiltered.slice(0, visibleCount);
  const hasMore = visibleCount < allFiltered.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className="w-full pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2 block">
          COMPLETE ARCHIVE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight">
          ALL MOVIES
        </h1>
        <p className="text-sm text-zinc-400 font-light mt-1">
          Browse the full collection of cinematic masterpieces, modern sci-fi epics, and award-winning dramas.
        </p>
      </div>

      {/* In-page Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          placeholder="Filter by movie title, director, or keyword..."
          className="w-full pl-11 pr-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-purple-500 shadow-inner"
        />
      </div>

      {/* Filter and Sort Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-900 mb-8">
        {/* Genre Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {genreList.slice(0, 8).map((genre) => (
            <button
              key={genre}
              onClick={() => {
                setSelectedGenre(genre);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedGenre.toLowerCase() === genre.toLowerCase()
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Era */}
          <select
            value={selectedDecade}
            onChange={(e) => {
              setSelectedDecade(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            className="bg-zinc-900 text-zinc-300 text-xs rounded-lg px-3 py-2 border border-zinc-800 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Decades</option>
            <option value="2020s">2020s</option>
            <option value="2010s">2010s</option>
            <option value="2000s">2000s</option>
            <option value="classics">Classics</option>
          </select>

          {/* Rating */}
          <select
            value={minRating}
            onChange={(e) => {
              setMinRating(Number(e.target.value));
              setVisibleCount(PAGE_SIZE);
            }}
            className="bg-zinc-900 text-zinc-300 text-xs rounded-lg px-3 py-2 border border-zinc-800 focus:outline-none focus:border-purple-500"
          >
            <option value={0}>All Ratings</option>
            <option value={8.0}>8.0+ Rating</option>
            <option value={8.5}>8.5+ Rating</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-zinc-900 text-zinc-300 text-xs rounded-lg px-3 py-2 border border-zinc-800 focus:outline-none focus:border-purple-500"
          >
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
            <option value="releaseDate">Release Date</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Grid Meta Count */}
      <div className="flex items-center justify-between mb-6 text-xs text-zinc-400 font-mono">
        <span>SHOWING {displayedMovies.length} OF {allFiltered.length} FILMS</span>
        {searchTerm && <span>QUERY: &ldquo;{searchTerm}&rdquo;</span>}
      </div>

      {/* Responsive Movie Grid (Desktop: 5-6, Tablet: 3-4, Mobile: 2) */}
      {displayedMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {displayedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
              onPlayTrailer={onPlayTrailer}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-zinc-900 rounded-2xl bg-zinc-950/40">
          <Film className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            NO FILMS FOUND
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Try adjusting your search query or reset your filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGenre('All');
              setSelectedDecade('all');
              setMinRating(0);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold uppercase tracking-wider border border-zinc-800"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-14 text-center">
          <button
            onClick={loadMore}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-zinc-900 hover:bg-purple-950/50 text-white text-xs font-bold uppercase tracking-widest border border-zinc-800 hover:border-purple-500/40 transition shadow-lg"
          >
            <span>LOAD MORE STORIES</span>
            <ArrowDown className="w-3.5 h-3.5 text-purple-400" />
          </button>
        </div>
      )}
    </div>
  );
};
