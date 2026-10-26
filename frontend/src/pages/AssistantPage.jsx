import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Music, 
  Sliders, 
  FileText, 
  Copy, 
  Check, 
  ArrowRight, 
  RotateCcw,
  Zap,
  Gauge
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMusic } from '../context/MusicContext';

const STARTER_PROMPTS = [
  {
    label: "Synthwave Progression",
    icon: Music,
    text: "Suggest a dark, melancholic chord progression in F minor for a driving 80s Cyberpunk synthwave track."
  },
  {
    label: "Drop Arrangement",
    icon: Zap,
    text: "How should I structure the tension build and risers before a high-energy 128 BPM Melodic Techno drop?"
  },
  {
    label: "Neo-Soul Chords",
    icon: Sparkles,
    text: "Give me a 4-chord Neo-Soul progression with rich jazz extensions (9ths, 11ths) and voice leading tips."
  },
  {
    label: "Lo-Fi Melody Concept",
    icon: Sliders,
    text: "What scales and vintage modulation techniques create that nostalgic, bittersweet Lo-Fi aesthetic?"
  }
];

const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: `Hello producer! I am **TuneForge Maestro**, your AI music production assistant. 

Whether you need harmony analysis, chord progressions, arrangement ideas, or sound design prompts, I'm here to co-create with you. 

What style or track concept are you working on today?`,
    suggestions: [
      { type: 'chord', title: 'Fm9 → Dbmaj7 → Bbm9 → C7(b9)', bpm: 122, scale: 'F Natural Minor' },
    ],
    timestamp: 'Just now'
  }
];

export default function AssistantPage() {
  const navigate = useNavigate();
  const { setActivePrompt, setActiveLyrics } = useMusic();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Live Tap Tempo Tool
  const [tapTimes, setTapTimes] = useState([]);
  const [calculatedBpm, setCalculatedBpm] = useState(120);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleTapTempo = () => {
    const now = Date.now();
    const recent = [...tapTimes.filter(t => now - t < 3000), now];
    setTapTimes(recent);
    if (recent.length > 1) {
      const intervals = [];
      for (let i = 1; i < recent.length; i++) {
        intervals.push(recent[i] - recent[i - 1]);
      }
      const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const bpm = Math.round(60000 / avgMs);
      if (bpm >= 40 && bpm <= 240) {
        setCalculatedBpm(bpm);
      }
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulated contextual AI Music producer reasoning
    setTimeout(() => {
      let replyText = '';
      let generatedPrompt = '';
      let chordSuggestion = null;

      const lower = text.toLowerCase();

      if (lower.includes('synthwave') || lower.includes('cyberpunk') || lower.includes('f minor')) {
        replyText = `### 🎹 Synthwave Harmonic Structure in F Minor

Here is a brooding, high-tension chord progression ideal for analog arpeggiators and detuned saw leads:

- **i:** Fm9 (F - Ab - C - Eb - G)
- **VI:** Dbmaj7(#11) (Db - F - Ab - C - G)
- **iv:** Bbm9 (Bb - Db - F - Ab - C)
- **V7:** C7alt (C - E - Bb - Db - Ab)

#### 🎛️ Production Guidance:
1. **Bassline:** Use a rolling 16th-note bass with high resonance and subtle cut-off automation on the 4th beat.
2. **Atmosphere:** Layer a vintage chorus (Juno style) with pitch drift on the Dbmaj7.
3. **Drums:** Gated LinnDrum snare with sidechain compression against the kick.`;
        generatedPrompt = "Futuristic synthwave in F minor at 124 BPM with pulsing 16th-note analog bass, lush Juno-106 chorus pads, and soaring neon synth lead.";
        chordSuggestion = { title: 'Fm9 → Dbmaj7 → Bbm9 → C7alt', bpm: 124, scale: 'F Aeolian' };
      } else if (lower.includes('drop') || lower.includes('techno') || lower.includes('tension')) {
        replyText = `### ⚡ Energy Build & Drop Architecture

To generate peak tension before the drop:

1. **8 Bars Out (Strip & Filter):** High-pass the kick at 180Hz. Introduce an ascending pitch riser and stereo noise sweep.
2. **4 Bars Out (Rhythmic Acceleration):** Double the snare roll from 8th notes to 16th notes, then triplet 32nds.
3. **1 Bar Out (The Vacuum):** Cut all low frequencies and drum elements for 2 beats. Leave only a single filtered vocal echo or sub drop impact.
4. **The Drop (Bar 1):** Full sub-kick impact with sidechained rolling 303 acid line.`;
        generatedPrompt = "Peak-time melodic techno at 128 BPM with hypnotic rolling 303 acid bass, punchy 909 kick, and atmospheric vocal riser.";
        chordSuggestion = { title: 'Dmin → Bb → C → A7', bpm: 128, scale: 'D Minor' };
      } else if (lower.includes('neo-soul') || lower.includes('jazz')) {
        replyText = `### 🎷 Neo-Soul Progression & Voicings

Try this smooth, soulful sequence with chromatic voice leading:

- **Emaj9:** (E - G# - B - D# - F#)
- **G#m7(b13):** (G# - B - E - F#)
- **Amaj7:** (A - C# - E - G#)
- **Am6/9:** (A - C - E - F# - B) — *provides sweet bittersweet resolution*

#### 💡 Performance Note:
Push the snare slightly behind the beat (swing grid 58%) and play the chords on a Fender Rhodes through gentle tape saturation.`;
        generatedPrompt = "Velvety neo-soul groove at 85 BPM with Rhodes electric piano, laid-back Dilla swing drums, and warm analog bass.";
        chordSuggestion = { title: 'Emaj9 → G#m7 → Amaj7 → Am6/9', bpm: 85, scale: 'E Major' };
      } else {
        replyText = `### 🎼 Composition Insights for: *"${text.slice(0, 40)}..."*

Here is a recommended approach for your concept:

1. **Rhythmic Foundation:** Establish your groove at **${calculatedBpm} BPM** using dynamic velocity variations to keep the groove organic.
2. **Harmonic Palette:** Build around an expressive minor/modal pivot (e.g., Dorian or Aeolian) to blend darkness with emotional uplift.
3. **Arrangement Tip:** Give each instrument its own frequency pocket—reserve 40Hz–90Hz exclusively for the kick & sub.

Would you like me to translate this concept into a **Music Prompt** or draft **Lyrics** for it?`;
        generatedPrompt = `Modern ${text.slice(0, 50)} produced with rich stereo imaging, deep dynamic range at ${calculatedBpm} BPM.`;
        chordSuggestion = { title: 'Am9 → Fmaj7 → Dm9 → Em7', bpm: calculatedBpm, scale: 'A Minor' };
      }

      const assistantMsg = {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        promptSuggestion: generatedPrompt,
        chordSuggestion,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleUsePrompt = (prompt) => {
    setActivePrompt(prompt);
    navigate('/generator');
  };

  const handleUseLyrics = () => {
    navigate('/lyrics');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-forge-cyan uppercase tracking-wider">
            <Bot className="w-4 h-4" />
            <span>AI Studio Assistant</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            TuneForge Maestro
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Collaborate on chord progressions, arrangement architecture, and sound design recipes.
          </p>
        </div>

        {/* Quick Session Reset */}
        <button
          onClick={() => setMessages(INITIAL_MESSAGES)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 border border-white/10 transition self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Main Grid: Chat + Studio Tooling Sidebar */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Chat Window (3 cols) */}
        <div className="lg:col-span-3 flex flex-col h-[700px] bg-studio-900/60 rounded-2xl border border-white/10 backdrop-blur-md overflow-hidden">
          
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3.5 ${isAssistant ? '' : 'flex-row-reverse'}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xs ${
                    isAssistant 
                      ? 'bg-gradient-to-tr from-purple-600 to-cyan-400 shadow-md shadow-purple-900/40' 
                      : 'bg-studio-700 border border-white/20'
                  }`}>
                    {isAssistant ? <Bot className="w-4 h-4" /> : 'YOU'}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-2xl rounded-2xl p-4 text-sm leading-relaxed ${
                    isAssistant 
                      ? 'bg-studio-850/90 text-slate-200 border border-white/10 shadow-lg' 
                      : 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-md'
                  }`}>
                    <div className="whitespace-pre-wrap font-sans">
                      {msg.text}
                    </div>

                    {/* Interactive suggestions attached to assistant messages */}
                    {msg.chordSuggestion && (
                      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 bg-studio-950/50 p-2.5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2">
                          <Music className="w-4 h-4 text-forge-cyan" />
                          <span className="font-mono text-xs font-semibold text-white">
                            {msg.chordSuggestion.title}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                            {msg.chordSuggestion.bpm} BPM
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(msg.chordSuggestion.title, msg.id + '-chord')}
                          className="text-[11px] inline-flex items-center gap-1 text-slate-400 hover:text-white transition"
                        >
                          {copiedId === msg.id + '-chord' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>Copy Chords</span>
                        </button>
                      </div>
                    )}

                    {msg.promptSuggestion && (
                      <div className="mt-3 bg-gradient-to-r from-cyan-950/30 to-purple-950/30 p-3 rounded-xl border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="text-xs text-slate-300 font-mono">
                          <span className="text-forge-cyan font-bold block sm:inline mr-2">Generated Prompt:</span>
                          "{msg.promptSuggestion}"
                        </div>
                        <button
                          onClick={() => handleUsePrompt(msg.promptSuggestion)}
                          className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-forge-cyan/10 hover:bg-forge-cyan/20 text-forge-cyan border border-forge-cyan/30 text-xs font-medium transition"
                        >
                          <span>To Generator</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div className="mt-2 text-[10px] text-slate-400 text-right">
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-xl bg-studio-850 border border-white/10 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-forge-cyan animate-pulse"></span>
                  <span>Maestro is composing thoughts...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Starters */}
          <div className="px-4 py-2 border-t border-white/5 bg-studio-950/40 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
            <span className="text-[11px] font-mono text-slate-400 flex-shrink-0">Ideas:</span>
            {STARTER_PROMPTS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.text)}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition hover:border-cyan-500/40"
                >
                  <Icon className="w-3 h-3 text-forge-cyan" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-studio-950/80 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask Maestro for chords, arrangement ideas, or sound design tips..."
                className="flex-1 bg-studio-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-forge-cyan focus:ring-1 focus:ring-forge-cyan transition"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-forge-cyan to-forge-purple text-black font-semibold text-sm inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition shadow-lg shadow-cyan-500/20"
              >
                <span>Send</span>
                <Send className="w-4 h-4 fill-black text-black" />
              </button>
            </form>
          </div>
        </div>

        {/* Studio Tools & Reference Sidebar (1 col) */}
        <div className="space-y-6">
          
          {/* Live Tap Tempo Widget */}
          <div className="p-5 rounded-2xl bg-studio-900/60 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-forge-cyan" />
                Tap Tempo
              </span>
              <span className="text-xl font-bold font-mono text-forge-cyan">
                {calculatedBpm} <span className="text-xs text-slate-400 font-sans">BPM</span>
              </span>
            </div>
            
            <button
              onClick={handleTapTempo}
              className="w-full py-4 rounded-xl bg-studio-800 hover:bg-studio-700 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase border border-white/15 transition flex flex-col items-center justify-center gap-1 shadow-inner"
            >
              <span>Tap Beat</span>
              <span className="text-[10px] text-slate-400 font-mono">Click rhythmically</span>
            </button>
          </div>

          {/* Quick Studio Navigation Links */}
          <div className="p-5 rounded-2xl bg-studio-900/60 border border-white/10 backdrop-blur-md space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Studio Actions
            </h3>

            <button
              onClick={() => navigate('/lyrics')}
              className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-medium text-slate-200">Open Lyric Studio</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition" />
            </button>

            <button
              onClick={() => navigate('/prompts')}
              className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-medium text-slate-200">Configure Prompts</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition" />
            </button>

            <button
              onClick={() => navigate('/generator')}
              className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-medium text-slate-200">Song Generator</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition" />
            </button>
          </div>

          {/* Harmonic Tips Card */}
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20 text-xs text-slate-300 space-y-2">
            <div className="font-semibold text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Composition Insight</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              In minor keys, adding the major 7th or 9th extension creates cinematic nostalgia, while the flat 5th (tritone) introduces cyberpunk tension.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
