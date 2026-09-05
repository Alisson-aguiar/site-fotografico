import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollFloat from './ScrollFloat';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function PixelSwapTestimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Mariana & Rodrigo Silveira',
      role: 'Casamento no Vale dos Vinhedos',
      quote: 'O Gabriel não apenas fotografou nosso casamento, ele capturou a alma de cada instante. Quando olhamos o álbum hoje, choramos e rimos tudo de novo com a mesma intensidade.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      rating: 5,
    },
    {
      id: 2,
      name: 'Helena Montenegro',
      role: 'Ensaio Autoral & Marca Pessoal',
      quote: 'Eu sempre tive muita vergonha de ser fotografada. A direção suave e sensível do Gabriel me deixou completamente à vontade. O resultado superou todas as minhas expectativas mais altas.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      rating: 5,
    },
    {
      id: 3,
      name: 'Camila & Lucas Brandão',
      role: 'Ensaio Gestante & Família',
      quote: 'Um trabalho de uma delicadeza rara. O cuidado com a luz natural e os detalhes foi impecável. Uma herança visual que nosso filho guardará para a vida inteira.',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);
  const canvasRef = useRef(null);

  const handleNext = () => {
    if (isSwapping) return;
    triggerPixelSwap((currentIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (isSwapping) return;
    triggerPixelSwap((currentIndex - 1 + testimonials.length) % testimonials.length);
  };

  const triggerPixelSwap = (nextIndex) => {
    setIsSwapping(true);
    const canvas = canvasRef.current;
    if (!canvas) {
      setCurrentIndex(nextIndex);
      setIsSwapping(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    const width = (canvas.width = 400);
    const height = (canvas.height = 480);

    const currentImg = new Image();
    currentImg.crossOrigin = 'anonymous';
    currentImg.src = testimonials[currentIndex].image;

    const nextImg = new Image();
    nextImg.crossOrigin = 'anonymous';
    nextImg.src = testimonials[nextIndex].image;

    // Pixel matrix dissolve animation
    let progress = 0;
    const blockSize = 16;
    const cols = Math.ceil(width / blockSize);
    const rows = Math.ceil(height / blockSize);
    const totalBlocks = cols * rows;

    // Random shuffle block indices
    const indices = Array.from({ length: totalBlocks }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    let frame = 0;
    const totalFrames = 30;

    function animate() {
      frame++;
      const currentBlocksCount = Math.floor((frame / totalFrames) * totalBlocks);

      ctx.clearRect(0, 0, width, height);

      // Draw current image first
      if (currentImg.complete) {
        ctx.drawImage(currentImg, 0, 0, width, height);
      }

      // Draw revealed blocks of next image
      if (nextImg.complete) {
        for (let i = 0; i < currentBlocksCount; i++) {
          const idx = indices[i];
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          const bx = col * blockSize;
          const by = row * blockSize;

          ctx.drawImage(nextImg, bx, by, blockSize, blockSize, bx, by, blockSize, blockSize);

          // Add gold pixel edge highlight
          ctx.strokeStyle = 'rgba(201, 152, 114, 0.4)';
          ctx.strokeRect(bx, by, blockSize, blockSize);
        }
      }

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        setCurrentIndex(nextIndex);
        setIsSwapping(false);
        ctx.clearRect(0, 0, width, height);
      }
    }

    animate();
  };

  const current = testimonials[currentIndex];

  return (
    <section id="depoimentos" className="section-spacing" style={{ position: 'relative' }}>
      <div className="container">
        <ScrollFloat subtitle="Histórias Reais" accent={true}>
          Depoimentos & Experiências
        </ScrollFloat>

        <div
          style={{
            maxWidth: 1080,
            margin: '40px auto 0',
            backgroundColor: 'rgba(28, 28, 28, 0.7)',
            backdropFilter: 'blur(20px)',
            borderRadius: '28px',
            border: '1px solid rgba(201, 152, 114, 0.25)',
            padding: '50px',
            display: 'grid',
            gridTemplateColumns: '380px 1fr',
            gap: '50px',
            alignItems: 'center',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
            position: 'relative',
          }}
          className="testimonial-box"
        >
          {/* Left: Pixel Swap Photo Container */}
          <div
            className="testimonial-img-box"
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(201, 152, 114, 0.35)',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.7)',
            }}
          >
            <img
              src={current.image}
              alt={current.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: isSwapping ? 'none' : 'block',
              }}
            />

            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: isSwapping ? 'block' : 'none',
              }}
            />

            {/* Subtle corner gold badge */}
            <div
              style={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16,
                padding: '10px 16px',
                background: 'rgba(23, 23, 23, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(201, 152, 114, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: '#c99872', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Pixel Swap Art
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={13} fill="#c99872" color="#c99872" />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Testimonial Text */}
          <div style={{ position: 'relative' }}>
            <Quote size={48} color="#c99872" style={{ opacity: 0.4, marginBottom: '20px' }} />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                    lineHeight: 1.5,
                    color: '#ffffff',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    marginBottom: '32px',
                  }}
                >
                  "{current.quote}"
                </p>

                <div>
                  <h4
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '1.2rem',
                      letterSpacing: '0.08em',
                      color: '#ffffff',
                      marginBottom: '4px',
                    }}
                  >
                    {current.name}
                  </h4>
                  <p
                    style={{
                      color: '#c99872',
                      fontSize: '0.85rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {current.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                marginTop: '40px',
              }}
            >
              <button
                onClick={handlePrev}
                disabled={isSwapping}
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(201, 152, 114, 0.3)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isSwapping ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#c99872';
                  e.currentTarget.style.color = '#121212';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                disabled={isSwapping}
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(201, 152, 114, 0.3)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isSwapping ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#c99872';
                  e.currentTarget.style.color = '#121212';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <style>{`
          .testimonial-img-box {
            height: 460px;
          }
          @media (max-width: 860px) {
            .testimonial-box {
              grid-template-columns: 1fr !important;
              padding: 30px !important;
              gap: 30px !important;
            }
            .testimonial-img-box {
              height: 380px;
            }
          }
          @media (max-width: 640px) {
            .testimonial-box {
              padding: 24px !important;
              gap: 24px !important;
            }
            .testimonial-img-box {
              height: 280px;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
