import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ParticleText({
  text = "Transformando momentos em memórias inesquecíveis através da fotografia.",
  subtitle = "Há mais de 5 anos capturando histórias, emoções e detalhes que merecem ser eternizados.",
  align = "center"
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 320);

    let particles = [];
    let mouse = { x: -1000, y: -1000, radius: 100 };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 320;
      initParticles();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    function initParticles() {
      particles = [];
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = width;
      tempCanvas.height = height;

      const fontSize = Math.min(width / 16, 46);
      tempCtx.font = `900 3rem 'Arial', serif`;
      tempCtx.fillStyle = '#ffffff';
      tempCtx.textAlign = align;
      tempCtx.textBaseline = 'middle';

      const words = text.split(' ');
      let lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        const metrics = tempCtx.measureText(testLine);
        if (metrics.width > width * 0.92) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine);

      const lineHeight = fontSize * 1.35;
      const startY = (height - (lines.length - 1) * lineHeight) / 2;

      const textX = align === 'left' ? 0 : (align === 'right' ? width : width / 2);

      lines.forEach((line, index) => {
        tempCtx.fillText(line, textX, startY + index * lineHeight);
      });

      const imgData = tempCtx.getImageData(0, 0, width, height).data;
      const step = Math.max(3, Math.floor(width / 380));

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = imgData[index + 3];

          if (alpha > 120) {
            const isGold = Math.random() > 0.45;
            const color = isGold ? '#eee' : '#ffffff';
            const size = Math.random() * 1.6 + 0.8;

            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              size: size,
              color: color,
              baseAlpha: alpha / 255,
              density: Math.random() * 40 + 1,
            });
          }
        }
      }
    }

    initParticles();

    function render() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * p.density * 0.8;
          const directionY = forceDirectionY * force * p.density * 0.8;

          p.vx -= directionX;
          p.vy -= directionY;
        }

        const returnDx = p.originX - p.x;
        const returnDy = p.originY - p.y;

        p.vx += returnDx * 0.045;
        p.vy += returnDy * 0.045;

        p.vx *= 0.84;
        p.vy *= 0.84;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    window.addEventListener('resize', handleResize);
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [text]);

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: 320,
          display: 'block',
          cursor: 'none',
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
          color: 'var(--text-secondary)',
          fontWeight: 300,
          letterSpacing: '0.03em',
          maxWidth: 780,
          margin: align === 'center' ? '20px auto 0' : '20px 0 0',
          textAlign: align,
          lineHeight: 1.8,
        }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
