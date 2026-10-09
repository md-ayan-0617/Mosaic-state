import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { INSIGHTS } from '../../data/insights';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setCursorMode } = useAppState();

  const article = INSIGHTS.find((a) => a.slug === slug);
  if (!article) return <Navigate to="/404" replace />;

  const nextArticle = INSIGHTS[(INSIGHTS.indexOf(article) + 1) % INSIGHTS.length];

  return (
    <main
      id="main-content"
      style={{
        paddingTop: '64px',
        minHeight: '100vh',
        backgroundColor: 'var(--white)',
        color: 'var(--ink)',
      }}
    >
      {/* ── HEADER BREADCRUMB ── */}
      <section
        style={{
          padding: 'clamp(40px, 5vw, 80px) clamp(20px, 4vw, 64px) clamp(20px, 3vw, 40px)',
          borderBottom: '1px solid var(--line)',
          backgroundColor: 'var(--paper)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <Link
            to="/insights"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--system-blue)', textDecoration: 'none' }}
          >
            ← BACK TO WORKING KNOWLEDGE
          </Link>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>{article.category}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>{article.date}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--system-blue)' }}>{article.readTime}</span>
          </div>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 84px)',
            letterSpacing: '-0.035em',
            lineHeight: 0.94,
            fontWeight: 800,
            textTransform: 'uppercase',
            maxWidth: '960px',
            color: 'var(--ink)',
          }}
        >
          {article.title}
        </h1>
      </section>

      {/* ── ARTICLE BODY WITH STICKY TABLE OF CONTENTS ── */}
      <section
        style={{
          padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 64px)',
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '80px',
          alignItems: 'start',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Left: Sticky Table of Contents */}
        <aside
          style={{
            position: 'sticky',
            top: '96px',
            borderRight: '1px solid var(--line)',
            paddingRight: '24px',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '16px', letterSpacing: '0.05em' }}>
            TABLE OF CONTENTS
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {article.bodySections.map((sec, i) => (
              <li key={i}>
                <a
                  href={`#section-${i}`}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    lineHeight: 1.4,
                    display: 'block',
                  }}
                >
                  {sec.heading}
                </a>
              </li>
            ))}
            <li style={{ marginTop: '12px', borderTop: '1px solid var(--line)', paddingTop: '12px' }}>
              <a
                href="#references"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--system-blue)', textDecoration: 'none' }}
              >
                BIBLIOGRAPHY / CITATIONS
              </a>
            </li>
          </ul>
        </aside>

        {/* Right: Narrative Editorial Body */}
        <article style={{ maxWidth: '720px' }}>
          {/* Lead paragraph in Lora Serif */}
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(20px, 2.2vw, 26px)',
              lineHeight: 1.55,
              color: 'var(--ink)',
              marginBottom: '40px',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '32px',
            }}
          >
            {article.leadParagraph}
          </p>

          {/* Body Sections */}
          {article.bodySections.map((sec, i) => (
            <div key={i} id={`section-${i}`} style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  letterSpacing: '-0.025em',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                  color: 'var(--ink)',
                }}
              >
                {sec.heading}
              </h2>

              {sec.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-body)',
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                    marginBottom: '20px',
                  }}
                >
                  {p}
                </p>
              ))}

              {/* Optional Diagram Graphic callout */}
              {sec.diagramLabel && (
                <div
                  style={{
                    backgroundColor: 'var(--canvas)',
                    border: '1px solid var(--line)',
                    padding: '24px',
                    margin: '32px 0',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--system-blue)', marginBottom: '12px' }}>
                    {sec.diagramLabel}
                  </div>
                  <svg viewBox="0 0 100 30" style={{ width: '100%', height: 'auto', backgroundColor: 'var(--white)', border: '1px solid var(--line)' }}>
                    <line x1="10" y1="15" x2="90" y2="15" stroke="var(--line)" strokeWidth="0.8" />
                    <circle cx="20" cy="15" r="4" fill="var(--system-blue)" />
                    <circle cx="50" cy="15" r="4" fill="var(--signal-orange)" />
                    <circle cx="80" cy="15" r="4" fill="var(--network-green)" />
                    <text x="20" y="25" fontSize="2.5" textAnchor="middle" fill="var(--ink)" fontFamily="Fragment Mono">GEOGRAPHY</text>
                    <text x="50" y="25" fontSize="2.5" textAnchor="middle" fill="var(--ink)" fontFamily="Fragment Mono">TOPOLOGY</text>
                    <text x="80" y="25" fontSize="2.5" textAnchor="middle" fill="var(--ink)" fontFamily="Fragment Mono">HUMAN MESH</text>
                  </svg>
                </div>
              )}

              {/* Optional Pull Quote in Lora Serif */}
              {sec.quote && (
                <blockquote
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(20px, 2.4vw, 28px)',
                    lineHeight: 1.4,
                    color: 'var(--system-blue)',
                    paddingLeft: '24px',
                    borderLeft: '3px solid var(--system-blue)',
                    margin: '36px 0',
                  }}
                >
                  "{sec.quote}"
                </blockquote>
              )}
            </div>
          ))}

          {/* References & Citations */}
          <div id="references" style={{ borderTop: '1px solid var(--line)', paddingTop: '32px', marginTop: '64px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '16px', letterSpacing: '0.05em' }}>
              REFERENCES & ACADEMIC SOURCES
            </div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {article.references.map((ref, idx) => (
                <li key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
                  [{idx + 1}] <strong style={{ color: 'var(--ink)' }}>{ref.title}</strong> — {ref.source} ({ref.year})
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      {/* ── NEXT ARTICLE TRANSITION ── */}
      <section
        style={{
          borderTop: '1px solid var(--line)',
          backgroundColor: 'var(--paper)',
          padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 64px)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            NEXT EDITORIAL ESSAY →
          </div>
          <Link
            to={`/insights/${nextArticle.slug}`}
            onMouseEnter={() => setCursorMode('OPEN')}
            onMouseLeave={() => setCursorMode('DEFAULT')}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4.5vw, 60px)',
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--ink)',
              }}
            >
              {nextArticle.title}
            </h2>
          </Link>
        </div>
      </section>
    </main>
  );
};
