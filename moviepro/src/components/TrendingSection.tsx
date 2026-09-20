import React from 'react';
import { Star, Play, Plus, Check } from 'lucide-react';
import { Movie } from '../types/movie';
import { useWatchlist } from '../hooks/useWatchlist';

interface TrendingSectionProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onPlayTrailer?: (movie: Movie) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  movies,
  onSelectMovie,
  onPlayTrailer,
}) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  if (!movies.length) return null;

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-1 block">
            THE SCREENINGS WATCHED WORLDWIDE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-display uppercase">
            TRENDING TONIGHT
          </h2>
        </div>
        <div className="hidden sm:block text-xs uppercase tracking-widest text-zinc-500 font-mono">
          UPDATED HOURLY
        </div>
      </div>

      {/* Distinctive Ranking Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {movies.slice(0, 6).map((movie, index) => {
          const rank = String(index + 1).padStart(2, '0');
          const inWatchlist = isInWatchlist(movie.id);

          return (
            <div
              key={movie.id}
              onClick={() => onSelectMovie(movie)}
              tabIndex={0}
              role="button"
              aria-label={`Rank ${rank}: ${movie.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSelectMovie(movie);
              }}
              className="group relative flex items-center gap-4 sm:gap-5 p-3 rounded-2xl bg-zinc-950/70 border border-zinc-900/80 hover:border-purple-500/40 hover:bg-zinc-900/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(139,92,246,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              {/* Oversized Ranking Number */}
              <div className="shrink-0 w-12 sm:w-16 text-center select-none">
                <span className="text-4xl sm:text-5xl font-black font-display tracking-tighter text-zinc-800 group-hover:text-purple-400 transition-colors duration-300">
                  {rank}
                </span>
              </div>

              {/* Poster Thumbnail with hover play overlay */}
              <div className="relative w-20 sm:w-24 aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {onPlayTrailer && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayTrailer(movie);
                    }}
                    aria-label={`Watch trailer for ${movie.title}`}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </button>
                )}
              </div>

              {/* Movie Info */}
              <div className="flex-1 min-w-0 pr-2">
                <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                  {movie.title}
                </h4>

                <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400 font-medium">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{movie.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-zinc-700">·</span>
                  <span>{movie.releaseYear}</span>
                </div>

                <div className="mt-1 text-xs text-purple-400 uppercase tracking-wider font-semibold truncate">
                  {movie.genres.slice(0, 2).join(' · ')}
                </div>

                {/* Quick actions */}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(movie);
                    }}
                    aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase transition-colors ${
                      inWatchlist
                        ? 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                    }`}
                  >
                    {inWatchlist ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    <span>{inWatchlist ? 'Saved' : 'Watchlist'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
