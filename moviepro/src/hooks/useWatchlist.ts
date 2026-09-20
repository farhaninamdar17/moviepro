import { useState, useEffect, useCallback } from 'react';
import { Movie } from '../types/movie';

const WATCHLIST_STORAGE_KEY = 'moviepro_watchlist_v1';
const WATCHLIST_CHANGE_EVENT = 'moviepro_watchlist_updated';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    try {
      const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState<{ message: string; type: 'add' | 'remove' | 'info' } | null>(null);

  // Sync state across window events
  useEffect(() => {
    const handleStorage = () => {
      try {
        const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
        if (stored) {
          setWatchlist(JSON.parse(stored));
        } else {
          setWatchlist([]);
        }
      } catch {
        setWatchlist([]);
      }
    };

    window.addEventListener(WATCHLIST_CHANGE_EVENT, handleStorage);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener(WATCHLIST_CHANGE_EVENT, handleStorage);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const saveWatchlist = useCallback((newList: Movie[]) => {
    setWatchlist(newList);
    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(newList));
      window.dispatchEvent(new Event(WATCHLIST_CHANGE_EVENT));
    } catch (e) {
      console.error('Failed to save watchlist to localStorage', e);
    }
  }, []);

  const isInWatchlist = useCallback((movieId: string): boolean => {
    return watchlist.some(m => m.id === movieId);
  }, [watchlist]);

  const toggleWatchlist = useCallback((movie: Movie) => {
    const exists = watchlist.some(m => m.id === movie.id);
    if (exists) {
      const updated = watchlist.filter(m => m.id !== movie.id);
      saveWatchlist(updated);
      setToast({ message: `Removed "${movie.title}" from your watchlist`, type: 'remove' });
      return false;
    } else {
      const updated = [movie, ...watchlist];
      saveWatchlist(updated);
      setToast({ message: `Added "${movie.title}" to your watchlist`, type: 'add' });
      return true;
    }
  }, [watchlist, saveWatchlist]);

  const removeFromWatchlist = useCallback((movieId: string) => {
    const target = watchlist.find(m => m.id === movieId);
    const updated = watchlist.filter(m => m.id !== movieId);
    saveWatchlist(updated);
    if (target) {
      setToast({ message: `Removed "${target.title}" from your watchlist`, type: 'remove' });
    }
  }, [watchlist, saveWatchlist]);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    watchlist,
    count: watchlist.length,
    isInWatchlist,
    toggleWatchlist,
    removeFromWatchlist,
    toast,
    clearToast
  };
}
