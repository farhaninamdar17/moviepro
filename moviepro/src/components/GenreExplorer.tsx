import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { movieService } from '../services/movieService';

interface GenreExplorerProps {
  onSelectGenre: (genre: string) => void;
}

export const GenreExplorer: React.FC<GenreExplorerProps> = ({ onSelectGenre }) => {
  const genres = movieService.getGenreMetadata();

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-1 block">
            CINEMATIC ARCHIVES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-display uppercase">
            EXPLORE WORLDS
          </h2>
        </div>
        <p className="hidden md:block text-xs uppercase tracking-wider text-zinc-400">
          Traverse by storytelling form
        </p>
      </div>

      {/* Grid of editorial genre cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {genres.map((genre) => (
          <div
            key={genre.name}
            onClick={() => onSelectGenre(genre.name)}
            tabIndex={0}
            role="button"
            aria-label={`Explore ${genre.label} genre with ${genre.count} movies`}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSelectGenre(genre.name);
            }}
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden cursor-pointer border border-zinc-800/80 hover:border-purple-500/50 shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 select-none"
          >
            {/* Background artwork with slow zoom on hover */}
            <img
              src={genre.image}
              alt={genre.label}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.6] group-hover:scale-110 group-hover:brightness-[0.4] transition-all duration-700 ease-out"
              loading="lazy"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content info */}
            <div className="relative h-full flex flex-col justify-between p-4 sm:p-5 z-10">
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:border-purple-500/40 group-hover:bg-purple-950/70 transition-colors">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-purple-400 font-semibold block mb-0.5">
                  {genre.count}+ STORIES
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight group-hover:text-purple-200 transition-colors">
                  {genre.label}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
