import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppState } from '../../context/StateContext';
import { TypeState } from '../../components/motion/TypeState';

gsap.registerPlugin(ScrollTrigger);

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Connection {
  from: string;
  to: string;
}

const INITIAL_NODES: Node[] = [
  { id: 'DATA', label: 'DATA', x: 72, y: 22, vx: 0, vy: 0 },
  { id: 'PEOPLE', label: 'PEOPLE', x: 85, y: 42, vx: 0, vy: 0 },
  { id: 'CONTENT', label: 'CONTENT', x: 90, y: 65, vx: 0, vy: 0 },
  { id: 'SPACE', label: 'SPACE', x: 68, y: 78, vx: 0, vy: 0 },
  { id: 'SYSTEMS', label: 'SYSTEMS', x: 50, y: 85, vx: 0, vy: 0 },
  { id: 'STORY', label: 'STORY', x: 75, y: 58, vx: 0, vy: 0 },
  { id: 'INTERACTION', label: 'INTERACTION', x: 62, y: 40, vx: 0, vy: 0 },
  { id: 'PLATFORM', label: 'PLATFORM', x: 82, y: 30, vx: 0, vy: 0 },
  { id: 'TECH', label: 'TECH', x: 58, y: 62, vx: 0, vy: 0 },
  { id: 'PLACE', label: 'PLACE', x: 70, y: 35, vx: 0, vy: 0 },
  { id: 'TIME', label: 'TIME', x: 90, y: 52, vx: 0, vy: 0 },
  { id: 'CONTEXT', label: 'CONTEXT', x: 55, y: 75, vx: 0, vy: 0 },
];

const CONNECTIONS: Connection[] = [
  { from: 'DATA', to: 'SYSTEMS' },
  { from: 'DATA', to: 'INTERACTION' },
  { from: 'PEOPLE', to: 'INTERACTION' },
  { from: 'PEOPLE', to: 'STORY' },
  { from: 'CONTENT', to: 'STORY' },
  { from: 'CONTENT', to: 'PLATFORM' },
  { from: 'SPACE', to: 'CONTEXT' },
  { from: 'SYSTEMS', to: 'TECH' },
  { from: 'STORY', to: 'INTERACTION' },
  { from: 'INTERACTION', to: 'PLATFORM' },
  { from: 'PLATFORM', to: 'DATA' },
  { from: 'TECH', to: 'SYSTEMS' },
  { from: 'PLACE', to: 'CONTEXT' },
  { from: 'TIME', to: 'DATA' },
];

export const HomePage: React.FC = () => {
  const { setCursorMode } = useAppState();
  const mainRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeCapability, setActiveCapability] = useState<number | null>(null);

  // GSAP ScrollTrigger Orchestration
  useEffect(() => {
    if (!mainRef.current) return;
    const ctx = gsap.context(() => {
      // 01. Hero statement letter widening on scroll
      gsap.to('.hero-title-main', {
        letterSpacing: '0.02em',
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // 02. Three States panels reveal
      gsap.from('.state-card-module', {
        y: 40,
        opacity: 0.2,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#states-section',
          start: 'top 80%',
        },
      });

      // 04. Field Guide Topographic Map trails animation
      gsap.fromTo(
        '.field-trail-vector',
        { strokeDashoffset: 120, strokeDasharray: 120 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
          stagger: 0.3,
          scrollTrigger: {
            trigger: '#field-guide-section',
            start: 'top 70%',
          },
        }
      );

      // 05. Complexity lines reduction (18 lines fade out, 3 essential lines stay bold and bright)
      gsap.to('.noisy-complexity-line', {
        opacity: 0.04,
        x: -20,
        stagger: 0.04,
        scrollTrigger: {
          trigger: '#complexity-section',
          start: 'top 75%',
          end: 'center 45%',
          scrub: true,
        },
      });

      gsap.fromTo(
        '.essential-complexity-line',
        { strokeWidth: 0.5, opacity: 0.3 },
        {
          strokeWidth: 2.2,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '#complexity-section',
            start: 'top 60%',
            end: 'center 40%',
            scrub: true,
          },
        }
      );

      // 07. Platform node connections stagger
      gsap.from('.platform-diagram-line', {
        strokeDasharray: '4 4',
        opacity: 0.2,
        stagger: 0.08,
        duration: 0.6,
        scrollTrigger: {
          trigger: '#platform-moment-section',
          start: 'top 75%',
        },
      });

      // 08. Exhibits horizontal stages entrance
      gsap.from('.exhibit-journey-step', {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#exhibits-moment-section',
          start: 'top 75%',
        },
      });

      // 10. Studio team image reveal
      gsap.from('.studio-team-image', {
        scale: 0.95,
        opacity: 0.7,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#studio-moment-section',
          start: 'top 75%',
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Gentle node drift simulation
  useEffect(() => {
    let animId: number;
    let time = 0;

    const animate = () => {
      time += 0.004;
      setNodes((prev) =>
        prev.map((node, i) => {
          const angle = (i / prev.length) * Math.PI * 2 + time;
          const baseX = INITIAL_NODES[i].x;
          const baseY = INITIAL_NODES[i].y;
          return {
            ...node,
            x: baseX + Math.sin(angle * 0.7 + i) * 1.8,
            y: baseY + Math.cos(angle * 0.5 + i) * 1.5,
          };
        })
      );
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const getNodeById = (id: string) => nodes.find((n) => n.id === id);

  const STATES = [
    {
      number: '01',
      title: 'UNDERSTAND',
      details: ['research', 'journeys', 'content architecture', 'data models'],
    },
    {
      number: '02',
      title: 'DESIGN',
      details: ['interaction', 'interface', 'motion', 'visual systems'],
    },
    {
      number: '03',
      title: 'BUILD',
      details: ['React 19', 'platforms', 'WebGL', 'integrations'],
    },
  ];

  const MATRIX_ROWS = ['WEB', 'PLATFORMS', 'IMMERSIVE', 'DATA', 'EXHIBITS', 'AI SYSTEMS'];
  const MATRIX_COLS = ['STRATEGY', 'UX', 'DESIGN', 'BUILD', 'OPERATE'];
  const [hoveredCell, setHoveredCell] = useState<[number, number] | null>(null);

  const MATRIX_TOOLTIPS: Record<string, string> = {
    'IMMERSIVE-BUILD': 'WebGL / Three.js / XR / Interactive spatial environments / Realtime 3D.',
    'DATA-DESIGN': 'Information architecture / Visualization / Dashboards / Cartography.',
    'WEB-BUILD': 'React 19 / TypeScript / Headless CMS / Edge-optimized front-ends.',
    'PLATFORMS-UX': 'Deep workflow reduction / Task-oriented navigation / High-throughput operator UX.',
    'EXHIBITS-BUILD': 'Kiosk OS lockdown / Local offline cache / Serial port hardware relay.',
    'AI SYSTEMS-STRATEGY': 'Pragmatic utility evaluation / Deterministic fallback rules / Ethical audit.',
  };

  const getTooltip = (row: string, col: string): string => {
    return MATRIX_TOOLTIPS[`${row}-${col}`] || `${row} × ${col}: Custom solution for this intersection.`;
  };

  const PLATFORM_NODES = [
    { id: 'PLATFORM', label: 'PLATFORM', x: 50, y: 50 },
    { id: 'USERS', label: 'USERS', x: 22, y: 30 },
    { id: 'CMS', label: 'CMS', x: 78, y: 25 },
    { id: 'CRM', label: 'CRM', x: 85, y: 50 },
    { id: 'ERP', label: 'ERP', x: 78, y: 75 },
    { id: 'PAYMENTS', label: 'PAYMENTS', x: 50, y: 85 },
    { id: 'INVENTORY', label: 'INVENTORY', x: 22, y: 75 },
    { id: 'ANALYTICS', label: 'ANALYTICS', x: 15, y: 50 },
    { id: 'AI', label: 'AI', x: 22, y: 28 },
  ];

  const PLATFORM_CONNECTIONS = [
    ['PLATFORM', 'USERS'],
    ['PLATFORM', 'CMS'],
    ['PLATFORM', 'CRM'],
    ['PLATFORM', 'ERP'],
    ['PLATFORM', 'PAYMENTS'],
    ['PLATFORM', 'INVENTORY'],
    ['PLATFORM', 'ANALYTICS'],
    ['PLATFORM', 'AI'],
  ];

  const [activeSystemNode, setActiveSystemNode] = useState<string | null>(null);
  const SYSTEM_NODE_DESC: Record<string, string> = {
    USERS: 'Role-based access, SSO, behavioral tracking, multi-tenant permission graphs.',
    CMS: 'Headless content delivery, structured schemas, editorial workflows, scheduled publishing.',
    CRM: 'Customer relationship synchronization, opportunity tracking, lifecycle automation.',
    ERP: 'Financial records, manufacturing BOM, resource planning, procurement integration.',
    PAYMENTS: 'Multi-currency checkout, invoice generation, subscriptions, PSD2 compliance.',
    INVENTORY: 'Real-time stock levels, warehouse location tracking, demand forecasting.',
    ANALYTICS: 'Behavioral telemetry, conversion attribution, predictive cohort analysis.',
    AI: 'Semantic search enhancement, content classification, workflow recommendation.',
  };

  return (
    <main ref={mainRef} id="main-content" tabIndex={-1}>
      {/* Skip Navigation */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          top: '-40px',
          left: 0,
          background: 'var(--system-blue)',
          color: '#fff',
          padding: '8px 16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          zIndex: 99999,
          transition: 'top 0.2s',
        }}
        onFocus={(e) => { (e.target as HTMLElement).style.top = '0'; }}
        onBlur={(e) => { (e.target as HTMLElement).style.top = '-40px'; }}
      >
        SKIP TO CONTENT
      </a>

      {/* ═══════════════════════════════════ */}
      {/* SECTION 01 — HERO */}
      {/* ═══════════════════════════════════ */}
      <section
        id="hero-section"
        style={{
          minHeight: '100svh',
          paddingTop: '64px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          backgroundColor: 'var(--canvas)',
          overflow: 'hidden',
          position: 'relative',
        }}
        aria-label="Hero: Complex doesn't have to feel complicated"
      >
        {/* Left: Typography */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 64px)',
            borderRight: '1px solid var(--line)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-mono)',
              color: 'var(--text-muted)',
              marginBottom: '32px',
              letterSpacing: '0.05em',
            }}
          >
            INTERACTIVE SYSTEMS / DIGITAL EXPERIENCES
          </div>

          <h1
            className="hero-title-main"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h1)',
              letterSpacing: '-0.035em',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            COMPLEX
            <br />
            DOESN'T HAVE
            <br />
            TO FEEL
            <br />
            <em
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                fontSize: '0.92em',
              }}
            >
              complicated.
            </em>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-body)',
              lineHeight: 1.55,
              color: 'var(--text-secondary)',
              maxWidth: '420px',
              marginTop: '40px',
            }}
          >
            We design and build digital systems that turn complicated information, stories and services into experiences people understand.
          </p>

          {/* Typing Section */}
          <div
            style={{
              marginTop: '32px',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              letterSpacing: '-0.02em',
              fontWeight: 500,
            }}
          >
            <TypeState />
          </div>

          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '48px',
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/work"
              className="btn-primary"
              onMouseEnter={() => setCursorMode('OPEN')}
              onMouseLeave={() => setCursorMode('DEFAULT')}
            >
              VIEW THE WORK →
            </Link>
            <Link
              to="/process"
              className="btn-secondary"
              onMouseEnter={() => setCursorMode('EXPAND')}
              onMouseLeave={() => setCursorMode('DEFAULT')}
            >
              HOW WE WORK
            </Link>
          </div>
        </div>

        {/* Right: Interactive Network SVG */}
        <div
          style={{
            position: 'relative',
            backgroundColor: 'var(--paper)',
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
            style={{ width: '100%', height: '100%', minHeight: '60vh' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
          >
            {/* Background grid lines */}
            {Array.from({ length: 8 }).map((_, i) => (
              <React.Fragment key={i}>
                <line x1={i * 14} y1="0" x2={i * 14} y2="100" stroke="#C7C7BF" strokeWidth="0.3" />
                <line x1="0" y1={i * 14} x2="100" y2={i * 14} stroke="#C7C7BF" strokeWidth="0.3" />
              </React.Fragment>
            ))}

            {/* Connections */}
            {CONNECTIONS.map((conn, i) => {
              const nodeA = getNodeById(conn.from);
              const nodeB = getNodeById(conn.to);
              if (!nodeA || !nodeB) return null;

              const isActive =
                hoveredNode === conn.from || hoveredNode === conn.to;

              // Pointer proximity reactivity
              const midX = (nodeA.x + nodeB.x) / 2;
              const midY = (nodeA.y + nodeB.y) / 2;
              const dist = Math.sqrt(
                Math.pow(midX - mousePos.x, 2) + Math.pow(midY - mousePos.y, 2)
              );
              const isNear = dist < 18;

              return (
                <line
                  key={i}
                  x1={nodeA.x}
                  y1={nodeA.y}
                  x2={nodeB.x}
                  y2={nodeB.y}
                  stroke={isActive || isNear ? '#2454FF' : '#C7C7BF'}
                  strokeWidth={isActive ? 0.9 : isNear ? 0.6 : 0.35}
                  style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const dist = Math.sqrt(
                Math.pow(node.x - mousePos.x, 2) + Math.pow(node.y - mousePos.y, 2)
              );
              const isNear = dist < 14;
              const isHovered = hoveredNode === node.id;

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => { setHoveredNode(node.id); setCursorMode('EXPLORE'); }}
                  onMouseLeave={() => { setHoveredNode(null); setCursorMode('DEFAULT'); }}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Pulse ring on hover */}
                  {isHovered && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="6"
                      fill="none"
                      stroke="#2454FF"
                      strokeWidth="0.5"
                      opacity="0.5"
                    />
                  )}
                  {/* Node circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? 3.5 : isNear ? 2.8 : 2}
                    fill={isHovered ? '#2454FF' : '#FCFBF7'}
                    stroke={isHovered ? '#2454FF' : '#30312F'}
                    strokeWidth="0.7"
                    style={{ transition: 'r 0.2s, fill 0.2s, stroke 0.2s' }}
                  />
                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + 5}
                    fontSize="3"
                    textAnchor="middle"
                    fill={isHovered ? '#2454FF' : '#6B6D68'}
                    fontFamily="Fragment Mono, monospace"
                    style={{ transition: 'fill 0.2s' }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Corner Label */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-muted)',
            }}
          >
            CONCEPT NETWORK / HOVER TO ACTIVATE
          </div>
        </div>

        {/* Mobile responsive: stack */}
        <style>{`
          @media (max-width: 768px) {
            section[aria-label="Hero: Complex doesn't have to feel complicated"] {
              grid-template-columns: 1fr !important;
              min-height: auto !important;
              padding-bottom: 60px;
            }
            section[aria-label="Hero: Complex doesn't have to feel complicated"] > div:first-child {
              border-right: none !important;
              border-bottom: 1px solid var(--line);
            }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════ */}
      {/* SECTION 02 — THREE STATES */}
      {/* ═══════════════════════════════════ */}
      <section
        id="states-section"
        className="site-section"
        style={{ backgroundColor: 'var(--canvas)' }}
        aria-label="Studio approach: Understand, Design, Build"
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            padding: '0 clamp(20px, 4vw, 64px)',
            marginBottom: '48px',
            letterSpacing: '0.05em',
          }}
        >
          HOW WE APPROACH COMPLEXITY
        </div>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body)',
            color: 'var(--text-secondary)',
            padding: '0 clamp(20px, 4vw, 64px)',
            maxWidth: '480px',
            marginBottom: '60px',
          }}
        >
          We don't start with screens. We start with the system behind them.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
          role="list"
        >
          {STATES.map((state, i) => (
            <div
              key={i}
              role="listitem"
              className="state-card-module"
              onMouseEnter={() => setActiveCapability(i)}
              onMouseLeave={() => setActiveCapability(null)}
              style={{
                borderLeft: i === 0 ? '1px solid var(--line)' : 'none',
                borderRight: '1px solid var(--line)',
                padding: 'clamp(40px, 5vw, 72px) clamp(24px, 3.5vw, 48px)',
                backgroundColor: activeCapability === i ? 'var(--paper)' : 'transparent',
                transition: 'background-color 0.3s ease',
                cursor: 'default',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-mono)',
                  color: 'var(--system-blue)',
                  marginBottom: '16px',
                  letterSpacing: '0.06em',
                }}
              >
                STATE_{state.number}
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 5vw, 72px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.92,
                  fontWeight: 600,
                  marginBottom: '32px',
                  color: 'var(--ink)',
                }}
              >
                {state.title}
              </h2>

              {/* Details - always visible in expanded state */}
              <div
                style={{
                  maxHeight: activeCapability === i ? '200px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {state.details.map((detail, j) => (
                  <div
                    key={j}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-body)',
                      color: 'var(--text-secondary)',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--line)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <span style={{ color: 'var(--system-blue)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                      {(j + 1).toString().padStart(2, '0')}
                    </span>
                    {detail}
                  </div>
                ))}
              </div>

              {/* Hover prompt */}
              {activeCapability !== i && (
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--text-muted)',
                    marginTop: '24px',
                  }}
                >
                  HOVER TO EXPAND →
                </div>
              )}
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            section[aria-label="Studio approach: Understand, Design, Build"] .states-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════ */}
      {/* SECTION 03 — SELECTED WORK */}
      {/* ═══════════════════════════════════ */}
      <section
        className="site-section"
        style={{ backgroundColor: 'var(--paper)' }}
        aria-label="Selected Systems: featured projects"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0 clamp(20px, 4vw, 64px)',
            marginBottom: '60px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            SELECTED<br />SYSTEMS.
          </h2>
          <Link
            to="/work"
            className="btn-ghost"
            onMouseEnter={() => setCursorMode('OPEN')}
            onMouseLeave={() => setCursorMode('DEFAULT')}
          >
            VIEW ALL WORK →
          </Link>
        </div>

        {/* Project Rows */}
        {[
          {
            number: '01',
            title: 'METRO/01',
            desc: 'Urban mobility platform & transit cartography',
            accent: '#2454FF',
            sector: 'MOBILITY',
            slug: 'metro-01',
            image: '/assets/images/transit_platform.jpg',
            visual: 'MAP',
          },
          {
            number: '02',
            title: 'ATLAS',
            desc: 'Museum collection explorer & archive system',
            accent: '#826CFF',
            sector: 'CULTURAL',
            slug: 'atlas',
            image: '/assets/images/museum_interactive.jpg',
            visual: 'GRID',
          },
          {
            number: '03',
            title: 'CURRENT GRID',
            desc: 'Public-energy infrastructure telemetry',
            accent: '#4FCE83',
            sector: 'ENERGY',
            slug: 'current-grid',
            image: '/assets/images/telemetry_network.jpg',
            visual: 'DATA',
          },
          {
            number: '04',
            title: 'FORGE',
            desc: 'Industrial configurator & B2B platform',
            accent: '#FF6037',
            sector: 'INDUSTRIAL',
            slug: 'forge',
            image: '/assets/images/industrial_configurator.jpg',
            visual: '3D',
          },
          {
            number: '05',
            title: 'FIELD GUIDE',
            desc: 'National park topographic explorer',
            accent: '#F4D65B',
            sector: 'CONSERVATION',
            slug: 'field-guide',
            image: '/assets/images/topographic_map.jpg',
            visual: 'TOPO',
          },
          {
            number: '06',
            title: 'NEXUS',
            desc: 'University digital ecosystem & wayfinding',
            accent: '#A53030',
            sector: 'EDUCATION',
            slug: 'nexus',
            image: '/assets/images/campus_experience.jpg',
            visual: 'CAMPUS',
          },
        ].map((project) => (
          <Link
            key={project.slug}
            to={`/work/${project.slug}`}
            onMouseEnter={() => setCursorMode('OPEN')}
            onMouseLeave={() => setCursorMode('DEFAULT')}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr auto 200px',
                alignItems: 'center',
                gap: '24px',
                padding: '24px clamp(20px, 4vw, 64px)',
                borderBottom: '1px solid var(--line)',
                transition: 'background-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--canvas)';
                (e.currentTarget as HTMLElement).style.setProperty('--row-accent', project.accent);
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: project.accent,
                }}
              >
                {project.number}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(24px, 3vw, 40px)',
                    letterSpacing: '-0.025em',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    lineHeight: 1,
                  }}
                >
                  {project.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    marginTop: '4px',
                  }}
                >
                  {project.desc}
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.04em',
                  padding: '4px 10px',
                  border: `1px solid ${project.accent}20`,
                  color: project.accent,
                }}
              >
                {project.sector}
              </div>
              <div
                style={{
                  width: '200px',
                  height: '90px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--mist)',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Accent overlay on hover */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: project.accent,
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    mixBlendMode: 'overlay',
                  }}
                />
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* ═══════════════════════════════════ */}
      {/* SECTION 04 — SIGNATURE MAP: FIELD GUIDE */}
      {/* ═══════════════════════════════════ */}
      <section
        id="field-guide-section"
        style={{
          minHeight: '90vh',
          backgroundColor: '#F5F0DE',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        aria-label="Featured Project: Field Guide topographic map"
      >
        {/* Background topographic SVG map */}
        <svg
          viewBox="0 0 200 120"
          preserveAspectRatio="xMidYMid slice"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.25,
          }}
          aria-hidden="true"
        >
          {/* Topographic contour circles */}
          {[20, 28, 35, 41, 46, 50, 53, 55, 56].map((r, i) => (
            <ellipse key={i} cx="100" cy="60" rx={r * 1.4} ry={r} fill="none" stroke="#8A6D00" strokeWidth="0.6" />
          ))}
          {[12, 18, 23, 27, 30, 32, 33].map((r, i) => (
            <ellipse key={i} cx="45" cy="35" rx={r * 1.2} ry={r} fill="none" stroke="#8A6D00" strokeWidth="0.5" />
          ))}
          {[8, 14, 19, 22].map((r, i) => (
            <ellipse key={i} cx="155" cy="80" rx={r * 1.1} ry={r} fill="none" stroke="#8A6D00" strokeWidth="0.4" />
          ))}

          {/* Trail paths */}
          <path className="field-trail-vector" d="M20 60 Q60 40 100 35 Q140 30 170 45" fill="none" stroke="#FF6037" strokeWidth="1.2" strokeDasharray="3 2" />
          <path className="field-trail-vector" d="M30 80 Q70 75 100 60 Q130 48 160 65" fill="none" stroke="#4FCE83" strokeWidth="1.2" strokeDasharray="3 2" />

          {/* POI dots */}
          {[
            { x: 100, y: 35 }, { x: 45, y: 35 }, { x: 155, y: 80 },
            { x: 70, y: 55 }, { x: 130, y: 45 }, { x: 85, y: 80 },
          ].map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="2" fill="#F4D65B" stroke="#171816" strokeWidth="0.6" />
          ))}
        </svg>

        {/* Content overlay */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)',
            maxWidth: '640px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#8A6D00',
              marginBottom: '24px',
              letterSpacing: '0.06em',
            }}
          >
            PROJECT_05 / FIELD GUIDE / ALPINE CONSERVATION TRUST / 2026
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h1)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--ink)',
              marginBottom: '32px',
            }}
          >
            A MAP<br />SHOULD<br />INVITE<br />MOVEMENT.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-body-large)',
              lineHeight: 1.45,
              color: 'var(--graphite)',
              maxWidth: '440px',
              marginBottom: '40px',
            }}
          >
            800 km² of alpine terrain, 4,000 trail segments, and real-time environmental sensor data woven into a single cartographic experience.
          </p>

          <Link
            to="/work/field-guide"
            className="btn-primary"
            style={{
              backgroundColor: '#F4D65B',
              borderColor: '#8A6D00',
              color: '#171816',
            }}
            onMouseEnter={() => setCursorMode('EXPLORE')}
            onMouseLeave={() => setCursorMode('DEFAULT')}
          >
            EXPLORE CASE STUDY →
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════ */}
      {/* SECTION 05 — COMPLEXITY REDUCTION */}
      {/* ═══════════════════════════════════ */}
      <section
        id="complexity-section"
        className="site-section"
        style={{
          backgroundColor: 'var(--paper)',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-label="The hard part isn't building more"
      >
        <div
          style={{
            padding: '0 clamp(20px, 4vw, 64px)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          {/* Text */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                letterSpacing: '-0.03em',
                lineHeight: 0.92,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--ink)',
              }}
            >
              THE HARD PART
              <br />
              ISN'T BUILDING{' '}
              <em
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '0.9em',
                }}
              >
                more.
              </em>
              <br />
              IT'S KNOWING
              <br />
              WHAT SHOULD{' '}
              <em
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '0.9em',
                }}
              >
                disappear.
              </em>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-body)',
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
                marginTop: '32px',
                maxWidth: '380px',
              }}
            >
              Complexity is always seductive. The systems that survive are the ones where we had the discipline to remove what wasn't essential.
            </p>
          </div>

          {/* Complexity Reduction Visual */}
          <div aria-hidden="true">
            <svg viewBox="0 0 200 180" style={{ width: '100%', maxWidth: '380px' }}>
              <text x="8" y="14" fontFamily="Fragment Mono, monospace" fontSize="7" fill="#8E9188">
                COMPLEXITY REDUCTION MODEL
              </text>
              {/* Many lines fade into few */}
              {Array.from({ length: 18 }).map((_, i) => {
                const y = 25 + i * 8;
                const opacity = Math.max(0.06, 1 - i * 0.04);
                const xEnd = 50 + (i % 3) * 15;
                return (
                  <line
                    key={i}
                    className="noisy-complexity-line"
                    x1="10"
                    y1={y}
                    x2={xEnd}
                    y2={y + (i % 4 - 2) * 3}
                    stroke="#C7C7BF"
                    strokeWidth="0.5"
                    opacity={opacity}
                  />
                );
              })}
              {/* Only 3 essential lines survive */}
              {[
                { x1: 80, y1: 50, x2: 190, y2: 50 },
                { x1: 80, y1: 90, x2: 190, y2: 90 },
                { x1: 80, y1: 130, x2: 190, y2: 130 },
              ].map((line, i) => (
                <React.Fragment key={i}>
                  <line
                    key={`ess-${i}`}
                    className="essential-complexity-line"
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="#2454FF"
                    strokeWidth="1.5"
                  />
                  <text
                    x={line.x2 + 4}
                    y={line.y1 + 3}
                    fontFamily="Fragment Mono, monospace"
                    fontSize="5"
                    fill="#30312F"
                  >
                    ESSENTIAL
                  </text>
                </React.Fragment>
              ))}
              {/* Vertical "reduction" arrow */}
              <line x1="60" y1="30" x2="60" y2="165" stroke="#C7C7BF" strokeWidth="0.5" strokeDasharray="2 2" />
              <text
                x="63"
                y="100"
                fontFamily="Fragment Mono, monospace"
                fontSize="5"
                fill="#8E9188"
                transform="rotate(90, 63, 100)"
              >
                SIMPLIFICATION VECTOR
              </text>
            </svg>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            section[aria-label="The hard part isn't building more"] .grid-2 {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════ */}
      {/* SECTION 06 — CAPABILITY MATRIX */}
      {/* ═══════════════════════════════════ */}
      <section
        className="site-section"
        style={{ backgroundColor: 'var(--canvas)' }}
        aria-label="Capabilities matrix: What we connect"
      >
        <div style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '48px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              WHAT<br />WE CONNECT.
            </h2>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--signal-orange)',
                letterSpacing: '0.05em',
                textAlign: 'right',
              }}
            >
              HOVER CELL FOR DETAIL
            </div>
          </div>

          {/* Matrix grid */}
          <div
            style={{
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
            role="grid"
            aria-label="Capability Matrix"
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '600px',
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      width: '120px',
                      textAlign: 'left',
                      padding: '12px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.05em',
                      fontWeight: 400,
                      borderBottom: '1px solid var(--line)',
                    }}
                  >
                    CAPABILITY ↓ / PHASE →
                  </th>
                  {MATRIX_COLS.map((col) => (
                    <th
                      key={col}
                      style={{
                        textAlign: 'center',
                        padding: '12px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: 'var(--signal-orange)',
                        letterSpacing: '0.05em',
                        fontWeight: 600,
                        borderBottom: '1px solid var(--line)',
                        borderLeft: '1px solid var(--line)',
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX_ROWS.map((row, ri) => (
                  <tr key={row}>
                    <td
                      style={{
                        padding: '14px 12px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.04em',
                        fontWeight: 600,
                        borderBottom: '1px solid var(--line)',
                        color: 'var(--ink)',
                      }}
                    >
                      {row}
                    </td>
                    {MATRIX_COLS.map((col, ci) => {
                      const isHovered = hoveredCell && hoveredCell[0] === ri && hoveredCell[1] === ci;
                      return (
                        <td
                          key={col}
                          onMouseEnter={() => setHoveredCell([ri, ci])}
                          onMouseLeave={() => setHoveredCell(null)}
                          style={{
                            borderBottom: '1px solid var(--line)',
                            borderLeft: '1px solid var(--line)',
                            padding: '14px 12px',
                            backgroundColor: isHovered ? 'var(--signal-orange)' : 'transparent',
                            transition: 'background-color 0.2s',
                            verticalAlign: 'top',
                            position: 'relative',
                          }}
                          role="gridcell"
                          aria-label={`${row} × ${col}: ${getTooltip(row, col)}`}
                          title={getTooltip(row, col)}
                        >
                          {isHovered ? (
                            <div
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '11px',
                                color: '#fff',
                                lineHeight: 1.4,
                              }}
                            >
                              {getTooltip(row, col)}
                            </div>
                          ) : (
                            <div
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: `hsl(${ri * 40}, 60%, 65%)`,
                                margin: '0 auto',
                                opacity: 0.5,
                              }}
                            />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            to="/capabilities"
            className="btn-secondary"
            style={{ marginTop: '40px', display: 'inline-flex' }}
            onMouseEnter={() => setCursorMode('EXPAND')}
            onMouseLeave={() => setCursorMode('DEFAULT')}
          >
            EXPLORE FULL CAPABILITIES →
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════ */}
      {/* SECTION 07 — PLATFORM MOMENT */}
      {/* ═══════════════════════════════════ */}
      <section
        id="platform-moment-section"
        className="site-section"
        style={{ backgroundColor: 'var(--graphite)' }}
        aria-label="Platform systems: not every project is a website"
      >
        <div
          style={{
            padding: '0 clamp(20px, 4vw, 64px)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          {/* Text */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--network-green)',
                marginBottom: '24px',
                letterSpacing: '0.06em',
              }}
            >
              PLATFORM ENGINEERING
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                letterSpacing: '-0.03em',
                lineHeight: 0.92,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--white)',
              }}
            >
              NOT EVERY<br />PROJECT IS<br />A WEBSITE.
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-body)',
                color: 'var(--mist)',
                lineHeight: 1.55,
                marginTop: '32px',
                maxWidth: '380px',
              }}
            >
              SYSTEMS THAT TALK<br />TO OTHER SYSTEMS.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-body)',
                color: '#8E9188',
                lineHeight: 1.55,
                marginTop: '16px',
                maxWidth: '380px',
              }}
            >
              We build full operational platforms integrating ERP, CRM, inventory, dealer portals, and live data—not just marketing fronts.
            </p>

            <Link
              to="/platforms"
              className="btn-secondary"
              style={{
                marginTop: '40px',
                display: 'inline-flex',
                color: 'var(--white)',
                borderColor: '#444642',
              }}
              onMouseEnter={() => setCursorMode('EXPAND')}
              onMouseLeave={() => setCursorMode('DEFAULT')}
            >
              EXPLORE PLATFORMS →
            </Link>
          </div>

          {/* Platform System Diagram */}
          <div aria-hidden="true">
            <svg viewBox="0 0 100 100" style={{ width: '100%', maxWidth: '360px' }}>
              {/* Connections */}
              {PLATFORM_CONNECTIONS.map(([from, to], i) => {
                const nodeFrom = PLATFORM_NODES.find((n) => n.id === from)!;
                const nodeTo = PLATFORM_NODES.find((n) => n.id === to)!;
                const isActive = activeSystemNode === to || activeSystemNode === from;
                return (
                  <line
                    key={i}
                    x1={nodeFrom.x}
                    y1={nodeFrom.y}
                    x2={nodeTo.x}
                    y2={nodeTo.y}
                    stroke={isActive ? '#4FCE83' : '#444642'}
                    strokeWidth={isActive ? 1.2 : 0.6}
                    style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                  />
                );
              })}

              {/* Nodes */}
              {PLATFORM_NODES.map((node) => (
                <g
                  key={node.id}
                  onMouseEnter={() => setActiveSystemNode(node.id === 'PLATFORM' ? null : node.id)}
                  onMouseLeave={() => setActiveSystemNode(null)}
                  style={{ cursor: 'default' }}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.id === 'PLATFORM' ? 8 : activeSystemNode === node.id ? 5 : 3.5}
                    fill={node.id === 'PLATFORM' ? '#4FCE83' : activeSystemNode === node.id ? '#4FCE83' : '#2B2C29'}
                    stroke={node.id === 'PLATFORM' ? '#4FCE83' : '#444642'}
                    strokeWidth="0.8"
                    style={{ transition: 'all 0.25s' }}
                  />
                  <text
                    x={node.x}
                    y={node.y + (node.id === 'PLATFORM' ? 3 : 2)}
                    textAnchor="middle"
                    fontFamily="Fragment Mono, monospace"
                    fontSize={node.id === 'PLATFORM' ? '3.5' : '2.8'}
                    fill={node.id === 'PLATFORM' ? '#111310' : activeSystemNode === node.id ? '#111310' : '#8E9188'}
                    fontWeight={node.id === 'PLATFORM' ? '600' : '400'}
                    style={{ transition: 'fill 0.25s' }}
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* Active node description */}
            <div
              style={{
                marginTop: '24px',
                minHeight: '60px',
                padding: '14px',
                backgroundColor: '#222321',
                borderLeft: '2px solid #4FCE83',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: '#4FCE83',
                  marginBottom: '6px',
                  letterSpacing: '0.05em',
                }}
              >
                {activeSystemNode ? `MODULE: ${activeSystemNode}` : 'HOVER A NODE'}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  color: '#8E9188',
                  lineHeight: 1.45,
                }}
              >
                {activeSystemNode
                  ? SYSTEM_NODE_DESC[activeSystemNode]
                  : 'Select a system node to see its functional role within the platform architecture.'}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            section[aria-label="Platform systems: not every project is a website"] > div {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════ */}
      {/* SECTION 08 — EXHIBITS MOMENT */}
      {/* ═══════════════════════════════════ */}
      <section
        id="exhibits-moment-section"
        className="site-section"
        style={{ backgroundColor: '#F7EFCF' }}
        aria-label="Room-scale digital exhibits"
      >
        <div style={{ padding: '0 clamp(20px, 4vw, 64px)' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#8A6D00',
              marginBottom: '24px',
              letterSpacing: '0.06em',
            }}
          >
            ROOM-SCALE DIGITAL / EXHIBITS & INSTALLATIONS
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              letterSpacing: '-0.03em',
              lineHeight: 0.92,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--ink)',
              marginBottom: '40px',
            }}
          >
            SOMETIMES<br />THE SCREEN<br />HAS A ROOM<br />AROUND IT.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1px',
              backgroundColor: '#D6CA9E',
              marginBottom: '40px',
            }}
          >
            {[
              { stage: 'ATTRACT', desc: 'Visitor sees experience from across the gallery — ambient motion communicates "something is alive here."' },
              { stage: 'ENGAGE', desc: 'First touch requires no instructions. Instant, satisfying, intelligible feedback.' },
              { stage: 'EXPLORE', desc: 'Depth reveals itself after initial contact. Layers of information earned through curiosity.' },
              { stage: 'EXIT', desc: 'Visitor leaves understanding something they did not know when they arrived.' },
            ].map((step) => (
              <div
                key={step.stage}
                style={{
                  backgroundColor: '#F7EFCF',
                  padding: '32px 28px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#8A6D00',
                    letterSpacing: '0.06em',
                    marginBottom: '12px',
                    borderBottom: '1px solid #D6CA9E',
                    paddingBottom: '8px',
                  }}
                >
                  {step.stage}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'var(--graphite)',
                    lineHeight: 1.5,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Exhibits photo */}
          <div
            style={{
              width: '100%',
              maxHeight: '480px',
              overflow: 'hidden',
              marginBottom: '40px',
            }}
          >
            <img
              src="/assets/images/museum_interactive.jpg"
              alt="Museum visitors using an interactive exhibit touchscreen"
              loading="lazy"
              style={{ width: '100%', objectFit: 'cover', maxHeight: '480px' }}
            />
          </div>

          <Link
            to="/exhibits"
            className="btn-primary"
            style={{ backgroundColor: 'var(--ink)', borderColor: 'var(--ink)' }}
            onMouseEnter={() => setCursorMode('EXPLORE')}
            onMouseLeave={() => setCursorMode('DEFAULT')}
          >
            EXPLORE EXHIBITS WORK →
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════ */}
      {/* SECTION 09 — STUDIO / PEOPLE */}
      {/* ═══════════════════════════════════ */}
      <section
        id="studio-moment-section"
        className="site-section"
        style={{ backgroundColor: 'var(--paper)' }}
        aria-label="Studio: systems made by people"
      >
        <div
          style={{
            padding: '0 clamp(20px, 4vw, 64px)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                letterSpacing: '-0.03em',
                lineHeight: 0.92,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--ink)',
              }}
            >
              SYSTEMS<br />ARE MADE<br />BY{' '}
              <em
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '0.9em',
                }}
              >
                people.
              </em>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-body)',
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
                marginTop: '32px',
                maxWidth: '400px',
              }}
            >
              Researchers, designers and developers working in the same conversation from the start. No relay race between departments.
            </p>

            <Link
              to="/studio"
              className="btn-ghost"
              style={{ marginTop: '32px' }}
              onMouseEnter={() => setCursorMode('EXPAND')}
              onMouseLeave={() => setCursorMode('DEFAULT')}
            >
              MEET THE STUDIO →
            </Link>
          </div>

          <div>
            <img
              className="studio-team-image"
              src="/assets/images/studio_team.jpg"
              alt="MOSAIC/STATE design team reviewing interactive map prototype"
              loading="lazy"
              style={{
                width: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            section[aria-label="Studio: systems made by people"] > div {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════ */}
      {/* SECTION 10 — FINAL CTA */}
      {/* ═══════════════════════════════════ */}
      <section
        style={{
          minHeight: '70vh',
          backgroundColor: 'var(--system-blue)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-label="Start a project"
      >
        {/* Background network for CTA */}
        <svg
          viewBox="0 0 200 100"
          preserveAspectRatio="xMidYMid slice"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.12,
          }}
          aria-hidden="true"
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const x1 = Math.sin(i * 0.7) * 80 + 100;
            const y1 = Math.cos(i * 0.5) * 35 + 50;
            const x2 = Math.sin((i + 3) * 0.7) * 80 + 100;
            const y2 = Math.cos((i + 3) * 0.5) * 35 + 50;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="0.6" />
            );
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const x = Math.sin(i * 0.9) * 80 + 100;
            const y = Math.cos(i * 0.6) * 35 + 50;
            return <circle key={i} cx={x} cy={y} r="2" fill="#fff" />;
          })}
        </svg>

        {/* CTA Text */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              letterSpacing: '-0.04em',
              lineHeight: 0.88,
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#FFFFFF',
              marginBottom: '24px',
            }}
          >
            HAVE<br />A HARD<br />PROBLEM?<br />
            <em
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: '0.85em',
              }}
            >
              good.
            </em>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-body-large)',
              color: 'rgba(255,255,255,0.75)',
              marginBottom: '40px',
            }}
          >
            Those are usually the interesting ones.
          </p>

          <Link
            to="/start"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              background: '#FFFFFF',
              color: 'var(--system-blue)',
              padding: '18px 32px',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              letterSpacing: '0.06em',
              textDecoration: 'none',
              fontWeight: 600,
              textTransform: 'uppercase',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              setCursorMode('BEGIN');
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              setCursorMode('DEFAULT');
            }}
          >
            START A PROJECT ↗
          </Link>
        </div>
      </section>
    </main>
  );
};
