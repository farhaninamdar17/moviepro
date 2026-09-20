import React, { useState, useEffect, useRef } from 'react';
import { X, Film, ExternalLink, Download, HardDrive, Tv } from 'lucide-react';
import { Movie } from '../types/movie';
import { AdSenseSlot } from './AdSenseSlot';

interface TrailerModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (movie: Movie) => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ 
  movie, 
  isOpen, 
  onClose,
  onDownload,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [videoSource, setVideoSource] = useState<'stream' | 'hosted'>('stream');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setVideoSource('stream');
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  const hostedUrl = movie.downloadUrl || '/videos/official-preview-sample.mp4';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trailer-title"
    >
      <div 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 shadow-[0_0_80px_rgba(139,92,246,0.25)] flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-3.5 border-b border-zinc-800/80 bg-zinc-950/90 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                  Official Screening
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-xs text-zinc-400">{movie.formattedRuntime}</span>
              </div>
              <h3 id="trailer-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                {movie.title} ({movie.releaseYear})
              </h3>
            </div>
          </div>

          {/* Mode Switcher: Stream vs Hosted Local Video */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-zinc-900 rounded-lg p-0.5 border border-zinc-800 text-xs">
              <button
                onClick={() => setVideoSource('stream')}
                className={`px-3 py-1 rounded-md font-semibold uppercase tracking-wider transition ${
                  videoSource === 'stream' 
                    ? 'bg-purple-600 text-white shadow' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Tv className="w-3 h-3" />
                  <span>Theatrical Stream</span>
                </span>
              </button>
              <button
                onClick={() => setVideoSource('hosted')}
                className={`px-3 py-1 rounded-md font-semibold uppercase tracking-wider transition ${
                  videoSource === 'hosted' 
                    ? 'bg-purple-600 text-white shadow' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <HardDrive className="w-3 h-3" />
                  <span>Hosted Master (MP4)</span>
                </span>
              </button>
            </div>

            {/* Direct Download Button in Header */}
            {onDownload && (
              <button
                onClick={() => onDownload(movie)}
                aria-label={`Download video for ${movie.title}`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-xs font-semibold uppercase tracking-wider text-purple-200 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Video</span>
              </button>
            )}

            <button
              onClick={onClose}
              aria-label="Close trailer"
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 16:9 Video Player Container */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          {videoSource === 'stream' ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${movie.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
              title={`${movie.title} Official Trailer`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video
              key={hostedUrl}
              src={hostedUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Space for Google AdSense in Trailer Modal */}
        <div className="p-3 bg-zinc-950 border-t border-zinc-900">
          <AdSenseSlot format="compact" adSlotId="3940192847" />
        </div>

        {/* Footer info & download bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 bg-zinc-900/60 text-xs text-zinc-400 border-t border-zinc-900">
          <div className="flex items-center gap-3">
            <span className="text-zinc-500">Director:</span>
            <span className="text-zinc-300 font-medium">{movie.director}</span>
            <span className="text-zinc-700">·</span>
            <span className="text-emerald-400 font-mono">Hosted Video: {movie.slug}-theatrical-preview.mp4</span>
          </div>

          <div className="flex items-center gap-3">
            {onDownload && (
              <button
                onClick={() => onDownload(movie)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD EXACT HOSTED VIDEO (1080P)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
