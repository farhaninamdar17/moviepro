import React, { useEffect } from 'react';
import { 
  Play, 
  Plus, 
  Check, 
  Star, 
  ArrowLeft, 
  Share2, 
  Calendar, 
  Clock, 
  Clapperboard, 
  Sparkles,
  Download,
  Zap,
  HardDrive
} from 'lucide-react';
import { Movie } from '../types/movie';
import { movieService } from '../services/movieService';
import { useWatchlist } from '../hooks/useWatchlist';
import { MovieCard } from '../components/MovieCard';
import { AdSenseSlot } from '../components/AdSenseSlot';

interface MovieDetailsPageProps {
  movie: Movie;
  onBack: () => void;
  onSelectMovie: (movie: Movie) => void;
  onPlayTrailer: (movie: Movie) => void;
  onOpenDownload: (movie: Movie) => void;
  onShare: (title: string) => void;
}

export const MovieDetailsPage: React.FC<MovieDetailsPageProps> = ({
  movie,
  onBack,
  onSelectMovie,
  onPlayTrailer,
  onOpenDownload,
  onShare,
}) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const similarMovies = movieService.getSimilarMovies(movie.id, 6);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [movie.id]);

  return (
    <div className="w-full min-h-screen bg-[#07070a] text-zinc-100 pb-20">
      {/* Cinematic Hero Backdrop Area */}
      <div className="relative w-full min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden">
        {/* Full-bleed Backdrop Image */}
        <div className="absolute inset-0">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.1]"
          />

          {/* Obsidian Gradients & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07070a] via-[#07070a]/60 to-transparent" />
          <div className="absolute inset-0 bg-purple-900/10 mix-blend-color" />
        </div>

        {/* Back Button Floating Top-Left */}
        <div className="absolute top-24 sm:top-28 left-4 sm:left-8 lg:left-12 z-20">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-white/10 backdrop-blur-md transition shadow-lg text-xs font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Archive</span>
          </button>
        </div>

        {/* Hero Details Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 pt-40">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
            {/* Poster Thumbnail */}
            <div className="hidden sm:block w-44 md:w-56 aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl border border-white/15 shrink-0">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Metadata */}
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                {movie.genres.map((g) => (
                  <span
                    key={g}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-950/70 border border-purple-500/30 text-purple-300"
                  >
                    {g}
                  </span>
                ))}
                {movie.certification && (
                  <span className="px-2 py-0.5 rounded text-xs font-bold border border-zinc-700 text-zinc-400">
                    {movie.certification}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display uppercase tracking-tight leading-none drop-shadow-lg">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-base sm:text-lg text-purple-200/90 font-light italic">
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-300">
                <div className="flex items-center gap-1 text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{movie.rating.toFixed(1)}</span>
                  <span className="text-zinc-500 font-normal">({movie.votesCount})</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{movie.releaseYear}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{movie.formattedRuntime}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Clapperboard className="w-3.5 h-3.5" />
                  <span>Dir. {movie.director}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onPlayTrailer(movie)}
                  aria-label="Watch official theatrical trailer"
                  className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-white text-zinc-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-purple-100 hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span>WATCH TRAILER</span>
                </button>

                <button
                  onClick={() => toggleWatchlist(movie)}
                  className={`inline-flex items-center gap-2 px-5 sm:px-7 py-3.5 rounded-xl border text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-xl transition-all ${
                    inWatchlist
                      ? 'bg-purple-900/60 border-purple-500/60 text-purple-200 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                      : 'bg-white/[0.08] border-white/15 text-white hover:bg-white/[0.14]'
                  }`}
                >
                  {inWatchlist ? <Check className="w-4 h-4 text-purple-300" /> : <Plus className="w-4 h-4" />}
                  <span>{inWatchlist ? 'IN WATCHLIST' : 'ADD TO WATCHLIST'}</span>
                </button>

                {/* Download Option Next to Watch Trailer and Add to Watchlist */}
                <button
                  onClick={() => onOpenDownload(movie)}
                  aria-label={`Download video for ${movie.title}`}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] active:scale-95"
                >
                  <Download className="w-4 h-4 text-purple-300" />
                  <span>DOWNLOAD</span>
                </button>

                <button
                  onClick={() => onShare(movie.title)}
                  aria-label="Share movie"
                  className="p-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition"
                  title="Share this film"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Space for Google AdSense and Additional Download Button */}
              <div className="pt-4 max-w-2xl space-y-2.5">
                {/* Google AdSense Area */}
                <AdSenseSlot format="banner" adSlotId="7492018472" />

                {/* Additional Download Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <button
                    onClick={() => onOpenDownload(movie)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-500/60 text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
                  >
                    <Zap className="w-3.5 h-3.5 text-purple-400" />
                    <span>ADDITIONAL DOWNLOAD: EXACT HOSTED 1080P MASTER (1.1 MB)</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <HardDrive className="w-3 h-3 text-purple-400" />
                    <span>Exact platform-hosted file match</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left 2 Cols: Synopsis, Cast, Moods */}
        <div className="lg:col-span-2 space-y-12">
          {/* Storyline / Overview */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display uppercase mb-4">
              THE STORYLINE
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
              {movie.overview}
            </p>

            {/* Associated Mood Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-6">
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mr-1">
                Emotional Signatures:
              </span>
              {movie.moods.map((m) => (
                <span
                  key={m}
                  className="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Cast Carousel / Grid */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display uppercase">
                FEATURED CAST
              </h2>
              <span className="text-xs text-zinc-500 font-mono">
                {movie.cast.length} ACTORS LISTED
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {movie.cast.map((actor) => (
                <div
                  key={actor.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-purple-500/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 shrink-0 border border-zinc-800">
                    <img
                      src={actor.photo}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-white truncate">
                      {actor.name}
                    </h4>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {actor.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Production & Technical Specifications */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 shadow-xl space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>THE PRODUCTION ARCHIVE</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-zinc-500 uppercase tracking-wider block font-semibold">Director</span>
                <span className="text-white font-medium text-sm">{movie.director}</span>
              </div>

              {movie.cinematographer && (
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block font-semibold">Cinematography</span>
                  <span className="text-white font-medium text-sm">{movie.cinematographer}</span>
                </div>
              )}

              {movie.composer && (
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block font-semibold">Original Music Score</span>
                  <span className="text-white font-medium text-sm">{movie.composer}</span>
                </div>
              )}

              <div className="pt-2 border-t border-zinc-900 space-y-3">
                {movie.budget && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Budget</span>
                    <span className="text-zinc-200 font-medium">{movie.budget}</span>
                  </div>
                )}
                {movie.boxOffice && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Box Office</span>
                    <span className="text-zinc-200 font-medium">{movie.boxOffice}</span>
                  </div>
                )}
                {movie.aspectRatio && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Aspect Ratio</span>
                    <span className="text-zinc-200 font-medium">{movie.aspectRatio}</span>
                  </div>
                )}
                {movie.soundMix && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Sound Mix</span>
                    <span className="text-zinc-200 font-medium">{movie.soundMix}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MORE LIKE THIS Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-20 pt-10 border-t border-zinc-900">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-1 block">
              RESONANCE & INFLUENCES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display uppercase">
              MORE LIKE THIS
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {similarMovies.map((similar) => (
            <MovieCard
              key={similar.id}
              movie={similar}
              onSelect={onSelectMovie}
              onPlayTrailer={onPlayTrailer}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
