import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Film, Clapperboard } from 'lucide-react';

export type PageView = 'home' | 'discover' | 'movies' | 'genres' | 'watchlist' | 'details';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenSearch: () => void;
  watchlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  watchlistCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageView; label: string }[] = [
    { id: 'discover', label: 'DISCOVER' },
    { id: 'movies', label: 'MOVIES' },
    { id: 'genres', label: 'GENRES' },
    { id: 'watchlist', label: 'WATCHLIST' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none ${
        isScrolled
          ? 'bg-[#07070a]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-2.5 text-left focus-visible:outline-none"
            aria-label="MOVIEPRO Homepage"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-900 flex items-center justify-center text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:scale-105 transition-transform">
              <Clapperboard className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            </div>

            <div>
              <span className="font-display text-xl sm:text-2xl font-black tracking-wider text-white uppercase group-hover:text-purple-300 transition-colors">
                MOVIE<span className="text-purple-400">PRO</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-widest uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-md ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span>{item.label}</span>

                  {/* Watchlist count badge if relevant */}
                  {item.id === 'watchlist' && watchlistCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-purple-600 text-white">
                      {watchlistCount}
                    </span>
                  )}

                  {/* Animated bottom indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-400 shadow-[0_0_8px_rgba(139,92,246,0.8)] rounded-full animate-in fade-in duration-200" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Actions: Search trigger + Watchlist button on mobile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Open search dialog (shortcut: slash or command-K)"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-zinc-900/70 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-purple-500/40 transition shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            <Search className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline text-xs font-medium text-zinc-400">
              Search archive...
            </span>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] text-zinc-500 bg-zinc-950 border border-zinc-800 rounded font-mono">
              /
            </kbd>
          </button>

          {/* Quick Watchlist Shortcut button for tablet / mobile top header */}
          <button
            onClick={() => onNavigate('watchlist')}
            aria-label={`View watchlist (${watchlistCount} items)`}
            className="relative p-2 rounded-xl bg-zinc-900/70 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            <Bookmark className="w-4 h-4" />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
