import React, { useEffect, useRef } from 'react';

export default function CursorGrid() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const gridCanvasRef = useRef(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const canvas = gridCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let isHoveringInteractive = false;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering clickable elements
      const target = e.target;
      const isClickable = target.closest('button, a, input, textarea, [role="button"], .clickable, .interactive-hover');
      isHoveringInteractive = !!isClickable;
    };

    let animationFrameId;
    const render = () => {
      // Smooth ring lerp
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (ring) {
        const scale = isHoveringInteractive ? 1.8 : 1;
        ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${scale})`;
        ring.style.borderColor = isHoveringInteractive ? 'rgba(201, 152, 114, 0.9)' : 'rgba(201, 152, 114, 0.4)';
      }

      // Draw subtle ambient grid glow around cursor
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid
      const gridSize = 48;
      const radius = 220;

      const startX = Math.max(0, Math.floor((currentX - radius) / gridSize) * gridSize);
      const endX = Math.min(width, Math.ceil((currentX + radius) / gridSize) * gridSize);
      const startY = Math.max(0, Math.floor((currentY - radius) / gridSize) * gridSize);
      const endY = Math.min(height, Math.ceil((currentY + radius) / gridSize) * gridSize);

      for (let x = startX; x <= endX; x += gridSize) {
        for (let y = startY; y <= endY; y += gridSize) {
          const dx = x - currentX;
          const dy = y - currentY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            const alpha = (1 - dist / radius) * 0.25;
            ctx.fillStyle = `rgba(201, 152, 114, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Grid Canvas in Background */}
      <canvas
        ref={gridCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 40,
        }}
      />

      {/* Center Dot */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: -3,
          left: -3,
          width: 6,
          height: 6,
          backgroundColor: '#c99872',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          boxShadow: '0 0 10px #c99872',
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Reticle Ring */}
      <div
        ref={cursorRingRef}
        style={{
          position: 'fixed',
          top: -18,
          left: -18,
          width: 36,
          height: 36,
          border: '1px solid rgba(201, 152, 114, 0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'transform 0.1s ease-out, border-color 0.2s ease, width 0.2s ease, height 0.2s ease',
        }}
      />
    </>
  );
}
