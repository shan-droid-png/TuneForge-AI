import React, { useState } from 'react';
import { 
  Wand2, 
  Sparkles, 
  Play, 
  Pause, 
  Download, 
  BookmarkPlus, 
  Check, 
  Sliders, 
  Radio, 
  Layers, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Music2,
  FileText
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { Link } from 'react-router-dom';

const MODELS = [
  { id: 'v2-pro', name: 'TuneForge Diffusion V2.4 Pro', desc: 'Highest audio fidelity, 48kHz stereo, full frequency separation' },
  { id: 'fast-v1', name: 'FastForge Realtime Preview', desc: 'Rapid draft generation in ~5 seconds for quick experimentation' },
  { id: 'poly-stem', name: 'NeuralStem Polyphonic 4-Track', desc: 'Optimized for discrete drum, bass, lead, and vocal stem extraction' }
];

export default function GeneratorPage() {
  const { 
    activePrompt, 
    setActivePrompt, 
    activeLyrics, 
    activeTrack, 
    setActiveTrack, 
    isPlaying, 
    togglePlay, 
    currentTime, 
    setCurrentTime,
    addProject
  } = useMusic();

  const [prompt, setPrompt] = useState(activePrompt || 'Cyberpunk synthwave at 124 BPM in F minor with pulsing analog bass and neon synth lead.');
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);
  const [duration, setDuration] = useState('180');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Stems mixer state
  const [stems, setStems] = useState([
    { id: 'drums', name: 'Drums & 808', volume: 85, muted: false, solo: false, color: 'text-amber-400' },
    { id: 'bass', name: 'Analog Sub-Bass', volume: 90, muted: false, solo: false, color: 'text-cyan-400' },
    { id: 'lead', name: 'Synth Lead & Arp', volume: 80, muted: false, solo: false, color: 'text-purple-400' },
    { id: 'pads', name: 'Ambient Chorus Pads', volume: 75, muted: false, solo: false, color: 'text-pink-400' }
  ]);

  const generationStages = [
    'Analyzing musical key, BPM, and mood tokens...',
    'Synthesizing rhythm & drum groove patterns...',
    'Generating polyphonic melodic layers and chord voicings...',
    'Mastering dynamic range and rendering 48kHz stereo output...'
  ];

  const handleStartGeneration = () => {
    setIsGenerating(true);
    setGenerationProgress(5);
    setGenerationStep(0);

    const stepInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 95) {
          clearInterval(stepInterval);
          return 95;
        }
        const next = prev + 15;
        if (next > 75) setGenerationStep(3);
        else if (next > 50) setGenerationStep(2);
        else if (next > 25) setGenerationStep(1);
        return next;
      });
    }, 600);

    setTimeout(() => {
      clearInterval(stepInterval);
      setGenerationProgress(100);
      setIsGenerating(false);

      // Update current playing track
      const newTrack = {
        title: prompt.slice(0, 32).trim() || 'Synthesized Odyssey',
        genre: prompt.toLowerCase().includes('techno') ? 'Techno' : 'Synthwave',
        bpm: 124,
        musicalKey: 'F Minor',
        duration: '3:00',
        durationSeconds: 180
      };
      setActiveTrack(newTrack);
      setCurrentTime(0);
    }, 3200);
  };

  const handleSaveToProjects = () => {
    addProject({
      title: activeTrack.title,
      genre: activeTrack.genre,
      bpm: activeTrack.bpm,
      musicalKey: activeTrack.musicalKey,
      duration: activeTrack.duration,
      description: prompt,
      lyrics: activeLyrics || 'No lyrics attached.'
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const toggleMuteStem = (id) => {
    setStems(stems.map(s => s.id === id ? { ...s, muted: !s.muted } : s));
  };

  const toggleSoloStem = (id) => {
    setStems(stems.map(s => s.id === id ? { ...s, solo: !s.solo } : { ...s, solo: false }));
  };

  const updateStemVolume = (id, val) => {
    setStems(stems.map(s => s.id === id ? { ...s, volume: val } : s));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-forge-pink uppercase tracking-wider">
            <Radio className="w-4 h-4" />
            <span>AI Audio Synthesis Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Song Generator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Dispatch prompts to generative music models and master multi-track stems in real time.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex items-center gap-2">
          <Link
            to="/prompts"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 border border-white/10 transition"
          >
            <Sliders className="w-3.5 h-3.5 text-forge-cyan" />
            <span>Configure Prompts</span>
          </Link>
          <Link
            to="/lyrics"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 border border-white/10 transition"
          >
            <FileText className="w-3.5 h-3.5 text-forge-purple" />
            <span>Lyric Studio</span>
          </Link>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Generation Dispatcher (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-studio-900/60 border border-white/10 backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-forge-cyan" />
                Generation Parameters
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                API Ready
              </span>
            </div>

            {/* Prompt Input */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Music Generation Prompt
              </label>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter rich sonic descriptors, instrumentation, BPM, and mood..."
                className="w-full bg-studio-950 border border-white/15 rounded-xl p-3 text-xs text-slate-100 font-mono leading-relaxed focus:outline-none focus:border-cyan-400 resize-none shadow-inner"
              />
            </div>

            {/* Model Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Model Pipeline
              </label>
              <div className="space-y-2">
                {MODELS.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedModel(m.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      selectedModel === m.id
                        ? 'bg-forge-cyan/10 border-forge-cyan/40 text-white'
                        : 'bg-studio-950/60 border-white/5 text-slate-400 hover:bg-studio-950 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>{m.name}</span>
                      {selectedModel === m.id && <Check className="w-3.5 h-3.5 text-forge-cyan" />}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      {m.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Duration Selector */}
            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Target Duration</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '30 Sec Preview', value: '30' },
                  { label: '60 Sec Intro', value: '60' },
                  { label: 'Full 3 Min', value: '180' }
                ].map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setDuration(d.value)}
                    className={`py-2 rounded-xl text-xs font-medium border transition ${
                      duration === d.value
                        ? 'bg-white/15 border-white/30 text-white font-semibold'
                        : 'bg-studio-950 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleStartGeneration}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-forge-cyan via-purple-600 to-forge-pink text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 active:scale-98 transition shadow-xl shadow-purple-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Synthesizing Audio...' : 'Generate Song'}</span>
            </button>
          </div>

          {/* Active Generation Progress Modal Card */}
          {isGenerating && (
            <div className="p-5 rounded-2xl bg-studio-950 border border-cyan-500/40 shadow-2xl space-y-3 animate-pulse">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-forge-cyan font-semibold">Diffusion Pipeline Active</span>
                <span className="text-white font-bold">{generationProgress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-studio-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-forge-cyan to-forge-purple transition-all duration-300"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>

              <div className="text-xs text-slate-300 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-forge-cyan animate-ping"></span>
                <span>{generationStages[generationStep]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Audio Master & Stems Mixer (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Master Deck Preview */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-studio-900/80 to-studio-950/80 border border-white/10 backdrop-blur-md shadow-2xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-forge-cyan font-bold block">
                  Active Master Track
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {activeTrack.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 font-mono">
                  <span>{activeTrack.genre}</span>
                  <span>•</span>
                  <span>{activeTrack.bpm} BPM</span>
                  <span>•</span>
                  <span>{activeTrack.musicalKey}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveToProjects}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 border border-white/10 transition"
                >
                  {savedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <BookmarkPlus className="w-3.5 h-3.5 text-purple-400" />}
                  <span>{savedSuccess ? 'Saved!' : 'Save Project'}</span>
                </button>

                <button
                  onClick={() => alert(`Downloading master stem for "${activeTrack.title}"...`)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 border border-white/10 transition"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Glowing Studio Waveform Display */}
            <div className="relative h-32 bg-studio-950 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center px-4">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-cyan-900/20 to-purple-900/10" />

              {/* Waveform Bars */}
              <div className="relative z-10 w-full flex items-center justify-between gap-1 h-24">
                {Array.from({ length: 48 }).map((_, i) => {
                  const baseHeight = ((Math.sin(i * 0.4) + 1) / 2) * 80 + 15;
                  const isPast = (i / 48) <= (currentTime / (activeTrack.durationSeconds || 180));
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-150 ${
                        isPast 
                          ? 'bg-gradient-to-t from-forge-cyan to-forge-purple shadow-cyan-500/50' 
                          : 'bg-white/10'
                      }`}
                      style={{
                        height: isPlaying ? `${Math.max(10, (baseHeight * (0.8 + Math.random() * 0.4)))}%` : `${baseHeight}%`
                      }}
                    />
                  );
                })}
              </div>

              {/* Play Overlay Button */}
              <button
                onClick={togglePlay}
                className="absolute z-20 w-14 h-14 rounded-full bg-studio-900/90 border border-white/20 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition backdrop-blur shadow-2xl"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-white text-white" /> : <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />}
              </button>
            </div>

            {/* Stems Multi-Track Rack */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-forge-purple" />
                  Isolated Stems Mixer
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  4 Channels Active
                </span>
              </div>

              <div className="space-y-2.5">
                {stems.map((stem) => (
                  <div
                    key={stem.id}
                    className="p-3.5 rounded-xl bg-studio-950/70 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 w-full sm:w-1/3">
                      <Music2 className={`w-4 h-4 ${stem.color}`} />
                      <div className="text-xs font-semibold text-white truncate">
                        {stem.name}
                      </div>
                    </div>

                    {/* Mute & Solo Toggles */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleMuteStem(stem.id)}
                        className={`px-2 py-1 rounded text-[10px] font-mono uppercase font-bold border transition ${
                          stem.muted
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                            : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                        }`}
                      >
                        Mute
                      </button>
                      <button
                        onClick={() => toggleSoloStem(stem.id)}
                        className={`px-2 py-1 rounded text-[10px] font-mono uppercase font-bold border transition ${
                          stem.solo
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                            : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                        }`}
                      >
                        Solo
                      </button>
                    </div>

                    {/* Fader */}
                    <div className="flex items-center gap-2 w-full sm:w-1/3">
                      <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={stem.muted ? 0 : stem.volume}
                        onChange={(e) => updateStemVolume(stem.id, parseInt(e.target.value))}
                        className="w-full h-1.5 bg-studio-800 rounded-lg appearance-none cursor-pointer accent-forge-cyan"
                      />
                      <span className="text-[10px] font-mono text-slate-400 w-7 text-right">
                        {stem.muted ? '0%' : `${stem.volume}%`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
