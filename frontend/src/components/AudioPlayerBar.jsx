import React from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Disc3, 
  SlidersHorizontal,
  SkipBack,
  SkipForward
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export default function AudioPlayerBar() {
  const { 
    activeTrack, 
    isPlaying, 
    togglePlay, 
    currentTime, 
    setCurrentTime, 
    volume, 
    setVolume, 
    isMuted, 
    setIsMuted 
  } = useMusic();

  if (!activeTrack) return null;

  const totalSeconds = activeTrack.durationSeconds || 180;
  const progressPercent = Math.min(100, (currentTime / totalSeconds) * 100);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value);
    const newTime = (newProgress / 100) * totalSeconds;
    setCurrentTime(newTime);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-studio-900/95 border-t border-white/10 backdrop-blur-xl px-4 py-3 text-slate-200 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Track Metadata */}
        <div className="flex items-center gap-3 w-full md:w-1/4">
          <div className="relative w-11 h-11 rounded-lg bg-gradient-to-tr from-purple-700 to-cyan-500 p-[1px] flex-shrink-0">
            <div className="w-full h-full bg-studio-950 rounded-[7px] flex items-center justify-center">
              <Disc3 className={`w-6 h-6 text-forge-cyan ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            </div>
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm text-white truncate flex items-center gap-2">
              <span>{activeTrack.title}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-cyan-400 border border-cyan-500/30">
                {activeTrack.bpm} BPM
              </span>
            </div>
            <div className="text-xs text-slate-400 truncate">
              {activeTrack.genre} • {activeTrack.musicalKey || 'F Minor'}
            </div>
          </div>
        </div>

        {/* Center Controls & Timeline */}
        <div className="flex flex-col items-center gap-1.5 w-full md:w-1/2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
              className="p-1.5 text-slate-400 hover:text-white transition"
              title="Back 10s"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-forge-cyan to-forge-purple text-black font-bold flex items-center justify-center shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-black text-black" /> : <Play className="w-4 h-4 fill-black text-black translate-x-0.5" />}
            </button>
            <button
              onClick={() => setCurrentTime(Math.min(totalSeconds, currentTime + 10))}
              className="p-1.5 text-slate-400 hover:text-white transition"
              title="Forward 10s"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Time & Scrub Bar */}
          <div className="w-full flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <div className="relative flex-1 group flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progressPercent}
                onChange={handleSeek}
                className="w-full h-1.5 bg-studio-800 rounded-lg appearance-none cursor-pointer accent-forge-cyan group-hover:h-2 transition-all"
              />
            </div>
            <span>{formatTime(totalSeconds)}</span>
          </div>
        </div>

        {/* Right Controls: Volume & Mini Visualizer */}
        <div className="flex items-center justify-end gap-4 w-full md:w-1/4">
          <div className="flex items-end gap-0.5 h-5 px-2">
            {[40, 75, 50, 90, 60, 80, 45].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full bg-forge-cyan/70 transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'opacity-40'}`}
                style={{ height: isPlaying ? `${h}%` : '20%' }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-slate-400 hover:text-white transition"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseInt(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-16 h-1.5 bg-studio-800 rounded-lg appearance-none cursor-pointer accent-forge-cyan"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
