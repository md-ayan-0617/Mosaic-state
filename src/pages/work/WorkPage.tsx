import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { PROJECTS } from '../../data/projects';
import type { ProjectCategory } from '../../types';

type ViewMode = 'INDEX' | 'GRID' | 'SYSTEM' | 'MAP';

const ALL_CATEGORIES: ProjectCategory[] = [
  'WEBSITES', 'PLATFORMS', 'MAPS', 'IMMERSIVE', 'EXHIBITS', 'DATA', 'AI', 'COMMERCE',
];

export const WorkPage = () => {
  const { setCursorMode } = useAppState();
  const [viewMode, setViewMode] = useState<ViewMode>('INDEX');
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const filtered = activeFilter
    ? PROJECTS.filter((p) => p.categories.includes(activeFilter))
    : PROJECTS;

  return (
    <main id="main-content" style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: 'var(--paper)' }}>
      {/* Header */}
      <section
        style={{
          padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 64px) clamp(24px, 3vw, 48px)',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '32px',
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '16px', letterSpacing: '0.05em' }}>
            STATE_02 / WORK ARCHIVE
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', letterSpacing: '-0.035em', lineHeight: 0.92, fontWeight: 700, textTransform: 'uppercase' }}>
            WORK
          </h1>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px' }}>
            001—00{PROJECTS.length}
          </div>
        </div>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginRight: '8px' }}>VIEW</span>
          {(['SYSTEM', 'GRID', 'INDEX', 'MAP'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                padding: '6px 12px',
                border: '1px solid',
                borderColor: viewMode === mode ? 'var(--system-blue)' : 'var(--line)',
                backgroundColor: viewMode === mode ? 'var(--system-blue)' : 'transparent',
                color: viewMode === mode ? '#fff' : 'var(--text-muted)',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.2s',
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </section>

      {/* Filter Bar */}
      <div
        style={{
          padding: '16px clamp(20px, 4vw, 64px)',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>FILTER</span>
        <button
          onClick={() => setActiveFilter(null)}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            padding: '4px 10px',
            border: '1px solid',
            borderColor: activeFilter === null ? 'var(--ink)' : 'var(--line)',
            backgroundColor: activeFilter === null ? 'var(--ink)' : 'transparent',
            color: activeFilter === null ? '#fff' : 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          ALL
        </button>
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              padding: '4px 10px',
              border: '1px solid',
              borderColor: activeFilter === cat ? 'var(--system-blue)' : 'var(--line)',
              backgroundColor: activeFilter === cat ? 'var(--system-blue)' : 'transparent',
              color: activeFilter === cat ? '#fff' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
          {filtered.length} PROJECT{filtered.length !== 1 ? 'S' : ''}
        </span>
      </div>

      {/* ─── INDEX VIEW ─── */}
      {viewMode === 'INDEX' && (
        <div>
          {filtered.map((project) => (
            <Link
              key={project.slug}
              to={`/work/${project.slug}`}
              onMouseEnter={() => { setHoveredSlug(project.slug); setCursorMode('OPEN'); }}
              onMouseLeave={() => { setHoveredSlug(null); setCursorMode('DEFAULT'); }}
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '56px 1fr auto 120px 80px',
                  gap: '24px',
                  alignItems: 'center',
                  padding: '20px clamp(20px, 4vw, 64px)',
                  borderBottom: '1px solid var(--line)',
                  backgroundColor: hoveredSlug === project.slug ? 'var(--canvas)' : 'transparent',
                  transition: 'background-color 0.2s',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: project.accentColor }}>
                  {project.number}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.5vw, 32px)', letterSpacing: '-0.02em', fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>
                    {project.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>
                    {project.descriptor}
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: project.accentColor, padding: '3px 8px', border: `1px solid ${project.accentColor}30`, whiteSpace: 'nowrap' }}>
                  {project.sector.toUpperCase().split(' ')[0]}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                  {project.type.toUpperCase()}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', textAlign: 'right' }}>
                  {project.year}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ─── GRID VIEW ─── */}
      {viewMode === 'GRID' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1px',
            backgroundColor: 'var(--line)',
            padding: '1px',
          }}
        >
          {filtered.map((project) => (
            <Link
              key={project.slug}
              to={`/work/${project.slug}`}
              onMouseEnter={() => { setHoveredSlug(project.slug); setCursorMode('OPEN'); }}
              onMouseLeave={() => { setHoveredSlug(null); setCursorMode('DEFAULT'); }}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div
                style={{
                  backgroundColor: 'var(--paper)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', position: 'relative', backgroundColor: 'var(--mist)' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: hoveredSlug === project.slug ? 'scale(1.03)' : 'scale(1)',
                      transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: project.accentColor, opacity: hoveredSlug === project.slug ? 0.15 : 0, transition: 'opacity 0.3s' }} />
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: project.accentColor }}>{project.number}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>{project.year}</span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.025em', fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>
                    {project.title}
                  </h2>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.4 }}>
                    {project.descriptor}
                  </p>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
                    {project.categories.slice(0, 2).map((cat) => (
                      <span key={cat} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', padding: '2px 7px', border: `1px solid ${project.accentColor}40`, color: project.accentColor }}>
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ─── SYSTEM NETWORK VIEW ─── */}
      {viewMode === 'SYSTEM' && (
        <div style={{ padding: '40px clamp(20px, 4vw, 64px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '24px' }}>
            PROJECT NETWORK / HOVER NODES TO PREVIEW / CLICK TO OPEN
          </div>
          <div style={{ position: 'relative', width: '100%', minHeight: '600px', border: '1px solid var(--line)' }}>
            <svg
              viewBox="0 0 100 70"
              style={{ width: '100%', height: '600px' }}
              aria-label="Project network graph"
            >
              {/* Draw connections */}
              {filtered.flatMap((proj) =>
                proj.connectionIds
                  .filter((cid) => filtered.find((p) => p.id === cid))
                  .map((cid) => {
                    const target = filtered.find((p) => p.id === cid);
                    if (!target) return null;
                    const fromIdx = filtered.indexOf(proj);
                    const toIdx = filtered.indexOf(target);
                    const fromX = 15 + (fromIdx % 4) * 22;
                    const fromY = 15 + Math.floor(fromIdx / 4) * 22;
                    const toX = 15 + (toIdx % 4) * 22;
                    const toY = 15 + Math.floor(toIdx / 4) * 22;
                    return (
                      <line
                        key={`${proj.id}-${cid}`}
                        x1={fromX}
                        y1={fromY}
                        x2={toX}
                        y2={toY}
                        stroke={hoveredSlug === proj.slug || hoveredSlug === target.slug ? proj.accentColor : '#C7C7BF'}
                        strokeWidth="0.5"
                        opacity={hoveredSlug && hoveredSlug !== proj.slug && hoveredSlug !== target.slug ? 0.2 : 1}
                        style={{ transition: 'all 0.2s' }}
                      />
                    );
                  })
              )}

              {/* Project Nodes */}
              {filtered.map((project, i) => {
                const x = 15 + (i % 4) * 22;
                const y = 15 + Math.floor(i / 4) * 22;
                const isHovered = hoveredSlug === project.slug;

                return (
                  <Link key={project.slug} to={`/work/${project.slug}`} style={{ textDecoration: 'none' }}>
                    <g
                      onMouseEnter={() => { setHoveredSlug(project.slug); setCursorMode('OPEN'); }}
                      onMouseLeave={() => { setHoveredSlug(null); setCursorMode('DEFAULT'); }}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? 6 : 4}
                        fill={isHovered ? project.accentColor : 'var(--paper)'}
                        stroke={project.accentColor}
                        strokeWidth="1"
                        style={{ transition: 'all 0.2s' }}
                      />
                      <text x={x} y={y + 2} textAnchor="middle" fontFamily="Fragment Mono, monospace" fontSize="2.5" fill={isHovered ? '#fff' : 'var(--ink)'}>
                        {project.number}
                      </text>
                      <text x={x} y={y + 9} textAnchor="middle" fontFamily="Fragment Mono, monospace" fontSize="2.8" fill={isHovered ? project.accentColor : 'var(--text-muted)'}>
                        {project.title}
                      </text>
                      {isHovered && (
                        <text x={x} y={y + 14} textAnchor="middle" fontFamily="Schibsted Grotesk, sans-serif" fontSize="2.2" fill="var(--text-muted)">
                          {project.sector}
                        </text>
                      )}
                    </g>
                  </Link>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* ─── MAP/SCATTER VIEW ─── */}
      {viewMode === 'MAP' && (
        <div style={{ padding: '40px clamp(20px, 4vw, 64px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            PROJECT MAP / PHYSICAL ←→ DIGITAL (X AXIS) / STORY ←→ UTILITY (Y AXIS)
          </div>
          <div style={{ position: 'relative', width: '100%', border: '1px solid var(--line)', backgroundColor: 'var(--canvas)' }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '560px' }} aria-label="Project conceptual scatter map">
              {/* Axes */}
              <line x1="50" y1="5" x2="50" y2="95" stroke="var(--line)" strokeWidth="0.5" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="var(--line)" strokeWidth="0.5" />

              {/* Axis Labels */}
              <text x="6" y="52" fontFamily="Fragment Mono, monospace" fontSize="3.5" fill="var(--text-muted)">← PHYSICAL</text>
              <text x="75" y="52" fontFamily="Fragment Mono, monospace" fontSize="3.5" fill="var(--text-muted)">DIGITAL →</text>
              <text x="52" y="9" fontFamily="Fragment Mono, monospace" fontSize="3.5" fill="var(--text-muted)">STORY ↑</text>
              <text x="52" y="93" fontFamily="Fragment Mono, monospace" fontSize="3.5" fill="var(--text-muted)">↓ UTILITY</text>

              {/* Background quadrant shading */}
              {[
                { x: 5, y: 5, label: 'NARRATIVE PHYSICAL' },
                { x: 55, y: 5, label: 'NARRATIVE DIGITAL' },
                { x: 5, y: 55, label: 'UTILITY PHYSICAL' },
                { x: 55, y: 55, label: 'UTILITY DIGITAL' },
              ].map((q) => (
                <text key={q.label} x={q.x} y={q.y + 8} fontFamily="Fragment Mono, monospace" fontSize="2.2" fill="var(--mist)" opacity={0.8}>
                  {q.label}
                </text>
              ))}

              {/* Project nodes plotted by coordinates */}
              {filtered.map((project) => {
                const x = 50 + project.coordinates.x * 42;
                const y = 50 - project.coordinates.y * 42;
                const isHovered = hoveredSlug === project.slug;
                return (
                  <Link key={project.slug} to={`/work/${project.slug}`}>
                    <g
                      onMouseEnter={() => { setHoveredSlug(project.slug); setCursorMode('OPEN'); }}
                      onMouseLeave={() => { setHoveredSlug(null); setCursorMode('DEFAULT'); }}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? 5 : 3}
                        fill={project.accentColor}
                        opacity={isHovered ? 1 : 0.65}
                        style={{ transition: 'r 0.2s, opacity 0.2s' }}
                      />
                      <text
                        x={x}
                        y={y + (isHovered ? 9 : 7)}
                        textAnchor="middle"
                        fontFamily="Fragment Mono, monospace"
                        fontSize="2.8"
                        fill={isHovered ? project.accentColor : 'var(--text-muted)'}
                        style={{ transition: 'fill 0.2s' }}
                      >
                        {project.title}
                      </text>
                    </g>
                  </Link>
                );
              })}
            </svg>
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px' }}>
            A conceptual browsing method — not a measurement, but a way to explore relationships between projects.
          </div>
        </div>
      )}
    </main>
  );
};
