import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';

export const WebCapabilitiesPage: React.FC = () => {
  const { setCursorMode } = useAppState();

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
        aria-label="Web Capabilities: Websites and Platforms"
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
          STATE_03.1 / WEBSITES & DIGITAL PLATFORMS
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
          STRUCTURE<br />BEFORE<br />SURFACE.
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
          We architect websites and platforms for cultural institutions, research universities, public transport authorities, and technology enterprises where information architecture is the core product.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '40px' }}>
          {[
            'Information Architecture',
            'React 19 / TypeScript Systems',
            'Headless CMS Pipelines',
            'WCAG AAA Compliance',
            'Edge CDN Cache Topologies',
          ].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '6px 14px',
                border: '1px solid var(--line)',
                color: 'var(--signal-orange)',
                backgroundColor: 'var(--white)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Grid of Web Standards */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', backgroundColor: 'var(--line)' }}>
          {[
            { num: '01', title: 'ACCESSIBILITY AS ARCHITECTURE', desc: 'Screen readers, keyboard navigation, and high-contrast compliance tested from day one—not patched after launch.' },
            { num: '02', title: 'LIGHTNING SUB-SECOND TTFB', desc: 'Edge-rendered pages with deterministic hydration, zero layout shift, and instant sub-100ms routing.' },
            { num: '03', title: 'RESILIENT CMS SCHEMAS', desc: 'Structured content graphs separating presentation from editorial records, allowing effortless multi-channel publishing.' },
          ].map((std) => (
            <div key={std.num} style={{ backgroundColor: 'var(--white)', padding: '36px 30px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--signal-orange)', marginBottom: '12px' }}>{std.num}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>{std.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{std.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Capabilities / Work */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 64px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', textTransform: 'uppercase' }}>EXPLORE CAPABILITY MATRIX</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Inspect all 8 capabilities and our full discipline matrix.
          </p>
        </div>
        <Link
          to="/capabilities"
          className="btn-primary"
          onMouseEnter={() => setCursorMode('OPEN')}
          onMouseLeave={() => setCursorMode('DEFAULT')}
        >
          VIEW MATRIX →
        </Link>
      </section>
    </main>
  );
};
