import React from 'react';
import { useAppState } from '../../context/StateContext';

export const GridOverlay: React.FC = () => {
  const { isGridVisible, toggleGrid } = useAppState();

  if (!isGridVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99990,
        display: 'flex',
        flexDirection: 'column',
      }}
      aria-hidden="true"
    >
      {/* 12 Columns Grid */}
      <div
        className="grid-system"
        style={{
          flex: 1,
          height: '100%',
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: '100%',
              borderLeft: '1px solid rgba(36, 84, 255, 0.18)',
              borderRight: i === 11 ? '1px solid rgba(36, 84, 255, 0.18)' : 'none',
              backgroundColor: 'rgba(36, 84, 255, 0.02)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '8px 4px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--system-blue)',
                opacity: 0.8,
              }}
            >
              COL_{(i + 1).toString().padStart(2, '0')}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--system-blue)',
                opacity: 0.8,
              }}
            >
              8.33%
            </span>
          </div>
        ))}
      </div>

      {/* Grid Status Badge Floating Bottom Left */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          pointerEvents: 'all',
          backgroundColor: 'var(--ink)',
          color: 'var(--canvas)',
          padding: '6px 12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid var(--system-blue)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <span>ALIGNMENT_GRID: ACTIVE (12-COL)</span>
        <button
          onClick={toggleGrid}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--system-blue)',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textDecoration: 'underline',
          }}
        >
          [DISMISS 'G']
        </button>
      </div>
    </div>
  );
};
