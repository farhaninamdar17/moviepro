import React from 'react';
import { Home, Compass, Bookmark, Search, Film } from 'lucide-react';
import { PageView } from './Header';

interface MobileNavProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenSearch: () => void;
  watchlistCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  watchlistCount,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07070a]/95 backdrop-blur-xl border-t border-zinc-800/80 px-2 py-2 safe-area-pb">
      <div className="flex items-center justify-around">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-colors ${
            currentPage === 'home' ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </button>

        <button
          onClick={() => onNavigate('discover')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-colors ${
            currentPage === 'discover' ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Discover</span>
        </button>

        <button
          onClick={() => onNavigate('movies')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-colors ${
            currentPage === 'movies' ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Film className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Movies</span>
        </button>

        <button
          onClick={() => onNavigate('watchlist')}
          className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-colors ${
            currentPage === 'watchlist' ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <div className="relative">
            <Bookmark className="w-5 h-5 mb-0.5" />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-purple-600 text-white text-[9px] font-extrabold flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">Watchlist</span>
        </button>

        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 text-zinc-500 hover:text-purple-400 transition-colors"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Search</span>
        </button>
      </div>
    </div>
  );
};
