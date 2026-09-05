import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollVelocity from './ScrollVelocity';
import InfiniteSpiral from './InfiniteSpiral';
import { MessageSquare, Calendar, Send, X, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';

const spiralImages = [
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85', alt: 'Casamento' },
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85', alt: 'Retrato' },
  { src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85', alt: 'Casal' },
  { src: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=85', alt: 'Gestante' },
  { src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85', alt: 'Editorial' },
  { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85', alt: 'Comercial' }
];

export default function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Casamento',
    date: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // Build WhatsApp URL
      const text = `Olá Henrique! Meu nome é ${formData.name}. Gostaria de solicitar um orçamento para ${formData.service} em ${formData.date || 'data a combinar'}. Mensagem: ${formData.message}`;
      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/558491220212?text=${encoded}`, '_blank');
      setIsModalOpen(false);
      setFormSubmitted(false);
    }, 1200);
  };

  return (
    <section id="contato" style={{ position: 'relative', backgroundColor: '#171717', paddingTop: '80px', paddingBottom: '100px', overflow: 'hidden' }}>
      
      {/* Infinite Spiral Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.25, pointerEvents: 'none' }}>
        <InfiniteSpiral
          items={spiralImages}
          animationMode="auto"
          speed={0.55}
          radius={170}
          cardWidth={100}
          cardHeight={100}
          verticalSpacing={60}
          perspective={1000}
          cardRadius={10}
          centerScale={1.2}
          edgeBlur={6}
          cardsPerTurn={7}
          pauseOnHover={false}
          direction="up"
          rotation={0}
          cardTilt={0}
          edgeFade={0.3}
          imageFit="cover"
          grayscale={1}
        />
      </div>

      {/* Dynamic Infinite Scroll Velocity Banner */}
      <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(201, 152, 114, 0.2)', borderBottom: '1px solid rgba(201, 152, 114, 0.2)', marginBottom: '80px' }}>
        <ScrollVelocity text="Vamos eternizar o seu próximo grande momento?" baseVelocity={4} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 760, margin: '0 auto' }}
        >
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: 'var(--text-secondary)',
              fontWeight: 300,
              lineHeight: 1.8,
              marginBottom: '48px',
            }}
          >
            Entre em contato e solicite um orçamento personalizado para sua data especial. Cada história merece ser contada com maestria cinematográfica.
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            {/* <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary"
            >
              <Calendar size={18} />
              <span>Agendar Ensaio</span>
            </button> */}

            <a
              href="https://wa.me/558491220212?text=Ol%C3%A1%20Henrique!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20fotografia."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <MessageSquare size={18} color="#c99872" />
              <span>Falar pelo WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(10, 10, 10, 0.9)',
              backdropFilter: 'blur(16px)',
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#1c1c1c',
                borderRadius: '24px',
                border: '1px solid rgba(201, 152, 114, 0.4)',
                padding: '40px',
                maxWidth: 580,
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                }}
              >
                <X size={24} />
              </button>

              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CheckCircle2 size={56} color="#c99872" style={{ margin: '0 auto 20px' }} />
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#ffffff', marginBottom: '12px' }}>
                    Solicitação Encaminhada!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Redirecionando para o WhatsApp oficial para atendimento exclusivo...
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#c99872', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
                      Exclusividade & Reserva
                    </span>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: '#ffffff', marginTop: '6px' }}>
                      Agende Sua Sessão
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#c99872', marginBottom: '6px' }}>Nome Completo</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Ana Clara Santos"
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(201, 152, 114, 0.3)',
                          borderRadius: '12px',
                          color: '#ffffff',
                          fontFamily: 'inherit',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#c99872', marginBottom: '6px' }}>E-mail</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="seu@email.com"
                          style={{
                            width: '100%',
                            padding: '14px 18px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(201, 152, 114, 0.3)',
                            borderRadius: '12px',
                            color: '#ffffff',
                            fontFamily: 'inherit',
                            outline: 'none',
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#c99872', marginBottom: '6px' }}>WhatsApp</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(11) 99999-9999"
                          style={{
                            width: '100%',
                            padding: '14px 18px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(201, 152, 114, 0.3)',
                            borderRadius: '12px',
                            color: '#ffffff',
                            fontFamily: 'inherit',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#c99872', marginBottom: '6px' }}>Tipo de Ensaio</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '14px 18px',
                            backgroundColor: '#1c1c1c',
                            border: '1px solid rgba(201, 152, 114, 0.3)',
                            borderRadius: '12px',
                            color: '#ffffff',
                            fontFamily: 'inherit',
                            outline: 'none',
                          }}
                        >
                          <option value="Casamento">Casamento</option>
                          <option value="Ensaio Individual">Ensaio Individual</option>
                          <option value="Ensaio de Casal">Ensaio de Casal</option>
                          <option value="Gestante">Gestante</option>
                          <option value="Evento Corporativo">Evento Corporativo</option>
                          <option value="Fotografia Comercial">Fotografia Comercial</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#c99872', marginBottom: '6px' }}>Data Desejada</label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '14px 18px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(201, 152, 114, 0.3)',
                            borderRadius: '12px',
                            color: '#ffffff',
                            fontFamily: 'inherit',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#c99872', marginBottom: '6px' }}>Detalhes & Localização</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Conte um pouco sobre sua visão para as fotos..."
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(201, 152, 114, 0.3)',
                          borderRadius: '12px',
                          color: '#ffffff',
                          fontFamily: 'inherit',
                          outline: 'none',
                          resize: 'none',
                        }}
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '10px', width: '100%' }}>
                      <Send size={18} />
                      <span>Enviar Solicitação Direta</span>
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
