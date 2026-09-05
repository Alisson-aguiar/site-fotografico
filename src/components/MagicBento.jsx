import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollFloat from './ScrollFloat';
import { Camera, Sparkles, Sliders, ShieldCheck, Zap, Compass } from 'lucide-react';

export default function MagicBento() {
  const items = [
    {
      id: 1,
      title: 'Mais de 5 Anos de Experiência',
      subtitle: 'Tradição & Maestria',
      description: 'Uma trajetória sólida guiada pela busca incessante da luz perfeita e da sensibilidade de cada instante.',
      icon: Camera,
      size: 'large', // 2 col span
      accentNum: '01',
    },
    {
      id: 2,
      title: 'Equipamentos Profissionais',
      subtitle: 'Tecnologia de Cinema',
      description: 'Câmeras de médio formato e lentes prime que capturam nitidez cirúrgica e alcance dinâmico incomparável.',
      icon: ShieldCheck,
      size: 'small',
      accentNum: '02',
    },
    {
      id: 3,
      title: 'Edição Avançada Fine Art',
      subtitle: 'Colorimetria Autoral',
      description: 'Tratamento minucioso de cor e pele pixel a pixel, mantendo a naturalidade e a elegância cinematográfica.',
      icon: Sliders,
      size: 'small',
      accentNum: '03',
    },
    {
      id: 4,
      title: 'Atendimento Personalizado',
      subtitle: 'Consultoria Exclusiva',
      description: 'Briefing individual e assessoria completa de estilo, paleta de figurinos e escolha das locações ideais.',
      icon: Sparkles,
      size: 'small',
      accentNum: '04',
    },
    {
      id: 5,
      title: 'Entrega Rápida & Galeria Privada',
      subtitle: 'Experiência Digital Segura',
      description: 'Plataforma privada em nuvem com alta resolução, preview em 48h e download facilitado para toda a família.',
      icon: Zap,
      size: 'small',
      accentNum: '05',
    },
    {
      id: 6,
      title: 'Direção Completa no Ensaio',
      subtitle: 'Leveza & Espontaneidade',
      description: 'Você nunca fica sem saber o que fazer. Conduzimos cada pose e movimento para que se sinta absolutamente confortável.',
      icon: Compass,
      size: 'large',
      accentNum: '06',
    },
  ];

  return (
    <section id="diferenciais" className="section-spacing" style={{ position: 'relative' }}>
      <div className="container">
        <ScrollFloat subtitle="Padrão de Excelência" accent={true}>
          Diferenciais Exclusivos
        </ScrollFloat>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginTop: '40px',
          }}
          className="bento-grid"
        >
          {items.map((item, idx) => (
            <BentoCard key={item.id} item={item} index={idx} />
          ))}
        </div>

        <style>{`
          .bento-card-large {
            grid-column: span 2;
          }
          .bento-card-small {
            grid-column: span 1;
          }
          @media (max-width: 960px) {
            .bento-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 640px) {
            .bento-grid {
              grid-template-columns: 1fr !important;
            }
            .bento-card-large, .bento-card-small {
              grid-column: span 1 !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

function BentoCard({ item, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={item.size === 'large' ? 'bento-card-large' : 'bento-card-small'}
      style={{
        position: 'relative',
        backgroundColor: 'rgba(28, 28, 28, 0.65)',
        backdropFilter: 'blur(16px)',
        borderRadius: '24px',
        padding: '36px',
        border: '1px solid rgba(201, 152, 114, 0.2)',
        overflow: 'hidden',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(201, 152, 114, 0.15)'
          : '0 10px 25px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Radial Mouse Spotlight Glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 152, 114, 0.16), transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Top row with Icon & Number */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '14px',
            backgroundColor: 'rgba(201, 152, 114, 0.12)',
            border: '1px solid rgba(201, 152, 114, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#c99872',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          }}
        >
          <Icon size={22} color="#c99872" />
        </div>

        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '1.2rem',
            color: 'rgba(201, 152, 114, 0.35)',
            fontWeight: 700,
          }}
        >
          {item.accentNum}
        </span>
      </div>

      {/* Text Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontSize: '0.8rem',
            color: '#c99872',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '8px',
          }}
        >
          {item.subtitle}
        </p>

        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)',
            fontWeight: 400,
            color: '#ffffff',
            marginBottom: '14px',
            lineHeight: 1.2,
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            fontWeight: 300,
          }}
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
