import React, { useState } from 'react';
import { Play, Plus, Check, Star } from 'lucide-react';
import { Movie } from '../types/movie';
import { useWatchlist } from '../hooks/useWatchlist';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  onPlayTrailer?: (movie: Movie) => void;
  priority?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSelect,
  onPlayTrailer,
  priority = false,
}) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatchlist(movie);
  };

  const handleTrailerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlayTrailer) {
      onPlayTrailer(movie);
    } else {
      onSelect(movie);
    }
  };

  return (
    <div
      onClick={() => onSelect(movie)}
      tabIndex={0}
      role="button"
      aria-label={`${movie.title}, released in ${movie.releaseYear}, rated ${movie.rating} out of 10`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(movie);
        }
      }}
      className="group relative flex flex-col rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(139,92,246,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 bg-zinc-950 border border-zinc-800/80 hover:border-purple-500/40 select-none"
    >
      {/* Poster Aspect Ratio Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-900">
        {/* Placeholder shimmer while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
        )}

        <img
          src={movie.poster}
          alt={`Poster for ${movie.title}`}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Rating badge top-right */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 px-2 py-0.8 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-300 shadow-md">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>

        {/* Cinematic dark hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 z-10">
          {/* Top action row */}
          <div className="flex justify-start">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-purple-950/80 text-purple-300 border border-purple-500/30">
              {movie.genres[0]}
            </span>
          </div>

          {/* Center Play Trailer Button */}
          <div className="self-center">
            <button
              onClick={handleTrailerClick}
              aria-label={`Watch trailer for ${movie.title}`}
              className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
            >
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </button>
          </div>

          {/* Bottom quick actions */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-zinc-400 font-medium">
              {movie.formattedRuntime}
            </span>

            <button
              onClick={handleWatchlistClick}
              aria-label={inWatchlist ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
              title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                inWatchlist
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                  : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-white/10'
              }`}
            >
              {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Static Footer metadata below poster */}
      <div className="p-3 bg-zinc-950 flex flex-col gap-1 border-t border-zinc-900/60">
        <h4 className="text-sm font-semibold text-zinc-100 truncate group-hover:text-purple-300 transition-colors">
          {movie.title}
        </h4>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>{movie.releaseYear}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400 truncate max-w-[120px]">{movie.genres[0]}</span>
        </div>
      </div>
    </div>
  );
};
