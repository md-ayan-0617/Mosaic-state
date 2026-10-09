import React, { useState } from 'react';
import { useAppState } from '../../context/StateContext';

interface Experiment {
  id: string;
  number: string;
  title: string;
  category: string;
  accent: string;
  description: string;
  renderInteractive: () => React.ReactNode;
}

export const PlaygroundPage: React.FC = () => {
  const { setCursorMode } = useAppState();
  const [activeExp, setActiveExp] = useState<string>('01');

  // Interactive Prototype States
  const [nodeCount, setNodeCount] = useState<number>(8);
  const [menuAngle, setMenuAngle] = useState<number>(0);
  const [timelineEra, setTimelineEra] = useState<number>(2026);
  const [morphStep, setMorphStep] = useState<number>(0);
  const [bezierTension, setBezierTension] = useState<number>(60);
  const [arLocked, setArLocked] = useState<boolean>(true);
  const [terrainElevation, setTerrainElevation] = useState<number>(45);

  const EXPERIMENTS: Experiment[] = [
    {
      id: '01',
      number: '01',
      title: 'NODE MAP CLUSTERING',
      category: 'GRAPH THEORY / D3',
      accent: 'var(--system-blue)',
      description: 'Stress-testing client-side force equilibrium with dynamic node generation and collision hulls in real time.',
      renderInteractive: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--system-blue)' }}>
              DYNAMIC NODES: {nodeCount}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setNodeCount((c) => Math.max(3, c - 1))}
                style={{ background: '#222', color: '#fff', border: '1px solid #444', padding: '4px 10px', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
              >
                - REMOVE
              </button>
              <button
                onClick={() => setNodeCount((c) => Math.min(16, c + 1))}
                style={{ background: 'var(--system-blue)', color: '#fff', border: 'none', padding: '4px 10px', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
              >
                + ADD NODE
              </button>
            </div>
          </div>
          <svg viewBox="0 0 100 80" style={{ width: '100%', height: '320px', backgroundColor: '#181916', border: '1px solid #2D302B' }}>
            {Array.from({ length: nodeCount }).map((_, i) => {
              const a = (i / nodeCount) * Math.PI * 2;
              const r = 24 + Math.sin(i * 1.5) * 8;
              const x = 50 + Math.cos(a) * r;
              const y = 40 + Math.sin(a) * r;
              return (
                <g key={i}>
                  <line x1="50" y1="40" x2={x} y2={y} stroke="var(--system-blue)" strokeWidth="0.6" strokeDasharray="1.5,1.5" />
                  <circle cx={x} cy={y} r="3" fill="#111310" stroke="var(--system-blue)" strokeWidth="1" />
                  <text x={x} y={y + 1.2} fontSize="2.2" textAnchor="middle" fill="#fff" fontFamily="Fragment Mono">
                    N_{i + 1}
                  </text>
                </g>
              );
            })}
            <circle cx="50" cy="40" r="4.5" fill="var(--system-blue)" />
            <text x="50" y="41.2" fontSize="2.5" textAnchor="middle" fill="#fff" fontFamily="Fragment Mono" fontWeight="bold">
              ORIGIN
            </text>
          </svg>
        </div>
      ),
    },
    {
      id: '02',
      number: '02',
      title: 'SPATIAL RADIAL MENU',
      category: 'INTERACTION / GSAP',
      accent: 'var(--signal-orange)',
      description: 'Thumb-friendly rotational wheel menu providing instant radial muscle memory without linear dropdown friction.',
      renderInteractive: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--signal-orange)' }}>
              ROTATION ANGLE: {menuAngle}°
            </span>
            <input
              type="range"
              min="0"
              max="360"
              value={menuAngle}
              onChange={(e) => setMenuAngle(Number(e.target.value))}
              style={{ width: '140px', accentColor: 'var(--signal-orange)' }}
            />
          </div>
          <svg viewBox="0 0 100 80" style={{ width: '100%', height: '320px', backgroundColor: '#181916', border: '1px solid #2D302B' }}>
            <circle cx="50" cy="40" r="28" fill="none" stroke="#333" strokeWidth="0.5" strokeDasharray="2,2" />
            {['WORK', 'SYSTEMS', 'EXHIBITS', 'INSIGHTS', 'LAB', 'CONTACT'].map((item, i) => {
              const a = ((i * 60 + menuAngle) * Math.PI) / 180;
              const x = 50 + Math.cos(a) * 28;
              const y = 40 + Math.sin(a) * 28;
              return (
                <g key={item} style={{ cursor: 'pointer' }} onClick={() => setMenuAngle((prev) => (prev + 60) % 360)}>
                  <circle cx={x} cy={y} r="5" fill="#222" stroke="var(--signal-orange)" strokeWidth="1" />
                  <text x={x} y={y + 1} textAnchor="middle" fontSize="2.4" fill="#fff" fontFamily="Fragment Mono">
                    {item}
                  </text>
                </g>
              );
            })}
            <circle cx="50" cy="40" r="7" fill="var(--signal-orange)" />
            <text x="50" y="41" textAnchor="middle" fontSize="2.8" fill="#111" fontFamily="Fragment Mono" fontWeight="bold">
              ROTATE
            </text>
          </svg>
        </div>
      ),
    },
    {
      id: '03',
      number: '03',
      title: '3D SPATIAL TIMELINE',
      category: 'CHRONOLOGY / THREE-D',
      accent: 'var(--network-green)',
      description: 'Stratified chronological layers rendering historical architectural modifications without flattening time into a 1D tape.',
      renderInteractive: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--network-green)' }}>
              ACTIVE STRATUM: {timelineEra}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1920, 1975, 2005, 2026].map((year) => (
                <button
                  key={year}
                  onClick={() => setTimelineEra(year)}
                  style={{
                    background: timelineEra === year ? 'var(--network-green)' : '#222',
                    color: timelineEra === year ? '#111' : '#fff',
                    border: '1px solid #444',
                    padding: '4px 8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    cursor: 'pointer',
                  }}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 100 80" style={{ width: '100%', height: '320px', backgroundColor: '#181916', border: '1px solid #2D302B' }}>
            {[1920, 1975, 2005, 2026].map((yr, idx) => {
              const yOffset = 18 + idx * 14;
              const isSelected = timelineEra === yr;
              return (
                <g key={yr}>
                  <polygon
                    points={`20,${yOffset + 6} 75,${yOffset} 85,${yOffset + 8} 30,${yOffset + 14}`}
                    fill={isSelected ? 'rgba(79, 206, 131, 0.25)' : 'rgba(255,255,255,0.03)'}
                    stroke={isSelected ? 'var(--network-green)' : '#444'}
                    strokeWidth={isSelected ? '1' : '0.4'}
                  />
                  <text x="14" y={yOffset + 10} fontSize="2.8" fill={isSelected ? 'var(--network-green)' : '#888'} fontFamily="Fragment Mono">
                    ERA_{yr}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      ),
    },
    {
      id: '04',
      number: '04',
      title: 'CARTOGRAPHIC MORPH',
      category: 'CARTOGRAPHY / VECTOR',
      accent: 'var(--map-yellow)',
      description: 'Continuous parametric shape tweening transitioning between transit schematic geometry and true topographic geographic coordinates.',
      renderInteractive: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--map-yellow)' }}>
              MORPH BLEND: {morphStep === 0 ? 'SCHEMATIC (OCTOLINEAR)' : 'GEOGRAPHIC (TERRAIN)'}
            </span>
            <button
              onClick={() => setMorphStep((s) => (s === 0 ? 1 : 0))}
              style={{ background: 'var(--map-yellow)', color: '#111', border: 'none', padding: '6px 14px', fontFamily: 'var(--font-mono)', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              TOGGLE PROJECTION
            </button>
          </div>
          <svg viewBox="0 0 100 80" style={{ width: '100%', height: '320px', backgroundColor: '#181916', border: '1px solid #2D302B' }}>
            <path
              d={
                morphStep === 0
                  ? 'M 15 60 L 35 60 L 55 30 L 85 30'
                  : 'M 15 62 Q 28 48 42 55 T 68 28 T 85 32'
              }
              fill="none"
              stroke="var(--map-yellow)"
              strokeWidth="2"
              style={{ transition: 'd 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
            {['STATION A', 'JUNCTION B', 'STATION C', 'TERMINUS D'].map((st, i) => {
              const cx = morphStep === 0 ? [15, 35, 55, 85][i] : [15, 32, 60, 85][i];
              const cy = morphStep === 0 ? [60, 60, 30, 30][i] : [62, 52, 36, 32][i];
              return (
                <g key={st}>
                  <circle cx={cx} cy={cy} r="3" fill="#111" stroke="#FFF" strokeWidth="1" style={{ transition: 'all 0.6s' }} />
                  <text x={cx} y={cy - 5} fontSize="2.4" textAnchor="middle" fill="#DDD" fontFamily="Fragment Mono">
                    {st}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      ),
    },
    {
      id: '05',
      number: '05',
      title: 'MOTION BEZIER VISUALIZER',
      category: 'MATHEMATICS / PHYSICS',
      accent: 'var(--violet)',
      description: 'Real-time quadratic velocity curves driving state transitions across MOSAIC/STATE systems.',
      renderInteractive: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--violet)' }}>
              TENSION DAMPING: {bezierTension}
            </span>
            <input
              type="range"
              min="20"
              max="100"
              value={bezierTension}
              onChange={(e) => setBezierTension(Number(e.target.value))}
              style={{ width: '140px', accentColor: 'var(--violet)' }}
            />
          </div>
          <svg viewBox="0 0 100 80" style={{ width: '100%', height: '320px', backgroundColor: '#181916', border: '1px solid #2D302B' }}>
            <line x1="10" y1="70" x2="90" y2="70" stroke="#444" strokeWidth="0.5" />
            <line x1="10" y1="70" x2="10" y2="10" stroke="#444" strokeWidth="0.5" />
            <path
              d={`M 10 70 C ${10 + bezierTension * 0.4} ${70 - bezierTension * 0.6}, ${90 - bezierTension * 0.2} 15, 90 15`}
              fill="none"
              stroke="var(--violet)"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="70" r="2.5" fill="#FFF" />
            <circle cx="90" cy="15" r="2.5" fill="var(--violet)" />
            <text x="50" y="76" fontSize="2.4" textAnchor="middle" fill="#888" fontFamily="Fragment Mono">
              TIME (MILLISECONDS)
            </text>
          </svg>
        </div>
      ),
    },
    {
      id: '06',
      number: '06',
      title: 'AR SPATIAL TARGET LOCK',
      category: 'XR / VISION',
      accent: 'var(--signal-orange)',
      description: 'Optical bounding box tracking simulation tracking objects across mobile camera viewports with sub-pixel pinning.',
      renderInteractive: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--signal-orange)' }}>
              TRACKING STATE: {arLocked ? 'TARGET ACQUIRED' : 'SCANNING...'}
            </span>
            <button
              onClick={() => setArLocked((l) => !l)}
              style={{ background: '#222', color: '#fff', border: '1px solid var(--signal-orange)', padding: '4px 10px', fontFamily: 'var(--font-mono)', cursor: 'pointer' }}
            >
              TOGGLE BEACON
            </button>
          </div>
          <div style={{ width: '100%', height: '320px', backgroundColor: '#181916', border: '1px solid #2D302B', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                width: arLocked ? '160px' : '220px',
                height: arLocked ? '120px' : '180px',
                border: `2px dashed ${arLocked ? 'var(--signal-orange)' : '#666'}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '8px',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--signal-orange)' }}>+ CORNER_TL</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--signal-orange)' }}>CORNER_TR +</span>
              </div>
              <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#FFF' }}>
                {arLocked ? 'ARTIFACT_402 // CONFIDENCE 99.4%' : 'SEEKING FIDUCIAL MARKER'}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--signal-orange)' }}>+ CORNER_BL</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--signal-orange)' }}>CORNER_BR +</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '07',
      number: '07',
      title: 'DATA TERRAIN CONTOURS',
      category: 'DATA VIS / SHADERS',
      accent: 'var(--network-green)',
      description: 'Generative topological altitude mesh calculating real-time solar relief and contour intervals based on dynamic data vectors.',
      renderInteractive: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--network-green)' }}>
              CONTOUR ELEVATION PEAK: {terrainElevation}M
            </span>
            <input
              type="range"
              min="10"
              max="90"
              value={terrainElevation}
              onChange={(e) => setTerrainElevation(Number(e.target.value))}
              style={{ width: '140px', accentColor: 'var(--network-green)' }}
            />
          </div>
          <svg viewBox="0 0 100 80" style={{ width: '100%', height: '320px', backgroundColor: '#181916', border: '1px solid #2D302B' }}>
            {[10, 25, 45, 65, 85].map((lvl, idx) => {
              const rx = 35 - idx * 5;
              const ry = 22 - idx * 3.5;
              const cy = 40 - (idx * terrainElevation) / 10;
              return (
                <ellipse
                  key={lvl}
                  cx="50"
                  cy={cy}
                  rx={Math.max(5, rx)}
                  ry={Math.max(3, ry)}
                  fill="none"
                  stroke="var(--network-green)"
                  strokeWidth="0.8"
                  opacity={0.4 + idx * 0.15}
                />
              );
            })}
            <text x="50" y={40 - (4 * terrainElevation) / 10 - 5} fontSize="2.5" textAnchor="middle" fill="#FFF" fontFamily="Fragment Mono">
              ▲ SUMMIT {terrainElevation * 24}M
            </text>
          </svg>
        </div>
      ),
    },
    {
      id: '08',
      number: '08',
      title: 'TEXT RELATION GRAPH',
      category: 'SEMANTICS / EDITORIAL',
      accent: 'var(--system-blue)',
      description: 'Interactive semantic graph mapping word vectors across narrative editorial chapters.',
      renderInteractive: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--system-blue)' }}>
            HOVER TO HIGHLIGHT SEMANTIC CLUSTERS
          </div>
          <div style={{ padding: '24px', backgroundColor: '#181916', border: '1px solid #2D302B', minHeight: '320px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            {[
              { word: 'COMPLEXITY', group: 'sys' },
              { word: 'SYSTEM', group: 'sys' },
              { word: 'WONDER', group: 'hum' },
              { word: 'HUMAN', group: 'hum' },
              { word: 'CARTOGRAPHY', group: 'map' },
              { word: 'TERRAIN', group: 'map' },
              { word: 'TOPOLOGY', group: 'map' },
              { word: 'TELEMETRY', group: 'sys' },
              { word: 'ACCESSIBILITY', group: 'hum' },
              { word: 'RELATIONSHIP', group: 'sys' },
            ].map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: item.group === 'sys' ? 'var(--font-mono)' : item.group === 'hum' ? 'var(--font-serif)' : 'var(--font-display)',
                  fontSize: 'clamp(14px, 2vw, 22px)',
                  padding: '6px 12px',
                  border: '1px solid #333',
                  color: item.group === 'sys' ? 'var(--system-blue)' : item.group === 'hum' ? '#FFF' : 'var(--network-green)',
                  backgroundColor: '#111',
                  cursor: 'pointer',
                }}
              >
                {item.word}
              </span>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const currentExperiment = EXPERIMENTS.find((e) => e.id === activeExp) || EXPERIMENTS[0];

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
          padding: 'clamp(60px, 8vw, 130px) clamp(20px, 4vw, 64px) clamp(40px, 5vw, 80px)',
          borderBottom: '1px solid var(--night-line)',
        }}
        aria-label="Playground: Things we test before anyone asks"
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--signal-orange)',
            marginBottom: '28px',
            letterSpacing: '0.08em',
          }}
        >
          STATE_09 / EXPERIMENTS & PROTOTYPES
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
          THINGS<br />WE TEST<br />BEFORE<br />ANYONE<br />ASKS.
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
          An active laboratory of micro-experiments: topological transformations, spatial menus, shader physics, and bespoke interaction mechanics.
        </p>
      </section>

      {/* ── EXPERIMENT WORKBENCH ── */}
      <section
        style={{
          padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 64px)',
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '40px',
        }}
      >
        {/* Left: Experiment Selector List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#6E7169', marginBottom: '8px' }}>
            INDEX / 08 PROTOTYPES
          </div>
          {EXPERIMENTS.map((exp) => {
            const isSelected = activeExp === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveExp(exp.id)}
                onMouseEnter={() => setCursorMode('EXPAND')}
                onMouseLeave={() => setCursorMode('DEFAULT')}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  background: isSelected ? '#1F211D' : '#141613',
                  border: '1px solid',
                  borderColor: isSelected ? exp.accent : 'var(--night-line)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: exp.accent }}>
                    {exp.number} // {exp.category}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: isSelected ? 700 : 500, color: '#FFF', marginTop: '4px' }}>
                    {exp.title}
                  </div>
                </div>
                {isSelected && <span style={{ color: exp.accent, fontSize: '12px' }}>●</span>}
              </button>
            );
          })}
        </div>

        {/* Right: Active Experiment Live Container */}
        <div
          style={{
            border: '1px solid var(--night-line)',
            backgroundColor: '#181A16',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: currentExperiment.accent, padding: '3px 8px', border: `1px solid ${currentExperiment.accent}` }}>
                ACTIVE PROTOTYPE // {currentExperiment.number}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#888' }}>
                STATUS: RUNNING ISOLATED
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.025em', color: '#FFF', marginBottom: '12px' }}>
              {currentExperiment.title}
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#AAA', lineHeight: 1.5, marginBottom: '32px' }}>
              {currentExperiment.description}
            </p>

            {/* Interactive Demo Area */}
            <div style={{ borderTop: '1px solid var(--night-line)', paddingTop: '28px' }}>
              {currentExperiment.renderInteractive()}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
