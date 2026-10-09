import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';

export const PageTransition: React.FC = () => {
  const location = useLocation();
  const { currentStateLabel } = useAppState();
  const [transitioning, setTransitioning] = useState(false);
  const [prevLabel, setPrevLabel] = useState(currentStateLabel);

  useEffect(() => {
    setTransitioning(true);
    const timer = setTimeout(() => {
      setTransitioning(false);
      setPrevLabel(currentStateLabel);
    }, 850);
    return () => clearTimeout(timer);
  }, [location.pathname, currentStateLabel]);

  if (!transitioning) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99998,
      }}
      aria-hidden="true"
    >
      {/* Sweeping Grid Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '2px',
          backgroundColor: 'var(--system-blue)',
          boxShadow: '0 0 15px rgba(36, 84, 255, 0.4)',
          animation: 'sweepLine 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      />

      {/* State Change Badge Top Right */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: 'clamp(20px, 4vw, 64px)',
          background: 'var(--ink)',
          color: 'var(--canvas)',
          padding: '10px 16px',
          border: '1px solid var(--system-blue)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          lineHeight: 1.4,
          animation: 'fadeInOut 0.85s ease forwards',
        }}
      >
        <div style={{ color: 'var(--mist)', fontSize: '9px' }}>STATE TRANSITION</div>
        <div style={{ color: '#888' }}>PREV: {prevLabel}</div>
        <div style={{ color: 'var(--system-blue)', fontWeight: 600 }}>NEXT: {currentStateLabel}</div>
      </div>

      <style>{`
        @keyframes sweepLine {
          0% { left: 0%; opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-8px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};
