import React from 'react';
import { Bookmark, Trash2, Play, Sparkles, Star, Compass } from 'lucide-react';
import { useWatchlist } from '../hooks/useWatchlist';
import { Movie } from '../types/movie';

interface WatchlistPageProps {
  onSelectMovie: (movie: Movie) => void;
  onPlayTrailer: (movie: Movie) => void;
  onDiscover: () => void;
}

export const WatchlistPage: React.FC<WatchlistPageProps> = ({
  onSelectMovie,
  onPlayTrailer,
  onDiscover,
}) => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="w-full pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-900 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2">
            <Bookmark className="w-4 h-4" />
            <span>PERSONAL SCREENING QUEUE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight">
            YOUR WATCHLIST
          </h1>
          <p className="text-sm text-zinc-400 font-light mt-1">
            Curated stories saved to your private cinema vault. Persists on this browser.
          </p>
        </div>

        {watchlist.length > 0 && (
          <div className="text-xs uppercase tracking-wider text-zinc-500 font-mono">
            {watchlist.length} {watchlist.length === 1 ? 'FILM' : 'FILMS'} SAVED
          </div>
        )}
      </div>

      {/* Case 1: Watchlist is Empty */}
      {watchlist.length === 0 ? (
        <div className="py-24 px-4 text-center max-w-md mx-auto border border-zinc-800/60 rounded-3xl bg-zinc-950/60 shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(139,92,246,0.25)]">
            <span className="text-2xl font-serif">◇</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display uppercase">
            NOTHING HERE YET
          </h2>

          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
            Save movies and they&apos;ll appear here. Build your personal watchlist of extraordinary cinema.
          </p>

          <div className="mt-8">
            <button
              onClick={onDiscover}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(139,92,246,0.4)] active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>DISCOVER MOVIES</span>
            </button>
          </div>
        </div>
      ) : (
        /* Case 2: Saved Movies Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="group relative flex flex-col rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)]"
            >
              {/* Poster container */}
              <div 
                onClick={() => onSelectMovie(movie)}
                className="relative aspect-[2/3] w-full overflow-hidden cursor-pointer"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Rating Badge */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-300">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{movie.rating.toFixed(1)}</span>
                </div>

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWatchlist(movie.id);
                      }}
                      aria-label={`Remove ${movie.title} from watchlist`}
                      title="Remove from Watchlist"
                      className="p-2 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayTrailer(movie);
                      }}
                      aria-label={`Play trailer for ${movie.title}`}
                      className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                  </div>

                  <div className="text-center">
                    <span className="text-[11px] text-zinc-300 uppercase tracking-wider font-semibold">
                      {movie.formattedRuntime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Metadata & Direct Remove Action */}
              <div className="p-3 bg-zinc-950 border-t border-zinc-900 flex flex-col gap-1.5">
                <h4 
                  onClick={() => onSelectMovie(movie)}
                  className="text-sm font-semibold text-zinc-100 truncate cursor-pointer hover:text-purple-300 transition-colors"
                >
                  {movie.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>{movie.releaseYear}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="truncate max-w-[90px]">{movie.genres[0]}</span>
                </div>

                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="mt-1 w-full py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 hover:text-red-400 hover:bg-red-950/30 rounded border border-transparent hover:border-red-900/40 transition-colors text-center"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
