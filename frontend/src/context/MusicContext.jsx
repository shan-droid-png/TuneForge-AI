import React, { createContext, useContext, useState, useEffect } from 'react';

const MusicContext = createContext(null);

const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Neon Odyssey',
    genre: 'Synthwave / Cyberpunk',
    bpm: 124,
    musicalKey: 'F Minor',
    duration: '3:42',
    updatedAt: '2 hours ago',
    stemsCount: 4,
    tags: ['Synthesizers', '80s Drums', 'Arpeggios', 'Dark Vibe'],
    description: 'An atmospheric cyberpunk track with pulsing retro analog basses and euphoric lead leads.',
    lyrics: `[Verse 1]\nNeon reflections on asphalt rain\nRunning from digital ghosts in my brain\nGrid lines flicker as the sirens moan\nIn this silicon desert I am alone\n\n[Chorus]\nTake me beyond the outer wire\nSet this synthetic night on fire\nTune into frequencies we used to know\nBefore the signal began to slow`
  },
  {
    id: 'proj-2',
    title: 'Velvet Raindrops',
    genre: 'Lo-Fi Chillhop',
    bpm: 82,
    musicalKey: 'Eb Major',
    duration: '2:38',
    updatedAt: 'Yesterday',
    stemsCount: 3,
    tags: ['Vinyl Crackle', 'Rhodes Piano', 'Warm 808', 'Mellow'],
    description: 'Relaxed study beats with vintage vinyl dust, lazy jazz chords, and smooth sidechained grooves.',
    lyrics: `[Verse 1]\nCoffee steam rising through the morning mist\nPages turning on an endless list\nDrops tap soft on the windowsill\nTime slows down and the world goes still\n\n[Chorus]\nLet the groove wash over your mind\nLeaving all the rush behind\nJust a simple chord and a steady beat\nWalking slow down a quiet street`
  },
  {
    id: 'proj-3',
    title: 'Solar Flare Apex',
    genre: 'Melodic Techno',
    bpm: 128,
    musicalKey: 'D Minor',
    duration: '4:15',
    updatedAt: '3 days ago',
    stemsCount: 5,
    tags: ['Peak Time', 'Rolling Bass', 'Hypnotic', 'Acid 303'],
    description: 'High energy festival techno with soaring melodic risers, rolling bassline, and hypnotic percussion.',
    lyrics: `[Intro - Spoken Word]\nIgnition sequence confirmed. Frequency lock engaged.\n\n[Build]\nFeel the pressure building inside the core\nNothing will be like it was before\nWhen the light breaks through the storm\nA brand new universe is born`
  }
];

export function MusicProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('tuneforge_projects');
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  const [activePrompt, setActivePrompt] = useState('Cyberpunk synthwave with driving 124 BPM bassline, vintage Juno-106 chorus pads, and soaring futuristic synth lead.');
  const [activeLyrics, setActiveLyrics] = useState('');
  
  // Web Audio Synth Player Simulation
  const [activeTrack, setActiveTrack] = useState({
    title: 'Neon Odyssey',
    genre: 'Synthwave',
    bpm: 124,
    musicalKey: 'F Minor',
    duration: '3:42',
    durationSeconds: 222
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('tuneforge_projects', JSON.stringify(projects));
    } catch (err) {
      console.warn('Failed to save projects to localStorage', err);
    }
  }, [projects]);

  // Simulated playback timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= (activeTrack?.durationSeconds || 180)) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeTrack]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const addProject = (projectData) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      updatedAt: 'Just now',
      stemsCount: 4,
      tags: ['New Creation', projectData.genre || 'Electronic'],
      ...projectData
    };
    setProjects([newProj, ...projects]);
    return newProj;
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const updateProject = (id, updates) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: 'Just now' } : p)));
  };

  return (
    <MusicContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
        updateProject,
        activePrompt,
        setActivePrompt,
        activeLyrics,
        setActiveLyrics,
        activeTrack,
        setActiveTrack,
        isPlaying,
        setIsPlaying,
        togglePlay,
        currentTime,
        setCurrentTime,
        volume,
        setVolume,
        isMuted,
        setIsMuted
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
