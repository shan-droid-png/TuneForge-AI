import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  Wand2, 
  Layers, 
  Disc, 
  Volume2,
  Bookmark,
  RotateCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMusic } from '../context/MusicContext';

const GENRES = [
  'Cyberpunk Synthwave',
  'Lo-Fi Study Beats',
  'Melodic Techno',
  'Ambient Cinematic',
  'French Touch Nu-Disco',
  'Liquid Drum & Bass',
  'Dark Trap / Phonk',
  'Post-Rock Instrumental'
];

const KEYS = [
  'C Major', 'A Minor', 'D Minor', 'F Minor', 'G Major', 'E Minor', 'F# Dorian', 'Bb Major'
];

const INSTRUMENT_OPTIONS = [
  'Analog Moog Sub-Bass',
  'Roland 808 Drum Machine',
  'Juno-106 Lush Chorus Pads',
  'Rhodes Mark II Electric Piano',
  'Stereo Arpeggiated Saw Leads',
  'Vintage Gated Snare Drum',
  'Acoustic Felt Piano',
  'Subtle Vinyl Dust & Crackle',
  'Orchestral Celli & Violins',
  'Atmospheric Vocal Chops'
];

const PRODUCTION_TAGS = [
  'Analog Tape Saturation',
  'Sidechain Pumping Compression',
  'Wide Stereo Reverb Space',
  'Warm Tube Harmonics',
  'Punchy Low-End Mix',
  'Vintage 12-Bit Sampler Crunch'
];

const PRESETS = [
  {
    name: 'Blade Runner Neon City',
    genre: 'Cyberpunk Synthwave',
    bpm: 118,
    key: 'F Minor',
    instruments: ['Analog Moog Sub-Bass', 'Juno-106 Lush Chorus Pads', 'Stereo Arpeggiated Saw Leads'],
    tags: ['Analog Tape Saturation', 'Wide Stereo Reverb Space'],
    energy: 70
  },
  {
    name: 'Midnight Study Session',
    genre: 'Lo-Fi Study Beats',
    bpm: 82,
    key: 'Eb Major',
    instruments: ['Rhodes Mark II Electric Piano', 'Subtle Vinyl Dust & Crackle', 'Acoustic Felt Piano'],
    tags: ['Vintage 12-Bit Sampler Crunch', 'Warm Tube Harmonics'],
    energy: 35
  },
  {
    name: 'Berghain Sunrise Apex',
    genre: 'Melodic Techno',
    bpm: 128,
    key: 'D Minor',
    instruments: ['Analog Moog Sub-Bass', 'Stereo Arpeggiated Saw Leads', 'Atmospheric Vocal Chops'],
    tags: ['Sidechain Pumping Compression', 'Punchy Low-End Mix'],
    energy: 90
  }
];

export default function PromptsPage() {
  const navigate = useNavigate();
  const { setActivePrompt } = useMusic();

  const [selectedGenre, setSelectedGenre] = useState(GENRES[0]);
  const [bpm, setBpm] = useState(124);
  const [key, setKey] = useState(KEYS[3]); // F Minor
  const [energy, setEnergy] = useState(75);
  const [acousticVsElectronic, setAcousticVsElectronic] = useState(85);
  const [selectedInstruments, setSelectedInstruments] = useState([
    INSTRUMENT_OPTIONS[0],
    INSTRUMENT_OPTIONS[2],
    INSTRUMENT_OPTIONS[4]
  ]);
  const [selectedProduction, setSelectedProduction] = useState([
    PRODUCTION_TAGS[0],
    PRODUCTION_TAGS[4]
  ]);
  const [negativePrompt, setNegativePrompt] = useState('low quality, muffled audio, harsh clipping, out of tune, dissonant noise');
  const [compiledPrompt, setCompiledPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Compile prompt dynamically based on configured knobs and tags
  useEffect(() => {
    const energyLabel = energy > 80 ? 'explosive high-energy' : energy > 50 ? 'driving medium-energy' : 'introspective mellow';
    const instrumentList = selectedInstruments.join(', ');
    const prodList = selectedProduction.join(', ');
    
    const text = `${selectedGenre} at ${bpm} BPM in ${key}. Featuring ${energyLabel} instrumentation including ${instrumentList}. Produced with ${prodList}. Pristine studio acoustics, detailed frequency separation, radio-ready master.`;
    setCompiledPrompt(text);
  }, [selectedGenre, bpm, key, energy, selectedInstruments, selectedProduction]);

  const toggleInstrument = (inst) => {
    if (selectedInstruments.includes(inst)) {
      setSelectedInstruments(selectedInstruments.filter(i => i !== inst));
    } else {
      setSelectedInstruments([...selectedInstruments, inst]);
    }
  };

  const toggleProduction = (tag) => {
    if (selectedProduction.includes(tag)) {
      setSelectedProduction(selectedProduction.filter(t => t !== tag));
    } else {
      setSelectedProduction([...selectedProduction, tag]);
    }
  };

  const applyPreset = (preset) => {
    setSelectedGenre(preset.genre);
    setBpm(preset.bpm);
    setKey(preset.key);
    setSelectedInstruments(preset.instruments);
    setSelectedProduction(preset.tags);
    setEnergy(preset.energy);
  };

  const handleEnhancePrompt = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setCompiledPrompt(prev => 
        prev + " Enhanced with subtle binaural panning, organic humanized groove velocities, 48kHz high-fidelity harmonics, and cinematic depth."
      );
      setIsEnhancing(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToGenerator = () => {
    setActivePrompt(compiledPrompt);
    navigate('/generator');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-forge-cyan uppercase tracking-wider">
            <Sliders className="w-4 h-4" />
            <span>Prompt Engineering Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Prompt Forge
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Formulate high-precision generative music prompts with acoustic parameters and audio tags.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 border border-white/10 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Prompt'}</span>
          </button>

          <button
            onClick={handleSendToGenerator}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-forge-cyan to-forge-purple text-black font-semibold text-xs transition shadow-lg shadow-cyan-500/20 hover:opacity-95"
          >
            <span>Load in Generator</span>
            <ArrowRight className="w-3.5 h-3.5 fill-black" />
          </button>
        </div>
      </div>

      {/* Preset Chips Bar */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 flex-shrink-0">
          <Bookmark className="w-3.5 h-3.5 text-forge-cyan" />
          Studio Presets:
        </span>
        {PRESETS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => applyPreset(p)}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-studio-900 hover:bg-studio-800 text-slate-200 border border-white/10 transition hover:border-cyan-500/30 text-xs"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Main Studio Grid */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Parameter Knobs & Tags (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Core Musical Settings */}
          <div className="p-6 rounded-2xl bg-studio-900/60 border border-white/10 backdrop-blur-md space-y-5">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
              <Disc className="w-4 h-4 text-forge-cyan" />
              Harmonic & Rhythmic Foundation
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Genre Style</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full bg-studio-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Key & Scale</label>
                <select
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full bg-studio-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  {KEYS.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-medium text-slate-400">Tempo (BPM)</label>
                  <span className="text-xs font-mono font-bold text-forge-cyan">{bpm}</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="180"
                  value={bpm}
                  onChange={(e) => setBpm(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-studio-800 rounded-lg appearance-none cursor-pointer accent-forge-cyan mt-2"
                />
              </div>
            </div>

            {/* Intensity & Electronic Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-white/5">
              <div>
                <div className="flex justify-between items-center mb-1.5 text-xs">
                  <span className="text-slate-400">Energy & Driving Velocity</span>
                  <span className="font-mono text-purple-400 font-semibold">{energy}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={energy}
                  onChange={(e) => setEnergy(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-studio-800 rounded-lg appearance-none cursor-pointer accent-forge-purple"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5 text-xs">
                  <span className="text-slate-400">Electronic vs Acoustic Balance</span>
                  <span className="font-mono text-cyan-400 font-semibold">{acousticVsElectronic}% Synths</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={acousticVsElectronic}
                  onChange={(e) => setAcousticVsElectronic(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-studio-800 rounded-lg appearance-none cursor-pointer accent-forge-cyan"
                />
              </div>
            </div>
          </div>

          {/* Instrumentation Tags */}
          <div className="p-6 rounded-2xl bg-studio-900/60 border border-white/10 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-forge-purple" />
                Featured Instrumentation
              </h2>
              <span className="text-[11px] text-slate-400 font-mono">
                {selectedInstruments.length} selected
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {INSTRUMENT_OPTIONS.map((inst) => {
                const isSelected = selectedInstruments.includes(inst);
                return (
                  <button
                    key={inst}
                    onClick={() => toggleInstrument(inst)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
                      isSelected 
                        ? 'bg-forge-purple/20 text-purple-300 border-purple-500/40 shadow-sm' 
                        : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '} {inst}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Production Flavor Tags */}
          <div className="p-6 rounded-2xl bg-studio-900/60 border border-white/10 backdrop-blur-md space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-pink-400" />
              Production & Mixing Characteristics
            </h2>

            <div className="flex flex-wrap gap-2">
              {PRODUCTION_TAGS.map((tag) => {
                const isSelected = selectedProduction.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleProduction(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
                      isSelected 
                        ? 'bg-pink-500/20 text-pink-300 border-pink-500/40' 
                        : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '} {tag}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Live Prompt Compiler Box (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="p-6 rounded-2xl bg-studio-900/70 border border-cyan-500/20 backdrop-blur-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-forge-cyan" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Compiled Generation Prompt
                </span>
              </div>
              <button
                onClick={handleEnhancePrompt}
                disabled={isEnhancing}
                className="inline-flex items-center gap-1.5 text-xs text-forge-cyan hover:text-white transition px-2.5 py-1 rounded-lg bg-forge-cyan/10 hover:bg-forge-cyan/20 border border-forge-cyan/30"
              >
                <Wand2 className={`w-3.5 h-3.5 ${isEnhancing ? 'animate-spin' : ''}`} />
                <span>AI Enhance</span>
              </button>
            </div>

            <textarea
              rows={8}
              value={compiledPrompt}
              onChange={(e) => setCompiledPrompt(e.target.value)}
              className="w-full bg-studio-950 border border-white/15 rounded-xl p-4 text-sm text-slate-100 font-mono leading-relaxed focus:outline-none focus:border-cyan-400 resize-none shadow-inner"
            />

            {/* Negative Prompt Section */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Negative Audio Filter (Unwanted Artifacts)
              </label>
              <textarea
                rows={3}
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                className="w-full bg-studio-950/80 border border-white/10 rounded-xl p-3 text-xs text-slate-400 font-mono focus:outline-none focus:border-purple-400 resize-none"
              />
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleSendToGenerator}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-forge-cyan via-purple-500 to-forge-pink text-black font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 active:scale-98 transition shadow-xl shadow-cyan-500/25"
            >
              <span>Dispatch to Music Generator</span>
              <ArrowRight className="w-4 h-4 fill-black text-black" />
            </button>
          </div>

          {/* Audio Pro Tip Box */}
          <div className="p-5 rounded-2xl bg-studio-950/60 border border-white/10 text-xs text-slate-400 space-y-2 font-mono">
            <div className="text-forge-cyan font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-forge-cyan animate-pulse"></span>
              PROMPT TIP
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Specifying explicit frequency descriptors (e.g. "warm tube harmonics", "analog Moog sub") reliably guides generative models away from brittle digital distortion.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
