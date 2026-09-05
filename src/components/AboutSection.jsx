import React from 'react';
import { motion } from 'framer-motion';
import ScrollFloat from './ScrollFloat';
import { Award, Camera, HeartHandshake, Users } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { value: '5+', label: 'Anos de Experiência', icon: Camera },
    { value: '350+', label: 'Ensaios Realizados', icon: Award },
    { value: '200+', label: 'Clientes Atendidos', icon: Users },
  ];

  return (
    <section id="sobre" className="section-spacing" style={{ position: 'relative' }}>
      <div className="container">
        <ScrollFloat subtitle="Sobre o Artista" accent={true}>
          A Arte do Olhar
        </ScrollFloat>

        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            marginTop: '40px',
          }}
        >
          {/* Left Column: Photographer Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            {/* Ambient gold glow back */}
            <div
              style={{
                position: 'absolute',
                top: -20,
                left: -20,
                right: 20,
                bottom: 20,
                border: '1px solid var(--accent-border)',
                borderRadius: '16px',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                zIndex: 1,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
              }}
            >
              <img
                src="./image/judson-henrique.png"
                alt="Henrique Judson — Fotógrafo"
                loading="lazy"
                className="about-img"
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'grayscale(25%) contrast(105%)',
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.04)';
                  e.currentTarget.style.filter = 'grayscale(0%) contrast(108%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter = 'grayscale(25%) contrast(105%)';
                }}
              />

              {/* Bottom vignette overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(23, 23, 23, 0.95), transparent)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '24px',
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '1.2rem',
                      letterSpacing: '0.1em',
                      color: '#ffffff',
                      marginBottom: '4px',
                    }}
                  >
                    Henrique Judson
                  </p>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: '#c99872',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Diretor Criativo & Fotógrafo
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & TextPressure & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 100,
                color: '#ffffff',
                lineHeight: 1.1,
                margin: 0
              }}>
                Muito prazer, eu sou <span style={{ color: '#c99872' }}>Henrique Judson.</span>
              </h2>
            </div>

            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.15rem',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                fontWeight: 300,
                marginBottom: '20px',
              }}
            >
              Sou fotógrafo profissional há mais de cinco anos e acredito que cada imagem deve transmitir sentimentos genuínos.
            </p>

            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                fontWeight: 300,
                marginBottom: '40px',
              }}
            >
              Meu trabalho é baseado na criação de fotografias que vão além da estética, transformando momentos em lembranças capazes de atravessar gerações.
            </p>

            {/* Stats Grid */}
            <div
              className="stats-grid"
              style={{
                display: 'grid',
                gap: '20px',
                borderTop: '1px solid rgba(201, 152, 114, 0.2)',
                paddingTop: '32px',
              }}
            >
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div key={idx} style={{ textAlign: 'left' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '6px',
                      }}
                    >
                      <IconComponent size={18} color="#c99872" className='mobile-stats-icon' />
                      <span className='mobile-stats-span'
                        style={{  
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                          fontWeight: 600,
                          color: '#ffffff',
                        }}
                      >
                        {stat.value}
                      </span>
                    </div>
                    <p className='mobile-stats-p'
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <style>{`
          .about-grid {
            gap: 64px;
          }
          .about-img {
            height: 560px;
          }
          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          @media (max-width: 960px) {
            .stats-grid {
              grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
              gap: 32px !important;
            }
          }

          @media (max-width: 640px) {
            .about-grid {
              gap: 40px;
            }
            .about-img {
              height: 420px;
            }
            .stats-grid {
              grid-template-columns: 1fr;
              gap: 28px !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
