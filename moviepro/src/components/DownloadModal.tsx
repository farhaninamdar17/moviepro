import React, { useEffect, useRef } from 'react';
import { X, Download, ShieldCheck, FileVideo, HardDrive, CheckCircle2, Zap } from 'lucide-react';
import { Movie } from '../types/movie';
import { AdSenseSlot } from './AdSenseSlot';

interface DownloadModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (movie: Movie, mirror?: number) => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  movie,
  isOpen,
  onClose,
  onDownload,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  const hostedUrl = movie.downloadUrl || '/videos/official-preview-sample.mp4';
  const fileSize = movie.downloadSize || '1.1 MB';
  const resolution = movie.videoResolution || '1080p Full HD';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-[0_0_80px_rgba(139,92,246,0.3)] overflow-hidden flex flex-col p-6 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-850">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-purple-400">
                OFFICIAL PLATFORM MEDIA DOWNLOAD
              </span>
              <h3 id="download-modal-title" className="text-xl font-black text-white font-display uppercase tracking-tight">
                {movie.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close download dialog"
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video File Specifications Banner */}
        <div className="my-5 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-zinc-800 text-purple-300">
              <FileVideo className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-wide">
                  {movie.slug}-theatrical-preview.mp4
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-green-950 text-green-400 border border-green-800/40">
                  HOSTED FILE
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-zinc-500" />
                <span>Format: MP4 (H.264/AAC) · {resolution} · Size: {fileSize}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Exact Hosted File Match</span>
          </div>
        </div>

        {/* Space for Google AdSense Placement */}
        <div className="my-2">
          <AdSenseSlot format="banner" adSlotId="8472910382" />
        </div>

        {/* Download Action Buttons */}
        <div className="mt-5 space-y-3">
          {/* Primary Download Button */}
          <button
            onClick={() => {
              onDownload(movie, 1);
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(139,92,246,0.45)] active:scale-[0.99]"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD VIDEO (DIRECT PLATFORM HOST)</span>
          </button>

          {/* Additional Download Button */}
          <button
            onClick={() => {
              onDownload(movie, 2);
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-xs sm:text-sm uppercase tracking-wider border border-zinc-800 hover:border-purple-500/40 transition-colors"
          >
            <Zap className="w-4 h-4 text-purple-400" />
            <span>ADDITIONAL HIGH-SPEED MIRROR (1080P MASTER)</span>
          </button>
        </div>

        {/* Verification Note */}
        <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Exact video served from {hostedUrl}</span>
          </div>
          <span>Safe direct download · No popups</span>
        </div>
      </div>
    </div>
  );
};
