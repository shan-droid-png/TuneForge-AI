import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Wand2, 
  Copy, 
  Check, 
  Download, 
  ArrowRight, 
  BookOpen, 
  Music,
  Trash2,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMusic } from '../context/MusicContext';

// Simple heuristic syllable estimator for songwriter meter analysis
function estimateSyllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const matches = w.replace(/(?:[^laeiouy]|ed|es|e)$/, '')
                   .replace(/^y/, '')
                   .match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function countLineSyllables(line) {
  if (!line.trim() || line.trim().startsWith('[')) return null;
  const words = line.trim().split(/\s+/);
  return words.reduce((acc, word) => acc + estimateSyllables(word), 0);
}

const GENRES = [
  'Synthwave / Cyberpunk',
  'Lo-Fi / Neo-Soul',
  'Pop / Dance',
  'Hip-Hop / Trap',
  'Indie Alternative',
  'Modern Rock / Metal'
];

const MOODS = [
  'Melancholic & Reflective',
  'Euphoric & Energetic',
  'Dark & Rebellious',
  'Nostalgic & Warm',
  'Cinematic & Dramatic'
];

const RHYME_DICTIONARY = {
  rain: ['pain', 'brain', 'stain', 'remain', 'drain', 'vein', 'chain'],
  night: ['light', 'fight', 'sight', 'flight', 'ignite', 'bright', 'white'],
  fire: ['wire', 'desire', 'higher', 'empire', 'choir', 'aspire'],
  dream: ['gleam', 'stream', 'scheme', 'beam', 'extreme', 'supreme'],
  heart: ['start', 'part', 'apart', 'art', 'smart', 'dart'],
  soul: ['control', 'whole', 'toll', 'stroll', 'patrol', 'gold'],
  glow: ['slow', 'flow', 'shadow', 'below', 'know', 'echo']
};

export default function LyricsPage() {
  const navigate = useNavigate();
  const { setActiveLyrics, setActivePrompt } = useMusic();

  const [title, setTitle] = useState('Digital Phantom');
  const [genre, setGenre] = useState(GENRES[0]);
  const [mood, setMood] = useState(MOODS[0]);
  const [topic, setTopic] = useState('Lost memories inside a neon metropolis, seeking human connection');
  
  const [lyricsText, setLyricsText] = useState(`[Verse 1]
Chrome reflections across the rain
Electric pulses beneath the pain
Neon signs burn through the fog
Lost inside a machine's dialogue

[Pre-Chorus]
Can you hear the static in the wire?
Burning cold with a strange desire

[Chorus]
Take me back to the analog sound
Before our heartbeats hit the ground
Frequencies we used to know
Watch the digital phantom glow

[Verse 2]
Cobalt shadows on glass and stone
Seven million and still alone
I reach for hands made of light
Dissolving into the velvet night

[Outro]
Fade to black on the LED line
Nothing is lost inside of time`);

  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [rhymeSearch, setRhymeSearch] = useState('');
  const [rhymeResults, setRhymeResults] = useState([]);

  // Calculate live song stats
  const lines = lyricsText.split('\n');
  const totalWords = lyricsText.trim() ? lyricsText.trim().split(/\s+/).length : 0;
  const sectionCount = lines.filter(l => l.trim().startsWith('[') && l.trim().endsWith(']')).length;

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let generated = '';
      if (genre.includes('Synthwave')) {
        generated = `[Verse 1]\nMidnight overdrive on the neon street\nEngine roaring to a 16th beat\nHeadlights cutting through laser haze\nCounting the ghosts of forgotten days\n\n[Chorus]\nSynthetic horizon, take me away\nDon't let the signal decay\nWe are the rebels of the midnight line\nRunning out of digital time\n\n[Bridge]\nAll the circuits overload\nDown this endless retro road`;
      } else if (genre.includes('Lo-Fi')) {
        generated = `[Verse 1]\nWarm rain tapping on the window sill\nOld cassette tape turning still\nDust on the grooves and tea gone cold\nStories that the quiet hours hold\n\n[Chorus]\nJust breathe, let the tempo slow\nWhere the mellow embers glow\nNo rush in the city tonight\nSoft shadows under amber light`;
      } else {
        generated = `[Verse 1]\nStepping through shadows into the stage\nTurning the ink on a brand new page\nEvery mistake was a chord we played\nIn the light of the fire we made\n\n[Chorus]\nSing it loud till the rafters break\nThis is the ground that we gotta take\nTurn the volume up past ten\nWe're never going back again`;
      }
      setLyricsText(generated);
      setIsGenerating(false);
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(lyricsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([`${title}\nGenre: ${genre}\nMood: ${mood}\n\n${lyricsText}`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, '_')}_lyrics.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSendToGenerator = () => {
    setActiveLyrics(lyricsText);
    setActivePrompt(`A ${genre} track titled "${title}" with ${mood.toLowerCase()} vibe and heartfelt lyrical vocal delivery.`);
    navigate('/generator');
  };

  const handleRhymeSearch = (word) => {
    setRhymeSearch(word);
    const clean = word.toLowerCase().trim();
    if (RHYME_DICTIONARY[clean]) {
      setRhymeResults(RHYME_DICTIONARY[clean]);
    } else {
      // Fallback matching by last 3 letters
      const last3 = clean.slice(-3);
      if (last3.length === 3) {
        setRhymeResults([`${clean}ing`, `un${clean}`, `be${clean}`, `${last3}ed`]);
      } else {
        setRhymeResults([]);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-forge-purple uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Lyric Studio & Meter Forge</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Lyric Forge
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Write, structure, and analyze lyrical meter with AI rhyme & rhythmic counting.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 border border-white/10 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 border border-white/10 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>

          <button
            onClick={handleSendToGenerator}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-forge-purple to-cyan-500 text-white font-semibold text-xs transition shadow-lg shadow-purple-900/30 hover:opacity-95"
          >
            <span>Send to Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Parameters + Editor + Rhyme Assistant */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: AI Parameters & Generation (3 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="p-5 rounded-2xl bg-studio-900/60 border border-white/10 backdrop-blur-md space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-forge-purple" />
              Song Settings
            </h2>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Song Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-studio-950 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Target Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-studio-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
              >
                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Mood & Energy</label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full bg-studio-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
              >
                {MOODS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Theme / Narrative Topic</label>
              <textarea
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Describe what the lyrics should be about..."
                className="w-full bg-studio-950 border border-white/15 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-purple-400 resize-none"
              />
            </div>

            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition shadow-lg shadow-purple-900/40 disabled:opacity-50"
            >
              <Wand2 className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Forging Lyrics...' : 'AI Generate Lyrics'}</span>
            </button>
          </div>

          {/* Rhyme Assistant Tool */}
          <div className="p-5 rounded-2xl bg-studio-900/60 border border-white/10 backdrop-blur-md space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-forge-cyan" />
              Rhyme Finder
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Find rhymes for word (e.g. rain, light, night)..."
                value={rhymeSearch}
                onChange={(e) => handleRhymeSearch(e.target.value)}
                className="flex-1 bg-studio-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {rhymeResults.length > 0 ? (
                rhymeResults.map((r, i) => (
                  <span
                    key={i}
                    onClick={() => {
                      setLyricsText(prev => prev + `\n${r}`);
                    }}
                    className="cursor-pointer text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 hover:bg-forge-purple/20 text-slate-300 hover:text-white border border-white/10 transition"
                    title="Click to insert"
                  >
                    {r}
                  </span>
                ))
              ) : (
                <span className="text-[11px] text-slate-400 italic">
                  Type a common word to discover rhyming pairs.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Editor with Syllable & Meter Counter (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-studio-900/60 rounded-2xl border border-white/10 backdrop-blur-md overflow-hidden">
          
          {/* Top Bar Stats */}
          <div className="px-6 py-3 border-b border-white/10 bg-studio-950/50 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-4">
              <span>Sections: <strong className="text-white">{sectionCount}</strong></span>
              <span>Words: <strong className="text-white">{totalWords}</strong></span>
              <span>Lines: <strong className="text-white">{lines.filter(l => l.trim()).length}</strong></span>
            </div>
            <div className="text-[11px] text-slate-400">
              Meter column shows estimated syllable count
            </div>
          </div>

          {/* Dual Column Editor: Syllable Gauge + Lyrics Text */}
          <div className="p-4 sm:p-6 flex-1 flex gap-3 min-h-[500px]">
            
            {/* Syllable Counter Gutter */}
            <div className="w-10 flex flex-col font-mono text-[11px] text-slate-400 select-none py-1 border-r border-white/5">
              {lines.map((line, idx) => {
                const syllables = countLineSyllables(line);
                const isSectionHeader = line.trim().startsWith('[');
                return (
                  <div
                    key={idx}
                    className={`h-6 leading-6 text-center ${
                      isSectionHeader 
                        ? 'text-transparent' 
                        : syllables 
                        ? 'text-cyan-400 font-semibold' 
                        : 'text-slate-400'
                    }`}
                  >
                    {syllables || '·'}
                  </div>
                );
              })}
            </div>

            {/* Lyrics Textarea */}
            <textarea
              value={lyricsText}
              onChange={(e) => setLyricsText(e.target.value)}
              placeholder="Write your lyrics here... Use [Verse], [Chorus], [Bridge] headers..."
              style={{ lineHeight: '24px' }}
              className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-600 focus:outline-none resize-none font-mono"
            />
          </div>

          {/* Quick Insert Section Tags */}
          <div className="px-6 py-3 border-t border-white/10 bg-studio-950/60 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[11px] font-mono text-slate-400 flex-shrink-0">Insert Block:</span>
            {['[Verse]', '[Pre-Chorus]', '[Chorus]', '[Bridge]', '[Outro]'].map(tag => (
              <button
                key={tag}
                onClick={() => setLyricsText(prev => prev + `\n\n${tag}\n`)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-[11px] font-mono transition"
              >
                <Plus className="w-3 h-3 text-forge-purple" />
                <span>{tag}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
