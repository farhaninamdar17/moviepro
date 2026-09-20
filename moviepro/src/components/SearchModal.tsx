import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, Film, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { movieService } from '../services/movieService';
import { Movie } from '../types/movie';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
}

const TRENDING_SEARCHES = [
  'Christopher Nolan',
  'Denis Villeneuve',
  'Mind-Bending',
  'Sci-Fi',
  'Dune',
  'Hans Zimmer',
  'A24',
  'Adrenaline',
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectMovie }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName))) {
        e.preventDefault();
        if (!isOpen) {
          // Can be triggered externally
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }
    const found = movieService.searchMovies(query);
    setResults(found);
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (selected) {
        onSelectMovie(selected);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search MOVIEPRO"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-zinc-950/95 border border-zinc-800/80 rounded-2xl shadow-[0_0_80px_rgba(139,92,246,0.2)] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
      >
        {/* Search Header Input */}
        <div className="flex items-center px-5 py-4 border-b border-zinc-800/80 gap-3">
          <Search className="w-5 h-5 text-purple-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search movies, actors, directors, genres, moods..."
            className="w-full bg-transparent text-white placeholder-zinc-500 text-base md:text-lg focus:outline-none tracking-wide"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded">
            ESC
          </kbd>
        </div>

        {/* Dynamic Body */}
        <div className="overflow-y-auto p-4 space-y-4 no-scrollbar">
          {/* Case 1: Initial Empty State */}
          {!query.trim() && (
            <div className="py-6 px-2">
              <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Trending Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full text-xs text-zinc-300 bg-zinc-900/80 hover:bg-purple-950/40 hover:text-purple-300 border border-zinc-800/70 hover:border-purple-500/40 transition-all flex items-center gap-1.5"
                  >
                    <span>{term}</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>

              <div className="mt-12 text-center py-8 border-t border-zinc-900/80">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
                  <Film className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold tracking-wider uppercase text-zinc-300">
                  START WITH A STORY
                </h4>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
                  Type a title, a favorite director, an actor, or a cinematic mood to explore the archive.
                </p>
              </div>
            </div>
          )}

          {/* Case 2: No Results Found */}
          {query.trim() && results.length === 0 && (
            <div className="py-12 px-4 text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center mx-auto mb-3">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold tracking-wider uppercase text-zinc-300">
                WE COULDN’T FIND THAT STORY
              </h4>
              <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1.5">
                No matching movies found for &ldquo;{query}&rdquo;. Try browsing by popular directors, genres, or moods below:
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['Sci-Fi', 'Christopher Nolan', 'Action', 'Mind-Bending', 'Dune'].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setQuery(sug)}
                    className="px-3 py-1 rounded-full text-xs text-purple-300 bg-purple-950/30 border border-purple-800/40 hover:bg-purple-900/40 transition"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Case 3: Search Results List */}
          {results.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between px-2 text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">
                <span>Results ({results.length})</span>
                <span className="flex items-center gap-1 text-[11px] text-zinc-600">
                  Navigate <CornerDownLeft className="w-3 h-3" /> Select
                </span>
              </div>

              {results.map((movie, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={movie.id}
                    onClick={() => {
                      onSelectMovie(movie);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center gap-3.5 p-2.5 rounded-xl cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-purple-950/40 border border-purple-500/40 shadow-[0_0_20px_rgba(139,92,246,0.15)]' 
                        : 'hover:bg-zinc-900/60 border border-transparent'
                    }`}
                  >
                    {/* Poster thumbnail */}
                    <div className="w-12 h-16 rounded-md overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                      <img 
                        src={movie.poster} 
                        alt={movie.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Movie Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-semibold text-white truncate group-hover:text-purple-300">
                          {movie.title}
                        </h5>
                        <span className="text-xs text-zinc-400 font-normal shrink-0">
                          ({movie.releaseYear})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-400">
                        <span>{movie.director}</span>
                        <span className="text-zinc-600">·</span>
                        <span>{movie.genres.slice(0, 2).join(', ')}</span>
                        <span className="text-zinc-600">·</span>
                        <span>{movie.formattedRuntime}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{movie.rating.toFixed(1)}</span>
                        </div>
                        {movie.moods.slice(0, 2).map((m) => (
                          <span 
                            key={m}
                            className="px-1.5 py-0.2 rounded text-[10px] uppercase font-medium bg-zinc-800/80 text-zinc-300"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Select indicator */}
                    <div className="shrink-0 text-zinc-500 pl-2">
                      <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-purple-400 translate-x-1' : 'opacity-0'}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
