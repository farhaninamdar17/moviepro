import React from 'react';
import { Clapperboard } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-zinc-900 bg-[#060709] py-14 px-4 sm:px-6 lg:px-12 text-zinc-400 mt-20 mb-16 md:mb-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand identity */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Clapperboard className="w-3.5 h-3.5" />
            </div>
            <span className="font-display font-black text-xl text-white tracking-wider uppercase">
              MOVIE<span className="text-purple-400">PRO</span>
            </span>
          </div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold font-display">
            EVERY STORY DESERVES A BIG SCREEN
          </p>
          <p className="text-xs text-zinc-500 max-w-sm">
            Curated cinematic discovery. Official studio metadata & trailer embeds. No full copyrighted movies hosted.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs uppercase tracking-wider font-semibold">
          <button 
            onClick={() => onNavigate('discover')} 
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Discover
          </button>
          <button 
            onClick={() => onNavigate('movies')} 
            className="text-zinc-400 hover:text-white transition-colors"
          >
            All Movies
          </button>
          <button 
            onClick={() => onNavigate('genres')} 
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Genres
          </button>
          <button 
            onClick={() => onNavigate('watchlist')} 
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Watchlist
          </button>
          <a 
            href="#about" 
            onClick={(e) => { e.preventDefault(); alert("MOVIEPRO is an editorial discovery platform celebrating visionary cinema."); }}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            About
          </a>
          <a 
            href="#privacy" 
            onClick={(e) => { e.preventDefault(); alert("Privacy Policy: MOVIEPRO stores your watchlist locally on your device."); }}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Privacy
          </a>
          <a 
            href="#terms" 
            onClick={(e) => { e.preventDefault(); alert("Terms of Service: MOVIEPRO metadata and trailers are sourced responsibly."); }}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Terms
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 gap-2">
        <p>© {new Date().getFullYear()} MOVIEPRO ARCHIVES. ALL RIGHTS RESERVED.</p>
        <p className="font-mono text-zinc-400">DESIGNED FOR VISIONARY CINEMA ENTHUSIASTS</p>
      </div>
    </footer>
  );
};
