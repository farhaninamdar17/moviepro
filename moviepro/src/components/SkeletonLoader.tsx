import React from 'react';

export const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="relative rounded-xl overflow-hidden bg-zinc-900/50 border border-zinc-800/60 aspect-[2/3] animate-pulse flex flex-col justify-end p-4">
      <div className="space-y-2">
        <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
        <div className="flex gap-2">
          <div className="h-3 bg-zinc-800/70 rounded w-1/3"></div>
          <div className="h-3 bg-zinc-800/70 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="relative w-full h-[75vh] min-h-[520px] bg-zinc-950 animate-pulse flex items-end pb-16 px-6 md:px-16 border-b border-zinc-900">
      <div className="max-w-2xl w-full space-y-4">
        <div className="h-6 w-28 bg-purple-900/30 rounded-full"></div>
        <div className="h-12 w-3/4 bg-zinc-800 rounded-lg"></div>
        <div className="h-4 w-1/2 bg-zinc-800/60 rounded"></div>
        <div className="h-16 w-full bg-zinc-900 rounded"></div>
        <div className="flex gap-4 pt-2">
          <div className="h-11 w-36 bg-purple-600/30 rounded-xl"></div>
          <div className="h-11 w-36 bg-zinc-800 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export const CastCardSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/50 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-zinc-800 shrink-0"></div>
      <div className="space-y-1.5 flex-1">
        <div className="h-3.5 bg-zinc-800 rounded w-3/4"></div>
        <div className="h-3 bg-zinc-800/60 rounded w-1/2"></div>
      </div>
    </div>
  );
};
