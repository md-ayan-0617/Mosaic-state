import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { PROJECTS } from '../../data/projects';
import { MessyToOrganizedDiagram } from '../../components/diagrams/MessyToOrganizedDiagram';
import { CaseStudyPrototype } from '../../components/diagrams/CaseStudyPrototype';

export const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setCursorMode } = useAppState();
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return <Navigate to="/404" replace />;

  const nextProject = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];

  return (
    <main id="main-content" style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: 'var(--paper)' }}>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: '80vh',
          backgroundColor: `${project.accentColor}12`,
          borderBottom: `3px solid ${project.accentColor}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px) clamp(48px, 6vw, 80px)',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-label={`Case study: ${project.title}`}
      >
        {/* Background accent image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${project.accentColor}08, var(--paper))` }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Meta top */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
            {[
              { label: 'PROJECT', value: project.number },
              { label: 'YEAR', value: project.year },
              { label: 'SECTOR', value: project.sector },
            ].map(({ label, value }) => (
              <div key={label} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                <span style={{ color: 'var(--text-muted)', marginRight: '6px' }}>{label}</span>
                <span style={{ color: project.accentColor, fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(42px, 7vw, 110px)',
              letterSpacing: '-0.035em',
              lineHeight: 0.88,
              fontWeight: 800,
              textTransform: 'uppercase',
              color: 'var(--ink)',
              maxWidth: '900px',
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 2.5vw, 32px)',
              letterSpacing: '-0.02em',
              color: project.accentColor,
              marginTop: '16px',
              maxWidth: '700px',
              lineHeight: 1.2,
            }}
          >
            {project.statement}
          </p>
        </div>
      </section>

      {/* ── META GRID ── */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          borderBottom: '1px solid var(--line)',
        }}
      >
        {[
          { label: 'CLIENT', value: project.client },
          { label: 'LOCATION', value: project.location },
          { label: 'TYPE', value: project.type },
          { label: 'YEAR', value: project.year },
        ].map(({ label, value }) => (
          <div key={label} style={{ padding: '24px clamp(20px, 4vw, 64px)', borderRight: '1px solid var(--line)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.05em' }}>{label}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500, color: 'var(--ink)' }}>{value}</div>
          </div>
        ))}
      </section>

      {/* ── 01. CONTEXT ── */}
      <section className="site-section" style={{ padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 64px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: project.accentColor, marginBottom: '8px', letterSpacing: '0.06em' }}>01 / CONTEXT</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', fontWeight: 600, lineHeight: 1, textTransform: 'uppercase' }}>
              THE BRIEF
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body-large)', lineHeight: 1.55, color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {project.summary}
            </p>
          </div>
        </div>
      </section>

      {/* ── 02. COMPLEXITY ── */}
      <section style={{ borderTop: '1px solid var(--line)', padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 64px)', backgroundColor: 'var(--canvas)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: project.accentColor, marginBottom: '8px', letterSpacing: '0.06em' }}>02 / COMPLEXITY</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', fontWeight: 600, lineHeight: 1, textTransform: 'uppercase' }}>
              THE CHALLENGE
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body-large)', lineHeight: 1.55, color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {project.challenge}
            </p>
            <div
              style={{
                padding: '20px 24px',
                backgroundColor: 'var(--paper)',
                borderLeft: `3px solid ${project.accentColor}`,
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}
            >
              <div style={{ color: project.accentColor, fontSize: '10px', marginBottom: '8px', letterSpacing: '0.05em' }}>TECHNICAL CONSTRAINT</div>
              {project.complexity}
            </div>
          </div>
        </div>
      </section>

      {/* Signature ScrollTrigger Interaction: Messy Chaos -> Structured System */}
      <MessyToOrganizedDiagram
        accentColor={project.accentColor}
        projectTitle={project.title}
      />

      {/* ── 03. SYSTEM ARCHITECTURE ── */}
      <section style={{ borderTop: '1px solid var(--line)', padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 64px)' }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: project.accentColor, marginBottom: '8px', letterSpacing: '0.06em' }}>03 / SYSTEM</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', fontWeight: 600, lineHeight: 1, textTransform: 'uppercase', marginBottom: '16px' }}>
            {project.systemArchitecture.title}
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body)', color: 'var(--text-secondary)', maxWidth: '620px', lineHeight: 1.6 }}>
            {project.systemArchitecture.description}
          </p>
        </div>

        {/* System Architecture Diagram */}
        <div style={{ border: '1px solid var(--line)', padding: '40px', backgroundColor: 'var(--canvas)', overflowX: 'auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '24px', letterSpacing: '0.05em' }}>
            ARCHITECTURE DIAGRAM / HOVER NODES FOR DETAIL
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start', minWidth: '600px' }}>
            {/* Node list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '180px' }}>
              {project.systemArchitecture.nodes.map((node, i) => (
                <div
                  key={node}
                  onMouseEnter={() => setActiveNode(node)}
                  onMouseLeave={() => setActiveNode(null)}
                  style={{
                    padding: '10px 14px',
                    border: '1px solid',
                    borderColor: activeNode === node ? project.accentColor : 'var(--line)',
                    backgroundColor: activeNode === node ? `${project.accentColor}10` : 'var(--paper)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: activeNode === node ? project.accentColor : 'var(--text-secondary)',
                    transition: 'all 0.2s',
                    cursor: 'default',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ color: project.accentColor, minWidth: '20px' }}>{(i + 1).toString().padStart(2, '0')}</span>
                  {node}
                </div>
              ))}
            </div>

            {/* Flow arrows diagram */}
            <div style={{ flex: 1 }}>
              {project.systemArchitecture.flows.map((flow, i) => {
                const isActive = activeNode === flow.from || activeNode === flow.to;
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 0',
                      borderBottom: '1px dashed var(--mist)',
                      opacity: activeNode && !isActive ? 0.25 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', minWidth: '140px' }}>
                      {flow.from}
                    </span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: isActive ? project.accentColor : 'var(--line)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'var(--paper)', padding: '0 6px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: isActive ? project.accentColor : 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          {flow.label}
                        </span>
                      </div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: isActive ? project.accentColor : 'var(--text-secondary)', minWidth: '140px', textAlign: 'right' }}>
                      {flow.to}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 04. INTERACTION ── */}
      <section style={{ borderTop: '1px solid var(--line)', padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 64px)', backgroundColor: 'var(--canvas)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: project.accentColor, marginBottom: '8px', letterSpacing: '0.06em' }}>04 / INTERACTION</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', fontWeight: 600, lineHeight: 1, textTransform: 'uppercase' }}>
              KEY INTERACTIONS
            </h2>
          </div>
          <div>
            {project.interactions.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '24px',
                  padding: '20px 0',
                  borderBottom: '1px solid var(--line)',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: project.accentColor, minWidth: '24px', paddingTop: '2px' }}>
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body)', color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 }}>
                  {item}
                </p>
              </div>
            ))}

            {/* Live Interactive Prototype */}
            <div style={{ marginTop: '36px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '0.05em' }}>
                INTERACTIVE SYSTEM PROTOTYPE / TEST IN-BROWSER
              </div>
              <CaseStudyPrototype slug={project.slug} accentColor={project.accentColor} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 05. BUILD ── */}
      <section style={{ borderTop: '1px solid var(--line)', padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 64px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: project.accentColor, marginBottom: '8px', letterSpacing: '0.06em' }}>05 / BUILD</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', fontWeight: 600, lineHeight: 1, textTransform: 'uppercase' }}>
              TECHNOLOGY
            </h2>
          </div>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    padding: '6px 12px',
                    backgroundColor: `${project.accentColor}12`,
                    border: `1px solid ${project.accentColor}30`,
                    color: project.accentColor,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 06. OUTCOMES ── */}
      <section style={{ borderTop: '1px solid var(--line)', padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 64px)', backgroundColor: `${project.accentColor}08` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: project.accentColor, marginBottom: '8px', letterSpacing: '0.06em' }}>06 / OUTCOME</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', fontWeight: 600, lineHeight: 1, textTransform: 'uppercase' }}>
              RESULTS
            </h2>
          </div>
          <div>
            {project.qualitativeOutcomes.map((outcome, i) => (
              <div
                key={i}
                style={{
                  padding: '20px 24px',
                  marginBottom: '12px',
                  backgroundColor: 'var(--paper)',
                  borderLeft: `3px solid ${project.accentColor}`,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-body)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}
              >
                {outcome}
              </div>
            ))}
            <div
              style={{
                marginTop: '24px',
                padding: '16px 24px',
                backgroundColor: 'var(--canvas)',
                border: '1px solid var(--line)',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-muted)',
              }}
            >
              NOTE: All outcomes are qualitative. We do not fabricate percentage gains without measured evidence.
            </div>
          </div>
        </div>
      </section>

      {/* Project image full-width */}
      <section style={{ backgroundColor: 'var(--mist)', height: '480px', overflow: 'hidden' }}>
        <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </section>

      {/* ── NEXT PROJECT ── */}
      <Link
        to={`/work/${nextProject.slug}`}
        onMouseEnter={() => setCursorMode('OPEN')}
        onMouseLeave={() => setCursorMode('DEFAULT')}
        style={{ display: 'block', textDecoration: 'none' }}
      >
        <div
          style={{
            padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 64px)',
            backgroundColor: nextProject.accentColor,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '40px',
            transition: 'filter 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = 'brightness(0.92)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'; }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', letterSpacing: '0.06em' }}>
              NEXT PROJECT → {nextProject.number}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 72px)', letterSpacing: '-0.03em', fontWeight: 700, color: '#FFFFFF', lineHeight: 0.92, textTransform: 'uppercase' }}>
              {nextProject.title}
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginTop: '8px' }}>
              {nextProject.descriptor}
            </div>
          </div>
          <div style={{ color: '#FFFFFF', fontSize: '48px', fontFamily: 'var(--font-display)', flexShrink: 0 }}>→</div>
        </div>
      </Link>
    </main>
  );
};
