import React, { useEffect, useRef } from 'react';
import CircularText from './CircularText';
import { Calendar, Image as ImageIcon } from 'lucide-react';

export default function HeroVideo({ onVideoComplete }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let active = true;

    const canvas = document.getElementById('video-canvas');
    const videoSection = document.getElementById('video-section');
    const scrollCards = document.querySelectorAll('.scroll-card');
    const endBanner = document.getElementById('video-end-banner');

    if (!canvas || !videoSection) return;

    const ctx = canvas.getContext('2d');
    
    let frameCount = 185;
    const images = [];
    let imagesLoaded = 0;
    let videoCompleteEmitted = false;
    const PX_PER_FRAME = 24;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function preloadImages() {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const idx = String(i).padStart(4, '0');
        img.src = `/frames/frame_${idx}.webp`;
        images.push(img);

        img.onload = () => {
          if (!active) return;
          imagesLoaded++;

          if (imagesLoaded === 1) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        };
      }
    }

    function drawFrame(index) {
      if (!active) return;
      const i = Math.min(frameCount - 1, Math.max(0, index));
      const img = images[i];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }

    fetch('/info.json')
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        frameCount = data.frameCount || 185;
        // Restaurando a matemática Vanilla exata
        videoSection.style.height = (frameCount * PX_PER_FRAME) + window.innerHeight + 'px';
        preloadImages();
      })
      .catch(() => {
        if (!active) return;
        frameCount = 185;
        videoSection.style.height = (frameCount * PX_PER_FRAME) + window.innerHeight + 'px';
        preloadImages();
      });

    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!active) return;

        // Medição em tempo real para evitar falhas do React
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const videoScrollHeight = videoSection.offsetHeight - window.innerHeight;

        if (scrollTop <= videoScrollHeight) {
          // Lógica Clássica de mapeamento proporcional
          const scrollFraction = scrollTop / videoScrollHeight;
          const frameIndex = Math.floor(scrollFraction * frameCount);
          drawFrame(frameIndex);

          // Animate cards
          scrollCards.forEach(card => {
            const start = parseFloat(card.dataset.start);
            const end = parseFloat(card.dataset.end);
            if (scrollFraction >= start && scrollFraction <= end) {
              card.classList.add('active');
            } else {
              card.classList.remove('active');
            }
          });

          // Show end banner
          if (frameIndex >= 137) {
             if (endBanner) endBanner.classList.add('visible');
          } else {
             if (endBanner) endBanner.classList.remove('visible');
          }

          // Video Complete trigger area
          if (!videoCompleteEmitted && scrollTop >= videoScrollHeight - 10) {
            drawFrame(frameCount - 1); // hold last frame
            videoCompleteEmitted = true;
            onVideoComplete?.(true);
          } else if (videoCompleteEmitted && scrollTop < videoScrollHeight - 10) {
            videoCompleteEmitted = false;
            onVideoComplete?.(false);
          }
          
        } else {
          // Past the section: hold the last frame
          drawFrame(frameCount - 1);
          if (!videoCompleteEmitted) {
            videoCompleteEmitted = true;
            onVideoComplete?.(true);
          }
        }
      });
    };

    const handleResize = () => {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const videoScrollHeight = (frameCount * PX_PER_FRAME);
        const fraction = Math.min(1, scrollTop / videoScrollHeight);
        drawFrame(Math.floor(fraction * frameCount));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      active = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [onVideoComplete]);

  return (
    <div id="video-section" ref={containerRef}>
      <div id="video-sticky">
        <canvas id="video-canvas"></canvas>

        <div id="scroll-cards-container">
          <div className="scroll-card card-top-left" data-start="0.05" data-end="0.35">
            <h3>Momento Perfeito</h3>
            <p>Eternizando as frações de segundo mais valiosas da sua história com precisão e sensibilidade.</p>
          </div>
          
          <div className="scroll-card card-bottom-left" data-start="0.25" data-end="0.55">
            <h3>Emoção Genuína</h3>
            <p>Capturas autênticas que refletem a verdadeira essência de cada sorriso e lágrima.</p>
          </div>
          
          <div className="scroll-card card-top-right" data-start="0.15" data-end="0.45">
            <h3>Luz Cinematográfica</h3>
            <p>Técnicas de iluminação inspiradas no cinema para dar profundidade e drama a cada cena.</p>
          </div>
          
          <div className="scroll-card card-bottom-right" data-start="0.35" data-end="0.70">
            <h3>Histórias Eternas</h3>
            <p>Mais do que fotografias, construímos uma herança visual inesquecível para as próximas gerações.</p>
          </div>
        </div>

        {/* 
            Banner Final
            O ParticleText e CircularText do React Bits estão embutidos aqui 
            de forma passiva, fluindo naturalmente com a opacidade gerada 
            pela classe .visible controlada pelo scroll.
        */}
        <div id="video-end-banner" style={{marginTop:'80px'}}>
          <div className="banner-actions banner-mobile" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '24px' }}>

            <div className='mobile-hj'  style={{ position: 'relative', width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', fontFamily: "'Cinzel', serif", fontSize: '26px', fontWeight: '100', color: '#c99872', zIndex: 2 }}>
                HJ
              </div>
              <div style={{ position: 'absolute', transform: 'scale(0.45)', transformOrigin: 'center', fontWeight: '100', }}>
                <CircularText text="HENRIQUE JUDSON • " spinDuration={20} className="" onHover="speedUp" />
              </div>
            </div>

            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 20px',
                borderRadius: '30px',
                backgroundColor: 'rgba(201, 152, 114, 0.08)',
                border: '1px solid rgba(201, 152, 114, 0.35)',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#c99872', boxShadow: '0 0 10px #c99872' }} />
              <span className='mobile-bagde-photo' style={{ fontFamily: "'Cinzel', serif", fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c99872', fontWeight: 600 }}>
                Henrique Judson • Fotografia
              </span>
            </div>

          </div>

          <div className='mobile-main' style={{ position: 'relative', zIndex: 1, padding: '10px 0' }}>
            <h1 className='title-main' style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 100,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '16px',
              textShadow: '0 4px 20px rgba(0,0,0,0.4)',
              maxWidth: '700px',
            }}>
              Transformando momentos em <span style={{color: '#c99872'}}>memórias inesquecíveis</span>  através da fotografia.
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '700px',
              lineHeight: 1.6,
              fontWeight: 300,
              textShadow: '0 2px 10px rgba(0,0,0,0.4)'
            }}>
              Há mais de 5 anos capturando histórias, emoções e detalhes que merecem ser eternizados.
            </p>
          </div>

          <div className="banner-actions" style={{ display: 'flex', gap: '20px', marginTop: '40px', position: 'relative', zIndex: 2 }}>
            <a href="#portfolio" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ImageIcon size={18} />
              <span>Ver Portfólio</span>
            </a>

            <a 
              href="https://wa.me/558491220212?text=Ol%C3%A1%20Henrique!%20Gostaria%20de%20agendar%20um%20ensaio." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary" 
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Calendar size={18} />
              <span>Agendar Ensaio</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
