import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Star, Sparkles } from 'lucide-react';
import { Movie } from '../types/movie';
import { movieService } from '../services/movieService';
import { MovieCard } from '../components/MovieCard';

interface DiscoverPageProps {
  onSelectMovie: (movie: Movie) => void;
  onPlayTrailer: (movie: Movie) => void;
}

type CollectionType = 'all' | 'trending' | 'popular' | 'recent' | 'acclaimed' | 'hidden_gems';

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  onSelectMovie,
  onPlayTrailer,
}) => {
  const [selectedCollection, setSelectedCollection] = useState<CollectionType>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedDecade, setSelectedDecade] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'releaseDate' | 'title'>('popularity');

  const genres = ['All', ...movieService.getGenreMetadata().map(g => g.name)];

  const filteredMovies = useMemo(() => {
    let base = selectedCollection === 'all' 
      ? movieService.filterMovies({
          genre: selectedGenre === 'All' ? undefined : selectedGenre,
          yearDecade: selectedDecade === 'all' ? undefined : selectedDecade,
          minRating: minRating > 0 ? minRating : undefined,
          sortBy,
        })
      : movieService.getCuratedCollection(selectedCollection as any);

    if (selectedCollection !== 'all') {
      if (selectedGenre !== 'All') {
        base = base.filter(m => m.genres.some(g => g.toLowerCase() === selectedGenre.toLowerCase()));
      }
      if (minRating > 0) {
        base = base.filter(m => m.rating >= minRating);
      }
    }

    return base;
  }, [selectedCollection, selectedGenre, selectedDecade, minRating, sortBy]);

  const collections: { id: CollectionType; label: string }[] = [
    { id: 'all', label: 'All Curations' },
    { id: 'trending', label: 'Trending Tonight' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'acclaimed', label: 'Critically Acclaimed' },
    { id: 'hidden_gems', label: 'Hidden Gems' },
    { id: 'recent', label: 'Recently Released' },
  ];

  return (
    <div className="w-full pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2">
          <Sparkles className="w-4 h-4" />
          <span>CURATED ARCHIVES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight">
          DISCOVER
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 font-light mt-1.5 max-w-2xl">
          Filter by genre, rating, and decade. Explore critically acclaimed awards, hidden gems, and high-velocity stories.
        </p>
      </div>

      {/* Collection Quick Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
        {collections.map((col) => {
          const isActive = selectedCollection === col.id;
          return (
            <button
              key={col.id}
              onClick={() => setSelectedCollection(col.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)]'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
              }`}
            >
              {col.label}
            </button>
          );
        })}
      </div>

      {/* Compact Editorial Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-900 shadow-xl mb-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
          <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
          <span>REFINE SCREENINGS</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Genre select */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
              Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-zinc-900 text-white text-xs rounded-xl px-3 py-2.5 border border-zinc-800 focus:outline-none focus:border-purple-500 transition"
            >
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Era / Decade */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
              Era / Decade
            </label>
            <select
              value={selectedDecade}
              onChange={(e) => setSelectedDecade(e.target.value)}
              className="w-full bg-zinc-900 text-white text-xs rounded-xl px-3 py-2.5 border border-zinc-800 focus:outline-none focus:border-purple-500 transition"
            >
              <option value="all">All Eras</option>
              <option value="2020s">2020s (Modern)</option>
              <option value="2010s">2010s</option>
              <option value="2000s">2000s</option>
              <option value="classics">Classics (Pre-2000)</option>
            </select>
          </div>

          {/* Min Rating */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
              Minimum Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full bg-zinc-900 text-white text-xs rounded-xl px-3 py-2.5 border border-zinc-800 focus:outline-none focus:border-purple-500 transition"
            >
              <option value={0}>Any Rating</option>
              <option value={8.0}>8.0+ ★ Exceptional</option>
              <option value={8.5}>8.5+ ★ Masterpiece</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-zinc-900 text-white text-xs rounded-xl px-3 py-2.5 border border-zinc-800 focus:outline-none focus:border-purple-500 transition"
            >
              <option value="popularity">Popularity / Rank</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="releaseDate">Release Year</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-900">
        <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold font-mono">
          Showing {filteredMovies.length} movies
        </span>

        {(selectedGenre !== 'All' || selectedDecade !== 'all' || minRating > 0) && (
          <button
            onClick={() => {
              setSelectedGenre('All');
              setSelectedDecade('all');
              setMinRating(0);
            }}
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Movie Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
              onPlayTrailer={onPlayTrailer}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-zinc-900 rounded-3xl bg-zinc-950/50">
          <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center mx-auto mb-3">
            <Filter className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">
            NO SCREENINGS FOUND
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1">
            No movies match your current combination of filters. Try broadening your criteria.
          </p>
          <button
            onClick={() => {
              setSelectedGenre('All');
              setSelectedDecade('all');
              setMinRating(0);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold uppercase tracking-wider"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
