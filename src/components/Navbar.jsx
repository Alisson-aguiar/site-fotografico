import React, { useState, useEffect } from 'react';
import { Camera, Menu, X } from 'lucide-react';

export default function Navbar({ isVisible }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 3.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Processo', href: '#processo' },
    { label: 'Depoimentos', href: '#depoimentos' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 9999,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isVisible || isScrolled ? 1 : 0,
        pointerEvents: isVisible || isScrolled ? 'auto' : 'none',
        transform: isVisible || isScrolled ? 'translateY(0)' : 'translateY(-20px)',
      }}
    >
      <nav
      className='nav-mobile'
        style={{
          maxWidth: 1320,
          margin: '20px auto 0',
          padding: '14px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'rgba(23, 23, 23, 0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: '40px',
          border: '1px solid rgba(201, 152, 114, 0.25)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#ffffff',
          }}
        >
          
          <span
          className='nav-title'
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '1rem',
              letterSpacing: '0.15em',
              fontWeight: 600,
            }}
          >
            HENRIQUE JUDSON
          </span>
        </a>

        {/* Desktop Links */}
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
            listStyle: 'none',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#c99872')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="https://wa.me/558491220212?text=Ol%C3%A1%20Henrique!%20Gostaria%20de%20agendar%20um%20servi%C3%A7o."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 22px',
              background: 'linear-gradient(135deg, #c99872 0%, #a87955 100%)',
              color: '#121212',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '30px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(201, 152, 114, 0.3)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Agendar
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#c99872',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            margin: '10px 24px',
            padding: '24px',
            backgroundColor: '#171717',
            border: '1px solid rgba(201, 152, 114, 0.3)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '1rem',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
