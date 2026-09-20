import React, { useState, useEffect, useCallback } from 'react';
import { Header, PageView } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { MoviesPage } from './pages/MoviesPage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';
import { GenresPage } from './pages/GenresPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { TrailerModal } from './components/TrailerModal';
import { DownloadModal } from './components/DownloadModal';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';
import { useWatchlist } from './hooks/useWatchlist';
import { movieService } from './services/movieService';
import { Movie } from './types/movie';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [genreFilter, setGenreFilter] = useState<string>('Sci-Fi');

  // Modals
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadMovie, setDownloadMovie] = useState<Movie | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Watchlist & Toast
  const { watchlist, count: watchlistCount, toast, clearToast } = useWatchlist();
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Synchronize with URL hash for deep linking (e.g. #movie/interstellar-2014)
  const syncFromHash = useCallback(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash || hash === 'home') {
      setCurrentPage('home');
    } else if (hash === 'discover') {
      setCurrentPage('discover');
    } else if (hash === 'movies') {
      setCurrentPage('movies');
    } else if (hash.startsWith('genre/')) {
      const g = decodeURIComponent(hash.replace('genre/', ''));
      setGenreFilter(g);
      setCurrentPage('genres');
    } else if (hash === 'genres') {
      setCurrentPage('genres');
    } else if (hash === 'watchlist') {
      setCurrentPage('watchlist');
    } else if (hash.startsWith('movie/')) {
      const movieSlug = hash.replace('movie/', '');
      const found = movieService.getMovieById(movieSlug);
      if (found) {
        setSelectedMovie(found);
        setCurrentPage('details');
      } else {
        setCurrentPage('home');
      }
    }
  }, []);

  useEffect(() => {
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [syncFromHash]);

  // Keyboard shortcut listener for universal search (/ or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA'].includes(activeTag)) return;

      if (e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation handlers
  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentPage('details');
    window.location.hash = `movie/${movie.slug || movie.id}`;
  };

  const handlePlayTrailer = (movie: Movie) => {
    setTrailerMovie(movie);
    setIsTrailerOpen(true);
  };

  const handleOpenDownload = (movie: Movie) => {
    setDownloadMovie(movie);
    setIsDownloadOpen(true);
  };

  const handleDirectDownload = (movie: Movie, mirror = 1) => {
    const videoUrl = movie.downloadUrl || '/videos/official-preview-sample.mp4';
    const fileName = `${movie.slug || 'movie'}-theatrical-preview.mp4`;

    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setShareToast(`Downloading "${movie.title}" exact hosted cinema video (${mirror === 2 ? 'Mirror 2' : 'Direct Host'})...`);
  };

  const handleSelectGenre = (genre: string) => {
    setGenreFilter(genre);
    setCurrentPage('genres');
    window.location.hash = `genre/${encodeURIComponent(genre)}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareMovie = (title: string) => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(`Link to "${title}" copied to clipboard`);
    } catch {
      setShareToast(`Viewing "${title}"`);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07070a] text-zinc-100 font-sans selection:bg-purple-600/30 selection:text-purple-200">
      {/* Subtle Atmospheric Film Grain Texture */}
      <div className="film-grain" aria-hidden="true" />

      {/* Persistent Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        watchlistCount={watchlistCount}
      />

      {/* Main Page Content Render */}
      <main className="w-full">
        {currentPage === 'home' && (
          <HomePage
            onSelectMovie={handleSelectMovie}
            onPlayTrailer={handlePlayTrailer}
            onOpenDownload={handleOpenDownload}
            onSelectGenre={handleSelectGenre}
            onNavigateToDiscover={() => handleNavigate('discover')}
          />
        )}

        {currentPage === 'discover' && (
          <DiscoverPage
            onSelectMovie={handleSelectMovie}
            onPlayTrailer={handlePlayTrailer}
          />
        )}

        {currentPage === 'movies' && (
          <MoviesPage
            onSelectMovie={handleSelectMovie}
            onPlayTrailer={handlePlayTrailer}
            initialGenre={genreFilter}
          />
        )}

        {currentPage === 'genres' && (
          <GenresPage
            onSelectMovie={handleSelectMovie}
            onPlayTrailer={handlePlayTrailer}
            selectedGenreFilter={genreFilter}
          />
        )}

        {currentPage === 'watchlist' && (
          <WatchlistPage
            onSelectMovie={handleSelectMovie}
            onPlayTrailer={handlePlayTrailer}
            onDiscover={() => handleNavigate('discover')}
          />
        )}

        {currentPage === 'details' && selectedMovie && (
          <MovieDetailsPage
            movie={selectedMovie}
            onBack={() => handleNavigate('home')}
            onSelectMovie={handleSelectMovie}
            onPlayTrailer={handlePlayTrailer}
            onOpenDownload={handleOpenDownload}
            onShare={handleShareMovie}
          />
        )}
      </main>

      {/* Global Minimalist Editorial Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Bottom Glass Navigation Bar */}
      <MobileNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        watchlistCount={watchlistCount}
      />

      {/* Cinematic Full-screen Trailer Modal */}
      <TrailerModal
        movie={trailerMovie}
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        onDownload={handleDirectDownload}
      />

      {/* Dedicated Download Modal with Google AdSense & Dual Buttons */}
      <DownloadModal
        movie={downloadMovie}
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        onDownload={handleDirectDownload}
      />

      {/* Universal Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectMovie={handleSelectMovie}
      />

      {/* Non-intrusive Toasts */}
      <Toast
        message={toast?.message || shareToast}
        type={toast?.type || 'info'}
        onClose={() => {
          clearToast();
          setShareToast(null);
        }}
      />
    </div>
  );
}

export default App;
