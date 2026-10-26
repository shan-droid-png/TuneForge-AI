import React, { useEffect, useState } from 'react';
import { 
  Bot, 
  FileText, 
  Sliders, 
  Wand2, 
  FolderGit2, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  RefreshCw,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';
import { checkApiHealth, API_BASE_URL } from '../services/api';

export default function LandingPage() {
  const [healthStatus, setHealthStatus] = useState({
    loading: true,
    data: null,
    error: null
  });

  const testConnection = async () => {
    setHealthStatus(prev => ({ ...prev, loading: true, error: null }));
    try {
      const res = await checkApiHealth();
      if (res.success) {
        setHealthStatus({ loading: false, data: res, error: null });
      } else {
        setHealthStatus({ loading: false, data: null, error: res.message || 'Offline' });
      }
    } catch (err) {
      setHealthStatus({ loading: false, data: null, error: err.message });
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  const features = [
    {
      title: "AI Music Assistant",
      desc: "Interactive conversational AI to brainstorm melodies, chord progressions, and musical styles.",
      icon: Bot,
      color: "from-blue-500 to-cyan-400",
      badge: "Planned"
    },
    {
      title: "Lyric Studio & Editor",
      desc: "Generate rhyme schemes, rhythmic meter, and lyric drafts tailored to any genre.",
      icon: FileText,
      color: "from-purple-500 to-pink-500",
      badge: "Planned"
    },
    {
      title: "Prompt Engineering",
      desc: "Transform emotional cues and instrument descriptions into high-precision music prompts.",
      icon: Sliders,
      color: "from-amber-400 to-orange-500",
      badge: "Planned"
    },
    {
      title: "Audio Generation Engine",
      desc: "Direct integration with generative music AI models to synthesize studio-grade stems and tracks.",
      icon: Wand2,
      color: "from-emerald-400 to-teal-500",
      badge: "Planned"
    },
    {
      title: "Project Management",
      desc: "Organize stems, drafts, lyric revisions, and project metadata with PostgreSQL & Prisma.",
      icon: FolderGit2,
      color: "from-indigo-500 to-violet-500",
      badge: "Planned"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-studio-950">
      {/* Background Studio Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-purple-900/20 via-cyan-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
        {/* Release Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 mb-6 backdrop-blur">
          <Sparkles className="w-3.5 h-3.5 text-forge-cyan" />
          <span>TuneForge AI Monorepo Architecture</span>
          <span className="w-1.5 h-1.5 rounded-full bg-forge-cyan"></span>
          <span className="text-slate-400 font-mono">v0.1.0-alpha</span>
        </div>

        {/* Hero Title & Description */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          TuneForge <span className="bg-gradient-to-r from-forge-cyan via-purple-400 to-forge-pink bg-clip-text text-transparent">AI</span>
        </h1>

        <p className="mt-6 text-xl sm:text-2xl text-slate-300 font-light max-w-2xl mx-auto">
          Turn your ideas into music with AI.
        </p>

        <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          The next-generation collaborative workspace for composers, lyricists, and producers.
          Currently in active core environment initialization.
        </p>

        {/* Equalizer Visualizer Aesthetic */}
        <div className="mt-10 flex items-end justify-center gap-1.5 h-14" aria-hidden="true">
          <div className="w-1.5 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full animate-waveform-1"></div>
          <div className="w-1.5 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full animate-waveform-2"></div>
          <div className="w-1.5 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full animate-waveform-3"></div>
          <div className="w-1.5 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full animate-waveform-4"></div>
          <div className="w-1.5 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full animate-waveform-5"></div>
          <div className="w-1.5 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full animate-waveform-2"></div>
          <div className="w-1.5 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full animate-waveform-4"></div>
          <div className="w-1.5 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full animate-waveform-1"></div>
          <div className="w-1.5 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full animate-waveform-3"></div>
        </div>

        {/* Live Backend Connection Card */}
        <div className="mt-10 max-w-xl mx-auto p-4 rounded-xl border border-white/10 bg-studio-900/70 backdrop-blur-md shadow-2xl text-left">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-forge-cyan" />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Backend Connection Status
              </span>
            </div>
            <button
              onClick={testConnection}
              disabled={healthStatus.loading}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5"
            >
              <RefreshCw className={`w-3 h-3 ${healthStatus.loading ? 'animate-spin' : ''}`} />
              Re-check
            </button>
          </div>

          <div className="mt-3 flex items-start gap-3">
            {healthStatus.loading ? (
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <RefreshCw className="w-5 h-5 animate-spin" />
              </div>
            ) : healthStatus.data ? (
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <XCircle className="w-5 h-5" />
              </div>
            )}

            <div className="flex-1 text-xs">
              <div className="font-medium text-slate-200">
                {healthStatus.loading
                  ? 'Connecting to backend API...'
                  : healthStatus.data
                  ? 'API Online and Responding'
                  : 'API Unreachable'}
              </div>
              <div className="mt-1 font-mono text-[11px] text-slate-400 break-all">
                Target: {API_BASE_URL}/health
              </div>
              {healthStatus.data && (
                <div className="mt-1 text-emerald-400 font-mono text-[11px]">
                  ✓ {healthStatus.data.message}
                </div>
              )}
              {healthStatus.error && (
                <div className="mt-1 text-rose-400 text-[11px]">
                  Note: Backend is offline or not yet started on port 5000. Run <code className="bg-black/40 px-1 py-0.5 rounded text-slate-300">cd backend && npm run dev</code> to start it.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Planned Architecture / Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/5">
        <div className="text-center mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-forge-cyan font-bold">
            Project Roadmap
          </h2>
          <p className="mt-1 text-2xl font-bold text-white">
            Architecture & Upcoming Capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl border border-white/10 bg-studio-900/50 p-6 backdrop-blur transition hover:border-white/20 hover:bg-studio-850/60"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${feature.color} p-[1px]`}>
                    <div className="w-full h-full bg-studio-900 rounded-[11px] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}

          {/* Developer Environment Card */}
          <div className="relative rounded-2xl border border-forge-purple/30 bg-purple-950/20 p-6 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 p-[1px]">
                <div className="w-full h-full bg-studio-900 rounded-[11px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-forge-cyan" />
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Active
              </span>
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Developer Workspace</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Independent frontend and backend dev environments with Dockerized PostgreSQL and Prisma ORM.
            </p>
            <div className="font-mono text-[11px] bg-studio-950/80 p-2.5 rounded-lg border border-white/5 text-slate-400">
              <code>git clone ... &amp;&amp; npm install</code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
