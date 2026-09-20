import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieCarouselProps {
  title?: string;
  subtitle?: string;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onPlayTrailer?: (movie: Movie) => void;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  title,
  subtitle,
  movies,
  onSelectMovie,
  onPlayTrailer,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!movies.length) return null;

  return (
    <div className="relative group/carousel w-full py-4">
      {/* Header section with title and controls */}
      {(title || subtitle) && (
        <div className="flex items-end justify-between mb-4 px-4 sm:px-6 lg:px-12">
          <div>
            {subtitle && (
              <p className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-1">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                {title}
              </h2>
            )}
          </div>

          {/* Chevrons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-6 lg:px-12 py-2"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-[170px] sm:w-[200px] md:w-[220px] lg:w-[240px] shrink-0"
          >
            <MovieCard
              movie={movie}
              onSelect={onSelectMovie}
              onPlayTrailer={onPlayTrailer}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
