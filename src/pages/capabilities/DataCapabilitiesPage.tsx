import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';

export const DataCapabilitiesPage: React.FC = () => {
  const { setCursorMode } = useAppState();
  const [activeVis, setActiveVis] = useState<'MAP' | 'NETWORK' | 'TIMELINE' | 'STATUS'>('NETWORK');

  return (
    <main
      id="main-content"
      style={{
        paddingTop: '64px',
        minHeight: '100vh',
        backgroundColor: 'var(--paper)',
        color: 'var(--ink)',
      }}
    >
      {/* ── HERO ── */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 130px) clamp(20px, 4vw, 64px) clamp(48px, 6vw, 90px)',
          borderBottom: '1px solid var(--line)',
        }}
        aria-label="Data: Data shouldn't look like data"
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--system-blue)',
            marginBottom: '28px',
            letterSpacing: '0.08em',
          }}
        >
          STATE_03.3 / DATA CARTOGRAPHY & VISIBLE LOGIC
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
          }}
        >
          DATA<br />SHOULDN'T<br />LOOK<br />LIKE<br />DATA.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body-large)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            lineHeight: 1.55,
            marginTop: '36px',
          }}
        >
          Raw numbers do not inform humans; relationships, boundaries, and change over time do. We reject decorative dashboards in favor of visualizations designed around an explicit question.
        </p>

        {/* Data Types Badges */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '40px' }}>
          {[
            'Question-First Visualizations',
            'Streaming WebSocket Telemetry',
            'Sub-100ms Topology Normalization',
            'Accessible Table Fallbacks',
            'D3 + Canvas Hybrid Pipelines',
          ].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '6px 14px',
                border: '1px solid var(--line)',
                color: 'var(--system-blue)',
                backgroundColor: 'var(--white)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── INTERACTIVE FUNCTIONAL EXAMPLES ── */}
      <section style={{ padding: 'clamp(50px, 7vw, 100px) clamp(20px, 4vw, 64px)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {(['NETWORK', 'MAP', 'TIMELINE', 'STATUS'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveVis(type)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '8px 18px',
                background: activeVis === type ? 'var(--system-blue)' : 'var(--white)',
                color: activeVis === type ? '#FFF' : 'var(--ink)',
                border: '1px solid',
                borderColor: activeVis === type ? 'var(--system-blue)' : 'var(--line)',
                cursor: 'pointer',
              }}
            >
              VISUAL DEMO: {type}
            </button>
          ))}
        </div>

        {/* Visualization Card with Question Header */}
        <div
          style={{
            border: '1px solid var(--line)',
            backgroundColor: 'var(--white)',
            padding: '40px',
          }}
        >
          {/* Explicit Question Requirement */}
          <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '20px', marginBottom: '32px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--system-blue)', marginBottom: '6px' }}>
              EXPLICIT OPERATIONAL QUESTION
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 40px)', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
              {activeVis === 'NETWORK' && 'WHERE ARE TELEMETRY BOTTLENECKS OCCURRING ACROSS SUBSTATIONS?'}
              {activeVis === 'MAP' && 'WHICH PUBLIC TRANSIT CORRIDORS ARE OVERBURDENED AT PEAK HOUR?'}
              {activeVis === 'TIMELINE' && 'HOW DID RENEWABLE GENERATION COMPENSATE DURING GRID SPIKES?'}
              {activeVis === 'STATUS' && 'ARE SENSORS IN DRIFT TOLERANCE ACCORDING TO SPEC?'}
            </h2>
          </div>

          {/* Visualization Container */}
          <div style={{ width: '100%', height: '360px', backgroundColor: 'var(--canvas)', border: '1px solid var(--line)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg viewBox="0 0 100 70" style={{ width: '100%', height: '100%' }}>
              {activeVis === 'NETWORK' && (
                <g>
                  {/* Continental energy network representation */}
                  <line x1="20" y1="35" x2="45" y2="20" stroke="var(--network-green)" strokeWidth="1.2" />
                  <line x1="45" y1="20" x2="80" y2="35" stroke="var(--network-green)" strokeWidth="1.2" />
                  <line x1="45" y1="20" x2="50" y2="55" stroke="var(--signal-orange)" strokeWidth="1.8" strokeDasharray="2,2" />
                  <line x1="20" y1="35" x2="50" y2="55" stroke="var(--network-green)" strokeWidth="0.8" />
                  <circle cx="20" cy="35" r="4" fill="var(--white)" stroke="var(--network-green)" strokeWidth="1.5" />
                  <circle cx="45" cy="20" r="5" fill="var(--white)" stroke="var(--network-green)" strokeWidth="1.5" />
                  <circle cx="80" cy="35" r="4" fill="var(--white)" stroke="var(--network-green)" strokeWidth="1.5" />
                  <circle cx="50" cy="55" r="6" fill="var(--signal-orange)" />
                  <text x="50" y="56" fontSize="2.5" textAnchor="middle" fill="#FFF" fontFamily="Fragment Mono">! STRAIN</text>
                  <text x="50" y="66" fontSize="2.8" textAnchor="middle" fill="var(--signal-orange)" fontFamily="Fragment Mono">SUBSTATION B // 94% CAPACITY</text>
                </g>
              )}
              {activeVis === 'MAP' && (
                <g>
                  {/* Transit line segments */}
                  <path d="M 10 50 Q 30 20 60 30 T 90 20" fill="none" stroke="var(--system-blue)" strokeWidth="2.5" />
                  <path d="M 10 50 Q 40 60 70 40 T 90 60" fill="none" stroke="#AAA" strokeWidth="1" />
                  <circle cx="60" cy="30" r="4.5" fill="var(--system-blue)" />
                  <text x="60" y="22" fontSize="2.8" textAnchor="middle" fill="var(--system-blue)" fontFamily="Fragment Mono">CENTRAL HUB // HIGH LOAD</text>
                </g>
              )}
              {activeVis === 'TIMELINE' && (
                <g>
                  {/* Renewable bars comparison */}
                  <line x1="10" y1="60" x2="90" y2="60" stroke="var(--line)" strokeWidth="0.8" />
                  {[20, 35, 50, 65, 80].map((x, i) => (
                    <g key={x}>
                      <rect x={x - 4} y={60 - [18, 28, 42, 36, 48][i]} width="8" height={[18, 28, 42, 36, 48][i]} fill="var(--network-green)" />
                      <text x={x} y="65" fontSize="2.5" textAnchor="middle" fill="#666" fontFamily="Fragment Mono">0{i + 1}:00</text>
                    </g>
                  ))}
                  <text x="50" y="10" fontSize="2.8" textAnchor="middle" fill="var(--network-green)" fontFamily="Fragment Mono">+42% WIND INJECTION</text>
                </g>
              )}
              {activeVis === 'STATUS' && (
                <g>
                  {/* Sensor drift gauge */}
                  <circle cx="50" cy="35" r="22" fill="none" stroke="var(--line)" strokeWidth="3" />
                  <circle cx="50" cy="35" r="22" fill="none" stroke="var(--system-blue)" strokeWidth="3" strokeDasharray="100 138" />
                  <text x="50" y="34" fontSize="6" textAnchor="middle" fill="var(--ink)" fontFamily="Afacad Flux" fontWeight="bold">99.8%</text>
                  <text x="50" y="42" fontSize="2.5" textAnchor="middle" fill="var(--system-blue)" fontFamily="Fragment Mono">DRIFT METRIC OK</text>
                </g>
              )}
            </svg>
          </div>
        </div>
      </section>

      {/* Case Study Link */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 54px)', textTransform: 'uppercase' }}>
            EXPLORE CURRENT GRID
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            European continental energy infrastructure telemetry case study.
          </p>
        </div>
        <Link
          to="/work/current-grid"
          className="btn-primary"
          onMouseEnter={() => setCursorMode('OPEN')}
          onMouseLeave={() => setCursorMode('DEFAULT')}
        >
          VIEW CASE STUDY →
        </Link>
      </section>
    </main>
  );
};
