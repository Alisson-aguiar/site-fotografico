import React, { useState } from 'react';
import CursorGrid from './components/CursorGrid';
import Navbar from './components/Navbar';
import HeroVideo from './components/HeroVideo';
import AboutSection from './components/AboutSection';
import AccordionGallery from './components/AccordionGallery';
import MagicBento from './components/MagicBento';
import DomeGallery from './components/DomeGallery';
import DriftWall from './components/DriftWall';
import ProcessSection from './components/Ballpit';
import PixelSwapTestimonials from './components/PixelSwapTestimonials';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  const [videoCompleted, setVideoCompleted] = useState(false);

  return (
    <div className="app-container" style={{ backgroundColor: '#171717', minHeight: '100vh', position: 'relative' }}>
      {/* Luxury Cinematic Grain Texture */}
      <div className="grain-overlay" />

      {/* Global Interactive Cursor Grid */}
      <CursorGrid />

      {/* Luxury Floating Navbar - revealed only after video is completed */}
      <Navbar isVisible={videoCompleted} />

      {/* 
        1. Hero Section (Cinematographic Video Scroll)
        Zero overlays during playback, 100% full viewport, scroll controlled
      */}
      <HeroVideo onVideoComplete={setVideoCompleted} />

      {/*
        2. Banner Principal & Sequential Sections
        Structure: Vídeo ➜ Banner ➜ Sobre ➜ Serviços ➜ Diferenciais ➜ Portfólio ➜ Trabalhos em destaque ➜ Processo ➜ CTA ➜ Rodapé
      */}
      <main style={{ position: 'relative', zIndex: 20 }}>
        {/* 3. Seção 1 — Sobre o Fotógrafo with Text Pressure & Stats */}
        <AboutSection />

        {/* 4. Seção 2 — Serviços with Accordion Gallery */}
        <AccordionGallery />

        {/* 5. Seção 3 — Diferenciais with Magic Bento */}
        <MagicBento />

        {/* 6. Seção 4 — Portfólio with Dome Gallery 3D */}
        <DomeGallery />

        {/* 7. Seção 5 — Trabalhos em Destaque with Drift Wall */}
        <DriftWall />

        {/* 8. Seção 6 — Processo de Trabalho with Ballpit Background */}
        <ProcessSection />

        {/* Depoimentos with Pixel Swap */}
        <PixelSwapTestimonials />

        {/* 9. Seção 7 — Chamada para Ação (CTA) with Scroll Velocity */}
        <CTASection />
      </main>

      {/* 10. Rodapé de Luxo */}
      <Footer />
    </div>
  );
}
