import React, { useState } from 'react';
import { Sparkles, ArrowRight, Film } from 'lucide-react';
import { movieService } from '../services/movieService';
import { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';

interface GenresPageProps {
  onSelectMovie: (movie: Movie) => void;
  onPlayTrailer: (movie: Movie) => void;
  selectedGenreFilter?: string;
}

export const GenresPage: React.FC<GenresPageProps> = ({
  onSelectMovie,
  onPlayTrailer,
  selectedGenreFilter,
}) => {
  const genreMeta = movieService.getGenreMetadata();
  const [activeGenre, setActiveGenre] = useState<string>(selectedGenreFilter || 'Sci-Fi');

  const matchingMovies = movieService.getMoviesByGenre(activeGenre);
  const activeMeta = genreMeta.find(g => g.name.toLowerCase() === activeGenre.toLowerCase()) || genreMeta[0];

  return (
    <div className="w-full pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2">
          <Sparkles className="w-4 h-4" />
          <span>CINEMATIC ARCHIVES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight">
          GENRE WORLDS
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 font-light mt-1 max-w-2xl">
          Dive deep into specific cinematic realms. From mind-bending science fiction to tense psychological thrillers.
        </p>
      </div>

      {/* Genre Categories Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4 mb-14">
        {genreMeta.map((genre) => {
          const isSelected = genre.name.toLowerCase() === activeGenre.toLowerCase();
          return (
            <button
              key={genre.name}
              onClick={() => setActiveGenre(genre.name)}
              className={`relative h-32 rounded-2xl overflow-hidden text-left border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 group ${
                isSelected
                  ? 'border-purple-500 ring-2 ring-purple-500/50 shadow-[0_0_25px_rgba(139,92,246,0.3)] scale-[1.02]'
                  : 'border-zinc-800/80 hover:border-zinc-700 hover:scale-[1.01]'
              }`}
            >
              <img
                src={genre.image}
                alt={genre.label}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] group-hover:brightness-[0.3] transition-all"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="relative h-full flex flex-col justify-end p-3.5 z-10">
                <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                  {genre.count}+ STORIES
                </span>
                <span className="text-base sm:text-lg font-black font-display text-white uppercase tracking-tight">
                  {genre.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Genre Showcase Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-900 pb-5 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-1 block">
            SELECTED GENRE
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            {activeMeta.label}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            {activeMeta.description}
          </p>
        </div>

        <div className="mt-4 sm:mt-0 text-xs text-zinc-500 font-mono">
          {matchingMovies.length} MOVIES IN ARCHIVE
        </div>
      </div>

      {/* Movies Grid for selected genre */}
      {matchingMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {matchingMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
              onPlayTrailer={onPlayTrailer}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-zinc-900 rounded-3xl bg-zinc-950">
          <Film className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h4 className="text-sm font-bold uppercase text-white tracking-wider">
            NO FILMS AVAILABLE IN THIS GENRE ARCHIVE
          </h4>
        </div>
      )}
    </div>
  );
};
