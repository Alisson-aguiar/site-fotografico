import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ScrollFloat from './ScrollFloat';
import { Award, Camera, HeartHandshake, Users } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { value: '5+', label: 'Anos de Experiência', icon: Camera },
    { value: '350+', label: 'Ensaios Realizados', icon: Award },
    { value: '200+', label: 'Clientes Atendidos', icon: Users },
  ];

  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize mouse position from -0.5 to 0.5
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              maxWidth: 480,
              margin: '0 auto',
              perspective: '1000px', // Adds 3D perspective
            }}
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                position: 'relative',
                borderRadius: '24px', // Softer edges for a modern look
                overflow: 'hidden',
                zIndex: 1,
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(201, 152, 114, 0.1)', // Rich deep shadow with subtle glow
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
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
                  filter: 'grayscale(20%) contrast(105%)',
                  transition: 'filter 0.6s ease',
                  transform: 'translateZ(20px)', // Pushes image slightly forward in 3D space
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0%) contrast(110%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(20%) contrast(105%)';
                }}
              />
            </motion.div>
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
