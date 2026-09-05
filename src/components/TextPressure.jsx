import React, { useEffect, useRef, useState } from 'react';

export default function TextPressure({
  text = "Muito prazer, eu sou Gabriel Albuquerque.",
  className = "",
  textColor = "#ffffff",
  accentColor = "#c99872",
}) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [chars, setChars] = useState([]);

  useEffect(() => {
    setChars(text.split(''));
  }, [text]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`text-pressure-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {chars.map((char, index) => {
        return (
          <PressureChar
            key={index}
            char={char}
            index={index}
            mousePos={mousePos}
            textColor={textColor}
            accentColor={accentColor}
          />
        );
      })}
    </div>
  );
}

function PressureChar({ char, index, mousePos, textColor, accentColor }) {
  const charRef = useRef(null);
  const [weight, setWeight] = useState(300);
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState(textColor);

  useEffect(() => {
    if (!charRef.current) return;
    const rect = charRef.current.getBoundingClientRect();
    const parentRect = charRef.current.parentElement.getBoundingClientRect();
    const charCenterX = rect.left - parentRect.left + rect.width / 2;
    const charCenterY = rect.top - parentRect.top + rect.height / 2;

    const dx = mousePos.x - charCenterX;
    const dy = mousePos.y - charCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 180;

    if (dist < maxDist) {
      const force = 1 - dist / maxDist;
      // Interpolate font-weight from 300 to 700
      const newWeight = Math.round(300 + force * 400);
      const newScale = 1 + force * 0.15;
      setWeight(newWeight);
      setScale(newScale);
      setColor(force > 0.4 ? accentColor : textColor);
    } else {
      setWeight(300);
      setScale(1);
      setColor(textColor);
    }
  }, [mousePos, textColor, accentColor]);

  if (char === ' ') {
    return <span style={{ display: 'inline-block', width: '0.35em' }}>&nbsp;</span>;
  }

  return (
    <span
      ref={charRef}
      style={{
        display: 'inline-block',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
        fontWeight: weight,
        color: color,
        transform: `scale(${scale})`,
        transition: 'transform 0.15s ease-out, font-weight 0.15s ease-out, color 0.2s ease',
        transformOrigin: 'center bottom',
        lineHeight: 1.1,
      }}
    >
      {char}
    </span>
  );
}
