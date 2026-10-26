import React, { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { 
  Music, 
  Radio, 
  Sparkles, 
  Bot, 
  FileText, 
  Sliders, 
  FolderGit2, 
  Github, 
  Menu, 
  X 
} from 'lucide-react';
import AudioPlayerBar from '../components/AudioPlayerBar';

export default function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Overview', icon: Music, end: true },
    { to: '/generator', label: 'Studio Generator', icon: Radio },
    { to: '/assistant', label: 'AI Assistant', icon: Bot },
    { to: '/lyrics', label: 'Lyric Forge', icon: FileText },
    { to: '/prompts', label: 'Prompt Studio', icon: Sliders },
    { to: '/projects', label: 'Projects', icon: FolderGit2 }
  ];

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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-xs text-slate-300">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
                      isActive
                        ? 'text-white bg-white/10 border border-white/15 shadow-sm shadow-purple-900/20 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5 text-forge-cyan" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              to="/generator"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-forge-cyan to-forge-purple text-black hover:opacity-90 active:scale-95 transition shadow-md shadow-cyan-500/20"
            >
              <Radio className="w-3.5 h-3.5 fill-black text-black" />
              <span>Launch Studio</span>
            </Link>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition border border-transparent hover:border-white/10"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-studio-950/95 px-4 py-3 space-y-1 backdrop-blur-lg">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                      isActive
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-forge-cyan" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Floating / Pinned Audio Bottom Player */}
      <AudioPlayerBar />

      {/* Studio Footer */}
      <footer className="border-t border-white/5 bg-studio-950 py-8 mb-16 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>TuneForge AI Audio Workstation • Production Preview</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400 font-mono text-[11px]">
            <Link to="/assistant" className="hover:text-slate-200 transition">AI Maestro</Link>
            <Link to="/lyrics" className="hover:text-slate-200 transition">Lyric Studio</Link>
            <Link to="/prompts" className="hover:text-slate-200 transition">Prompt Forge</Link>
            <Link to="/generator" className="hover:text-slate-200 transition">Music Generator</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
