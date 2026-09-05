import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollFloat from './ScrollFloat';
import { ArrowUpRight } from 'lucide-react';

export default function AccordionGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      id: 'casamentos',
      title: 'Casamentos',
      subtitle: 'Celebrações & Emoções Eternas',
      description: 'Cobertura cinematográfica completa do seu grande dia, capturando lágrimas, sorrisos e a essência pura do amor em cada detalhe.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      tag: 'Fine Art Wedding',
    },
    {
      id: 'individuais',
      title: 'Ensaios Individuais',
      subtitle: 'Retratos Autorais & Expressão',
      description: 'Sessões personalizadas pensadas para valorizar sua autenticidade, poder e elegância através de um jogo refinado de luz e sombras.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85',
      tag: 'Portrait Editorial',
    },
    {
      id: 'casal',
      title: 'Ensaios de Casal',
      subtitle: 'Conexão, Intimidade & Romance',
      description: 'Imagens espontâneas e poéticas que contam a história única da cumplicidade a dois em locações exclusivas.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
      tag: 'Couples & Pre-Wedding',
    },
    {
      id: 'gestantes',
      title: 'Gestantes',
      subtitle: 'A Poesia da Espera',
      description: 'Um registro delicado e sofisticado de um dos momentos mais sublimes da vida, com respeito ao tempo e conforto da mãe.',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=85',
      tag: 'Maternity Luxury',
    },
    {
      id: 'corporativos',
      title: 'Eventos Corporativos',
      subtitle: 'Presença, Marca & Impacto',
      description: 'Fotografia executiva e cobertura de eventos corporativos de alto nível, transmitindo autoridade, sofisticação e networking.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
      tag: 'Corporate & Summit',
    },
    {
      id: 'comercial',
      title: 'Fotografia Comercial',
      subtitle: 'Campanhas & Editoriais de Marca',
      description: 'Produção visual de alta gastronomia, moda, arquitetura e produtos, alinhando estética artística ao posicionamento de luxo da sua marca.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85',
      tag: 'Commercial & Fashion',
    },
  ];

  return (
    <section id="servicos" className="section-spacing" style={{ position: 'relative' }}>
      <div className="container">
        <ScrollFloat subtitle="Experiências Exclusivas" accent={true}>
          Serviços & Especialidades
        </ScrollFloat>

        {/* Desktop Accordion Gallery */}
        <div
          style={{
            display: 'flex',
            height: '580px',
            gap: '16px',
            marginTop: '40px',
            borderRadius: '24px',
            overflow: 'hidden',
          }}
          className="accordion-container"
        >
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={service.id}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                layout
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`accordion-item ${isActive ? 'accordion-item-active' : 'accordion-item-inactive'}`}
              >
                {/* Background Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: isActive
                      ? 'brightness(0.75) contrast(105%)'
                      : 'brightness(0.4) grayscale(40%)',
                    transform: isActive ? 'scale(1.03)' : 'scale(1)',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: isActive
                      ? 'linear-gradient(to top, rgba(23, 23, 23, 0.95) 0%, rgba(23, 23, 23, 0.3) 60%, transparent 100%)'
                      : 'rgba(23, 23, 23, 0.6)',
                    transition: 'background 0.5s ease',
                  }}
                />

                {/* Inactive Vertical Title */}
                {!isActive && (
                  <div className="inactive-title">
                    <span
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: '0.95rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {service.title}
                    </span>
                  </div>
                )}

                {/* Active Expanded Card Content */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="active-content"
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '6px 14px',
                        backgroundColor: 'rgba(201, 152, 114, 0.2)',
                        border: '1px solid var(--accent-border)',
                        borderRadius: '20px',
                        color: '#c99872',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        marginBottom: '14px',
                      }}
                    >
                      {service.tag}
                    </span>

                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                        fontWeight: 400,
                        color: '#ffffff',
                        marginBottom: '8px',
                        lineHeight: 1.1,
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      style={{
                        color: '#c99872',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        marginBottom: '12px',
                      }}
                    >
                      {service.subtitle}
                    </p>

                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        maxWidth: '480px',
                        marginBottom: '20px',
                      }}
                    >
                      {service.description}
                    </p>

                    <a
                      href={`https://wa.me/558491220212?text=${encodeURIComponent(`Olá Henrique! Gostaria de solicitar disponibilidade para o serviço de ${service.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        borderBottom: '1px solid #c99872',
                        paddingBottom: '4px',
                        transition: 'color 0.3s ease, border-color 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#c99872')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                    >
                      <span>Solicitar Disponibilidade</span>
                      <ArrowUpRight size={16} color="#c99872" />
                    </a>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <style>{`
          .accordion-item {
            position: relative;
            height: 100%;
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
          }
          
          .accordion-item-active {
            flex: 4.5;
            min-width: 320px;
            border: 1px solid rgba(201, 152, 114, 0.6);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
          }
          
          .accordion-item-inactive {
            flex: 1;
            min-width: 70px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: none;
          }
          
          .inactive-title {
            position: absolute;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%) rotate(-90deg);
            transform-origin: center center;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .active-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 36px;
            z-index: 2;
          }

          @media (max-width: 900px) {
            .accordion-container {
              flex-direction: column !important;
              height: auto !important;
            }
            .accordion-item {
              width: 100% !important;
              min-width: 100% !important;
            }
            .accordion-item-active {
              height: 420px !important;
              flex: none !important;
            }
            .accordion-item-inactive {
              height: 80px !important;
              flex: none !important;
            }
            .inactive-title {
              transform: translate(-50%, -50%) rotate(0deg) !important;
              top: 50% !important;
              bottom: auto !important;
              width: 100% !important;
              justify-content: center !important;
            }
            .active-content {
              padding: 24px !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
