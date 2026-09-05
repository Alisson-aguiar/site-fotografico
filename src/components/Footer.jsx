import React from 'react';
import { Camera, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import CircularText from './CircularText';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#121212',
        borderTop: '1px solid rgba(201, 152, 114, 0.2)',
        paddingTop: '80px',
        paddingBottom: '40px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1.2fr 1.5fr',
            gap: '48px',
            marginBottom: '60px',
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand & Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <div style={{ position: 'relative', width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', fontFamily: "'Cinzel', serif", fontSize: '26px', fontWeight: 'light', color: '#c99872', zIndex: 2 }}>
                  HJ
                </div>
                <div style={{ position: 'absolute', transform: 'scale(0.45)', transformOrigin: 'center', fontWeight: 'light', }}>
                  <CircularText text="HENRIQUE JUDSON • " spinDuration={20} className="" onHover="speedUp" />
                </div>
              </div>
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '1.25rem',
                  letterSpacing: '0.15em',
                  color: '#ffffff',
                  fontWeight: 100,
                }}
              >
                HENRIQUE JUDSON
              </span>
            </div>

            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                maxWidth: 340,
                marginBottom: '24px',
              }}
            >
              Fotografia cinematográfica de luxo. Eternizando sentimentos autênticos, arte e histórias de vida com elegância atemporal.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { name: 'Instagram', url: 'https://www.instagram.com/henrique_judson/' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(201, 152, 114, 0.25)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.75rem',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#c99872';
                    e.currentTarget.style.color = '#121212';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                  }}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.95rem',
                letterSpacing: '0.15em',
                color: '#c99872',
                marginBottom: '20px',
                textTransform: 'uppercase',
              }}
            >
              Navegação
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Sobre o Fotógrafo', href: '#sobre' },
                { label: 'Serviços Exclusivos', href: '#servicos' },
                { label: 'Diferenciais', href: '#diferenciais' },
                { label: 'Portfólio 3D', href: '#portfolio' },
                { label: 'Processo Criativo', href: '#processo' },
                { label: 'Depoimentos', href: '#depoimentos' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#c99872')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.95rem',
                letterSpacing: '0.15em',
                color: '#c99872',
                marginBottom: '20px',
                textTransform: 'uppercase',
              }}
            >
              Especialidades
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Casamentos', 'Ensaios Individuais', 'Ensaios de Casal', 'Gestantes', 'Eventos Corporativos', 'Fotografia Comercial'].map((s) => (
                <li key={s}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Atendimento */}
          <div>
            <h4
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.95rem',
                letterSpacing: '0.15em',
                color: '#c99872',
                marginBottom: '20px',
                textTransform: 'uppercase',
              }}
            >
              Atendimento
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="#c99872" />
                <span>+55 (84) 99122-0212</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#c99872" />
                <span>contato@henriquejudson.com.br</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="#c99872" />
                <span>Natal/RN — Atendimento Humanizado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }} margin-left="20px">
            © {new Date().getFullYear()} Henrique Judson Fotografia. Todos os direitos reservados. <a
            style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}
            href="https://wa.me/558496572500?text=Olá%2C%20vi%20seu%20trabalho%20e%20tenho%20interesse%20nos%20seus%20serviços%20de%20desenvolvimento."
          >
             Desenvolvido por Alisson Aguiar
          </a>
          </p>

          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#c99872',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            <span>Voltar ao topo</span>
            <ArrowUp size={16} />
          </button>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .footer-grid {
              grid-template-columns: 1fr 1fr !important;
            }
          }
          @media (max-width: 600px) {
            .footer-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </footer>
  );
}
