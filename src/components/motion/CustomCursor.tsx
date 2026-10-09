import React, { useEffect, useRef, useState } from 'react';
import { useAppState } from '../../context/StateContext';

export const CustomCursor: React.FC = () => {
  const { cursorMode, cursorText } = useAppState();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [velocity, setVelocity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports fine hover
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      const now = Date.now();
      const dt = Math.max(now - lastTime.current, 1);
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;

      setVelocity(Math.min(speed * 12, 18));
      setPos({ x: e.clientX, y: e.clientY });

      lastPos.current = { x: e.clientX, y: e.clientY };
      lastTime.current = now;
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isVisible || cursorMode === 'DISABLED') return null;

  const displayLabel = cursorText || (cursorMode !== 'DEFAULT' ? cursorMode : '');
  const dotSpread = 10 + velocity;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.05s linear',
      }}
      aria-hidden="true"
    >
      {/* Central 6px Blue Square */}
      <div
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: 'var(--system-blue)',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* 4 Cross Dots that breathe with speed */}
      <div
        style={{
          position: 'absolute',
          width: '2px',
          height: '2px',
          backgroundColor: 'var(--system-blue)',
          top: `-${dotSpread}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          transition: 'top 0.12s ease-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '2px',
          height: '2px',
          backgroundColor: 'var(--system-blue)',
          bottom: `-${dotSpread}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          transition: 'bottom 0.12s ease-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '2px',
          height: '2px',
          backgroundColor: 'var(--system-blue)',
          left: `-${dotSpread}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          transition: 'left 0.12s ease-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '2px',
          height: '2px',
          backgroundColor: 'var(--system-blue)',
          right: `-${dotSpread}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          transition: 'right 0.12s ease-out',
        }}
      />

      {/* State Text Pill when active */}
      {displayLabel && (
        <div
          style={{
            position: 'absolute',
            left: '16px',
            top: '-12px',
            background: 'var(--ink)',
            color: 'var(--canvas)',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            padding: '3px 7px',
            whiteSpace: 'nowrap',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            border: '1px solid var(--system-blue)',
          }}
        >
          {displayLabel}
        </div>
      )}
    </div>
  );
};
