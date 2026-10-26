import React, { useState } from 'react';
import { 
  FolderGit2, 
  Plus, 
  Search, 
  Play, 
  FileText, 
  Music, 
  Trash2, 
  Copy, 
  Clock, 
  ArrowUpRight, 
  Check, 
  Sliders, 
  Layers,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMusic } from '../context/MusicContext';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { 
    projects, 
    addProject, 
    deleteProject, 
    setActiveTrack, 
    setActiveLyrics, 
    setActivePrompt, 
    setIsPlaying, 
    setCurrentTime 
  } = useMusic();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenreFilter, setSelectedGenreFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Project Form State
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('Synthwave / Cyberpunk');
  const [newBpm, setNewBpm] = useState(120);
  const [newKey, setNewKey] = useState('F Minor');
  const [newDesc, setNewDesc] = useState('');

  const genres = ['All', 'Synthwave / Cyberpunk', 'Lo-Fi Chillhop', 'Melodic Techno', 'Pop / Electronic'];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGenre = selectedGenreFilter === 'All' || p.genre.includes(selectedGenreFilter);
    return matchesSearch && matchesGenre;
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addProject({
      title: newTitle,
      genre: newGenre,
      bpm: newBpm,
      musicalKey: newKey,
      duration: '3:20',
      description: newDesc || 'Custom audio project created in TuneForge AI.',
      lyrics: `[Verse 1]\nNew project lyrics drafted for ${newTitle}...`
    });

    setNewTitle('');
    setNewDesc('');
    setIsModalOpen(false);
  };

  const handleOpenInStudio = (p) => {
    setActiveTrack({
      title: p.title,
      genre: p.genre,
      bpm: p.bpm,
      musicalKey: p.musicalKey,
      duration: p.duration,
      durationSeconds: 200
    });
    setActivePrompt(p.description || `${p.genre} at ${p.bpm} BPM in ${p.musicalKey}`);
    if (p.lyrics) setActiveLyrics(p.lyrics);
    setCurrentTime(0);
    setIsPlaying(true);
    navigate('/generator');
  };

  const handleOpenLyrics = (p) => {
    if (p.lyrics) setActiveLyrics(p.lyrics);
    navigate('/lyrics');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider">
            <FolderGit2 className="w-4 h-4" />
            <span>Workspace Management</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Project Library
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review, arrange, and manage your AI-generated tracks, stems, and lyric compositions.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-forge-cyan to-forge-purple text-black font-semibold text-xs transition shadow-lg shadow-cyan-500/20 hover:opacity-95 active:scale-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title, genre, or vibe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-studio-900 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Genre Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenreFilter(g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition border flex-shrink-0 ${
                selectedGenreFilter === g
                  ? 'bg-white/15 border-white/30 text-white font-semibold'
                  : 'bg-studio-900/60 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-2xl border border-white/10 bg-studio-900/60 p-6 backdrop-blur-md transition hover:border-white/20 hover:bg-studio-850/80 flex flex-col justify-between"
          >
            <div>
              {/* Top row */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/40">
                  {project.genre}
                </span>

                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-white/5 transition opacity-60 group-hover:opacity-100"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg font-bold text-white group-hover:text-forge-cyan transition">
                {project.title}
              </h3>

              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {project.description || 'No description provided.'}
              </p>

              {/* Musical metadata tags */}
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono text-slate-300">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-cyan-400">
                  {project.bpm} BPM
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-purple-400">
                  {project.musicalKey || 'Key N/A'}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400 flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  {project.stemsCount || 4} Stems
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {project.duration || '3:00'}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono text-slate-400">
                Updated {project.updatedAt}
              </span>

              <div className="flex items-center gap-1.5">
                {project.lyrics && (
                  <button
                    onClick={() => handleOpenLyrics(project)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
                    title="Edit Lyrics"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => handleOpenInStudio(project)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-forge-cyan to-forge-purple text-black font-semibold text-xs transition shadow-sm hover:opacity-95"
                >
                  <Play className="w-3 h-3 fill-black text-black" />
                  <span>Open Studio</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="mt-12 text-center p-12 rounded-2xl bg-studio-900/40 border border-white/5">
          <FolderGit2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No projects found</h3>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your search terms or create a new track.</p>
        </div>
      )}

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-studio-900 border border-white/15 p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-forge-cyan" />
                Create New Music Project
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Neon Horizon"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-studio-950 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Genre</label>
                  <select
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="w-full bg-studio-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    {genres.filter(g => g !== 'All').map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Tempo (BPM)</label>
                  <input
                    type="number"
                    min="50"
                    max="220"
                    value={newBpm}
                    onChange={(e) => setNewBpm(parseInt(e.target.value))}
                    className="w-full bg-studio-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Musical Key</label>
                  <input
                    type="text"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    className="w-full bg-studio-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Concept / Sound Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the mood, target instruments, and audio references..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-studio-950 border border-white/15 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-forge-cyan to-forge-purple text-black font-semibold text-xs transition hover:opacity-95 shadow-md shadow-cyan-500/20"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
