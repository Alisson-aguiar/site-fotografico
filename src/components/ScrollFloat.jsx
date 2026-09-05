import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ScrollFloat({
  children,
  className = '',
  tag = 'h2',
  subtitle = '',
  accent = '',
  align = 'center',
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  // Split text into words/letters for float animation
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -30,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 90,
        mass: 0.8,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className={`scroll-float-container ${className}`}
      style={{
        textAlign: align,
        marginBottom: '48px',
        position: 'relative',
      }}
    >
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.85rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c99872',
            marginBottom: '12px',
            fontWeight: 600,
          }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
          gap: '0.3em',
          perspective: 1000,
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={itemVariants}
            style={{
              display: 'inline-block',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: 300,
              letterSpacing: '0.2em',
              lineHeight: 1.15,
              color: '#ffffff',
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {accent && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 80,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #c99872, transparent)',
            margin: align === 'center' ? '20px auto 0' : '20px 0 0',
            transformOrigin: align === 'center' ? 'center' : 'left',
          }}
        />
      )}
    </div>
  );
}
