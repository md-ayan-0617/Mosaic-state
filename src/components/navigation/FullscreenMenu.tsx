import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';

const MENU_LINKS = [
  { number: '01', label: 'WORK', to: '/work', nodePos: { x: 35, y: 30 } },
  { number: '02', label: 'CAPABILITIES', to: '/capabilities', nodePos: { x: 55, y: 20 } },
  { number: '03', label: 'PLATFORMS', to: '/platforms', nodePos: { x: 68, y: 38 } },
  { number: '04', label: 'EXHIBITS', to: '/exhibits', nodePos: { x: 60, y: 55 } },
  { number: '05', label: 'PROCESS', to: '/process', nodePos: { x: 45, y: 65 } },
  { number: '06', label: 'STUDIO', to: '/studio', nodePos: { x: 30, y: 55 } },
  { number: '07', label: 'INSIGHTS', to: '/insights', nodePos: { x: 25, y: 38 } },
  { number: '08', label: 'PLAYGROUND', to: '/playground', nodePos: { x: 50, y: 48 } },
  { number: '09', label: 'CONTACT', to: '/contact', nodePos: { x: 75, y: 62 } },
];

const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
  [7, 1], [7, 3], [7, 5], [8, 2], [8, 4],
];

export const FullscreenMenu: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useAppState();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [time, setTime] = React.useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-SE', { hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!isMenuOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9980,
        backgroundColor: 'var(--canvas)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 320px',
        overflow: 'hidden',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      {/* LEFT: Large Nav Links */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
          borderRight: '1px solid var(--line)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            marginBottom: '40px',
            letterSpacing: '0.06em',
          }}
        >
          NAVIGATION SYSTEM
        </div>
        <nav aria-label="Fullscreen menu links">
          {MENU_LINKS.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '16px',
                padding: '10px 0',
                textDecoration: 'none',
                borderBottom: '1px solid var(--line)',
                opacity: activeIndex !== null && activeIndex !== i ? 0.35 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--system-blue)',
                  minWidth: '28px',
                }}
              >
                {link.number}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 52px)',
                  letterSpacing: '-0.03em',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  lineHeight: 1,
                  transition: 'color 0.2s',
                  ...(activeIndex === i ? { color: 'var(--system-blue)' } : {}),
                }}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* CENTER: Interactive Network SVG */}
      <div
        style={{
          position: 'relative',
          borderRight: '1px solid var(--line)',
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Connections */}
          {CONNECTIONS.map(([a, b], i) => {
            const nodeA = MENU_LINKS[a].nodePos;
            const nodeB = MENU_LINKS[b].nodePos;
            const isHighlighted = activeIndex === a || activeIndex === b;
            return (
              <line
                key={i}
                x1={nodeA.x}
                y1={nodeA.y}
                x2={nodeB.x}
                y2={nodeB.y}
                stroke={isHighlighted ? '#2454FF' : '#C7C7BF'}
                strokeWidth={isHighlighted ? 0.8 : 0.4}
                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
              />
            );
          })}

          {/* Nodes */}
          {MENU_LINKS.map((link, i) => (
            <g key={link.to}>
              <circle
                cx={link.nodePos.x}
                cy={link.nodePos.y}
                r={activeIndex === i ? 3.5 : 2}
                fill={activeIndex === i ? '#2454FF' : '#FCFBF7'}
                stroke={activeIndex === i ? '#2454FF' : '#171816'}
                strokeWidth="0.8"
                style={{ transition: 'all 0.2s' }}
              />
              <text
                x={link.nodePos.x + 3}
                y={link.nodePos.y - 3}
                fontSize="3.5"
                fill={activeIndex === i ? '#2454FF' : '#6B6D68'}
                fontFamily="Fragment Mono, monospace"
                style={{ transition: 'fill 0.2s' }}
              >
                {link.number}
              </text>
            </g>
          ))}
        </svg>

        {/* M/S label floating center */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            color: 'var(--text-muted)',
            letterSpacing: '-0.02em',
          }}
        >
          M/S SYSTEM MAP
        </div>
      </div>

      {/* RIGHT: System Status */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(80px, 10vw, 140px) 40px 40px',
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '32px' }}>
            CURRENT SYSTEM
          </div>

          {[
            { label: 'STATUS', value: 'TAKING SELECT PROJECTS', valueColor: 'var(--network-green)' },
            { label: 'AVAILABILITY', value: 'Q4 2026', valueColor: 'var(--ink)' },
            { label: 'ENGAGEMENT', value: 'REMOTE + PHYSICAL' },
            { label: 'LOCAL TIME', value: time, mono: true },
            { label: 'LOCATION', value: 'STOCKHOLM / GLOBAL' },
            { label: 'VERSION', value: '08.26' },
          ].map(({ label, value, valueColor, mono }) => (
            <div
              key={label}
              style={{
                paddingBottom: '16px',
                marginBottom: '16px',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', marginBottom: '4px', letterSpacing: '0.06em' }}>
                {label}
              </div>
              <div
                style={{
                  fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
                  fontSize: mono ? '14px' : '13px',
                  fontWeight: 500,
                  color: valueColor || 'var(--text-primary)',
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Contact CTA */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            NEW BUSINESS
          </div>
          <a
            href="mailto:hello@mosaicstate.example"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'var(--system-blue)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--system-blue)',
              paddingBottom: '2px',
            }}
          >
            hello@mosaicstate.example ↗
          </a>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setIsMenuOpen(false)}
        style={{
          position: 'absolute',
          top: '20px',
          right: 'clamp(20px, 4vw, 64px)',
          background: 'none',
          border: '1px solid var(--line)',
          padding: '8px 16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          cursor: 'pointer',
          letterSpacing: '0.06em',
          color: 'var(--text-secondary)',
        }}
        aria-label="Close menu"
      >
        CLOSE [ESC]
      </button>

      <style>{`
        @media (max-width: 900px) {
          .fullscreen-menu-inner {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
