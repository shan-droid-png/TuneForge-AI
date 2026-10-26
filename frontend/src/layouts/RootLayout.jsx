import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Music, Radio, Sparkles, ExternalLink, Github } from 'lucide-react';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-studio-950 text-slate-100 selection:bg-forge-purple selection:text-white">
      {/* Studio Header / Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-studio-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-purple-900/30">
              <div className="w-full h-full bg-studio-900 rounded-[11px] flex items-center justify-center group-hover:bg-studio-850 transition">
                <Music className="w-5 h-5 text-forge-cyan group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                TuneForge <span className="bg-gradient-to-r from-forge-cyan to-forge-purple bg-clip-text text-transparent">AI</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-mono -mt-1">
                Audio Engine v0.1
              </span>
            </div>
          </Link>

          {/* Placeholder Navigation Items */}
          <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-slate-300">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg text-white bg-white/5 border border-white/10 transition"
            >
              Overview
            </Link>
            <span className="px-3 py-1.5 text-slate-500 cursor-not-allowed flex items-center gap-1.5 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-400/50" />
              Lyrics Studio
              <span className="text-[10px] bg-purple-950/80 text-purple-400 border border-purple-800/40 px-1.5 py-0.5 rounded">Phase 2</span>
            </span>
            <span className="px-3 py-1.5 text-slate-500 cursor-not-allowed flex items-center gap-1.5 text-xs">
              <Radio className="w-3.5 h-3.5 text-cyan-400/50" />
              AI Generator
              <span className="text-[10px] bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 px-1.5 py-0.5 rounded">Phase 3</span>
            </span>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition border border-transparent hover:border-white/10"
              title="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>
            <button
              type="button"
              disabled
              className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed hover:bg-white/10 transition"
              title="Work in Progress"
            >
              Dev Mode
            </button>
          </div>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-studio-950 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>TuneForge AI Monorepo - Developer Preview</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <span>Frontend: React + Vite + Tailwind</span>
            <span>Backend: Node + Express + PostgreSQL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
