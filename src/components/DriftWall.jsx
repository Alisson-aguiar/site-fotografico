import React from 'react';
import ScrollFloat from './ScrollFloat';

export default function DriftWall() {
  const row1 = [
    { title: 'Fine Art Wedding', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
    { title: 'Sunset Glow', img: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80' },
    { title: 'Pure Emotion', img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80' },
    { title: 'Haute Couture', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
    { title: 'Architectural Light', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80' },
    { title: 'The Cathedral', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
  ];

  const row2 = [
    { title: 'Maternity Poetry', img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80' },
    { title: 'Golden Hour Silhouette', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80' },
    { title: 'Noir Elegance', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
    { title: 'Luxury Commercial', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80' },
    { title: 'Intimate Moments', img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80' },
    { title: 'Editorial Chic', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <section id="destaques" className="section-spacing" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <ScrollFloat subtitle="Fluxo Contínuo" accent={true}>
          Trabalhos em Destaque
        </ScrollFloat>
      </div>

      {/* Drift Wall Multi-Row Marquee */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px' }}>
        {/* Row 1: Drifts Left */}
        <div className="drift-track-left">
          <div className="drift-inner">
            {[...row1, ...row1, ...row1].map((item, idx) => (
              <div key={idx} className="drift-item">
                <img src={item.img} alt={item.title} loading="lazy" />
                <div className="drift-overlay">
                  <span>{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Drifts Right */}
        <div className="drift-track-right">
          <div className="drift-inner">
            {[...row2, ...row2, ...row2].map((item, idx) => (
              <div key={idx} className="drift-item">
                <img src={item.img} alt={item.title} loading="lazy" />
                <div className="drift-overlay">
                  <span>{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .drift-track-left, .drift-track-right {
          overflow: hidden;
          width: 100%;
          display: flex;
          position: relative;
        }

        .drift-track-left::before, .drift-track-left::after,
        .drift-track-right::before, .drift-track-right::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }

        .drift-track-left::before, .drift-track-right::before {
          left: 0;
          background: linear-gradient(to right, #171717, transparent);
        }

        .drift-track-left::after, .drift-track-right::after {
          right: 0;
          background: linear-gradient(to left, #171717, transparent);
        }

        .drift-inner {
          display: flex;
          gap: 20px;
          width: max-content;
        }

        .drift-track-left .drift-inner {
          animation: driftLeft 45s linear infinite;
        }

        .drift-track-right .drift-inner {
          animation: driftRight 50s linear infinite;
        }

        .drift-inner:hover {
          animation-play-state: paused;
        }

        .drift-item {
          position: relative;
          width: 320px;
          height: 220px;
          flex-shrink: 0;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(201, 152, 114, 0.2);
          cursor: pointer;
          transition: transform 0.4s ease, border-color 0.4s ease;
        }

        .drift-item:hover {
          transform: scale(1.05);
          border-color: #c99872;
          z-index: 10;
        }

        .drift-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.85);
          transition: filter 0.4s ease;
        }

        .drift-item:hover img {
          filter: brightness(1);
        }

        .drift-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(23, 23, 23, 0.9) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .drift-item:hover .drift-overlay {
          opacity: 1;
        }

        .drift-overlay span {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          color: #ffffff;
        }

        @keyframes driftLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }

        @keyframes driftRight {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
