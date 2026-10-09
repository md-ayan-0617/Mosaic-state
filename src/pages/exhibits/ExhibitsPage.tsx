import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppState } from '../../context/StateContext';

gsap.registerPlugin(ScrollTrigger);

const EXHIBIT_TIMELINE = [
  {
    step: 'ATTRACT',
    number: '01',
    distance: '30m — 5m',
    duration: 'Ongoing ambient loop',
    title: 'THE DISTANT GLANCE',
    description: 'High-contrast spatial typography and generative movement visible across a crowded gallery. No small text; rhythm signals that the installation is alive and ready for human presence.',
    uxRule: 'Must draw attention without strobe fatigue or theatrical disorientation.',
    stateLabel: 'AMBIENT LOCOMOTION',
  },
  {
    step: 'ENGAGE',
    number: '02',
    distance: '5m — 1m',
    duration: '< 2 seconds',
    title: 'THE ZERO-INSTRUCTION FIRST TOUCH',
    description: 'The visitor reaches out. The interface must react in under 16ms with clear affordance. No tutorials, no onboarding dialogues, no "Tap Here to Start". Interaction teaches itself.',
    uxRule: 'Zero text instructions required to trigger the first responsive delight.',
    stateLabel: 'INSTANT AFFORDANCE',
  },
  {
    step: 'EXPLORE',
    number: '03',
    distance: 'Arms length',
    duration: '45s — 6 minutes',
    title: 'STRUCTURAL DEPTH ON DEMAND',
    description: 'Once engaged, the interface reveals layers: deep archival zoom, comparative sliders, provenance maps, or audio narratives. Multi-touch supports simultaneous dual-visitor discovery.',
    uxRule: 'Allow both rapid 30-second skimming and 6-minute scholarly deep dives.',
    stateLabel: 'MULTI-MODAL IMMERSION',
  },
  {
    step: 'EXIT',
    number: '04',
    distance: 'Walking away',
    duration: 'Instant clean reset',
    title: 'THE CLEAN MEMORABLE HANDOFF',
    description: 'The visitor steps away. Optical or proximity sensors detect absence and gracefully transition the screen back to the Attract Loop within 4 seconds without leaving personal inputs behind.',
    uxRule: 'Never leave the interface trapped in a sub-menu for the next approaching visitor.',
    stateLabel: 'AUTO-RESET WATCHDOG',
  },
];

const HARDWARE_COMPONENTS = [
  { name: '4K/8K Display Matrices', spec: 'Commercial 24/7 ultra-bright LED & direct-bond IPS panels, anti-glare etching.', role: 'Visual Fidelity' },
  { name: 'Industrial IPC Compute', spec: 'Fanless embedded Linux/Windows IoT rigs with dual discrete RTX GPU options.', role: 'Local Compute' },
  { name: 'Multi-Touch Sensors', spec: 'ShadowSense & Optical bonded capacitive glass with 40-point simultaneous tracking.', role: 'Tactile Input' },
  { name: 'Depth & LiDAR Beacons', spec: 'Intel RealSense & Hokuyo laser rangefinders for zero-touch distance tracking.', role: 'Spatial Tracking' },
  { name: 'Directional Audio Arrays', spec: 'Parametric ultrasonic speakers focusing acoustic cones precisely to the operator.', role: 'Sound Isolation' },
  { name: 'Isolated Offline Node', spec: '100% functional standalone operation via local NVMe cache when venue internet fails.', role: 'Reliability' },
];

export const ExhibitsPage = () => {
  const { setCursorMode } = useAppState();
  const [activeStep, setActiveStep] = useState<number>(0);
  const hardwareGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hardwareGridRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hardware-spec-card',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const currentTimelineItem = EXHIBIT_TIMELINE[activeStep];

  return (
    <main
      id="main-content"
      style={{
        paddingTop: '64px',
        minHeight: '100vh',
        backgroundColor: '#FDFCF7',
        color: 'var(--ink)',
      }}
    >
      {/* ── HERO ── */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 130px) clamp(20px, 4vw, 64px) clamp(48px, 6vw, 90px)',
          borderBottom: '1px solid #D6CA9E',
          backgroundColor: '#F7EFCF',
        }}
        aria-label="Exhibits: The web doesn't end at the browser"
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#8A6D00',
            marginBottom: '28px',
            letterSpacing: '0.08em',
          }}
        >
          STATE_05 / PHYSICAL & SPATIAL INTERACTIVES
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
            color: 'var(--ink)',
          }}
        >
          THE WEB<br />DOESN'T END<br />AT THE<br />BROWSER.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body-large)',
            color: 'var(--graphite)',
            maxWidth: '680px',
            lineHeight: 1.55,
            marginTop: '36px',
          }}
        >
          We create room-scale digital experiences: museum touchscreen tables, interactive projection walls, architectural wayfinding kiosks, and sensory gallery installations designed for public physical environments.
        </p>

        {/* Spatial Types Badge Row */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '40px' }}>
          {[
            'Touch Tables',
            'Interactive Walls',
            'Wayfinding Kiosks',
            'Physical Projections',
            'Spatial Sound Arrays',
            'Offline Gallery Nodes',
            'AR Cultural Layers',
          ].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '6px 14px',
                border: '1px solid #D6CA9E',
                color: '#8A6D00',
                backgroundColor: 'rgba(244, 214, 91, 0.25)',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── EXHIBIT DESIGN SYSTEM: ATTRACT -> ENGAGE -> EXPLORE -> EXIT ── */}
      <section
        style={{
          padding: 'clamp(50px, 7vw, 110px) clamp(20px, 4vw, 64px)',
          borderBottom: '1px solid var(--line)',
          backgroundColor: 'var(--paper)',
        }}
      >
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8A6D00', letterSpacing: '0.06em', marginBottom: '8px' }}>
            VISITOR JOURNEY TIMELINE / EXHIBIT DESIGN SYSTEM
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', fontWeight: 700, textTransform: 'uppercase' }}>
            HOW PHYSICAL INTERACTION UNFOLDS
          </h2>
        </div>

        {/* Timeline Navigation Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            backgroundColor: 'var(--line)',
            border: '1px solid var(--line)',
            marginBottom: '40px',
          }}
        >
          {EXHIBIT_TIMELINE.map((item, idx) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(idx)}
              style={{
                padding: '20px 24px',
                background: activeStep === idx ? '#F7EFCF' : 'var(--white)',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                borderBottom: activeStep === idx ? '3px solid #8A6D00' : 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#8A6D00', fontWeight: 'bold' }}>
                  {item.number}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                  {item.distance}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 700, color: 'var(--ink)' }}>
                {item.step}
              </div>
            </button>
          ))}
        </div>

        {/* Active Stage Simulation View */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            border: '1px solid var(--line)',
            backgroundColor: 'var(--white)',
          }}
        >
          <div style={{ padding: '48px', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8A6D00', padding: '4px 8px', border: '1px solid #8A6D00' }}>
                  STAGE {currentTimelineItem.number} / {currentTimelineItem.step}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {currentTimelineItem.duration}
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.5vw, 42px)', letterSpacing: '-0.025em', lineHeight: 1, textTransform: 'uppercase', marginBottom: '20px' }}>
                {currentTimelineItem.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--graphite)', lineHeight: 1.6, marginBottom: '28px' }}>
                {currentTimelineItem.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8A6D00', marginBottom: '6px' }}>
                CORE SPATIAL UX PRINCIPLE
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
                "{currentTimelineItem.uxRule}"
              </div>
            </div>
          </div>

          {/* Right Visual Interactive Stage Wireframe */}
          <div style={{ padding: '40px', backgroundColor: '#FDFCF7', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '16/10',
                border: '2px solid var(--ink)',
                backgroundColor: '#171816',
                color: '#fff',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--map-yellow)' }}>
                  KIOSK FEED // 60FPS
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#DADBD3' }}>
                  {currentTimelineItem.stateLabel}
                </span>
              </div>

              {/* Dynamic Simulated Display Graphic based on active stage */}
              <div style={{ textAlign: 'center', padding: '20px' }}>
                {activeStep === 0 && (
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 800, color: 'var(--map-yellow)', letterSpacing: '-0.02em' }}>
                      TOUCH TO EXPLORE
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#DADBD3', marginTop: '10px' }}>
                      PULSING RADIAL AFFORDANCE // SIGHTLINE 15 METRES
                    </div>
                  </div>
                )}
                {activeStep === 1 && (
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3.5vw, 32px)', fontWeight: 700, color: '#FFFFFF' }}>
                      SELECTION DETECTED
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--network-green)', marginTop: '8px' }}>
                      LATENCY: 11MS // MULTI-TOUCH ACTIVE
                    </div>
                  </div>
                )}
                {activeStep === 2 && (
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 3vw, 28px)', fontWeight: 600, color: '#DADBD3' }}>
                      9,000 ARCHIVAL NODES UNROLLED
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--map-yellow)', marginTop: '8px' }}>
                      DEEP ZOOM PYRAMIDS // GESTURE ACTIVE
                    </div>
                  </div>
                )}
                {activeStep === 3 && (
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3.5vw, 32px)', fontWeight: 700, color: '#FFFFFF' }}>
                      VISITOR EXITED
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8E9188', marginTop: '8px' }}>
                      AUTO-CLEANSE CACHE IN 3.2s
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #333', paddingTop: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#888' }}>HARDWARE: INTEL NUC / OPTICAL GLASS</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#888' }}>OFFLINE SURVIVABILITY: OK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HARDWARE & RESILIENCE STACK ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8A6D00', letterSpacing: '0.06em', marginBottom: '16px' }}>
          ENGINEERED FOR PUBLIC TRAFFIC / HARDWARE ARCHITECTURE
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.035em', lineHeight: 0.95, textTransform: 'uppercase', marginBottom: '48px' }}>
          HARDWARE & RELIABILITY
        </h2>

        <div
          ref={hardwareGridRef}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1px', backgroundColor: 'var(--line)' }}
        >
          {HARDWARE_COMPONENTS.map((comp) => (
            <div key={comp.name} className="hardware-spec-card" style={{ backgroundColor: 'var(--white)', padding: '32px 28px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8A6D00', marginBottom: '12px' }}>
                {comp.role.toUpperCase()}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '10px' }}>
                {comp.name}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--graphite)', lineHeight: 1.5 }}>
                {comp.spec}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)',
          backgroundColor: '#F7EFCF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '32px',
        }}
      >
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 64px)', letterSpacing: '-0.03em', lineHeight: 0.95, textTransform: 'uppercase' }}>
            HAVE AN UPCOMING<br />PHYSICAL INSTALLATION?
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--graphite)', marginTop: '16px', maxWidth: '500px' }}>
            From museum masterplans to public interactive tables, we ensure your digital space is as robust as the room around it.
          </p>
        </div>
        <div>
          <Link
            to="/start"
            className="btn-primary"
            style={{ backgroundColor: 'var(--ink)', borderColor: 'var(--ink)', color: '#FFF' }}
            onMouseEnter={() => setCursorMode('BEGIN')}
            onMouseLeave={() => setCursorMode('DEFAULT')}
          >
            START AN EXHIBIT BRIEF ↗
          </Link>
        </div>
      </section>
    </main>
  );
};
