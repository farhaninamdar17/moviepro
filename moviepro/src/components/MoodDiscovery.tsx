import React, { useState } from 'react';
import { 
  Brain, 
  Zap, 
  Sun, 
  Moon, 
  Compass, 
  Heart, 
  Smile, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { MoodType, Movie } from '../types/movie';
import { movieService } from '../services/movieService';
import { MovieCard } from './MovieCard';

interface MoodDiscoveryProps {
  onSelectMovie: (movie: Movie) => void;
  onPlayTrailer?: (movie: Movie) => void;
}

const MOOD_ICONS: Record<MoodType, React.ReactNode> = {
  'MIND-BENDING': <Brain className="w-5 h-5" />,
  'ADRENALINE': <Zap className="w-5 h-5" />,
  'FEEL GOOD': <Sun className="w-5 h-5" />,
  'DARK': <Moon className="w-5 h-5" />,
  'ADVENTURE': <Compass className="w-5 h-5" />,
  'ROMANCE': <Heart className="w-5 h-5" />,
  'FUNNY': <Smile className="w-5 h-5" />,
  'EMOTIONAL': <Sparkles className="w-5 h-5" />,
};

export const MoodDiscovery: React.FC<MoodDiscoveryProps> = ({
  onSelectMovie,
  onPlayTrailer,
}) => {
  const moodConfigs = movieService.getMoodConfigs();
  const [selectedMood, setSelectedMood] = useState<MoodType>('MIND-BENDING');

  const currentConfig = moodConfigs.find((m) => m.id === selectedMood) || moodConfigs[0];
  const matchingMovies = movieService.getMoviesByMood(selectedMood);

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting based on mood accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: currentConfig.accentColor }}
      />

      {/* Main Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2 block">
          SIGNATURE CURATION
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-display uppercase">
          WHAT ARE YOU IN THE MOOD FOR?
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mt-2 font-light">
          Select an emotional frequency. MOVIEPRO tunes its screening rooms to match your state of mind.
        </p>
      </div>

      {/* Interactive Mood Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 mb-12">
        {moodConfigs.map((mood) => {
          const isSelected = mood.id === selectedMood;
          return (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl border text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                isSelected
                  ? 'bg-purple-950/80 border-purple-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.35)] scale-[1.02]'
                  : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 hover:border-zinc-700'
              }`}
            >
              <div 
                className={`mb-2 p-2 rounded-lg transition-colors ${
                  isSelected ? 'bg-purple-500 text-white' : 'bg-zinc-900 text-zinc-400'
                }`}
              >
                {MOOD_ICONS[mood.id]}
              </div>
              <span className="text-xs font-bold tracking-wider uppercase font-display">
                {mood.label}
              </span>

              {/* Glowing active indicator line */}
              {isSelected && (
                <div 
                  className="absolute -bottom-[1px] left-4 right-4 h-[2px] rounded-full"
                  style={{ backgroundColor: mood.accentColor }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic Animated Mood Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-900 pb-5 mb-8 transition-all duration-500">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentConfig.accentColor }} />
            <span>SELECTED FREQUENCY: {currentConfig.label}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display uppercase">
            {currentConfig.headline}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            {currentConfig.description}
          </p>
        </div>

        <div className="mt-4 sm:mt-0 text-xs text-zinc-500 font-mono">
          {matchingMovies.length} CURATED EXPERIENCES
        </div>
      </div>

      {/* Matching Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {matchingMovies.map((movie) => (
          <div key={movie.id} className="animate-in fade-in zoom-in-95 duration-300">
            <MovieCard
              movie={movie}
              onSelect={onSelectMovie}
              onPlayTrailer={onPlayTrailer}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
