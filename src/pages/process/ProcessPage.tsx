import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppState } from '../../context/StateContext';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStage {
  number: string;
  title: string;
  subtitle: string;
  uncertaintyWidth: number; // Percentage width for visual funnel metaphor: 100% down to 20%
  inputs: string[];
  outputs: string[];
  keyQuestion: string;
}

const PROCESS_STAGES: ProcessStage[] = [
  {
    number: '01',
    title: 'UNDERSTAND',
    subtitle: 'UNEARTHING CONSTRAINTS & TRUTHS',
    uncertaintyWidth: 100,
    inputs: ['Stakeholder interviews', 'Analytics telemetry', 'Content audits', 'Legacy database schemas', 'Field user observation'],
    outputs: ['Constraint ledger', 'User mental models', 'Content topology map'],
    keyQuestion: 'What is the real underlying problem rather than the symptom?',
  },
  {
    number: '02',
    title: 'DEFINE',
    subtitle: 'PRIORITIZING STRUCTURAL CLARITY',
    uncertaintyWidth: 88,
    inputs: ['Research synthesis', 'Technical API audits', 'Accessibility compliance targets'],
    outputs: ['Information architecture (IA)', 'System domain model', 'Priority boundary matrix'],
    keyQuestion: 'What must disappear to make the essential parts legible?',
  },
  {
    number: '03',
    title: 'PROTOTYPE',
    subtitle: 'FAILING AT SPEED IN CODE',
    uncertaintyWidth: 76,
    inputs: ['Interaction hypotheses', 'Live sample datasets', 'Spatial dimension layouts'],
    outputs: ['Functional interactive proof-of-concepts', 'Cartography scale stress tests', 'Performance benchmarks'],
    keyQuestion: 'Does the interaction teach itself before a single tutorial word is written?',
  },
  {
    number: '04',
    title: 'DESIGN',
    subtitle: 'BUILDING THE SYSTEM LANGUAGE',
    uncertaintyWidth: 64,
    inputs: ['Approved IA & user flows', 'Brand typographic anchors', 'Accessibility contrast ratios'],
    outputs: ['Modular component tokens', 'Kinetic animation choreography', 'Multi-device responsive layouts'],
    keyQuestion: 'How does every state transition communicate logic rather than decoration?',
  },
  {
    number: '05',
    title: 'BUILD',
    subtitle: 'PRODUCTION-GRADE IMPLEMENTATION',
    uncertaintyWidth: 52,
    inputs: ['Design system specs', 'Headless CMS endpoints', 'WebSocket brokers & WebGL shaders'],
    outputs: ['Clean TypeScript codebase', 'Deterministic state machines', 'Offline service worker cache'],
    keyQuestion: 'Is the implementation resilient when networks degrade or sensors drop packets?',
  },
  {
    number: '06',
    title: 'TEST',
    subtitle: 'STRESSING EDGES & ACCESSIBILITY',
    uncertaintyWidth: 40,
    inputs: ['Automated test suites', 'Screen-reader validation', 'Low-power hardware profiling'],
    outputs: ['WCAG AAA compliance logs', '60fps frame audit profiles', 'Edge-case recovery tests'],
    keyQuestion: 'Can an operator or visitor with assistive tech use every primary pathway?',
  },
  {
    number: '07',
    title: 'LAUNCH',
    subtitle: 'MIGRATION & CONTROLLED HANDOFF',
    uncertaintyWidth: 28,
    inputs: ['Production deployment pipelines', 'DNS propagation plan', 'Kiosk lock-down images'],
    outputs: ['Live production release', 'Comprehensive staff documentation', 'Rollback safeguards'],
    keyQuestion: 'Is the deployment completely predictable with zero downtime risk?',
  },
  {
    number: '08',
    title: 'IMPROVE',
    subtitle: 'EMPIRICAL MEASUREMENT & ITERATION',
    uncertaintyWidth: 18,
    inputs: ['Live telemetry metrics', 'Error logging brokers', 'Staff feedback loops'],
    outputs: ['Optimization sprints', 'Refined query indexes', 'Quarterly capability expansions'],
    keyQuestion: 'How is real human usage shaping the system post-launch?',
  },
];

export const ProcessPage = () => {
  const { setCursorMode } = useAppState();
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const funnelContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = funnelContainerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-funnel-bar',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const activeStage = PROCESS_STAGES[selectedStage];

  return (
    <main
      id="main-content"
      style={{
        paddingTop: '64px',
        minHeight: '100vh',
        backgroundColor: 'var(--canvas)',
        color: 'var(--ink)',
      }}
    >
      {/* ── HERO ── */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 130px) clamp(20px, 4vw, 64px) clamp(48px, 6vw, 90px)',
          borderBottom: '1px solid var(--line)',
        }}
        aria-label="Process: Ask better questions first"
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--deep-red)',
            marginBottom: '28px',
            letterSpacing: '0.08em',
          }}
        >
          STATE_06 / PROCESS FUNNEL
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
          ASK<br />BETTER<br />QUESTIONS<br />FIRST.
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
          We do not believe in linear handoffs between disconnected departments. We use a progressive funnel: wide exploration of possibilities that systematically converges into clarity, resilience, and speed.
        </p>
      </section>

      {/* ── VISUAL FUNNEL INTERACTIVE EXPLORER ── */}
      <section
        style={{
          padding: 'clamp(50px, 7vw, 100px) clamp(20px, 4vw, 64px)',
          borderBottom: '1px solid var(--line)',
          backgroundColor: 'var(--paper)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--deep-red)', letterSpacing: '0.06em', marginBottom: '8px' }}>
              VISUAL FUNNEL METAPHOR / UNCERTAINTY TO RESOLUTION
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 54px)', letterSpacing: '-0.03em', fontWeight: 700, textTransform: 'uppercase' }}>
              EIGHT CONVERGING PHASES
            </h2>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
            CLICK ANY PHASE TO INSPECT DELIVERABLES
          </div>
        </div>

        {/* Funnel Visualization & Stage List */}
        <div
          ref={funnelContainerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Left: Graphic Funnel Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {PROCESS_STAGES.map((stage, idx) => {
              const isSelected = selectedStage === idx;
              return (
                <div
                  key={stage.number}
                  onClick={() => setSelectedStage(idx)}
                  onMouseEnter={() => setCursorMode('EXPAND')}
                  onMouseLeave={() => setCursorMode('DEFAULT')}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: isSelected ? 'var(--deep-red)' : 'var(--text-muted)', fontWeight: 'bold' }}>
                        {stage.number}
                      </span>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: isSelected ? 700 : 500, color: 'var(--ink)' }}>
                        {stage.title}
                      </span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                      {stage.uncertaintyWidth}% UNCERTAINTY
                    </span>
                  </div>

                  {/* Funnel Bar Width */}
                  <div style={{ width: '100%', height: '14px', backgroundColor: 'var(--line)', position: 'relative' }}>
                    <div
                      className="process-funnel-bar"
                      style={{
                        width: `${stage.uncertaintyWidth}%`,
                        height: '100%',
                        backgroundColor: isSelected ? 'var(--deep-red)' : '#7C8075',
                        transition: 'background-color 0.25s',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Stage Breakdown Card */}
          <div
            style={{
              padding: '40px',
              border: '1px solid var(--line)',
              backgroundColor: 'var(--white)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--deep-red)', padding: '4px 8px', border: '1px solid var(--deep-red)' }}>
                PHASE {activeStage.number} / {activeStage.title}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                CONVERGENCE: {100 - activeStage.uncertaintyWidth}% COMPLETE
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '8px' }}>
              {activeStage.subtitle}
            </h3>

            {/* Core Question Callout */}
            <div style={{ backgroundColor: 'var(--canvas)', padding: '16px 20px', borderLeft: '3px solid var(--deep-red)', margin: '24px 0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--deep-red)', marginBottom: '4px' }}>
                PRIMARY INQUIRY
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '16px', color: 'var(--ink)' }}>
                "{activeStage.keyQuestion}"
              </div>
            </div>

            {/* Inputs & Outputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', borderTop: '1px solid var(--line)', paddingTop: '24px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  KEY INPUTS
                </div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeStage.inputs.map((inp, idx) => (
                    <li key={idx} style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--graphite)' }}>
                      • {inp}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--deep-red)', marginBottom: '10px' }}>
                  DELIVERED ARTIFACTS
                </div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeStage.outputs.map((out, idx) => (
                    <li key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink)' }}>
                      ✓ {out}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)',
          backgroundColor: 'var(--canvas)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '32px',
        }}
      >
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 64px)', letterSpacing: '-0.03em', lineHeight: 0.95, textTransform: 'uppercase' }}>
            READY TO REDUCE<br />YOUR UNCERTAINTY?
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-secondary)', marginTop: '16px', maxWidth: '500px' }}>
            We begin with a focused architectural discovery sprint before committing to full build phases.
          </p>
        </div>
        <div>
          <Link
            to="/start"
            className="btn-primary"
            style={{ backgroundColor: 'var(--deep-red)', borderColor: 'var(--deep-red)', color: '#FFF' }}
            onMouseEnter={() => setCursorMode('BEGIN')}
            onMouseLeave={() => setCursorMode('DEFAULT')}
          >
            START A DISCOVERY SPRINT ↗
          </Link>
        </div>
      </section>
    </main>
  );
};
