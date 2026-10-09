import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { CAPABILITIES, MATRIX_CELLS, CAPABILITY_ROWS, CAPABILITY_COLUMNS } from '../../data/capabilities';

export const CapabilitiesPage: React.FC = () => {
  const { setCursorMode } = useAppState();
  const [expandedCapability, setExpandedCapability] = useState<number | null>(null);
  const [hoveredCell, setHoveredCell] = useState<[number, number] | null>(null);

  return (
    <main id="main-content" style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: 'var(--canvas)' }}>
      {/* Hero */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--signal-orange)', marginBottom: '24px', letterSpacing: '0.06em' }}>
          STATE_03 / CAPABILITIES MATRIX
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-hero)', letterSpacing: '-0.04em', lineHeight: 0.88, fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', maxWidth: '800px' }}>
          FROM<br />QUESTION<br />TO<br />SYSTEM.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body-large)', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.5, marginTop: '32px' }}>
          Eight integrated capabilities that span discovery through deployment — not sequential departments, but one continuous conversation.
        </p>
      </section>

      {/* ── CAPABILITY MODULES ── */}
      <section style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ padding: '0 clamp(20px, 4vw, 64px)', paddingTop: '60px', marginBottom: '20px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
            CLICK TO EXPAND MODULE
          </div>
        </div>

        {CAPABILITIES.map((cap, i) => {
          const isExpanded = expandedCapability === i;
          return (
            <div
              key={cap.slug}
              style={{
                borderTop: '1px solid var(--line)',
              }}
            >
              {/* Module Header — always visible */}
              <button
                onClick={() => setExpandedCapability(isExpanded ? null : i)}
                onMouseEnter={() => setCursorMode('EXPAND')}
                onMouseLeave={() => setCursorMode('DEFAULT')}
                aria-expanded={isExpanded}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  alignItems: 'center',
                  width: '100%',
                  gap: '24px',
                  padding: 'clamp(20px, 2.5vw, 32px) clamp(20px, 4vw, 64px)',
                  background: isExpanded ? 'var(--paper)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.3s',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--signal-orange)', letterSpacing: '0.05em' }}>
                  {cap.number}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3.5vw, 48px)', letterSpacing: '-0.025em', fontWeight: 600, color: 'var(--ink)', lineHeight: 1, textTransform: 'uppercase' }}>
                  {cap.title}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)', transform: isExpanded ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
                  +
                </div>
              </button>

              {/* Expanded Module Content */}
              {isExpanded && (
                <div style={{ padding: '0 clamp(20px, 4vw, 64px) 48px clamp(20px, 4vw, 64px)', backgroundColor: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px', paddingTop: '40px' }}>
                    {/* Summary */}
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--signal-orange)', marginBottom: '12px', letterSpacing: '0.05em' }}>
                        OVERVIEW
                      </div>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {cap.summary}
                      </p>

                      <div style={{ marginTop: '24px' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--signal-orange)', marginBottom: '12px', letterSpacing: '0.05em' }}>
                          TECHNOLOGIES
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {cap.technologies.map((tech) => (
                            <span key={tech} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '4px 8px', backgroundColor: 'var(--canvas)', border: '1px solid var(--line)', color: 'var(--text-secondary)' }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--signal-orange)', marginBottom: '12px', letterSpacing: '0.05em' }}>
                        DELIVERABLES
                      </div>
                      {cap.deliverables.map((d, j) => (
                        <div key={j} style={{ display: 'flex', gap: '12px', padding: '8px 0', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-secondary)' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--signal-orange)', minWidth: '20px' }}>{(j + 1).toString().padStart(2, '0')}</span>
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Related Case Studies */}
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--signal-orange)', marginBottom: '12px', letterSpacing: '0.05em' }}>
                        RELATED WORK
                      </div>
                      {cap.caseStudySlugs.map((slug) => (
                        <Link
                          key={slug}
                          to={`/work/${slug}`}
                          onMouseEnter={() => setCursorMode('OPEN')}
                          onMouseLeave={() => setCursorMode('DEFAULT')}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '10px 0',
                            borderBottom: '1px solid var(--line)',
                            fontFamily: 'var(--font-display)',
                            fontSize: '18px',
                            letterSpacing: '-0.02em',
                            fontWeight: 600,
                            textDecoration: 'none',
                            color: 'var(--ink)',
                            textTransform: 'uppercase',
                            transition: 'color 0.2s',
                          }}
                          onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--signal-orange)'; }}
                          onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}
                        >
                          {slug.replace(/-/g, ' ')}
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--signal-orange)' }}>↗</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* ── FULL CAPABILITY MATRIX TABLE ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)', borderBottom: '1px solid var(--line)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', letterSpacing: '-0.03em', lineHeight: 0.92, fontWeight: 700, textTransform: 'uppercase', marginBottom: '48px' }}>
          THE FULL<br />MATRIX.
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', fontWeight: 400, borderBottom: '2px solid var(--line)' }}>
                  CAPABILITY / PHASE
                </th>
                {CAPABILITY_COLUMNS.map((col) => (
                  <th key={col} style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--signal-orange)', fontWeight: 600, borderBottom: '2px solid var(--line)', borderLeft: '1px solid var(--line)', letterSpacing: '0.04em' }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CAPABILITY_ROWS.map((row, ri) => (
                <tr key={row}>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, borderBottom: '1px solid var(--line)', color: 'var(--ink)', letterSpacing: '0.03em' }}>
                    {row}
                  </td>
                  {CAPABILITY_COLUMNS.map((col, ci) => {
                    const isHovered = hoveredCell?.[0] === ri && hoveredCell?.[1] === ci;
                    const cellText = MATRIX_CELLS[row]?.[col] || '—';
                    return (
                      <td
                        key={col}
                        onMouseEnter={() => setHoveredCell([ri, ci])}
                        onMouseLeave={() => setHoveredCell(null)}
                        style={{
                          padding: '14px 16px',
                          borderBottom: '1px solid var(--line)',
                          borderLeft: '1px solid var(--line)',
                          backgroundColor: isHovered ? 'var(--signal-orange)' : 'transparent',
                          transition: 'background-color 0.2s',
                          verticalAlign: 'top',
                          cursor: 'default',
                        }}
                        role="gridcell"
                        title={cellText}
                      >
                        {isHovered ? (
                          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#fff', lineHeight: 1.4, minWidth: '160px' }}>
                            {cellText}
                          </div>
                        ) : (
                          <div style={{ width: '8px', height: '8px', backgroundColor: `hsl(${ri * 45 + ci * 20}, 55%, 62%)`, borderRadius: '50%', opacity: 0.55, margin: '0 auto' }} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', letterSpacing: '-0.03em', fontWeight: 700, textTransform: 'uppercase', marginBottom: '24px' }}>
          READY TO MAP<br />YOUR PROBLEM?
        </h2>
        <Link
          to="/start"
          className="btn-primary"
          onMouseEnter={() => setCursorMode('BEGIN')}
          onMouseLeave={() => setCursorMode('DEFAULT')}
        >
          START A PROJECT ↗
        </Link>
      </section>
    </main>
  );
};
