import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

export default function ScrollVelocity({
  text = "Vamos eternizar o seu próximo grande momento?",
  baseVelocity = 2,
  className = "",
}) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(4);
  const containerRef = useRef(null);

  // Marquee move animation with velocity
  return (
    <div
      ref={containerRef}
      className={`scroll-velocity-wrapper ${className}`}
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
        flexWrap: 'nowrap',
        width: '100%',
        padding: '30px 0',
      }}
    >
      <ParallaxText baseVelocity={baseVelocity} velocityFactor={velocityFactor}>
        {text}
      </ParallaxText>
    </div>
  );
}

function ParallaxText({ children, baseVelocity = 100, velocityFactor }) {
  const baseX = useRef(0);
  const [xVal, setXVal] = useState(0);

  useEffect(() => {
    let animationId;
    let lastTime = performance.now();

    const update = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const currentVelocity = velocityFactor.get();
      let moveBy = baseVelocity * delta;

      if (currentVelocity !== 0) {
        moveBy += currentVelocity * delta * 40;
      }

      baseX.current -= moveBy;
      if (baseX.current <= -50) {
        baseX.current = 0;
      } else if (baseX.current > 0) {
        baseX.current = -50;
      }

      setXVal(baseX.current);
      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, [baseVelocity, velocityFactor]);

  return (
    <div
      style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        transform: `translateX(${xVal}%)`,
      }}
    >
      {[...Array(4)].map((_, i) => (
        <span
          key={i}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '30px',
            marginRight: '30px',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            color: i % 2 === 0 ? '#ffffff' : 'transparent',
            WebkitTextStroke: i % 2 === 0 ? 'none' : '1px rgba(201, 152, 114, 0.6)',
          }}
        >
          <span>{children}</span>
          <span style={{ color: '#c99872', fontSize: '0.6em' }}>✦</span>
        </span>
      ))}
    </div>
  );
}
