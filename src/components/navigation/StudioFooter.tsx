import React from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
  EXPLORE: [
    { label: 'Work', to: '/work' },
    { label: 'Capabilities', to: '/capabilities' },
    { label: 'Platforms', to: '/platforms' },
    { label: 'Exhibits', to: '/exhibits' },
  ],
  STUDIO: [
    { label: 'People', to: '/studio' },
    { label: 'Process', to: '/process' },
    { label: 'Insights', to: '/insights' },
    { label: 'Playground', to: '/playground' },
  ],
  CONTACT: [
    { label: 'New Business', to: '/start' },
    { label: 'Careers', to: '/contact?subject=careers' },
    { label: 'General', to: '/contact' },
  ],
};

const FOOTER_NODES = [
  { label: 'WORK', to: '/work', x: 22, y: 40 },
  { label: 'CAPABILITIES', to: '/capabilities', x: 42, y: 28 },
  { label: 'PLATFORMS', to: '/platforms', x: 58, y: 44 },
  { label: 'EXHIBITS', to: '/exhibits', x: 38, y: 60 },
  { label: 'STUDIO', to: '/studio', x: 20, y: 62 },
  { label: 'INSIGHTS', to: '/insights', x: 68, y: 30 },
  { label: 'START', to: '/start', x: 72, y: 62 },
];

const FOOTER_CONNECTIONS = [
  [0, 1], [1, 2], [2, 5], [0, 4], [4, 3], [3, 1], [2, 6], [5, 6],
];

export const StudioFooter: React.FC = () => {
  const [hoveredNode, setHoveredNode] = React.useState<number | null>(null);
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--ink)',
        color: 'var(--paper)',
        padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px) clamp(24px, 3vw, 40px)',
      }}
      aria-label="Site footer"
    >
      {/* Top: Wordmark + Footer Network */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          marginBottom: 'clamp(48px, 6vw, 80px)',
          paddingBottom: 'clamp(48px, 6vw, 80px)',
          borderBottom: '1px solid #2D302B',
          alignItems: 'end',
        }}
      >
        {/* Wordmark */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(52px, 8vw, 120px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.88,
              fontWeight: 500,
              color: 'var(--paper)',
            }}
          >
            MOSAIC/<br />STATE
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#6E7169',
              marginTop: '16px',
              letterSpacing: '0.04em',
            }}
          >
            INTERACTIVE SYSTEMS / DIGITAL EXPERIENCES
          </div>
        </div>

        {/* Footer Navigation Network (tiny SVG) */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#6E7169',
              marginBottom: '12px',
              letterSpacing: '0.05em',
            }}
          >
            SYSTEM MAP
          </div>
          <svg
            viewBox="0 0 100 100"
            style={{ width: '100%', maxWidth: '260px', height: '120px' }}
            aria-hidden="true"
          >
            {/* Connection lines */}
            {FOOTER_CONNECTIONS.map(([a, b], i) => {
              const nodeA = FOOTER_NODES[a];
              const nodeB = FOOTER_NODES[b];
              const isHighlighted = hoveredNode === a || hoveredNode === b;
              return (
                <line
                  key={i}
                  x1={nodeA.x}
                  y1={nodeA.y}
                  x2={nodeB.x}
                  y2={nodeB.y}
                  stroke={isHighlighted ? '#4FCE83' : '#2D302B'}
                  strokeWidth={isHighlighted ? 1 : 0.6}
                  style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                />
              );
            })}

            {/* Nodes */}
            {FOOTER_NODES.map((node, i) => (
              <g
                key={node.to}
                onMouseEnter={() => setHoveredNode(i)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={hoveredNode === i ? 3 : 1.8}
                  fill={hoveredNode === i ? '#4FCE83' : '#EFEEE8'}
                  style={{ transition: 'all 0.2s' }}
                />
                <text
                  x={node.x}
                  y={node.y - 4}
                  fontSize="3"
                  fill={hoveredNode === i ? '#4FCE83' : '#6E7169'}
                  fontFamily="Fragment Mono, monospace"
                  textAnchor="middle"
                  style={{ transition: 'fill 0.2s' }}
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Footer Link Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '40px',
          marginBottom: 'clamp(48px, 6vw, 80px)',
        }}
      >
        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
          <div key={section}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: '#6E7169',
                marginBottom: '16px',
                letterSpacing: '0.06em',
                paddingBottom: '10px',
                borderBottom: '1px solid #2D302B',
              }}
            >
              {section}
            </div>
            <ul style={{ listStyle: 'none' }}>
              {links.map((link) => (
                <li key={link.to} style={{ marginBottom: '10px' }}>
                  <Link
                    to={link.to}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      color: '#B7B8B0',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#EFEEE8'; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#B7B8B0'; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* System Status Column */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#6E7169',
              marginBottom: '16px',
              letterSpacing: '0.06em',
              paddingBottom: '10px',
              borderBottom: '1px solid #2D302B',
            }}
          >
            SYSTEM STATUS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'PROJECT STATUS', value: 'SELECT CAPACITY AVAILABLE', valueColor: '#4FCE83' },
              { label: 'VERSION', value: '08.26' },
            ].map(({ label, value, valueColor }) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#6E7169', marginBottom: '2px' }}>
                  {label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: valueColor || '#B7B8B0' }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '20px',
          borderTop: '1px solid #2D302B',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: '#6E7169',
          }}
        >
          © {year} MOSAIC/STATE — INTERACTIVE SYSTEMS / DIGITAL EXPERIENCES
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy', 'Accessibility', 'Terms', 'Sitemap'].map((label) => (
            <Link
              key={label}
              to={`/${label.toLowerCase()}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: '#6E7169',
                textDecoration: 'none',
              }}
            >
              {label.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
