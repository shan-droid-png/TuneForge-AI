import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MusicProvider } from './context/MusicContext';
import RootLayout from './layouts/RootLayout';
import LandingPage from './pages/LandingPage';
import AssistantPage from './pages/AssistantPage';
import LyricsPage from './pages/LyricsPage';
import PromptsPage from './pages/PromptsPage';
import GeneratorPage from './pages/GeneratorPage';
import ProjectsPage from './pages/ProjectsPage';

export default function App() {
  return (
    <MusicProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="assistant" element={<AssistantPage />} />
            <Route path="lyrics" element={<LyricsPage />} />
            <Route path="prompts" element={<PromptsPage />} />
            <Route path="generator" element={<GeneratorPage />} />
            <Route path="projects" element={<ProjectsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MusicProvider>
  );
}
