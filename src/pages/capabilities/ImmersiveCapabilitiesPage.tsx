import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';

export const ImmersiveCapabilitiesPage: React.FC = () => {
  const { setCursorMode } = useAppState();
  const [activePortal, setActivePortal] = useState<'PRODUCT' | 'PLACE' | 'STORY'>('PRODUCT');

  return (
    <main
      id="main-content"
      style={{
        paddingTop: '64px',
        minHeight: '100vh',
        backgroundColor: 'var(--night)',
        color: 'var(--night-text)',
      }}
    >
      {/* ── HERO ── */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 130px) clamp(20px, 4vw, 64px) clamp(48px, 6vw, 90px)',
          borderBottom: '1px solid var(--night-line)',
        }}
        aria-label="Immersive: Sometimes information needs depth"
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--violet)',
            marginBottom: '28px',
            letterSpacing: '0.08em',
          }}
        >
          STATE_03.2 / IMMERSIVE 3D & XR SYSTEMS
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-mega)',
            letterSpacing: '-0.04em',
            lineHeight: 0.88,
            fontWeight: 800,
            textTransform: 'uppercase',
            maxWidth: '1100px',
            color: '#FFFFFF',
          }}
        >
          SOMETIMES<br />INFORMATION<br />NEEDS<br />DEPTH.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body-large)',
            color: '#B7B8B0',
            maxWidth: '680px',
            lineHeight: 1.55,
            marginTop: '36px',
          }}
        >
          We use WebGL, WebXR, and Three.js selectively—never for hollow spectacle, but to communicate spatial relationships, architectural models, parametric assemblies, and cultural archives that cannot be flattened into 2D rectangles.
        </p>

        {/* 3D Capabilities Badges */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '40px' }}>
          {[
            '3D Product Configurators',
            'WebXR Spatial Staging',
            'Architectural Information Cities',
            'Interactive Photogrammetry',
            'Generative Shader Materials',
            'Sub-15ms Mobile 3D Pipelines',
          ].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '6px 14px',
                border: '1px solid var(--violet)',
                color: 'var(--violet)',
                backgroundColor: 'rgba(130, 108, 255, 0.08)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── CASE PORTALS: PRODUCT, PLACE, STORY ── */}
      <section style={{ padding: 'clamp(50px, 7vw, 100px) clamp(20px, 4vw, 64px)' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', borderBottom: '1px solid var(--night-line)', paddingBottom: '16px' }}>
          {(['PRODUCT', 'PLACE', 'STORY'] as const).map((portal) => (
            <button
              key={portal}
              onClick={() => setActivePortal(portal)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                padding: '8px 18px',
                background: activePortal === portal ? 'var(--violet)' : 'transparent',
                color: activePortal === portal ? '#FFF' : '#888',
                border: '1px solid',
                borderColor: activePortal === portal ? 'var(--violet)' : '#333',
                cursor: 'pointer',
              }}
            >
              PORTAL: {portal}
            </button>
          ))}
        </div>

        {/* Portal Interactive Canvas */}
        <div
          style={{
            border: '1px solid var(--night-line)',
            backgroundColor: '#161814',
            padding: '48px',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Simulated Lightweight Three.js Viewport */}
          <div
            style={{
              width: '100%',
              aspectRatio: '16/10',
              backgroundColor: '#0F110E',
              border: '1px solid #2D302B',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <svg viewBox="0 0 100 80" style={{ width: '100%', height: '100%' }}>
              {activePortal === 'PRODUCT' && (
                <g>
                  {/* Isometric robotic parametric frame */}
                  <polygon points="50,15 80,32 50,50 20,32" fill="none" stroke="var(--violet)" strokeWidth="1.2" />
                  <polygon points="20,32 50,50 50,72 20,54" fill="none" stroke="var(--violet)" strokeWidth="1.2" />
                  <polygon points="80,32 50,50 50,72 80,54" fill="none" stroke="var(--violet)" strokeWidth="1.2" />
                  <circle cx="50" cy="38" r="4" fill="var(--signal-orange)" />
                  <line x1="50" y1="38" x2="72" y2="25" stroke="var(--signal-orange)" strokeWidth="0.8" strokeDasharray="1.5,1.5" />
                  <text x="75" y="24" fontSize="2.8" fill="var(--signal-orange)" fontFamily="Fragment Mono">TOLERANCE ±0.05MM</text>
                </g>
              )}
              {activePortal === 'PLACE' && (
                <g>
                  {/* Isometric architectural room wireframe */}
                  <polygon points="15,20 85,20 85,65 15,65" fill="none" stroke="#444" strokeWidth="0.6" />
                  <line x1="15" y1="20" x2="35" y2="35" stroke="var(--violet)" strokeWidth="0.8" />
                  <line x1="85" y1="20" x2="65" y2="35" stroke="var(--violet)" strokeWidth="0.8" />
                  <line x1="15" y1="65" x2="35" y2="52" stroke="var(--violet)" strokeWidth="0.8" />
                  <line x1="85" y1="65" x2="65" y2="52" stroke="var(--violet)" strokeWidth="0.8" />
                  <rect x="35" y="35" width="30" height="17" fill="none" stroke="var(--violet)" strokeWidth="1" />
                  <text x="50" y="45" fontSize="2.5" textAnchor="middle" fill="#FFF" fontFamily="Fragment Mono">EXHIBIT GALLERY 02</text>
                </g>
              )}
              {activePortal === 'STORY' && (
                <g>
                  {/* Radial celestial / archival node constellation */}
                  <circle cx="50" cy="40" r="24" fill="none" stroke="#333" strokeWidth="0.5" strokeDasharray="2,2" />
                  <circle cx="50" cy="40" r="14" fill="none" stroke="var(--violet)" strokeWidth="0.8" />
                  <circle cx="50" cy="40" r="4" fill="#FFF" />
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                    const rad = (deg * Math.PI) / 180;
                    const x = 50 + Math.cos(rad) * 24;
                    const y = 40 + Math.sin(rad) * 24;
                    return (
                      <g key={i}>
                        <line x1="50" y1="40" x2={x} y2={y} stroke="var(--violet)" strokeWidth="0.4" />
                        <circle cx={x} cy={y} r="2" fill="var(--violet)" />
                      </g>
                    );
                  })}
                  <text x="50" y="70" fontSize="2.8" textAnchor="middle" fill="#AAA" fontFamily="Fragment Mono">CENTURIES EMBEDDING MAP</text>
                </g>
              )}
            </svg>
            <div style={{ position: 'absolute', bottom: '12px', right: '16px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#666' }}>
              THREE.JS SHADER CANVAS // 60FPS
            </div>
          </div>

          {/* Description */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--violet)', marginBottom: '12px' }}>
              IMMERSIVE DOMAIN // {activePortal}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', textTransform: 'uppercase', color: '#FFF', marginBottom: '16px' }}>
              {activePortal === 'PRODUCT' && 'PARAMETRIC 3D MECHANICAL CONFIGURATION'}
              {activePortal === 'PLACE' && 'VIRTUAL ARCHITECTURAL TWINS & WAYFINDING'}
              {activePortal === 'STORY' && 'SPATIAL NARRATIVE & CULTURAL CLUSTERING'}
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#AAA', lineHeight: 1.6, marginBottom: '24px' }}>
              {activePortal === 'PRODUCT' && 'Instant CAD BOM binding with sub-second parameter evaluation directly in modern browser contexts.'}
              {activePortal === 'PLACE' && 'Simulate lighting, crowd movement, and sightline ergonomics before physical construction.'}
              {activePortal === 'STORY' && 'Unfold thousands of artifacts through multi-dimensional vector embeddings without taxonomic friction.'}
            </p>
            <Link
              to="/work/forge"
              className="btn-secondary"
              style={{ color: '#FFF', borderColor: 'var(--violet)' }}
              onMouseEnter={() => setCursorMode('OPEN')}
              onMouseLeave={() => setCursorMode('DEFAULT')}
            >
              EXPLORE CASE STUDY →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
