import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AdSenseSlotProps {
  format?: 'banner' | 'compact' | 'rectangle';
  className?: string;
  adSlotId?: string;
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  format = 'compact',
  className = '',
  adSlotId = '1092837465',
}) => {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-center ${className}`}>
      {/* Google AdSense Label */}
      <div className="flex items-center justify-between px-3 py-1 bg-zinc-900/60 border-b border-zinc-800/50 text-[10px] uppercase font-mono tracking-widest text-zinc-500">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/80" />
          <span>Google AdSense</span>
        </div>
        <div className="flex items-center gap-1 text-zinc-600">
          <span>Ad #{adSlotId}</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </div>
      </div>

      {/* Ad Area Container */}
      <div className={`flex flex-col items-center justify-center p-3 text-center ${
        format === 'banner' 
          ? 'min-h-[90px] md:min-h-[100px]' 
          : format === 'rectangle' 
          ? 'min-h-[220px]' 
          : 'min-h-[72px]'
      }`}>
        {/* Real AdSense tag placement */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-9999999999999999"
          data-ad-slot={adSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />

        {/* Cinematic Ad Space Placeholder */}
        <div className="space-y-1 my-auto pointer-events-none select-none">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="tracking-wide">PREMIUM CINEMA EXPERIENCES & 4K OLED SCREENS</span>
          </div>
          <p className="text-[11px] text-zinc-500 max-w-md mx-auto">
            Upgrade your home theater to reference master standards · Sponsored Content
          </p>
        </div>
      </div>
    </div>
  );
};
