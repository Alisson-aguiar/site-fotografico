import React from 'react';
import { motion } from 'framer-motion';

export default function ChromaGrid({ items, onItemClick }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      width: '100%',
      padding: '20px 0'
    }}>
      {items.map((item, idx) => (
        <motion.div
          key={item.id || idx}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: idx * 0.05 }}
          onClick={() => onItemClick && onItemClick(item)}
          className="chromagrid-item"
          style={{
            position: 'relative',
            borderRadius: '16px',
            cursor: 'pointer',
            overflow: 'hidden', // Isolado apenas no card
            border: `1px solid ${item.borderColor || 'rgba(201, 152, 114, 0.2)'}`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            backgroundColor: '#0a0a0a'
          }}
        >
          {/* Wrapper for Hover Animation */}
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          >
            {/* Background Image */}
            <motion.img
            src={item.image}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 0
            }}
            variants={{
              rest: { filter: 'grayscale(100%) brightness(0.6)', scale: 1 },
              hover: { filter: 'grayscale(0%) brightness(1)', scale: 1.05 }
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          
          {/* Gradient Overlay */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: item.gradient || 'linear-gradient(to top, rgba(15,15,15,0.95) 0%, rgba(15,15,15,0.2) 60%, transparent 100%)',
              zIndex: 1
            }}
            variants={{
              rest: { opacity: 0.6 },
              hover: { opacity: 0.8 }
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Content */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              zIndex: 2
            }}
            variants={{
              rest: { y: 10, opacity: 0.8 },
              hover: { y: 0, opacity: 1 }
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <span style={{ 
              color: item.borderColor || '#c99872', 
              fontSize: '0.75rem', 
              letterSpacing: '0.15em', 
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '6px'
            }}>
              {item.subtitle}
            </span>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.8rem',
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.1
            }}>
              {item.title}
            </h3>
            {item.handle && (
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: '8px' }}>
                {item.handle}
              </span>
            )}
          </motion.div>
          </motion.div>
        </motion.div>
      ))}
      
      <style>{`
        .chromagrid-item {
          height: 420px;
        }
        @media (max-width: 640px) {
          .chromagrid-item {
            height: 360px !important;
          }
        }
      `}</style>
    </div>
  );
}
