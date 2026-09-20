import React, { useState, useEffect, useRef } from 'react';
import { Play, Plus, Check, Star, ChevronLeft, ChevronRight, Sparkles, Download } from 'lucide-react';
import { Movie } from '../types/movie';
import { useWatchlist } from '../hooks/useWatchlist';
import { AdSenseSlot } from './AdSenseSlot';

interface HeroProps {
  featuredMovies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onPlayTrailer: (movie: Movie) => void;
  onOpenDownload: (movie: Movie) => void;
}

export const Hero: React.FC<HeroProps> = ({
  featuredMovies,
  onSelectMovie,
  onPlayTrailer,
  onOpenDownload,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const currentMovie = featuredMovies[currentIndex] || featuredMovies[0];
  const inWatchlist = currentMovie ? isInWatchlist(currentMovie.id) : false;

  const goToSlide = (index: number) => {
    if (index === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextSlide = () => {
    const nextIdx = (currentIndex + 1) % featuredMovies.length;
    goToSlide(nextIdx);
  };

  const prevSlide = () => {
    const prevIdx = (currentIndex - 1 + featuredMovies.length) % featuredMovies.length;
    goToSlide(prevIdx);
  };

  useEffect(() => {
    if (isPaused || featuredMovies.length <= 1) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused, featuredMovies.length]);

  if (!currentMovie) return null;

  return (
    <section
      aria-label="Featured Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-end overflow-hidden select-none bg-[#07070a]"
    >
      {/* Background Image Layer with smooth crossfade & slow subtle scale */}
      <div className="absolute inset-0 overflow-hidden">
        {featuredMovies.map((movie, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
              style={{
                transitionProperty: 'opacity, transform',
                transitionDuration: '1000ms',
              }}
            >
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.15]"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* Ambient Electric Violet Glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Cinematic Vignette & Obsidian Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070a] via-[#07070a]/80 to-transparent" />
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none" 
             style={{
               background: 'radial-gradient(ellipse at center, transparent 40%, rgba(7, 7, 10, 0.7) 100%)'
             }} 
        />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-16 sm:pb-20 pt-32 sm:pt-40">
        <div className="max-w-2xl sm:max-w-3xl space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Featured pill badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.25)]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>FEATURED PRESENTATION</span>
          </div>

          {/* Title */}
          <h1 
            onClick={() => onSelectMovie(currentMovie)}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display uppercase drop-shadow-2xl cursor-pointer hover:text-purple-200 transition-colors"
          >
            {currentMovie.title}
          </h1>

          {/* Metadata Row: Year · Genre · Runtime · Rating */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300 font-medium">
            <span className="text-zinc-200">{currentMovie.releaseYear}</span>
            <span className="text-zinc-600">·</span>
            <span className="uppercase tracking-wider text-purple-300 font-semibold">
              {currentMovie.genres.join(' / ')}
            </span>
            <span className="text-zinc-600">·</span>
            <span>{currentMovie.formattedRuntime}</span>
            <span className="text-zinc-600">·</span>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{currentMovie.rating.toFixed(1)}</span>
            </div>
            {currentMovie.certification && (
              <span className="px-1.5 py-0.5 text-[10px] rounded border border-zinc-700 text-zinc-400 font-bold uppercase">
                {currentMovie.certification}
              </span>
            )}
          </div>

          {/* Tagline / Overview */}
          <p className="text-sm sm:text-base text-zinc-300/90 line-clamp-3 leading-relaxed max-w-2xl font-light">
            {currentMovie.overview}
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            {/* Watch Trailer Button (Primary Glowing) */}
            <button
              onClick={() => onPlayTrailer(currentMovie)}
              aria-label={`Watch official trailer for ${currentMovie.title}`}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-white text-zinc-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-purple-100 hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <Play className="w-4 h-4 fill-current text-zinc-950 ml-0.5" />
              <span>WATCH TRAILER</span>
            </button>

            {/* Watchlist Button (Glass Secondary) */}
            <button
              onClick={() => toggleWatchlist(currentMovie)}
              aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
              className={`inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 rounded-xl border text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                inWatchlist
                  ? 'bg-purple-900/60 border-purple-500/60 text-purple-200 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                  : 'bg-white/[0.06] border-white/15 text-white hover:bg-white/[0.12] hover:border-white/30'
              }`}
            >
              {inWatchlist ? (
                <>
                  <Check className="w-4 h-4 text-purple-300" />
                  <span>IN WATCHLIST</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>WATCHLIST</span>
                </>
              )}
            </button>

            {/* Download Option Next to Watch Trailer & Watchlist */}
            <button
              onClick={() => onOpenDownload(currentMovie)}
              aria-label={`Download official video for ${currentMovie.title}`}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/70 border border-purple-500/40 text-purple-200 hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-xl transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <Download className="w-4 h-4 text-purple-300" />
              <span>DOWNLOAD</span>
            </button>

            {/* Details link */}
            <button
              onClick={() => onSelectMovie(currentMovie)}
              className="hidden sm:inline-flex text-xs uppercase tracking-wider text-zinc-400 hover:text-white underline-offset-4 hover:underline px-3 py-3 transition-colors"
            >
              More Details
            </button>
          </div>

          {/* Space for Google AdSense and Additional Download Button */}
          <div className="pt-3 max-w-xl space-y-2.5">
            {/* Google AdSense Area */}
            <AdSenseSlot format="compact" adSlotId="9182736450" />

            {/* Additional Download Button */}
            <div className="flex items-center justify-between gap-3 pt-0.5">
              <button
                onClick={() => onOpenDownload(currentMovie)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-purple-300 hover:text-purple-100 border border-purple-500/30 hover:border-purple-500/60 text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
              >
                <Download className="w-3.5 h-3.5 text-purple-400" />
                <span>ADDITIONAL DOWNLOAD: EXACT HOSTED 1080P MASTER (1.1 MB)</span>
              </button>
              <span className="hidden md:inline text-[11px] text-zinc-500 font-mono">
                Exact video file match
              </span>
            </div>
          </div>
        </div>

        {/* Slide Indicators & Navigation Controls */}
        <div className="flex items-center justify-between mt-12 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            {featuredMovies.map((movie, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={movie.id}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${movie.title}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isCurrent 
                      ? 'w-10 bg-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.8)]' 
                      : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous featured movie"
              className="p-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition backdrop-blur-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next featured movie"
              className="p-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition backdrop-blur-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
