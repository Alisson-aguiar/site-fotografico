import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollFloat from './ScrollFloat';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ChromaGrid from './ChromaGrid';
export default function DomeGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (selectedImage) {
      setCurrentSlideIndex(0);
    }
  }, [selectedImage]);

  const portfolio = [
    {
      id: 1,
      title: 'Crepúsculo na Toscana',
      category: 'casamentos',
      categoryName: 'Casamento',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    {
      id: 2,
      title: 'Sombras & Silhuetas',
      category: 'retratos',
      categoryName: 'Retrato Autoral',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    {
      id: 3,
      title: 'Abraço ao Pôr do Sol',
      category: 'casais',
      categoryName: 'Ensaio de Casal',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1501901609772-df0848060b33?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1518104593124-ac2e82a5eb9d?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    {
      id: 4,
      title: 'Serenidade Materna',
      category: 'gestantes',
      categoryName: 'Gestante',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1555252117-6401086055d2?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1508216335198-a379f8bda18d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1506155983794-5517173bd5d5?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    {
      id: 5,
      title: 'Votos na Catedral',
      category: 'casamentos',
      categoryName: 'Casamento',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    {
      id: 6,
      title: 'Luz Natural em Estúdio',
      category: 'retratos',
      categoryName: 'Editorial',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    {
      id: 7,
      title: 'Linhas & Luxo',
      category: 'comercial',
      categoryName: 'Comercial',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85'
      ]
    },
    {
      id: 8,
      title: 'Elegância Noir',
      category: 'retratos',
      categoryName: 'Retrato Autoral',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85'
      ]
    },
  ];

  const categories = [
    { key: 'todos', label: 'Todos os Trabalhos' },
    { key: 'casamentos', label: 'Casamentos' },
    { key: 'retratos', label: 'Retratos Autorais' },
    { key: 'casais', label: 'Casais' },
    { key: 'gestantes', label: 'Gestantes' },
    { key: 'comercial', label: 'Comercial' },
  ];

  const filteredItems =
    activeCategory === 'todos'
      ? portfolio
      : portfolio.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="section-spacing" style={{ position: 'relative' }}>
      <div className="container">
        <ScrollFloat subtitle="Galeria de Obras" accent={true}>
          Portfólio Tridimensional
        </ScrollFloat>

        {/* Filter Categories */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '50px',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  padding: '10px 22px',
                  backgroundColor: isActive ? '#c99872' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#121212' : 'rgba(255, 255, 255, 0.75)',
                  border: isActive ? '1px solid #c99872' : '1px solid rgba(201, 152, 114, 0.2)',
                  borderRadius: '30px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#c99872';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(201, 152, 114, 0.2)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                  }
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ChromaGrid Viewport */}
        <ChromaGrid 
          items={filteredItems.map(item => ({
            ...item,
            subtitle: item.categoryName
          }))} 
          onItemClick={setSelectedImage} 
        />
      </div>

      {/* Fullscreen Zoom Inspection Modal with Carousel */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="modal-overlay"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(20px)',
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlideIndex((prev) => (prev === 0 ? selectedImage.images.length - 1 : prev - 1));
              }}
              className="modal-prev-btn"
              style={{
                position: 'absolute',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 9999999,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.borderColor = '#c99872'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; }}
            >
              <ChevronLeft size={32} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlideIndex((prev) => (prev + 1) % selectedImage.images.length);
              }}
              className="modal-next-btn"
              style={{
                position: 'absolute',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 9999999,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.borderColor = '#c99872'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; }}
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content-wrapper"
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden', // Segregado dentro do modal aberto, não afeta o scroll externo
                border: '1px solid rgba(201, 152, 114, 0.3)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#050505',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlideIndex}
                  src={selectedImage.images[currentSlideIndex]}
                  alt={`${selectedImage.title} - Foto ${currentSlideIndex + 1}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </AnimatePresence>
              
              <div
                className="modal-info-bar"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10,10,10,0.6) 60%, transparent 100%)',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span style={{ color: '#c99872', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                    {selectedImage.categoryName}
                  </span>
                  <h3 className="modal-title" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#ffffff', margin: '4px 0 0 0' }}>
                    {selectedImage.title}
                  </h3>
                </div>
                
                {/* Right Side: Carousel Dots and Close Button */}
                <div className="modal-right-actions">
                  {/* Carousel Indicator Dots */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {selectedImage.images.map((_, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: idx === currentSlideIndex ? '#c99872' : 'rgba(255,255,255,0.3)',
                          transition: 'background-color 0.3s ease'
                        }}
                      />
                    ))}
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedImage(null)}
                    style={{
                      padding: '8px 24px',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      borderRadius: '24px',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '0.8rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#c99872';
                      e.currentTarget.style.color = '#c99872';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .modal-overlay {
          padding: 40px;
        }
        .modal-right-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
        }
        .modal-prev-btn {
          left: 40px;
          width: 56px;
          height: 56px;
        }
        .modal-next-btn {
          right: 40px;
          width: 56px;
          height: 56px;
        }
        .modal-content-wrapper {
          width: 85vw;
          height: 85vh;
        }
        .modal-info-bar {
          padding: 30px 40px;
          flex-direction: row;
          align-items: center;
        }
        .modal-title {
          font-size: 2.2rem;
        }

        @media (max-width: 768px) {
          .modal-overlay {
            padding: 0 !important;
          }
          .modal-right-actions {
            align-items: center !important;
            flex-direction: row-reverse !important;
            justify-content: space-between !important;
            width: 100% !important;
            margin-top: 12px;
          }
          .modal-prev-btn {
            left: 12px !important;
            width: 40px !important;
            height: 40px !important;
          }
          .modal-next-btn {
            right: 12px !important;
            width: 40px !important;
            height: 40px !important;
          }
          .modal-content-wrapper {
            width: 100vw !important;
            height: 100vh !important;
            border-radius: 0 !important;
            border: none !important;
          }
          .modal-info-bar {
            padding: 30px 20px 40px 20px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .modal-title {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
