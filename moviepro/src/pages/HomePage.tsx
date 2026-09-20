import React from 'react';
import { Hero } from '../components/Hero';
import { MovieCarousel } from '../components/MovieCarousel';
import { TrendingSection } from '../components/TrendingSection';
import { MoodDiscovery } from '../components/MoodDiscovery';
import { GenreExplorer } from '../components/GenreExplorer';
import { Movie } from '../types/movie';
import { movieService } from '../services/movieService';
import { Film, ShieldCheck, Sparkles, Tv } from 'lucide-react';

interface HomePageProps {
  onSelectMovie: (movie: Movie) => void;
  onPlayTrailer: (movie: Movie) => void;
  onOpenDownload: (movie: Movie) => void;
  onSelectGenre: (genre: string) => void;
  onNavigateToDiscover: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectMovie,
  onPlayTrailer,
  onOpenDownload,
  onSelectGenre,
  onNavigateToDiscover,
}) => {
  const featuredMovies = movieService.getFeaturedMovies();
  const trendingMovies = movieService.getTrendingTonight();
  const exploreRecommendations = movieService.getCuratedCollection('popular');
  const acclaimedMovies = movieService.getCuratedCollection('acclaimed');

  return (
    <div className="w-full flex flex-col">
      {/* 1. Full-Width Cinematic Hero Section */}
      <Hero
        featuredMovies={featuredMovies}
        onSelectMovie={onSelectMovie}
        onPlayTrailer={onPlayTrailer}
        onOpenDownload={onOpenDownload}
      />

      {/* 2. Continue Exploring Horizontal Section */}
      <section className="mt-8">
        <MovieCarousel
          subtitle="EXPLORE THE CATALOG"
          title="CONTINUE EXPLORING"
          movies={exploreRecommendations}
          onSelectMovie={onSelectMovie}
          onPlayTrailer={onPlayTrailer}
        />
      </section>

      {/* 3. Distinctive Trending Tonight Section (Oversized Ranking Numbers) */}
      <TrendingSection
        movies={trendingMovies}
        onSelectMovie={onSelectMovie}
        onPlayTrailer={onPlayTrailer}
      />

      {/* 4. Signature Feature: Mood Discovery */}
      <MoodDiscovery
        onSelectMovie={onSelectMovie}
        onPlayTrailer={onPlayTrailer}
      />

      {/* 5. Editorial Acclaimed Carousel */}
      <section className="py-6">
        <MovieCarousel
          subtitle="MASTERPIECES OF THE FORM"
          title="CRITICALLY ACCLAIMED"
          movies={acclaimedMovies}
          onSelectMovie={onSelectMovie}
          onPlayTrailer={onPlayTrailer}
        />
      </section>

      {/* 6. Editorial Genre Explorer ("EXPLORE WORLDS") */}
      <GenreExplorer onSelectGenre={onSelectGenre} />

      {/* 7. Editorial Brand Philosophy Showcase */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto my-8">
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-zinc-900 to-[#0d091a] p-8 sm:p-12 lg:p-16 shadow-[0_0_80px_rgba(139,92,246,0.15)]">
          {/* Subtle Ambient Violet Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE MOVIEPRO MANIFESTO</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight leading-none">
              EVERY STORY DESERVES A BIG SCREEN
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              We believe cinema is humanity’s modern cathedral: an immersive confluence of light, sound, architecture, and narrative empathy. MOVIEPRO strips away commercial clutter to reconnect you with the sublime power of the moving image.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-purple-400">
                  <Film className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">4K Previews</h4>
                </div>
                <p className="text-xs text-zinc-400">Official studio master quality theatrical trailers.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-purple-400">
                  <Tv className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Mood Resonance</h4>
                </div>
                <p className="text-xs text-zinc-400">Match screen stories directly to your emotional wavelengths.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-purple-400">
                  <ShieldCheck className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Pure Curation</h4>
                </div>
                <p className="text-xs text-zinc-400">Hand-selected masterworks without generic algorithm spam.</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onNavigateToDiscover}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)]"
              >
                DISCOVER YOUR NEXT STORY
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
