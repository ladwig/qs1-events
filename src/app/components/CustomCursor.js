'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

function Bubble({ x, y, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 700); // Remove bubble after animation
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="fixed pointer-events-none z-40"
      style={{ 
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="relative w-8 h-8 animate-bubble">
        <Image
          src="/logo.svg"
          alt="Bubble"
          fill
          className="invert opacity-70"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}

export default function CustomCursor() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const id = Date.now();
      setBubbles(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const removeBubble = (id) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
  };

  return (
    <>
      {bubbles.map(bubble => (
        <Bubble 
          key={bubble.id}
          x={bubble.x}
          y={bubble.y}
          onComplete={() => removeBubble(bubble.id)}
        />
      ))}
    </>
  );
} 